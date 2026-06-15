import React from "react";
import Column from "./Column";
import { Application } from "../types";

interface PipelineProps {
  applications: Application[];
}

export const Pipeline = ({ applications }: PipelineProps) => {
  // group by status for columns
  const pipelineData = applications.reduce(
    (acc, app) => {
      const status = app.status || "unknown";
      if (!acc[status]) acc[status] = [];
      acc[status].push(app);
      return acc;
    },
    {} as Record<string, Application[]>,
  );

  const statuses = [
    { key: "applied", title: "Applied" },
    { key: "interview", title: "Interview" },
    { key: "offer", title: "Offer" },
    { key: "rejected", title: "Rejected" },
    { key: "withdrawn", title: "Withdrawn" },
    { key: "unknown", title: "Unknown" },
  ];

  return (
    <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-6 min-w-max pr-10">
        {statuses.map((status) => (
          <Column 
            key={status.key} 
            title={status.title} 
            items={pipelineData[status.key] || []} 
          />
        ))}
      </div>
    </div>
  );
};
