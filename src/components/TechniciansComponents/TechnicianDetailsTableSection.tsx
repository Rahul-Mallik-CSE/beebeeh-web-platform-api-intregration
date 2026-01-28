/** @format */
"use client";
import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { JobItem, TablePagination } from "@/redux/features/adminFeatures/technicianAPI";
import { useRouter } from "next/navigation";

interface TechnicianDetailsTableSectionProps {
  todaysJobs: [JobItem[], TablePagination];
  fullJobHistory: [JobItem[], TablePagination];
}

const TechnicianDetailsTableSection: React.FC<TechnicianDetailsTableSectionProps> = ({
  todaysJobs,
  fullJobHistory,
}) => {
  const router = useRouter();
  const [todaysJobsList, todaysMeta] = todaysJobs;
  const [historyJobsList, historyMeta] = fullJobHistory;

  const handleAction = (job: JobItem) => {
    // Navigate to job details based on job type
    let jobType = job.type.toLowerCase();
    
    // Map job types to their respective route paths
    if (jobType === "repairing" || jobType === "repair") {
      jobType = "repairs";
    }

    router.push(`/${jobType}/${job.job_id}`);
  };

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
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "complete":
            case "completed":
              return "bg-green-100 text-green-700";
            case "in_progress":
            case "in progress":
              return "bg-blue-100 text-blue-700";
            case "assign":
            case "pending":
              return "bg-yellow-100 text-yellow-700";
            case "cancel":
            case "cancelled":
              return "bg-red-100 text-red-700";
            case "rescheduled":
              return "bg-orange-100 text-orange-700";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };
        return (
          <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getStatusColor(row.status)}`}>
            {row.status.replace("_", " ")}
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
          onAction={handleAction}
          itemsPerPage={5}
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
          onAction={handleAction}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default TechnicianDetailsTableSection;
