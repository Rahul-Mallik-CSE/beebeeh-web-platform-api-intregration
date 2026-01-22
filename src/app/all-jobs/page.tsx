/** @format */

"use client";
import AllJobsTableSection from "@/components/AllJobsComponents/AllJobsTableSection";
import {
  useGetAllJobsQuery,
  AllJobsFilters,
} from "@/redux/features/technicianFeatures/allJobsAPI";
import React, { useState } from "react";

const AllJobsPage = () => {
  const [filters, setFilters] = useState<AllJobsFilters>({
    page: 1,
    page_size: 10,
  });

  const { data, isLoading, error } = useGetAllJobsQuery(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: AllJobsFilters) => {
    // Replace filters entirely to allow undefined values to clear previous filters
    setFilters({
      page: newFilters.page || 1,
      page_size: newFilters.page_size || 10,
      ...newFilters,
    });
  };

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* table section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <AllJobsTableSection
            isLoading={isLoading}
            allJobs={data?.data}
            meta={data?.meta}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AllJobsPage;
