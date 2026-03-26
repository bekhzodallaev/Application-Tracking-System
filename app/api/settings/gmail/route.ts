import { getUsersCollection } from "@/lib/db/server";
import { getSession } from "@/lib/auth/session";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session?.userId) return new Response("Unauthorized", { status: 401 });

  const users = await getUsersCollection();
  const user = await users.findOne({ _id: new ObjectId(session.userId) });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return new Response(
    JSON.stringify({
      isConnected: !!user?.gmail?.refreshToken,
      syncEnabled: user?.gmail?.syncEnabled || false,
      avatar: user.avatar || null,
      name: user.name || null,
    }),
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { syncEnabled, name } = body;

  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await getUsersCollection();

  const updateFields: any = {};

  if (typeof syncEnabled === "boolean") {
    updateFields["gmail.syncEnabled"] = syncEnabled;
  }

  if (typeof name === "string") {
    updateFields["name"] = name;
  }

  if (Object.keys(updateFields).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  await users.updateOne(
    { _id: new ObjectId(session.userId) },
    { $set: updateFields },
  );

  return NextResponse.json({ success: true });
}
