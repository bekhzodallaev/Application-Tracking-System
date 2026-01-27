import { getUsersCollection } from '@/app/lib/db.server';
import { getSession } from '@/app/lib/session';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getSession();
  if (!session?.userId) return new Response('Unauthorized', { status: 401 });

  const users = await getUsersCollection();
  const user = await users.findOne({ _id: new ObjectId(session.userId) });

  return new Response(
    JSON.stringify({
      isConnected: !!user?.gmail?.refreshToken,
      syncEnabled: user?.gmail?.syncEnabled || false,
    }),
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { syncEnabled } = body;

  const session = await getSession();
  if (!session?.userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const users = await getUsersCollection();
  await users.updateOne(
    { _id: new ObjectId(session.userId) },
    { $set: { 'gmail.syncEnabled': syncEnabled } }
  );

  return NextResponse.json({ success: true });
}