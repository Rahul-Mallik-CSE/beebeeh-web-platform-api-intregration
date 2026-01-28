/** @format */
"use client";
import React, { useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
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
  const router = useRouter();

  const handleViewJob = (job: JobHistoryItem) => {
    // Navigate to job details based on job type
    let jobType = job.type.toLowerCase();

    // Map job types to their respective route paths
    // The repairs route is plural, while others are singular
    if (jobType === "repairing" || jobType === "repair") {
      jobType = "repairs";
    }

    router.push(`/${jobType}/${job.job_id}`);
  };

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
    {
      header: "Action",
      accessor: (row: JobHistoryItem) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleViewJob(row)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="View Job Details"
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Job History ({jobHistoryMeta?.total || jobHistory.length})
        </h3>
      </div>
      <CustomTable
        data={filteredData}
        columns={columnsWithActions}
        itemsPerPage={10}
      />
    </div>
  );
};

export default ClientDetailsTableSection;
