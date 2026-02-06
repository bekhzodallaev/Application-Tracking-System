
import { getSession } from '@/app/lib/session';
import AnalyticsClient from './AnalyticsClient';
import { redirect } from 'next/navigation';
import { getJobApplicationStats, getUsersCollection } from '@/app/lib/db.server';
import { ObjectId } from 'mongodb';
import { getApplicationAnalytics } from '@/app/lib/analytics.server';




export default async function Page() {
  const session = await getSession();
  if (!session?.userId) redirect('/auth/signin');

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { email: 1 } }
  );

  if (!user) redirect('/auth/signin');

  const [stats, analytics] = await Promise.all([
    getJobApplicationStats(session.userId),
    getApplicationAnalytics(session.userId),
  ]);

  return (
    <AnalyticsClient
      stats={stats}
      funnelData={analytics.funnelData}
      jobRole={analytics.jobRoleData}
      avgTimeData={analytics.avgTimeData}
    />)
}
  