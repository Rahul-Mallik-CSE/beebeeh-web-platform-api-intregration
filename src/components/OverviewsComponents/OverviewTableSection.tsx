/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { columns, jobsData } from "@/data/UserAllData/AllData";
import type { Job } from "@/types/UserAllTypes/AllTypes";
import { useRouter } from "next/navigation";

const OverviewTableSection = () => {
  const router = useRouter();

  const handleAction = (job: Job) => {
    // Remove # from job ID for URL
    const jobId = job.id.replace("#", "");
    router.push(`/overviews/${jobId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl py-4 px-3 sm:py-6 sm:px-6 md:px-8">
      <CustomTable
        data={jobsData}
        columns={columns}
        onAction={handleAction}
        title="Recent Jobs"
        additionalCount={5}
      />
    </div>
  );
};

export default OverviewTableSection;
