import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { getSession } from "@/lib/auth/session";
import { getUsersCollection, getJobApplicationStats, getUserJobApplications } from "@/lib/db/server";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { Application } from "@/features/dashboard/types";

export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1 } },
  );

  if (!user) redirect("/auth/signin");

  const [stats, jobApplications] = await Promise.all([
    getJobApplicationStats(session.userId),
    getUserJobApplications(session.userId),
  ]);

  const applications: Application[] = jobApplications.map((app) => ({
    id: app._id.toString(),
    title: app.position || "",
    company: app.company || null,
    date: app.date ? new Date(app.date).toISOString() : "",
    status: app.status as Application["status"],
    confidence: app.confidence,
  }));

  return (
    <DashboardPage
      user={{ name: user.name }}
      stats={stats}
      applications={applications}
    />
  );
}
