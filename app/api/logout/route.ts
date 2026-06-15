// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth/session";

export async function POST() {
  await deleteSession();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "session",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0, // expire immediately
  });

  return response;
}
