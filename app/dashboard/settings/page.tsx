'use client';

import React, { useState } from 'react'
import { FcInvite } from "react-icons/fc";
import { FaUserCircle } from 'react-icons/fa';



const page = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
      <div className='flex flex-col gap-5 mb-4'>
      <h1 className='text-4xl mb-4'>Settings</h1>
      <section className='rounded shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] p-5 flex flex-col gap-4'>
        <h2 className='text-2xl'>Personal Information</h2><hr className='mb-5 mt-2'/>
        <div className='flex justify-between'>
          <div>
            <div className='flex gap-3'>
              <div className='rounded-[50%] size-16 flex items-center'>
                <FaUserCircle color="blue" size={50} />
              </div>
              <div>
                 <h1 className='text-2xl'>Profile Photo</h1>
              <p className='text-gray-500'>Update your profile photo</p>
               </div>
            </div>
            <div></div>
          </div>
       <label className="flex items-center gap-2 p-2 rounded cursor-pointer bg-gray-100 hover:bg-gray-200 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]">
  Upload new photo
  <input
    type="file"
    className="hidden"
    id="myFile"
    name="myFile"
  />
</label>
        </div>
        <div className='flex justify-between mt-5'>
          <div className='flex flex-col'>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" defaultValue="Bekhzod Allaev" className='rounded p-2 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]' />
          </div>
          <div className='flex flex-col'> 
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" defaultValue="bekhzodallayev@gmail.com" className='rounded shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] p-2' />
          </div>
        </div>
        <button type='button' className='rounded bg-gray-200 w-3xs p-2 hover:not-focus:bg-gray-400'>Save changes</button>
      </section>
      <h2 className='text-2xl'>Integrations</h2>
      <section className='rounded shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] flex justify-between p-4 items-center bg-white'>
        <div className='rounded border flex gap-3 p-3'>
          <div className='rounded size-16 bg-blue-200 flex justify-center items-center'>
             <FcInvite className='size-10' />
          </div>
          <div>
            <h3>Email Integration</h3>
            <p>Connect your email to sync candidate communications</p>
          </div>
        </div>
        {checked ? (<p className='text-green-500'>Connected</p>) : 
          <p className='text-red-500'>Not Connected</p>
        }
       
        <div>
        <input type="checkbox" name='enable' id='enable' className='mr-2' checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
        <label htmlFor="enable">Enable</label>
        </div>
      </section>
        <h2 className='text-2xl'>Notifications</h2>
      <section className='bg-white shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded flex flex-col p-4 gap-3'> 
        <h2 className='text-xl'>Reminders</h2>
        <p className='text-gray-500'>Receive reminders for uppcoming interviews</p>
        <div className='flex flex-col'>
          <label htmlFor="reminder" className='mt-4'>Remind me before</label>
          <select name="reminder" id="reminder" className=' shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] p-2'>
            <option value="24">24 hours before</option>
            <option value="12">12 hours before</option>
            <option value="8">8 hours before</option>
            <option value="4">4 hours before</option>
            <option value="1">1 hour before</option>
            <option value="5">5 minutes before</option>
          </select>
        </div>
      </section>
     <button className='text-white bg-blue-500 rounded w-xs p-2 mx-auto cursor-pointer hover:bg-blue-700'>Save all changes</button>
    </div>
  )
}

export default page