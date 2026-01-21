import React from 'react'
import Sidebar from '../components/Sidebar';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getSession } from '@/app/lib/session';
import { getUsersCollection } from '@/app/lib/db.server';

const layout = async({ children }: { children: React.ReactNode }) => {
  const session = await getSession(); // await here – safe in Server Component

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

  const year = new Date().getFullYear();
  return (
    <div className='flex min-h-screen'>
      <aside className=' h-screen sticky top-0 bg-white' >
        <Sidebar user={{ name: user.name, email: user.email }}/>
      </aside>
          <main  className='flex-1 p-6 overflow-x-hidden'>
            {children}

             <p className='text-center mt-10'>@ {year} AppTrackr.com </p>
          </main>
    </div>
  )
}

export default layout