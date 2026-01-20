/** @format */

import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { TodayJob, JobHistory } from "@/types/TechnicianJobsTypes";
import { todaysJobsData, jobHistoryData } from "@/data/TechnicianJobsData";

const TechnicianDetailsTableSection = () => {
  const todaysJobsColumns = [
    {
      header: "Job ID",
      accessor: (row: TodayJob) => row.jobId,
      className: "font-medium",
    },
    {
      header: "Client",
      accessor: (row: TodayJob) => row.client,
    },
    {
      header: "Contact Number",
      accessor: (row: TodayJob) => row.contactNumber,
    },
    {
      header: "Type",
      accessor: (row: TodayJob) => row.type,
    },
    {
      header: "Order by Date",
      accessor: (row: TodayJob) => row.orderByDate,
    },
    {
      header: "Status",
      accessor: (row: TodayJob) => row.status,
    },
  ];

  const jobHistoryColumns = [
    {
      header: "Job ID",
      accessor: (row: JobHistory) => row.jobId,
      className: "font-medium",
    },
    {
      header: "Client",
      accessor: (row: JobHistory) => row.client,
    },
    {
      header: "Contact Number",
      accessor: (row: JobHistory) => row.contactNumber,
    },
    {
      header: "Type",
      accessor: (row: JobHistory) => row.type,
    },
    {
      header: "Order by Date",
      accessor: (row: JobHistory) => row.orderByDate,
    },
    {
      header: "Complete Date",
      accessor: (row: JobHistory) => row.completeDate,
    },
  ];

  const handleAction = (row: TodayJob | JobHistory) => {
    console.log("View job details:", row);
    // Add your navigation or modal logic here
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Today's Jobs Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Today&apos;s Jobs
        </h2>
        <CustomTable
          data={todaysJobsData}
          columns={todaysJobsColumns}
          onAction={handleAction}
          itemsPerPage={5}
        />
      </div>

      {/* Full Job History Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Full Job History
        </h2>
        <CustomTable
          data={jobHistoryData}
          columns={jobHistoryColumns}
          onAction={handleAction}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default TechnicianDetailsTableSection;
