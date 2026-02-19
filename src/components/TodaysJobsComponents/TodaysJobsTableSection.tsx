/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/AllData";
import { Job, TodaysJob, TodaysJobsMeta } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";
import { FilterState } from "../CommonComponents/FilterCard";
import { TodaysJobsFilters } from "@/redux/features/technicianFeatures/todaysJobsAPI";
import {
  getJobStatusLabel,
  mapStatusToAPI,
  JOB_STATUS_FILTER_OPTIONS,
} from "@/lib/statusUtils";

interface TodaysJobsTableSectionProps {
  isLoading?: boolean;
  todaysJobs?: TodaysJob[];
  meta?: TodaysJobsMeta;
  onPageChange?: (page: number) => void;
  onFilterChange?: (filters: TodaysJobsFilters) => void;
}

const TodaysJobsTableSection = ({
  isLoading,
  todaysJobs,
  meta,
  onPageChange,
  onFilterChange,
}: TodaysJobsTableSectionProps) => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/todays-jobs/${jobId}`);
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

  // Map status display to API value — uses shared utility
  const handleMapStatusToAPI = mapStatusToAPI;

  const handleFilterChange = (filterState: FilterState) => {
    if (!onFilterChange) return;

    const filters: TodaysJobsFilters = {
      page: 1, // Reset to first page on filter
      page_size: 10,
    };

    // Map ID sort to job_id_order (undefined clears it)
    filters.job_id_order = filterState.idSort || undefined;

    // Map status filter - set undefined to clear when "All" is selected
    filters.status = filterState.statusFilter
      ? handleMapStatusToAPI(filterState.statusFilter)
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

  if (isLoading || !todaysJobs) {
    return <TableLoadingView />;
  }

  // Transform API data to match the table format
  const transformedJobs: Job[] = todaysJobs.map((job) => ({
    id: `#${job.job_id}`,
    jobType: job.job_type as any,
    clientName: job.client_name,
    contactNumber: job.contact_number,
    orderedByTime: job.ordered_by_time,
    status: getJobStatusLabel(job.status) as Job["status"],
  }));

  return (
    <CustomTable
      data={transformedJobs}
      columns={columns}
      onAction={handleAction}
      title="Today's Jobs"
      additionalCount={5}
      serverSidePagination={true}
      currentPage={meta?.page}
      totalPages={meta?.totalPages}
      onPageChange={onPageChange}
      onFilterChange={handleFilterChange}
      excludeFilterColumns={["Scheduled time"]}
      predefinedStatusOptions={JOB_STATUS_FILTER_OPTIONS}
      predefinedJobTypeOptions={["Installation", "Repairing", "Maintenance"]}
    />
  );
};

export default TodaysJobsTableSection;
