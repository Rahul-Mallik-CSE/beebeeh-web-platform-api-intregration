/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/AllData";
import { Job, TodaysJob, TodaysJobsMeta } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";

interface TodaysJobsTableSectionProps {
  isLoading?: boolean;
  todaysJobs?: TodaysJob[];
  meta?: TodaysJobsMeta;
  onPageChange?: (page: number) => void;
}

const TodaysJobsTableSection = ({
  isLoading,
  todaysJobs,
  meta,
  onPageChange,
}: TodaysJobsTableSectionProps) => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/todays-jobs/${jobId}`);
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
    status: formatStatus(job.status),
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

export default TodaysJobsTableSection;
