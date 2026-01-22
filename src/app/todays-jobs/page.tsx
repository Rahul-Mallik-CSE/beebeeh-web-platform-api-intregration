/** @format */

"use client";
import React, { useState } from "react";
import TodaysJobsTableSection from "@/components/TodaysJobsComponents/TodaysJobsTableSection";
import {
  useGetTodaysJobsQuery,
  TodaysJobsFilters,
} from "@/redux/features/technicianFeatures/todaysJobsAPI";

const TodaysJobsPage = () => {
  const [filters, setFilters] = useState<TodaysJobsFilters>({
    page: 1,
    page_size: 10,
  });

  const { data, isLoading, error } = useGetTodaysJobsQuery(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: TodaysJobsFilters) => {
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
          <TodaysJobsTableSection
            isLoading={isLoading}
            todaysJobs={data?.data}
            meta={data?.meta}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysJobsPage;
