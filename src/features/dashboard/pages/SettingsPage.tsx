"use client";

import React, { useState, useEffect } from "react";
import { FcInvite } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { CheckCircle2, XCircle } from "lucide-react";

type SettingsUser = {
  name: string;
  email: string;
  avatarPublicId?: string | null;
};

type FeedbackModal = {
  type: "success" | "error";
  title: string;
  message: string;
} | null;

interface SettingsPageProps {
  initialUser: SettingsUser;
}

export const SettingsPage = ({ initialUser }: SettingsPageProps) => {
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const currentUser = user ?? initialUser;
  const [syncing, setSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || "");
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal>(null);

  useEffect(() => {
    async function loadSettings() {
      const res = await fetch("/api/settings/gmail");
      if (!res.ok) return;
      const data = await res.json();
      setIsConnected(data.isConnected);
      setSyncEnabled(data.syncEnabled);
      setNameInput(data.name || "");
    }
    loadSettings();
  }, []);

  useEffect(() => {
    setNameInput(currentUser?.name || "");
  }, [currentUser?.name]);

  const saveName = async () => {
    const res = await fetch("/api/settings/gmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameInput.trim() }),
    });

    if (!res.ok) {
      setFeedbackModal({
        type: "error",
        title: "Name not updated",
        message: "Could not update your name. Please try again.",
      });
      return;
    }

    await refreshUser();
    router.refresh();
    setFeedbackModal({
      type: "success",
      title: "Name updated",
      message: "Your profile name has been updated successfully.",
    });
  };

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setFeedbackModal({
          type: "error",
          title: "Photo not uploaded",
          message: "Could not upload your profile photo. Please try another image.",
        });
        return;
      }

      await refreshUser();
      router.refresh();
      setFeedbackModal({
        type: "success",
        title: "Photo updated",
        message: "Your profile photo has been updated successfully.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Settings
        </h1>
        <p className="mt-2 text-gray-500 font-medium">
          Manage your account preferences and integrations
        </p>
      </div>

      {/* PERSONAL INFO */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 md:p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Personal Information
          </h2>

          {/* Avatar Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-md shrink-0 animate-in zoom-in-50 duration-500">
                {currentUser?.avatarPublicId ? (
                  <CldImage
                    src={currentUser.avatarPublicId}
                    alt="Profile avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <FaUserCircle size={60} />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Profile Photo
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  Click to upload a new profile picture
                </p>
              </div>
            </div>

            <label
              className="cursor-pointer bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 
              hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98] w-full sm:w-auto text-center"
            >
              {uploading ? "Uploading..." : "Update Photo"}
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
          <div className="space-y-2 max-w-lg">
            <label
              htmlFor="name"
              className="text-sm font-bold text-gray-600 uppercase tracking-wider ml-1"
            >
              Full Name
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5 text-gray-900 
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
              />
              <button
                onClick={saveName}
                className="rounded-xl bg-blue-600 text-white px-6 py-3.5 font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 md:p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Integrations
          </h2>

          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="rounded-2xl size-16 bg-blue-100 flex items-center justify-center shadow-sm">
                  <FcInvite size={36} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Email Connectivity
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span
                      className={`text-sm font-bold ${isConnected ? "text-green-600" : "text-red-500"}`}
                    >
                      {isConnected ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className={`rounded-xl px-6 py-3.5 font-bold transition-all shadow-md active:scale-[0.98] w-full sm:w-auto
                  ${isConnected ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"}`}
                onClick={() => {
                  window.location.href = "/api/gmail/auth";
                }}
              >
                {isConnected ? "Reconnect Account" : "Connect Gmail"}
              </button>
            </div>

            {/* Controls */}
            {isConnected && (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-200/60">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={syncEnabled}
                      onChange={async (e) => {
                        const enabled = e.target.checked;
                        setSyncEnabled(enabled);
                        const res = await fetch("/api/settings/gmail", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ syncEnabled: enabled }),
                        });
                        if (!res.ok) setSyncEnabled(!enabled);
                      }}
                    />
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                      after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white 
                      after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                      after:transition-all peer-checked:bg-blue-600 shadow-inner"
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                    Background Sync
                  </span>
                </label>

                <div className="h-6 w-px bg-gray-200 hidden sm:block mx-2" />

                <button
                  className={`flex-1 sm:flex-none rounded-xl px-8 py-3.5 font-bold transition-all w-full sm:w-auto
                    ${syncing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20 active:scale-[0.98]"}`}
                  disabled={syncing || !syncEnabled}
                  onClick={async () => {
                    setSyncing(true);
                    try {
                      const res = await fetch("/api/gmail/sync", { method: "POST" });
                      if (!res.ok) {
                        setFeedbackModal({
                          type: "error",
                          title: "Sync not started",
                          message: "Could not start Gmail sync. Please try again.",
                        });
                        return;
                      }
                      setFeedbackModal({
                        type: "success",
                        title: "Sync started",
                        message: "Gmail sync has started successfully.",
                      });
                    } catch (err) {
                      console.error(err);
                      setFeedbackModal({
                        type: "error",
                        title: "Sync not started",
                        message: "Something went wrong while starting Gmail sync.",
                      });
                    } finally {
                      setSyncing(false);
                    }
                  }}
                >
                  {syncing ? "Syncing Logic..." : "Sync Gmail Now"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Notification Preferences
          </h2>

          <div className="space-y-2 max-w-sm">
            <label
              htmlFor="reminder"
              className="text-sm font-bold text-gray-600 uppercase tracking-wider ml-1"
            >
              Interview Reminders
            </label>
            <select
              id="reminder"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-700 
                focus:bg-white focus:border-blue-500 outline-none transition-all cursor-pointer"
            >
              <option value="24">24 hours before</option>
              <option value="12">12 hours before</option>
              <option value="8">8 hours before</option>
              <option value="4">4 hours before</option>
              <option value="1">1 hour before</option>
              <option value="5">5 minutes before</option>
            </select>
          </div>
        </div>
      </section>

      <div className="pt-6 flex justify-center">
        <button className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-[0.98]">
          Save Dashboard Settings
        </button>
      </div>

      {feedbackModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-feedback-title"
          onClick={() => setFeedbackModal(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                feedbackModal.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {feedbackModal.type === "success" ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <XCircle className="h-8 w-8" />
              )}
            </div>

            <div className="mt-5 text-center">
              <h3
                id="settings-feedback-title"
                className="text-2xl font-extrabold text-gray-900"
              >
                {feedbackModal.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-6 text-gray-500">
                {feedbackModal.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFeedbackModal(null)}
              className={`mt-7 w-full rounded-2xl px-5 py-3.5 font-bold text-white transition-all active:scale-[0.98] ${
                feedbackModal.type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
