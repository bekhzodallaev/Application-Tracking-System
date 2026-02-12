'use client';

import React, { useState, useEffect } from 'react';
import { FcInvite } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { useUser } from '@/app/types/context/UserContext';

const SettingsPage = () => {
  const { user, setUser, refreshUser } = useUser(); // get context
  const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');

  // Load additional settings from API (email connection, sync)
  useEffect(() => {
    async function loadSettings() {
      const res = await fetch('/api/settings/gmail');
      if (!res.ok) return;
      const data = await res.json();

      setIsConnected(data.isConnected);
      setSyncEnabled(data.syncEnabled);

      if (!user) return;

      if (data.name && data.name !== user?.name) {
        setUser({ ...user, name: data.name }); // update context if different
      }

      if (data.avatar?.publicId && data.avatar.publicId !== user?.avatarPublicId) {
        setUser({ ...user, avatarPublicId: data.avatar.publicId });
      }

      setNameInput(data.name || '');
    }

    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update name via API + Context
  const saveName = async () => {
    const res = await fetch('/api/settings/gmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameInput }),
    });

    if (!user) return;

    if (res.ok) {
      setUser({ ...user, name: nameInput }); // update context
      alert('Name updated successfully');
    }
  };

  // Upload avatar and update Context
  const uploadAvatar = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/avatar', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!user) return;
    setUser({ ...user, avatarPublicId: data.publicId }); // update context
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-5 mb-4">
      <h1 className="text-4xl mb-4">Settings</h1>

      {/* Personal Information */}
      <section className="rounded shadow p-5 flex flex-col gap-4">
        <h2 className="text-2xl">Personal Information</h2>
        <hr className="mb-5 mt-2" />
        <div className="flex justify-between">
          <div>
            <div className="flex gap-3">
              <div className="relative size-16 rounded-full overflow-hidden">
                {user?.avatarPublicId ? (
                  <CldImage
                    src={user.avatarPublicId}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <FaUserCircle color="blue" size={50} />
                )}
              </div>
              <div>
                <h1 className="text-2xl">Profile Photo</h1>
                <p className="text-gray-500">Update your profile photo</p>
              </div>
            </div>
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
                await uploadAvatar(file);
              }}
            />
          </label>
        </div>

        {/* Name input */}
        <div className="flex justify-between mt-5">
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="rounded p-2 shadow"
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded bg-gray-200 w-3xs p-2 hover:bg-gray-400"
          onClick={saveName}
        >
          Save changes
        </button>
      </section>

      {/* Integrations */}
      <h2 className="text-2xl">Integrations</h2>
      <section className="rounded shadow flex justify-between p-4 items-center bg-white">
        <div className="rounded border flex gap-3 p-3">
          <div className="rounded size-16 bg-blue-200 flex justify-center items-center">
            <FcInvite className="size-10" />
          </div>
          <div>
            <h3>Email Integration</h3>
            <p>Connect your email to sync candidate communications</p>
          </div>
        </div>
        {isConnected ? (
          <p className="text-green-500">Connected</p>
        ) : (
          <p className="text-red-500">Not Connected</p>
        )}

        <div>
          <input
            type="checkbox"
            checked={syncEnabled}
            disabled={!isConnected}
            onChange={async (e) => {
              const enabled = e.target.checked;
              setSyncEnabled(enabled);
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
          className="bg-blue-600 cursor-pointer text-white rounded p-2"
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

      {/* Notifications */}
      <h2 className="text-2xl">Notifications</h2>
      <section className="bg-white shadow rounded flex flex-col p-4 gap-3">
        <h2 className="text-xl">Reminders</h2>
        <p className="text-gray-500">Receive reminders for upcoming interviews</p>
        <div className="flex flex-col">
          <label htmlFor="reminder" className="mt-4">
            Remind me before
          </label>
          <select
            name="reminder"
            id="reminder"
            className="shadow p-2 rounded"
          >
            <option value="24">24 hours before</option>
            <option value="12">12 hours before</option>
            <option value="8">8 hours before</option>
            <option value="4">4 hours before</option>
            <option value="1">1 hour before</option>
            <option value="5">5 minutes before</option>
          </select>
        </div>
      </section>

      <button className="text-white bg-blue-500 rounded w-xs p-2 mx-auto cursor-pointer hover:bg-blue-700">
        Save all changes
      </button>
    </div>
  );
};

export default SettingsPage;
