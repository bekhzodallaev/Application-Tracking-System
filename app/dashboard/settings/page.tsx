'use client';

import React, { useState, useEffect } from 'react'
import { FcInvite } from "react-icons/fc";
import { FaUserCircle } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';




const page = () => {
   const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [avatarPublicId, setAvatarPublicId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");

   useEffect(() => {
    async function loadSettings() {
      const res = await fetch('/api/settings/gmail');
      if (!res.ok) return;

      const data = await res.json();
      setIsConnected(data.isConnected);
      setSyncEnabled(data.syncEnabled);
      setName(data.name);
      if (data.avatar?.publicId) {
        setAvatarPublicId(data.avatar.publicId);
      }
    }

    loadSettings();
  }, []);

  return (
      <div className='flex flex-col gap-5 mb-4'>
      <h1 className='text-4xl mb-4'>Settings</h1>
      <section className='rounded shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] p-5 flex flex-col gap-4'>
        <h2 className='text-2xl'>Personal Information</h2><hr className='mb-5 mt-2'/>
        <div className='flex justify-between'>
          <div>
            <div className='flex gap-3'>
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
                 <h1 className='text-2xl'>Profile Photo</h1>
              <p className='text-gray-500'>Update your profile photo</p>
               </div>
            </div>
            <div></div>
          </div>
        <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded shadow">
            {uploading ? 'Uploading...' : 'Upload new photo'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setUploading(true);

                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/avatar', {
                  method: 'POST',
                  body: formData,
                });

                const data = await res.json();

                // ✅ save ONLY publicId
                setAvatarPublicId(data.publicId);
                setUploading(false);
              }}
            />
          </label>

        </div>
        <div className='flex justify-between mt-5'>
          <div className='flex flex-col'>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              className='rounded p-2 shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)]'
            />
          </div>
        </div>
        <button
  type="button"
  className="rounded bg-gray-200 w-3xs p-2 hover:not-focus:bg-gray-400"
  onClick={async () => {
    const res = await fetch('/api/settings/gmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) alert('Name updated successfully');
  }}
>
  Save changes
</button>

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
       {isConnected
  ? <p className="text-green-500">Connected</p>
  : <p className="text-red-500">Not Connected</p>
}

       
        <div>
          <input
  type="checkbox"
  checked={syncEnabled}
  disabled={!isConnected}
  onChange={async (e) => {
    const enabled = e.target.checked;

    setSyncEnabled(enabled); // immediately update UI

    await fetch('/api/settings/gmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ syncEnabled: enabled }),
    });
  }}
/>
        <label htmlFor="enable">Enable</label>
        </div>
        <button
          className='bg-blue-600 cursor-pointer text-white rounded p-2'
      onClick={() => {
       window.location.href = '/api/gmail/auth';
        }}
     >
  Connect Gmail
        </button>
        {isConnected && syncEnabled && (
  <button
    className="bg-green-600 text-white rounded p-2"
    onClick={async () => {
      await fetch('/api/gmail/sync', { method: 'POST' });
      alert('Sync started');
    }}
  >
    Sync Gmail Now
  </button>
)}


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