"use client";

import React, { useState } from "react";
import { FiUsers, FiCheckCircle, FiCalendar, FiSearch } from "react-icons/fi";
import { StatusCard } from "../components/StatusCard";
import { Application, DashboardStats } from "../types";

// Note: In a real app, I'd move ApplicationCard to features/dashboard/components too.
// For now I'll import it from its original location or move it if needed.
// The user request was to refactor dashboard, so moving it is better.
import ApplicationCard from "../components/ApplicationCard";

interface ApplicationsPageProps {
  stats: DashboardStats;
  jobApplications: Application[];
}

export const ApplicationsPage = ({
  stats,
  jobApplications,
}: ApplicationsPageProps) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = jobApplications.filter((app) => {
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    const matchesSearch = 
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (app.company?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Applications
        </h1>
        <p className="mt-2 text-gray-500 font-medium">
          Manage and track your job search progress
        </p>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatusCard title="Total Applications" value={stats.total} icon={FiUsers} />
        <StatusCard title="Active Applications" value={stats.total} icon={FiCheckCircle} />
        <StatusCard title="Interviews Scheduled" value={stats.interviews} icon={FiCalendar} />
      </section>

      {/* Controls */}
      <section className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            placeholder="Search by company or role..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm 
              focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Select */}
        <select
          className="px-4 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm 
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all
            w-full md:w-64 font-semibold text-gray-700 cursor-pointer"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="interview">Interviewing</option>
          <option value="applied">Applied</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="unknown">Unknown</option>
        </select>
      </section>

      {/* Applications List */}
      <section className="grid grid-cols-1 gap-4">
        {filteredApplications.slice(0, visibleCount).map((app) => (
          <ApplicationCard key={app.id} id={app.id} title={app.title} company={app.company || ""} date={app.date} status={app.status} />
        ))}
        
        {filteredApplications.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No applications found matching your criteria</p>
          </div>
        )}
      </section>

      {/* Load More */}
      {visibleCount < filteredApplications.length && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount((v) => v + 6)}
            className="px-8 py-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl font-bold 
              text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all active:scale-[0.98]"
          >
            Load More Applications
          </button>
        </div>
      )}
    </div>
  );
};
