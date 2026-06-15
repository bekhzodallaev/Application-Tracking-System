import React from "react";
import { Application } from "../types";

interface ColumnProps {
  title: string;
  items: Application[];
}

const Column = ({ title, items }: ColumnProps) => {
  return (
    <div className="flex flex-col gap-4 w-72 shrink-0">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          {title}
          <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">
            {items.length}
          </span>
        </h3>
      </div>

      <div className="flex flex-col gap-3 min-h-[100px] p-2 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        {items.map((app) => (
          <div
            key={app.id}
            className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all cursor-pointer group"
          >
            <h4 className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {app.title}
            </h4>
            <p className="text-xs font-semibold text-gray-500 mt-1 truncate">
              {app.company || "Unknown Company"}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {app.date ? new Date(app.date).toLocaleDateString() : "No date"}
              </span>
              {app.confidence && (
                <div className="h-1 w-12 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${app.confidence * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-xs font-medium text-gray-400 italic">
              No applications here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
