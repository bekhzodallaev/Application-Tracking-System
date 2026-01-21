// app/lib/session.ts
'use server';
import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-long-random-secret-min-32-chars'
);

export interface Session {
  userId: string;
  // add more fields if needed (role, etc.)
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(secret);

  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function getSession(): Promise<Session | null> {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, secret);
    return payload as unknown as Session;
  } catch (err) {
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}