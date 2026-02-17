'use client';

import React, { useState, useEffect } from 'react';
import { FcInvite } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';
import { useUser } from '@/app/context/UserContext';

const SettingsPage = () => {
  const { user, setUser } = useUser();

  const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');

  useEffect(() => {
    async function loadSettings() {
      const res = await fetch('/api/settings/gmail');
      if (!res.ok) return;

      const data = await res.json();

      setIsConnected(data.isConnected);
      setSyncEnabled(data.syncEnabled);

      if (!user) return;

      if (data.name && data.name !== user.name) {
        setUser({ ...user, name: data.name });
      }

      if (data.avatar?.publicId && data.avatar.publicId !== user.avatarPublicId) {
        setUser({ ...user, avatarPublicId: data.avatar.publicId });
      }

      setNameInput(data.name || '');
    }

    loadSettings();
    // eslint-disable-next-line
  }, []);

  const saveName = async () => {
    await fetch('/api/settings/gmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nameInput }),
    });

    if (!user) return;
    setUser({ ...user, name: nameInput });
    alert('Name updated successfully');
  };

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

    setUser({ ...user, avatarPublicId: data.publicId });
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Settings
      </h1>

      {/* PERSONAL INFO */}
      <section className="rounded shadow bg-white p-4 sm:p-5 flex flex-col gap-5">
        <h2 className="text-xl sm:text-2xl font-semibold">Personal Information</h2>
        <hr />

        {/* Avatar Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
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
              <h3 className="text-lg font-medium">Profile Photo</h3>
              <p className="text-gray-500 text-sm">Update your profile photo</p>
            </div>
          </div>

          <label className="cursor-pointer bg-gray-100 px-3 py-2 rounded shadow w-full sm:w-auto text-center">
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

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="rounded p-2 shadow w-full sm:max-w-md"
          />
        </div>

        <button
          onClick={saveName}
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 w-full sm:w-max"
        >
          Save changes
        </button>
      </section>

      {/* INTEGRATIONS */}
      <h2 className="text-xl sm:text-2xl font-semibold">Integrations</h2>

      <section className="rounded shadow bg-white p-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="rounded size-14 bg-blue-200 flex items-center justify-center">
              <FcInvite className="size-8" />
            </div>

            <div>
              <h3 className="font-medium">Email Integration</h3>
              <p className="text-sm text-gray-500">
                Connect your email to sync communications
              </p>
            </div>
          </div>

          {/* Status */}
          <p className={isConnected ? 'text-green-500' : 'text-red-500'}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center sm:flex-row gap-3 sm:items-center">
          <label className="flex items-center gap-2">
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
            Enable sync
          </label>

          <button
            className="bg-blue-600 text-white rounded p-2 w-full sm:w-auto"
            onClick={() => {
              window.location.href = '/api/gmail/auth';
            }}
          >
            Connect Gmail
          </button>

          {isConnected && syncEnabled && (
            <button
              className="bg-green-600 text-white rounded p-2 w-full sm:w-auto"
              onClick={async () => {
                await fetch('/api/gmail/sync', { method: 'POST' });
                alert('Sync started');
              }}
            >
              Sync Gmail Now
            </button>
          )}
        </div>
      </section>

      {/* Notifications */}
      <h2 className="text-xl sm:text-2xl font-semibold">Notifications</h2>

      <section className="bg-white shadow rounded p-4 flex flex-col gap-3">
        <h3 className="text-lg">Reminders</h3>
        <p className="text-gray-500 text-sm">
          Receive reminders for upcoming interviews
        </p>

        <div className="flex flex-col gap-2">
          <label htmlFor="reminder">Remind me before</label>
          <select id="reminder" className="shadow p-2 rounded w-full sm:max-w-xs">
            <option value="24">24 hours before</option>
            <option value="12">12 hours before</option>
            <option value="8">8 hours before</option>
            <option value="4">4 hours before</option>
            <option value="1">1 hour before</option>
            <option value="5">5 minutes before</option>
          </select>
        </div>
      </section>

      {/* Save all */}
      <button className="text-white bg-blue-500 rounded p-2 w-full sm:w-max mx-auto hover:bg-blue-700">
        Save all changes
      </button>
    </div>
  );
};

export default SettingsPage;
