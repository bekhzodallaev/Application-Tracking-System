'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLayoutDashboard, LuChartBar } from 'react-icons/lu';
import { FiBriefcase, FiSettings, FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';


type User = {
  name: string;
  email: string;
};

type SidebarProps = {
  user: User;
};

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
    const [avatarPublicId, setAvatarPublicId] = useState<string | null>(null);
  
  const linkClass = (href: string) =>
    `flex p-2 gap-2 rounded-md transform hover:scale-110 transition duration-300 ${
      pathname === href
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600'
    }`;

   useEffect(() => {
      async function loadSettings() {
        const res = await fetch('/api/settings/gmail');
        if (!res.ok) return;

        const data = await res.json();  
        if (data.avatar?.publicId) {
          setAvatarPublicId(data.avatar.publicId);
        }
      }
  
      loadSettings();
    }, []);
  return (
    <div className="relative bg-white">
      <div className="flex gap-1 w-96 flex-col p-4">
        <div className="flex items-center gap-3 mb-6">
            <div className='relative size-16 rounded-full overflow-hidden'>
                            {avatarPublicId ? (
               <CldImage
                    src={avatarPublicId}
                alt="Profile avatar"
                fill
                className="object-cover"
              />
            ) : (
              <FaUserCircle color="blue" size={50} />
            )}
            
              </div>
           <div>
            <h2 className="text-xl">{user.name}</h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>
        </div>

        <Link href="/dashboard" className={linkClass('/dashboard')}>
          <LuLayoutDashboard />
          Dashboard
        </Link>

        <Link
          href="/dashboard/applications"
          className={linkClass('/dashboard/applications')}
        >
          <FiBriefcase />
          Applications
        </Link>

        <Link
          href="/dashboard/analytics"
          className={linkClass('/dashboard/analytics')}
        >
          <LuChartBar />
          Analytics
        </Link>

        <Link
          href="/dashboard/settings"
          className={linkClass('/dashboard/settings')}
        >
          <FiSettings />
          Settings
        </Link>
      </div>

      <div className="fixed bottom-10 left-5">
        <Link href="/auth/signin" className="flex gap-2 text-gray-600">
          <FiLogOut />
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;