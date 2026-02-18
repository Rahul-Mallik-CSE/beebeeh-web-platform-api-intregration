/** @format */

import React, { useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import {
  JobHistoryItem,
  AnotherJobHistoryItem,
} from "@/redux/features/adminFeatures/clientsAPI";

interface ClientDetailsTableSectionProps {
  clientId: string;
  jobHistory: JobHistoryItem[];
  anotherJobHistory: AnotherJobHistoryItem[];
  jobHistoryMeta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

const ClientDetailsTableSection: React.FC<ClientDetailsTableSectionProps> = ({
  clientId,
  jobHistory,
  anotherJobHistory,
  jobHistoryMeta,
}) => {
  // Filter data based on service status (if needed in future)
  const filteredData = useMemo(() => {
    return jobHistory || [];
  }, [jobHistory]);

  const filteredAnotherData = useMemo(() => {
    return anotherJobHistory || [];
  }, [anotherJobHistory]);

  // Define columns for completed job history
  const completedColumns = [
    {
      header: "Job ID",
      accessor: "job_id" as keyof JobHistoryItem,
    },
    {
      header: "Technician",
      accessor: "technician" as keyof JobHistoryItem,
    },
    {
      header: "Contact Number",
      accessor: "contact_number" as keyof JobHistoryItem,
    },
    {
      header: "Type",
      accessor: (row: JobHistoryItem) => (
        <span className="capitalize">{row.type}</span>
      ),
    },
    {
      header: "Scheduled Date",
      accessor: "scheduled_date" as keyof JobHistoryItem,
    },
    {
      header: "Complete Date",
      accessor: "complete_date" as keyof JobHistoryItem,
    },
  ];

  // Define columns for all jobs history
  const allJobsColumns = [
    {
      header: "Job ID",
      accessor: "job_id" as keyof AnotherJobHistoryItem,
    },
    {
      header: "Technician",
      accessor: "technician" as keyof AnotherJobHistoryItem,
    },
    {
      header: "Contact Number",
      accessor: "contact_number" as keyof AnotherJobHistoryItem,
    },
    {
      header: "Type",
      accessor: (row: AnotherJobHistoryItem) => (
        <span className="capitalize">{row.type}</span>
      ),
    },
    {
      header: "Scheduled Date",
      accessor: "scheduled_date" as keyof AnotherJobHistoryItem,
    },
    {
      header: "Status",
      accessor: (row: AnotherJobHistoryItem) => (
        <span className="capitalize">{row.status}</span>
      ),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Completed Job History ({jobHistoryMeta?.total || jobHistory.length})
          </h3>
        </div>
        <CustomTable
          data={filteredData}
          columns={completedColumns}
          itemsPerPage={10}
          showFilter={false}
          showActions={false}
        />
      </div>
      <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            All Jobs History ({anotherJobHistory.length})
          </h3>
        </div>
        <CustomTable
          data={filteredAnotherData}
          columns={allJobsColumns}
          itemsPerPage={10}
          showFilter={false}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default ClientDetailsTableSection;
