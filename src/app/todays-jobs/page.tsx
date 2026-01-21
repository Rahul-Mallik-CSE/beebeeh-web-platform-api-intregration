/** @format */

"use client";
import React, { useState } from "react";
import TodaysJobsTableSection from "@/components/TodaysJobsComponents/TodaysJobsTableSection";
import { useGetTodaysJobsQuery } from "@/redux/features/technicianFeatures/todaysJobsAPI";

const TodaysJobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetTodaysJobsQuery(currentPage);

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* table section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <TodaysJobsTableSection
            isLoading={isLoading}
            todaysJobs={data?.data}
            meta={data?.meta}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysJobsPage;
