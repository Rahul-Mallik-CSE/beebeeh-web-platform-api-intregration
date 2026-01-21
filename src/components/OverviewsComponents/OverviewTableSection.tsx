/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns } from "@/data/UserAllData/AllData";
import type { Job } from "@/types/UserAllTypes/AllTypes";
import { useRouter } from "next/navigation";
import TableLoadingView from "../LoadingComponents/TableLoadingView";
import type { RecentJob } from "@/types/AllTypes";

interface OverviewTableSectionProps {
  isLoading?: boolean;
  recentJobs?: RecentJob[];
}

const OverviewTableSection = ({
  isLoading,
  recentJobs,
}: OverviewTableSectionProps) => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/overviews/${jobId}`);
  };

  if (isLoading || !recentJobs) {
    return <TableLoadingView />;
  }

  // Transform API data to match the table format
  const transformedJobs: Job[] = recentJobs.map((job) => ({
    id: `#${job.job_id}`,
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
      />
    </div>
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

export default OverviewTableSection;
