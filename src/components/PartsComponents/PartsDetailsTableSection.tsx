/** @format */
"use client";
import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { usedHistoryColumns } from "@/data/PartsData";
import { UsedHistory } from "@/types/PartsTypes";
import { Eye } from "lucide-react";

interface PartsDetailsTableSectionProps {
  usedHistory: UsedHistory[];
}

const PartsDetailsTableSection: React.FC<PartsDetailsTableSectionProps> = ({
  usedHistory,
}) => {
  const handleViewJob = (job: UsedHistory) => {
    console.log("View job:", job.jobId);
  };

  const columnsWithActions = [
    ...usedHistoryColumns,
    {
      header: "Action",
      accessor: (row: UsedHistory) => (
        <div className="flex items-center justify-end">
          <button
            onClick={() => handleViewJob(row)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Used History
      </h3>
      <CustomTable
        data={usedHistory}
        columns={columnsWithActions}
        itemsPerPage={10}
      />
    </div>
  );
};

export default PartsDetailsTableSection;
