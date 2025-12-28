import React from 'react'
import Link from 'next/link'
import { LuLayoutDashboard } from 'react-icons/lu'
import { FiUser } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { LuChartBar } from 'react-icons/lu';

const Sidebar = () => {
  return (
      <div>
          <div className='flex gap-1 h-screen w-96 flex-col p-4'>
              <div>
                   <div className='rounded-[50%] size-16 bg-blue-700'>
                 <img src="" alt="" />
              </div>
              <div>
                  <h2>Bekhzod Allaev</h2>
                  <p>bekhzodallayev@gmail.com</p>
              </div>
          </div>

          <Link href="/dashboard" className='active flex p-2 gap-2'>
              <LuLayoutDashboard />
              Dashboard
          </Link>
          <Link href="/dashboard/applications" className='active flex p-2 gap-2'>
              <FiBriefcase />
              Applications
          </Link>
          <Link href="/dashboard/analytics" className='active flex p-2 gap-2'>
              <LuChartBar />
              Analytics
          </Link>
          <Link href="/dashboard/settings" className='active flex p-2 gap-2'>
              <FiSettings />
              Settings
          </Link>
            </div>
          <div className=''>
              <Link href="/signin" className='flex gap-2'>
                  <FiLogOut />
                  Log Out
              </Link>
          </div>
    </div>
  )
}

export default Sidebar