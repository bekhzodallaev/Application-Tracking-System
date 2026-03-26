"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuLayoutDashboard, LuChartBar } from "react-icons/lu";
import { FiBriefcase, FiSettings } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import { useUser } from "@/context/UserContext";
import { LogOutIcon } from "lucide-react";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `flex items-center p-2 gap-2 rounded-md transition hover:bg-gray-100 ${
      pathname === href ? "bg-blue-100 text-blue-600" : "text-gray-600"
    }`;

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex flex-col p-4 gap-1 w-64 md:w-72">
        {/* User */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative size-14 rounded-full overflow-hidden">
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

          <div className="min-w-0">
            <h2 className="text-lg font-semibold truncate">{user?.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        {/* Links */}
        <Link
          href="/dashboard"
          className={linkClass("/dashboard")}
          onClick={onClose}
        >
          <LuLayoutDashboard />
          Dashboard
        </Link>

        <Link
          href="/dashboard/applications"
          className={linkClass("/dashboard/applications")}
          onClick={onClose}
        >
          <FiBriefcase />
          Applications
        </Link>

        <Link
          href="/dashboard/analytics"
          className={linkClass("/dashboard/analytics")}
          onClick={onClose}
        >
          <LuChartBar />
          Analytics
        </Link>

        <Link
          href="/dashboard/settings"
          className={linkClass("/dashboard/settings")}
          onClick={onClose}
        >
          <FiSettings />
          Settings
        </Link>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500"
        >
          <LogOutIcon size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
