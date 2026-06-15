import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { extractJobEvent } from "@/lib/services/extract-job";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ats");
    const collection = db.collection("jobApplications");

    console.log("Cron started at", new Date().toISOString());

    const pendingDocs = await collection
      .find({ status: "pending" })
      .limit(8)
      .toArray();

    if (pendingDocs.length === 0) {
      return NextResponse.json({
        message: "No pending job applications to process",
      });
    }

    let processed = 0;
    let failed = 0;

    for (const doc of pendingDocs) {
      try {
        const emailText =
          doc.rawEmail?.body ||
          doc.rawEmail?.text ||
          doc.rawEmail?.plainText ||
          "";

        const extracted = await extractJobEvent(emailText);

        if (!extracted) {
          throw new Error("No valid extraction returned");
        }

        await collection.updateOne(
          { _id: doc._id },
          {
            $set: {
              extracted,
              status: extracted.isJobRelated
                ? "processed"
                : "processed_non_job",
              processedAt: new Date(),
            },
          },
        );

        processed++;
      } catch (err) {
        console.error(`Failed to extract for doc ${doc._id.toString()}:`, err);

        await collection.updateOne(
          { _id: doc._id },
          {
            $set: {
              status: "failed",
              errorMessage:
                (err as Error).message?.slice(0, 500) || "Extraction error",
              processedAt: new Date(),
            },
          },
        );

        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      failed,
      handled: pendingDocs.length,
    });
  } catch (err) {
    console.error("Cron job failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
