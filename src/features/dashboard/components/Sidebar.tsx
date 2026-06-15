"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuLayoutDashboard, LuChartBar } from "react-icons/lu";
import { FiBriefcase, FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { LogOutIcon } from "lucide-react";

interface SidebarProps {
  user?: {
    name: string;
    email: string;
    avatarPublicId?: string | null;
  } | null;
  onClose?: () => void;
}

export const Sidebar = ({ user, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center p-3 gap-3 rounded-xl transition-all duration-200 group ${
      pathname === href
        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/signin");
    router.refresh(); // Refresh to update auth state across the app
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    {
      href: "/dashboard/applications",
      label: "Applications",
      icon: FiBriefcase,
    },
    { href: "/dashboard/analytics", label: "Analytics", icon: LuChartBar },
    { href: "/dashboard/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex flex-col p-6 gap-2">
        {/* Brand */}
        <div className="mb-8 px-2">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            AppTrackr<span className="text-blue-600">.</span>
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4 mb-10 p-2 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-sm shrink-0">
            {user?.avatarPublicId ? (
              <CldImage
                src={user.avatarPublicId}
                alt="Profile avatar"
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600">
                <FaUserCircle size={32} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-gray-900 truncate leading-tight">
              {user?.name || "User"}
            </h2>
            <p className="text-xs font-medium text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
              onClick={onClose}
            >
              <link.icon
                className={`h-5 w-5 ${pathname === link.href ? "text-white" : "text-gray-400 group-hover:text-gray-600"}`}
              />
              <span className="font-semibold text-sm">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-500 font-semibold text-sm 
            hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOutIcon
            size={20}
            className="text-gray-400 group-hover:text-red-500 transition-colors"
          />
          Log Out
        </button>
      </div>
    </div>
  );
};
