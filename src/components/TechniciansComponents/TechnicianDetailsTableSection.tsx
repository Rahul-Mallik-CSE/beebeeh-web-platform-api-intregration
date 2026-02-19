/** @format */
"use client";
import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { getJobStatusBadgeColor, getJobStatusLabel } from "@/lib/statusUtils";
import {
  JobItem,
  TablePagination,
} from "@/redux/features/adminFeatures/technicianAPI";

interface TechnicianDetailsTableSectionProps {
  todaysJobs: [JobItem[], TablePagination];
  fullJobHistory: [JobItem[], TablePagination];
}

const TechnicianDetailsTableSection: React.FC<
  TechnicianDetailsTableSectionProps
> = ({ todaysJobs, fullJobHistory }) => {
  const [todaysJobsList, todaysMeta] = todaysJobs;
  const [historyJobsList, historyMeta] = fullJobHistory;

  const columns = [
    {
      header: "Job ID",
      accessor: "job_id" as keyof JobItem,
      className: "font-medium",
    },
    {
      header: "Client",
      accessor: "client_name" as keyof JobItem,
    },
    {
      header: "Contact Number",
      accessor: "contact_number" as keyof JobItem,
    },
    {
      header: "Type",
      accessor: (row: JobItem) => (
        <span className="capitalize">{row.type}</span>
      ),
    },
    {
      header: "Scheduled Date",
      accessor: "scheduled_date" as keyof JobItem,
    },
    {
      header: "Status",
      accessor: (row: JobItem) => {
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getJobStatusBadgeColor(row.status)}`}
          >
            {getJobStatusLabel(row.status)}
          </span>
        );
      },
    },
  ];

  const historyColumns = [
    ...columns.slice(0, 5),
    {
      header: "Complete Date",
      accessor: (row: JobItem) => row.completed_at || "N/A",
    },
    columns[5], // Status
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Today's Jobs Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Today&apos;s Jobs ({todaysMeta.total_items})
        </h2>
        <CustomTable
          data={todaysJobsList}
          columns={columns}
          itemsPerPage={5}
          showFilter={false}
          showActions={false}
        />
      </div>

      {/* Full Job History Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Full Job History ({historyMeta.total_items})
        </h2>
        <CustomTable
          data={historyJobsList}
          columns={historyColumns}
          itemsPerPage={10}
          showFilter={false}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default TechnicianDetailsTableSection;
