'use client';

import React from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import Card from '@/app/components/Card';
import { FiUsers, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
  Tooltip,
  CartesianGrid,
} from 'recharts';

/* ---------- COLORS ---------- */
const FUNNEL_COLORS = ['#E5EDFF', '#C7D7FE', '#93B4FD', '#5B8DF8', '#2F6AF5'];
const ROLE_COLORS = ['#EF4444', '#3B82F6', '#22C55E', '#F97316'];

export default function AnalyticsClient({
  stats,
  funnelData,
  jobRole,
  avgTimeData,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  funnelData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jobRole: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avgTimeData: any[];
}) {
  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Application Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Insight and performance metrics for your application pipeline
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 w-full sm:w-auto justify-center transition">
          <HiOutlineDownload />
          Export Report
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card title="Total Applications" numOfApplications={stats.total} bgColor="bg-blue-200">
          <FiUsers className="text-blue-600" />
        </Card>

        <Card title="Interview Rate" numOfApplications={stats.interviews} bgColor="bg-purple-200">
          <FiMessageSquare className="text-purple-600" />
        </Card>

        <Card title="Offer Acceptance" numOfApplications={stats.offers} bgColor="bg-green-200">
          <FiCheckCircle className="text-green-600" />
        </Card>

        <Card title="Rejections" numOfApplications={stats.rejections} bgColor="bg-red-200">
          <MdClose className="text-red-600" />
        </Card>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-4">

        {/* Funnel */}
        <div className="p-4 shadow rounded bg-white">
          <h2 className="font-semibold mb-3">Application Funnel</h2>

          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funnelData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={90}
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
                  {funnelData.map((_, i) => (
                    <Cell key={i} fill={FUNNEL_COLORS[i % FUNNEL_COLORS.length]} />
                  ))}
                  <LabelList
                    content={({ x, y, width, index }) => {
                      const item = funnelData[index!];
                      return (
                        <text
                          x={Number(x) + Number(width) + 6}
                          y={Number(y) + 12}
                          fill="#475569"
                          fontSize={12}
                        >
                          {item.value} ({item.percent}%)
                        </text>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Roles */}
        <div className="p-4 shadow rounded bg-white">
          <h2 className="font-semibold mb-3">Applications by Role</h2>

          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={jobRole} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="role"
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
                  {jobRole.map((_, i) => (
                    <Cell key={i} fill={ROLE_COLORS[i % ROLE_COLORS.length]} />
                  ))}
                  <LabelList
                    content={({ x, y, width, index }) => {
                      const item = jobRole[index!];
                      return (
                        <text
                          x={Number(x) + Number(width) + 6}
                          y={Number(y) + 12}
                          fill="#475569"
                          fontSize={12}
                        >
                          ({item.percent}%)
                        </text>
                      );
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Avg Time */}
      <div className="p-4 rounded shadow bg-white">
        <h2 className="font-semibold mb-3">Average Time in Stage (Days)</h2>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={avgTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="days" fill="#3B82F6" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="days" position="top" formatter={(v) => `${v}d`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
