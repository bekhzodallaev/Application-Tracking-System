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
    <div className="flex flex-col gap-3">
      <h1 className="text-4xl font-bold">Applications</h1>
      <p className="mt-4 mb-2 text-lg">Manage and track your job search progress</p>

      <section className="flex flex-wrap gap-3 justify-between mt-4 mb-4">
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

      <section className="flex justify-between">
        <div className="relative w-3/4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search by company or role..."
            className="pl-10 p-2 rounded w-full shadow outline-none"
          />
        </div>

        <select
          className="rounded shadow p-2"
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="interview">Interviewing</option>
          <option value="applied">Applied</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </section>

      <section className="mt-3">
        {filteredApplications.slice(0, visibleCount).map(app => (
          <ApplicationCard key={app.id} {...app} />
        ))}
      </section>

      {visibleCount < filteredApplications.length && (
        <button
          onClick={() => setVisibleCount(v => v + 4)}
          className="p-2 text-white bg-blue-600 rounded w-max mx-auto"
        >
          Load More Applications
        </button>
      )}
    </div>
  );
}
