import React from "react";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { getSession } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/db/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1, avatarPublicId: 1 } },
  );

  if (!user) redirect("/auth/signin");

  const userData = {
    name: user.name,
    email: user.email,
    avatarPublicId: user.avatarPublicId,
  };

  return <DashboardLayout user={userData}>{children}</DashboardLayout>;
}
