/** @format */
"use client";
import OverviewTableSection from "@/components/OverviewComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewComponents/StatsSection";
import React, { useState } from "react";
import { useGetOverviewQuery } from "@/redux/features/adminFeatures/overViewAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const OverviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Build query params from filters
  const queryParams = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order_dir: filters.idSort }),
    ...(filters.statusFilter && { status: filters.statusFilter.toLowerCase() }),
    ...(filters.jobTypeFilter && { type: filters.jobTypeFilter.toLowerCase() }),
    ...(filters.columnFilters.find((f) => f.column === "jobId")?.value && {
      job_id: filters.columnFilters.find((f) => f.column === "jobId")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "client")?.value && {
      client: filters.columnFilters.find((f) => f.column === "client")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "technician")?.value && {
      technician: filters.columnFilters.find((f) => f.column === "technician")
        ?.value,
    }),
  };

  const { data, isLoading, error } = useGetOverviewQuery(queryParams);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterState: FilterState) => {
    setFilters(filterState);
    setCurrentPage(1); // Reset to first page when filters change
  };

  if (error) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading overview data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        {/* table section */}
        <div>
          {/* Stats section */}
          <StatsSection data={data?.data.header_cards} isLoading={isLoading} />
          <OverviewTableSection
            data={data?.data.data}
            isLoading={isLoading}
            currentPage={data?.data.meta.page || 1}
            totalPages={data?.data.meta.totalPage || 1}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
