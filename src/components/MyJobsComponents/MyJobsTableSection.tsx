/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns, jobsData } from "@/data/AllData";
import { Job } from "@/types/AllTypes";
import { useRouter } from "next/navigation";

const MyJobsTableSection = () => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/my-jobs/${jobId}`);
  };

  return (
    <CustomTable
      data={jobsData}
      columns={columns}
      onAction={handleAction}
      title="Today's Jobs"
      additionalCount={5}
    />
  );
};

export default MyJobsTableSection;
