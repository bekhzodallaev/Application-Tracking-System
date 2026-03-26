"use client";

import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { FiUsers, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { StatusCard } from "../components/StatusCard";
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
} from "recharts";

/* ---------- COLORS ---------- */
const FUNNEL_COLORS = ["#EFF6FF", "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA"];
const ROLE_COLORS = ["#F87171", "#60A5FA", "#4ADE80", "#FB923C"];

interface AnalyticsPageProps {
  stats: any;
  funnelData: any[];
  jobRole: any[];
  avgTimeData: any[];
}

export const AnalyticsPage = ({
  stats,
  funnelData,
  jobRole,
  avgTimeData,
}: AnalyticsPageProps) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Analytics
          </h1>
          <p className="mt-2 text-gray-500 font-medium">
            Insight and performance metrics for your application pipeline
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl text-white bg-blue-600 hover:bg-blue-700 
          px-6 py-3.5 font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
          <HiOutlineDownload className="text-xl" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard title="Total Applications" value={stats.total} icon={FiUsers} />
        <StatusCard title="Interview Rate" value={stats.interviews} icon={FiMessageSquare} />
        <StatusCard title="Offer Acceptance" value={stats.offers} icon={FiCheckCircle} />
        <StatusCard title="Rejections" value={stats.rejections} icon={MdClose} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funnel */}
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Application Funnel</h2>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="stage"
                  width={100}
                  tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="percent" radius={[0, 8, 8, 0]} barSize={32}>
                  {funnelData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={FUNNEL_COLORS[i % FUNNEL_COLORS.length]}
                      stroke={FUNNEL_COLORS[i % FUNNEL_COLORS.length].replace("F", "E")}
                      strokeWidth={1}
                    />
                  ))}
                  <LabelList
                    content={({ x, y, width, index }) => {
                      const item = funnelData[index!];
                      return (
                        <text
                          x={Number(x) + Number(width) + 12}
                          y={Number(y) + 20}
                          fill="#1e293b"
                          fontSize={12}
                          fontWeight={700}
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
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Highest Demand Roles</h2>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobRole} layout="vertical">
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="role"
                  width={120}
                  tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="percent" radius={[0, 8, 8, 0]} barSize={32}>
                  {jobRole.map((_, i) => (
                    <Cell key={i} fill={ROLE_COLORS[i % ROLE_COLORS.length]} />
                  ))}
                  <LabelList
                    content={({ x, y, width, index }) => {
                      const item = jobRole[index!];
                      return (
                        <text
                          x={Number(x) + Number(width) + 12}
                          y={Number(y) + 20}
                          fill="#1e293b"
                          fontSize={12}
                          fontWeight={700}
                        >
                          {item.percent}%
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
      <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Average Days per Stage</h2>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={avgTimeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="stage" 
                tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="days" fill="#3B82F6" radius={[8, 8, 0, 0]} barSize={48}>
                <LabelList
                  dataKey="days"
                  position="top"
                  formatter={(v) => `${v}d`}
                  style={{ fontWeight: 800, fontSize: 12, fill: "#1e293b" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
