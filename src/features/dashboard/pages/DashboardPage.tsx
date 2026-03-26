import React from "react";
import { Pipeline } from "../components/Pipeline";
import { StatusCard } from "../components/StatusCard";
import { FiBriefcase, FiCalendar, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { DashboardStats, Application } from "../types";

interface DashboardPageProps {
  user: {
    name: string;
  };
  stats: DashboardStats;
  applications: Application[];
}

export const DashboardPage = ({ user, stats, applications }: DashboardPageProps) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Welcome back, <span className="text-blue-600">{user.name}</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 font-medium">
          Here's what's happening with your job applications today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          title="Total Applications" 
          value={stats.total} 
          icon={FiBriefcase}
          description="Total tracked applications"
        />
        <StatusCard 
          title="Interviews" 
          value={stats.interviews} 
          icon={FiCalendar}
          description="Upcoming or completed"
        />
        <StatusCard 
          title="Offers" 
          value={stats.offers} 
          icon={FiCheckCircle}
          description="Congratulations!"
        />
        <StatusCard 
          title="Rejections" 
          value={stats.rejections} 
          icon={FiXCircle}
          description="Keep pushing forward"
        />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Application Pipeline
          </h2>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {stats.total} Active Applications
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <Pipeline applications={applications} />
        </div>
      </div>
    </div>
  );
};
