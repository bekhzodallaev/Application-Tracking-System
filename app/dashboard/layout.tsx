import Sidebar from '../components/Sidebar';
import { redirect } from 'next/navigation';
import { ObjectId } from 'mongodb';
import { getSession } from '@/app/lib/session';
import { getUsersCollection } from '@/app/lib/db.server';
import AuthSync from './components/AuthSync';
import MobileSidebar from './components/MobileSidebar';

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session?.userId) redirect('/auth/signin');

  const users = await getUsersCollection();
  const user = await users.findOne(
    { _id: new ObjectId(session.userId) },
    { projection: { name: 1, email: 1 } }
  );

  if (!user) redirect('/auth/signin');

  const year = new Date().getFullYear();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 border-r border-gray-200 bg-white sticky top-0 h-screen">
        <Sidebar />
      </aside>
<main className="flex-1 overflow-y-auto overflow-x-hidden">

  <div className="md:hidden sticky top-0 z-40 bg-gray-50 border-b border-gray-200  px-4 py-3">
    <MobileSidebar />
  </div>

  <div className="p-4 md:p-6">
    <AuthSync />
    {children}

    <p className="text-center mt-10 text-sm text-gray-500">
      © {year} AppTrackr.com
    </p>
  </div>

</main>
    </div>
  );
};

export default layout;
