import React from "react";
import { SettingsPage } from "@/features/dashboard/pages/SettingsPage";
import { getSession } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/db/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1, avatar: 1 } },
  );

  if (!user) redirect("/auth/signin");
  
  const userData = {
    name: user.name,
    email: user.email,
    avatarPublicId: user.avatar?.publicId ?? null,
  };

  return <SettingsPage initialUser={userData} />;
}
