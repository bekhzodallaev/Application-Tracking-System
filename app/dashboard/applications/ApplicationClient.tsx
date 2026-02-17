'use client';

import React, { useState } from 'react';
import Card from '@/app/components/Card';
import ApplicationCard from '@/app/components/applications/ApplicationCard';
import { FiUsers, FiCheckCircle, FiCalendar, FiSearch } from 'react-icons/fi';
import { Status } from '@/app/components/applications/ApplicationCard';

type JobApplication = {
  id: string;
  title: string;
  company: string;
  date: string;
  status: Status;
};

export default function ApplicationsClient({
  stats,
  jobApplications,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
  jobApplications: JobApplication[];
}) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredApplications =
    selectedStatus === 'all'
      ? jobApplications
      : jobApplications.filter(app => app.status === selectedStatus);

  return (
    <div className="flex flex-col gap-4">
      
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Applications
      </h1>

      <p className="text-sm sm:text-base text-gray-600">
        Manage and track your job search progress
      </p>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
        <Card title="Total Applications" numOfApplications={stats.total}>
          <FiUsers className="text-blue-600" />
        </Card>

        <Card title="Active Applications" numOfApplications={stats.total}>
          <FiCheckCircle className="text-green-600" />
        </Card>

        <Card title="Interview Scheduled" numOfApplications={stats.interviews}>
          <FiCalendar className="text-purple-600" />
        </Card>
      </section>

      {/* Filters */}
      <section className="flex flex-col md:flex-row gap-3 mt-2">
        
        {/* Search */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search by company or role..."
            className="pl-10 p-2 rounded w-full shadow outline-none bg-white"
          />
        </div>

        {/* Select */}
        <select
          className="rounded shadow p-2 w-full md:w-56 bg-white"
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
      <section className="mt-2 flex flex-col gap-3">
        {filteredApplications.slice(0, visibleCount).map(app => (
          <ApplicationCard key={app.id} {...app} />
        ))}
      </section>

      {/* Load More */}
      {visibleCount < filteredApplications.length && (
        <button
          onClick={() => setVisibleCount(v => v + 4)}
          className="p-2 px-4 text-white bg-blue-600 rounded-md w-full sm:w-max mx-auto hover:bg-blue-700 transition"
        >
          Load More Applications
        </button>
      )}
    </div>
  );
}
