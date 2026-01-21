/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/AllData";
import type { Job, AllJob, AllJobsMeta } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";

interface AllJobsTableSectionProps {
  isLoading?: boolean;
  allJobs?: AllJob[];
  meta?: AllJobsMeta;
  onPageChange?: (page: number) => void;
}

const AllJobsTableSection = ({
  isLoading,
  allJobs,
  meta,
  onPageChange,
}: AllJobsTableSectionProps) => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/all-jobs/${jobId}`);
  };

  if (isLoading || !allJobs) {
    return <TableLoadingView />;
  }

  // Transform API data to match the table format
  const transformedJobs: Job[] = allJobs.map((job) => ({
    id: `#${job.job_id}`,
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
    />
  );
};

// Helper function to format status from API to UI format
const formatStatus = (status: string): Job["status"] => {
  const statusMap: Record<string, Job["status"]> = {
    assign: "Pending",
    rescheduled: "Pending",
    complete: "Complete",
    "in-progress": "In Progress",
    cancel: "Pending",
  };

  return statusMap[status.toLowerCase()] || "Pending";
};

export default AllJobsTableSection;
