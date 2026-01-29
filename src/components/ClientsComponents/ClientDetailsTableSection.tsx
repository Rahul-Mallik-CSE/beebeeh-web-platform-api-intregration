/** @format */
"use client";
import React, { useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { JobHistoryItem } from "@/redux/features/adminFeatures/clientsAPI";

interface ClientDetailsTableSectionProps {
  clientId: string;
  jobHistory: JobHistoryItem[];
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
  jobHistoryMeta,
}) => {
  // Filter data based on service status (if needed in future)
  const filteredData = useMemo(() => {
    return jobHistory || [];
  }, [jobHistory]);

  // Define columns for job history
  const columnsWithActions = [
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
      header: "Order By Date",
      accessor: "order_by_date" as keyof JobHistoryItem,
    },
    {
      header: "Complete Date",
      accessor: "complete_date" as keyof JobHistoryItem,
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Job History ({jobHistoryMeta?.total || jobHistory.length})
        </h3>
      </div>
      <CustomTable
        data={filteredData}
        columns={columnsWithActions}
        itemsPerPage={10}
        showFilter={false}
        showActions={false}
      />
    </div>
  );
};

export default ClientDetailsTableSection;
