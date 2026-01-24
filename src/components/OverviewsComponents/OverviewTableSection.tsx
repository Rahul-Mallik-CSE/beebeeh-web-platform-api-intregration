/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/UserAllData/AllData";
import type { Job } from "@/types/UserAllTypes/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";
import type { RecentJob, DashboardMeta } from "@/types/AllTypes";
import { FilterState } from "../CommonComponents/FilterCard";
import { DashboardFilters } from "@/redux/features/technicianFeatures/overViewAPI";

interface OverviewTableSectionProps {
  isLoading?: boolean;
  recentJobs?: RecentJob[];
  meta?: DashboardMeta;
  onPageChange?: (page: number) => void;
  onFilterChange?: (filters: DashboardFilters) => void;
}

const OverviewTableSection = ({
  isLoading,
  recentJobs,
  meta,
  onPageChange,
  onFilterChange,
}: OverviewTableSectionProps) => {
  const router = useRouter();

  console.log("OverviewTableSection Meta:", meta);

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id;
    router.push(`/overviews/${jobId}`);
  };

  // Map job type display to API value
  const mapJobTypeToAPI = (jobType: string): string => {
    const jobTypeMap: Record<string, string> = {
      Installation: "Installation",
      Repairing: "Repairing",
      Maintenance: "Maintenance",
    };
    return jobTypeMap[jobType] || jobType;
  };

  // Map status display to API value
  const mapStatusToAPI = (status: string): string => {
    const statusMap: Record<string, string> = {
      Pending: "assign",
      "In Progress": "in-progress",
      Completed: "complete",
      Cancelled: "cancel",
    };
    return statusMap[status] || status.toLowerCase();
  };

  const handleFilterChange = (filterState: FilterState) => {
    if (!onFilterChange) return;

    const filters: DashboardFilters = {
      page: 1, // Reset to first page on filter
      page_size: 10,
    };

    // Map ID sort to job_id_order (undefined clears it)
    filters.job_id_order = filterState.idSort || undefined;

    // Map status filter - set undefined to clear when "All" is selected
    filters.status = filterState.statusFilter
      ? mapStatusToAPI(filterState.statusFilter)
      : undefined;

    // Map job type filter - set undefined to clear when "All" is selected
    filters.job_type = filterState.jobTypeFilter
      ? mapJobTypeToAPI(filterState.jobTypeFilter)
      : undefined;

    // Map column filters (undefined clears it)
    const clientNameFilter = filterState.columnFilters.find(
      (f) => f.column === "clientName",
    );
    filters.client_name = clientNameFilter?.value || undefined;

    // Always call onFilterChange to update the API
    onFilterChange(filters);
  };

  if (isLoading || !recentJobs) {
    return <TableLoadingView />;
  }

  // Transform API data to match the table format
  const transformedJobs: Job[] = recentJobs.map((job) => ({
    id: job.job_id,
    jobType: job.job_type as any,
    clientName: job.client_name,
    contactNumber: job.contact_number,
    orderedByTime: new Date(job.ordered_time).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    status: formatStatus(job.status),
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl py-4 px-3 sm:py-6 sm:px-6 md:px-8">
      <CustomTable
        data={transformedJobs}
        columns={columns}
        onAction={handleAction}
        title="Recent Jobs"
        additionalCount={5}
        serverSidePagination={true}
        currentPage={meta?.page}
        totalPages={meta?.total_pages}
        onPageChange={onPageChange}
        onFilterChange={handleFilterChange}
        excludeFilterColumns={["Ordered by time"]}
        predefinedStatusOptions={[
          "Pending",
          "In Progress",
          "Completed",
          "Cancelled",
        ]}
        predefinedJobTypeOptions={["Installation", "Repairing", "Maintenance"]}
      />
    </div>
  );
};

// Helper function to format status from API to UI format
const formatStatus = (status: string): Job["status"] => {
  const statusMap: Record<string, Job["status"]> = {
    assign: "Pending",
    rescheduled: "Pending",
    complete: "Completed",
    "in-progress": "In Progress",
    cancel: "Cancelled",
  };

  return statusMap[status.toLowerCase()] || "Pending";
};

export default OverviewTableSection;
