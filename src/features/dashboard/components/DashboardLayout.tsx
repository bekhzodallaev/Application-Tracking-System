"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";
import { AuthSync } from "./AuthSync";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    avatarPublicId?: string | null;
  };
}

export const DashboardLayout = ({ children, user }: DashboardLayoutProps) => {
  const year = new Date().getFullYear();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 border-r border-gray-200 bg-white sticky top-0 h-screen shadow-sm">
        <Sidebar user={user} />
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <div className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-sm">
          <MobileSidebar user={user} />
        </div>

        <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
          <AuthSync />
          <div className="min-h-[calc(100vh-160px)]">{children}</div>

          <footer className="mt-16 border-t border-gray-100 pt-8 pb-4 text-center">
            <p className="text-sm text-gray-400 font-medium">
              © {year} AppTrackr.com • All rights reserved
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};
