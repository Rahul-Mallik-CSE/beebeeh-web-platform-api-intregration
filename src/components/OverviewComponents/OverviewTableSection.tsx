/** @format */
"use client";
import React, { useMemo } from "react";
import CustomTable from "../CommonComponents/CustomTable";
import type { OverviewJob } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import { OverviewJobItem } from "@/redux/features/adminFeatures/overViewAPI";
import {
  getJobStatusLabel,
  JOB_STATUS_FILTER_OPTIONS,
} from "@/lib/statusUtils";
import { FilterState } from "../CommonComponents/FilterCard";

interface OverviewTableSectionProps {
  data?: OverviewJobItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filterState: FilterState) => void;
}

const OverviewTableSection: React.FC<OverviewTableSectionProps> = ({
  data = [],
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
}) => {
  const router = useRouter();

  // Define columns matching the API response
  const overviewColumns = [
    {
      header: "Job ID",
      accessor: "jobId" as const,
      className: "font-medium",
    },
    {
      header: "Client",
      accessor: "client" as const,
    },
    {
      header: "Technician",
      accessor: "technician" as const,
    },
    {
      header: "Type",
      accessor: "type" as const,
    },
    {
      header: "Order by Date",
      accessor: "orderByDate" as const,
    },
    {
      header: "Status",
      accessor: "status" as const,
    },
  ];

  // Transform API data to match OverviewJob interface
  const transformedData: OverviewJob[] = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item) => ({
      id: item.object_id,
      jobId: item.job_id,
      client: item.client,
      technician: item.technician,
      type: (item.type.charAt(0).toUpperCase() + item.type.slice(1)) as any,
      orderByDate: item.order_by_date,
      status: getJobStatusLabel(item.status) as any,
    }));
  }, [data]);

  const handleAction = (job: OverviewJob) => {
    router.push(`/overview/${job.jobId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl py-6 px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl py-6 px-8">
      <CustomTable
        data={transformedData}
        columns={overviewColumns}
        onAction={handleAction}
        title="Recent Jobs"
        serverSidePagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onFilterChange={onFilterChange}
        excludeFilterColumns={["Order by Date", "Type"]}
        predefinedStatusOptions={JOB_STATUS_FILTER_OPTIONS}
        predefinedJobTypeOptions={["Installation", "Repair", "Maintenance"]}
      />
    </div>
  );
};

export default OverviewTableSection;
