/** @format */

"use client";
import AllJobsTableSection from "@/components/AllJobsComponents/AllJobsTableSection";
import { useGetAllJobsQuery } from "@/redux/features/technicianFeatures/allJobsAPI";
import React, { useState } from "react";

const AllJobsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetAllJobsQuery(currentPage);

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* table section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <AllJobsTableSection
            isLoading={isLoading}
            allJobs={data?.data}
            meta={data?.meta}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AllJobsPage;
