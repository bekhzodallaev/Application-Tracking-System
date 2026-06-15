"use client";

import React from "react";

interface StatusCardProps {
  title: string;
  value: number;
  icon?: React.ElementType;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
}

export const StatusCard = ({ title, value, icon: Icon, description }: StatusCardProps) => (
  <div className="bg-white p-6 shadow-sm rounded-2xl border border-gray-100
                  hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-colors`}>
        {Icon && <Icon className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />}
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</span>
      </div>
      {description && <p className="text-xs text-gray-400 font-medium">{description}</p>}
    </div>
  </div>
);
