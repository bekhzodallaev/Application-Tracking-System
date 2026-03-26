import { ApplicationsPage } from "@/features/dashboard/pages/ApplicationsPage";
import { getSession } from "@/lib/auth/session";
import {
  getUsersCollection,
  getUserJobApplications,
  getJobApplicationStats
} from "@/lib/db/server";
import { redirect } from "next/navigation";
import { Application, DashboardStats } from "@/features/dashboard/types";

export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const [statsResult, jobApplications] = await Promise.all([
    getJobApplicationStats(session.userId),
    getUserJobApplications(session.userId),
  ]);

  const stats = statsResult as DashboardStats;

  const applications: Application[] = jobApplications.map((app) => ({
    id: app._id.toString(),
    title: app.position || "",
    company: app.company || null,
    date: app.date ? new Date(app.date).toISOString() : "",
    status: app.status as Application["status"],
    confidence: app.confidence,
  }));

  return <ApplicationsPage stats={stats} jobApplications={applications} />;
}
