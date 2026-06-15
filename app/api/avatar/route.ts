import cloudinary from "@/lib/services/cloudinary";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/db/server";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const session = await getSession();
  if (!session?.userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await getUsersCollection();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await cloudinary.uploader.upload(
    `data:${file.type};base64,${buffer.toString("base64")}`,
    {
      folder: "avatars",
    },
  );

  await users.updateOne(
    { _id: new ObjectId(session.userId) },
    {
      $set: {
        avatar: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
  );
  return NextResponse.json({
    avatarPublicId: result.public_id,
    publicId: result.public_id,
    url: result.secure_url,
  });
}
