import { getSession } from '@/app/lib/session';
import { getJobApplicationStats, getUserJobApplications, getUsersCollection } from '@/app/lib/db.server';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import ApplicationsClient from './ApplicationClient';
import { Status } from '@/app/components/applications/ApplicationCard';

type JobApplication = {
  id: string;
  title: string;
  company: string;
  date: string;
  status: Status;
};

export default async function Page() {
  const session = await getSession();

  if (!session?.userId) {
    redirect('/auth/signin');
  }

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1 } }
  );

  if (!user) {
    redirect('/auth/signin');
  }

  const stats = await getJobApplicationStats(session.userId);
  const jobApplications = await getUserJobApplications(session.userId);
  
  const applications: JobApplication[] = jobApplications.map((app) => ({
    id: app._id.toString(),
    title: app.position || '',
    company: app.company || null,
    date: app.date ? new Date(app.date).toISOString() : '',
    status: app.status as JobApplication['status'],
    confidence: app.confidence,
  }));

  return (
    <ApplicationsClient
      stats={stats}
      jobApplications={applications}
    />
  );
}
