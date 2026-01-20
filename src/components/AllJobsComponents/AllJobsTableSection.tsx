/** @format */
"use client";
import CustomTable from "../CommonComponents/CustomTable";
import { columns, jobsData } from "@/data/AllData";
import type { Job } from "@/types/AllTypes";

import { useRouter } from "next/navigation";

const AllJobsTableSection = () => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/all-jobs/${jobId}`);
  };

  return (
    <CustomTable
      data={jobsData}
      columns={columns}
      onAction={handleAction}
      title="All Jobs"
      additionalCount={5}
    />
  );
};

export default AllJobsTableSection;
