/** @format */
"use client";
import React from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { overviewColumns, overviewJobsData } from "@/data/AllData";
import type { OverviewJob } from "@/types/AllTypes";
import { useRouter } from "next/navigation";

const OverviewTableSection = () => {
  const router = useRouter();

  const handleAction = (job: OverviewJob) => {
    router.push(`/overview/${job.jobId}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl py-6 px-8">
      <CustomTable
        data={overviewJobsData}
        columns={overviewColumns}
        onAction={handleAction}
        title="Recent Jobs"
        additionalCount={5}
      />
    </div>
  );
};

export default OverviewTableSection;
