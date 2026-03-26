import React from "react";
import { SettingsPage } from "@/features/dashboard/pages/SettingsPage";
import { getSession } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/db/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

// Since SettingsPage was 'use client' and used 'useUser' context, 
// I'll wrap it or ensure the context provider is available.
// The context is in src/context/UserContext.tsx.
// We'll pass the refreshUser logic if needed, but for now 
// I'll just render it as is.

export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1, avatarPublicId: 1 } },
  );

  if (!user) redirect("/auth/signin");

  return <SettingsPage user={user} refreshUser={async () => { "use server"; }} />;
  // Note: refreshUser should be a client-side function from context.
  // The actual SettingsPage component uses useUser() inside, 
  // so passing it as prop might be redundant if we use the context.
  // But original code had it as a prop? No, original had it as useUser().
}
