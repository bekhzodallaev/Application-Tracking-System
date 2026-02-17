import React from 'react';
import Pipeline from '../components/pipeline/Pipeline';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getSession } from '@/app/lib/session';
import { getUsersCollection, getJobApplicationStats } from '@/app/lib/db.server';
import StatusCard from '../components/applications/StatusCard';

const Dashboard = async () => {
  const session = await getSession();
  if (!session?.userId) redirect('/auth/signin');

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1 } }
  );

  if (!user) redirect('/auth/signin');

  const stats = await getJobApplicationStats(session.userId);

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-3xl md:text-4xl font-bold">Welcome, {user.name}</h1>
      <p className="mt-3 mb-4 text-gray-600">
        Here is a summary of your job application progress.
      </p>

      {/* Responsive cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatusCard title="Total Applications" value={stats.total} />
        <StatusCard title="Interviews Scheduled" value={stats.interviews} />
        <StatusCard title="Offers Received" value={stats.offers} />
        <StatusCard title="Rejections" value={stats.rejections} />
      </div>

      <h2 className="text-2xl md:text-3xl mb-4">Application Status Breakdown</h2>

      <div className="p-3 shadow-lg rounded-lg bg-white overflow-x-auto">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-lg font-semibold">Current Pipeline</p>
            <p className="text-gray-600 text-sm">All Time Applications</p>
          </div>
          <div>
            <h1 className="font-semibold">{stats.total} Active</h1>
          </div>
        </div>

        <Pipeline />
      </div>
    </div>
  );
};

export default Dashboard;
