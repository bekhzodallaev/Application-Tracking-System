import { NextResponse } from 'next/server';
import { oauth2Client } from '@/app/lib/gmail';
import { getUsersCollection } from '@/app/lib/db.server';
import { getSession } from '@/app/lib/session';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code' }, { status: 400 });
  }

  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // ✅ get tokens ONCE
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    if (!tokens.refresh_token) {
      throw new Error('No refresh token generated');
    }

    const users = await getUsersCollection();

    await users.updateOne(
      { _id: new ObjectId(session.userId) },
      {
        $set: {
          'gmail.refreshToken': tokens.refresh_token,
          'gmail.syncEnabled': false, // user must enable manually
          'gmail.connectedAt': new Date(),
        },
      }
    );

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.redirect(
      `${baseUrl}/dashboard/settings?gmail=connected`
    );
  } catch (error) {
    console.error('OAuth callback error:', error);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    return NextResponse.redirect(
      `${baseUrl}/dashboard/settings?gmail=error`
    );
  }
}
