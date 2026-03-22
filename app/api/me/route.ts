// app/api/me/route.ts
import { NextResponse } from 'next/server';
import { getUserFromSession } from '@/app/lib/session';

export async function GET() {
  const user = await getUserFromSession();

  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    avatarPublicId: user.avatar?.publicId ?? null,
  });
}
