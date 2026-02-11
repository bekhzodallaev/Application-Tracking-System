import React from 'react'
import Pipeline from '../components/pipeline/Pipeline';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getSession } from '@/app/lib/session';
import { getUsersCollection } from '@/app/lib/db.server';
import { getJobApplicationStats } from '@/app/lib/db.server';
import StatusCard from '../components/applications/StatusCard';


const Dashboard = async() => {

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
  console.log("JOB STATS:", stats);

  return (
    <div className='p-4'>
          <h1 className='text-4xl font-bold'>Welcome, { user.name}</h1>
              <p className='mt-4 mb-2 text-lg'>Here is a summary of your job application progress.</p>
              <div className='flex justify-between gap-3 mb-3 mt-4'>
        <StatusCard title="Total Applications" value={stats.total} />
        <StatusCard title="Interviews Scheduled" value={stats.interviews} />
        <StatusCard title="Offers Received" value={stats.offers} />
        <StatusCard title="Rejections" value={stats.rejections} />
              </div>
              <h1 className='text-3xl mt-7'>Application Status Breakdown</h1>
              <div className='p-3 shadow-lg rounded-lg mt-4'>
                  <div className='flex justify-between mb-4'>
                      <div>
                          <p className='text-xl mb-3'>Current Pipeline</p>
                        <p className='text-gray-600'>All Time Applications</p>
                      </div>
                      <div>
                          <h1>{stats.total} Active</h1>
                      </div>
                  </div>
                  <div >
                      <Pipeline />
                  </div>
              </div>
    </div>
  )
}

export default Dashboard;