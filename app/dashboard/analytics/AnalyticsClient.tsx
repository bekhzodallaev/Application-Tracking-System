'use client';

import React from 'react';
import { HiOutlineDownload } from 'react-icons/hi';
import Card from '@/app/components/Card';
import { FiUsers, FiMessageSquare, FiCheckCircle, FiClock } from 'react-icons/fi';
import { MdClose } from "react-icons/md";

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

/* ---------- COLOR PALETTES ---------- */
const FUNNEL_COLORS = ['#E5EDFF', '#C7D7FE', '#93B4FD', '#5B8DF8', '#2F6AF5'];
const ROLE_COLORS = ['#EF4444', '#3B82F6', '#22C55E', '#F97316'];

export default function AnalyticsClient({
  stats,
  funnelData,
  jobRole,
  avgTimeData,
}: {
  stats: any;
  funnelData: any[];
  jobRole: any[];
  avgTimeData: any[];
}) {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl">Application Analytics</h1>
          <p className="text-lg mt-4 mb-4">
            Insight and performance metrics for your application pipeline
          </p>
        </div>
        <button className="flex gap-2 rounded text-white bg-blue-400 items-center p-3">
          <HiOutlineDownload />
          Export Report
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap gap-4 justify-between">
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
      <div className="flex gap-4 mt-6 flex-col">
        {/* Funnel */}
        <div className=" p-4 shadow rounded">
          <h1>Application Funnel</h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={funnelData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="stage" width={100}/>
              <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
                {funnelData.map((_, i) => (
                  <Cell key={i} fill={FUNNEL_COLORS[i % FUNNEL_COLORS.length]} />
                ))}
                <LabelList
                  content={({ x, y, width, index }) => {
                    const item = funnelData[index!];
                    return (
                      <text
                        x={Number(x) + Number(width) + 8}
                        y={Number(y) + 12}
                        fill="#475569"
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

        {/* Roles */}
        <div className=" p-4 shadow rounded">
          <h1>Application By Role</h1>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobRole} layout="vertical" margin={{left:30}}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="role"  width={180}/>
              <Bar dataKey="percent" radius={[6, 6, 6, 6]}>
                {jobRole.map((_, i) => (
                  <Cell key={i} fill={ROLE_COLORS[i % ROLE_COLORS.length]} />
                ))}
                <LabelList
                  content={({ x, y, width, index }) => {
                    const item = jobRole[index!];
                    return (
                      <text
                        x={Number(x) + Number(width) + 8}
                        y={Number(y) + 12}
                        fill="#475569"
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

      {/* Avg Time */}
      <div className="p-4 rounded mt-4 shadow">
        <h1>Average Time in Stage (Days)</h1>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={avgTimeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
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
