import { AnalyticsPage } from "@/features/dashboard/pages/AnalyticsPage";
import { getSession } from "@/lib/auth/session";
import { getJobApplicationStats } from "@/lib/db/server";
import { getApplicationAnalytics } from "@/lib/analytics/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect("/auth/signin");

  const [stats, analytics] = await Promise.all([
    getJobApplicationStats(session.userId),
    getApplicationAnalytics(session.userId),
  ]);

  return (
    <AnalyticsPage
      stats={stats}
      funnelData={analytics.funnelData}
      jobRole={analytics.jobRoleData}
      avgTimeData={analytics.avgTimeData}
    />
  );
}
