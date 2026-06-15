"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { FiMenu, FiX } from "react-icons/fi";

interface MobileSidebarProps {
  user?: {
    name: string;
    email: string;
    avatarPublicId?: string | null;
  } | null;
}

export const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-xl font-bold text-gray-900 tracking-tight">
        AppTrackr<span className="text-blue-600">.</span>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          aria-label="Close menu"
        >
          <FiX size={20} />
        </button>
        <Sidebar user={user} onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
};
