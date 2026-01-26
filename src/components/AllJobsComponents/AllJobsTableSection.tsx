/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/AllData";
import type { Job, AllJob, AllJobsMeta } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";
import { FilterState } from "../CommonComponents/FilterCard";
import { AllJobsFilters } from "@/redux/features/technicianFeatures/allJobsAPI";

interface AllJobsTableSectionProps {
  isLoading?: boolean;
  allJobs?: AllJob[];
  meta?: AllJobsMeta;
  onPageChange?: (page: number) => void;
  onFilterChange?: (filters: AllJobsFilters) => void;
}

const AllJobsTableSection = ({
  isLoading,
  allJobs,
  meta,
  onPageChange,
  onFilterChange,
}: AllJobsTableSectionProps) => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Use job ID directly from API
    const jobId = job.id;
    router.push(`/all-jobs/${jobId}`);
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

    const filters: AllJobsFilters = {
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

  if (isLoading || !allJobs) {
    return <TableLoadingView />;
  }

  // Transform API data to match the table format
  const transformedJobs: Job[] = allJobs.map((job) => ({
    id: job.job_id,
    jobType: job.job_type as any,
    clientName: job.client_name,
    contactNumber: job.contact_number,
    orderedByTime: job.scheduled_time,
    status: formatStatus(job.status),
  }));

  return (
    <CustomTable
      data={transformedJobs}
      columns={columns}
      onAction={handleAction}
      title="All Jobs"
      additionalCount={5}
      serverSidePagination={true}
      currentPage={meta?.page}
      totalPages={meta?.totalPages}
      onPageChange={onPageChange}
      onFilterChange={handleFilterChange}
      excludeFilterColumns={["Scheduled time"]}
      predefinedStatusOptions={[
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
        "Rescheduled",
      ]}
      predefinedJobTypeOptions={["Installation", "Repairing", "Maintenance"]}
    />
  );
};

// Helper function to format status from API to UI format
const formatStatus = (status: string): Job["status"] => {
  const statusMap: Record<string, Job["status"]> = {
    assign: "Pending",
    rescheduled: "Rescheduled",
    complete: "Completed",
    in_progress: "In Progress",
    cancel: "Cancelled",
  };

  return statusMap[status.toLowerCase()] || "Pending";
};

export default AllJobsTableSection;
