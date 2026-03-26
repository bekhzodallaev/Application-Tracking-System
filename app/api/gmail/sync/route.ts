import { NextResponse } from "next/server";
import { gmail, oauth2Client } from "@/lib/gmail";
import { extractPlainText } from "@/lib/gmail-utils";
import { extractJobEvent } from "@/lib/extract-job";
import { getUserFromSession } from "@/lib/session";
import clientPromise from "@/lib/mongodb";

export async function POST() {
  const user = await getUserFromSession();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!user.gmail?.refreshToken) {
    return NextResponse.json({ error: "Gmail not connected" }, { status: 403 });
  }

  if (!user.gmail?.syncEnabled) {
    return NextResponse.json({ error: "Sync disabled" }, { status: 403 });
  }

  oauth2Client.setCredentials({
    refresh_token: user.gmail.refreshToken,
  });

  let pageToken: string | undefined = undefined;
  const results: any[] = [];

  const TARGET = 10;
  const MAX_PAGES = 5;
  let pages = 0;

  do {
    const listRes: any = await gmail.users.messages.list({
      userId: "me",
      labelIds: ["INBOX"],
      q: "category:primary",
      maxResults: 20,
      pageToken,
    });

    const messages = listRes.data.messages || [];
    pageToken = listRes.data.nextPageToken || undefined;

    console.log("messages fetched:", messages.length);
    console.log("nextPageToken:", pageToken);

    for (const msg of messages) {
      if (results.length >= TARGET) break;

      const full = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "full",
      });
      const internalDateMs = parseInt(full.data.internalDate || "0", 10);
      const date = internalDateMs
        ? new Date(internalDateMs).toISOString().split("T")[0]
        : null;

      const text = extractPlainText(full.data.payload);
      if (!text) continue;

      const extracted = await extractJobEvent(text);
      console.log("LLM output for subject:", extracted);
      if (!extracted) continue;

      if (!extracted.isJobRelated) continue;
      if (extracted.confidence < 0.6) continue;
      if (!extracted.company && !extracted.position) continue;

      const client = await clientPromise;
      const db = client.db("ats");

      await db.collection("jobApplications").updateOne(
        { gmailMessageId: msg.id },
        {
          $set: {
            company: extracted.company,
            position: extracted.position,
            status: extracted.status,
            confidence: extracted.confidence,
            date: extracted.date
              ? new Date(extracted.date)
              : internalDateMs
                ? new Date(internalDateMs)
                : null,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            userId: user._id.toString(),
            gmailMessageId: msg.id,
            createdAt: new Date(),
          },
        },
        { upsert: true },
      );

      results.push({
        messageId: msg.id,
        extracted: {
          ...extracted,
          date: extracted.date || date,
        },
      });
    }

    pages++;
  } while (pageToken && results.length < TARGET && pages < MAX_PAGES);

  console.log("FINAL RESULTS:", results);

  return NextResponse.json({ results });
}
