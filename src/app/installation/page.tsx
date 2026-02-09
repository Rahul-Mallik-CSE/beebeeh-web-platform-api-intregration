/** @format */
"use client";
import React, { useState } from "react";
import InstallationTableSection from "@/components/InstallationComponents/InstallationTableSection";
import { useGetInstallationsQuery } from "@/redux/features/adminFeatures/installationAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const InstallationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Map status display to API value
  const mapStatusToAPI = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending: "assign",
      "in progress": "in_progress",
      complete: "complete",
      cancel: "cancel",
      rescheduled: "rescheduled",
    };
    return statusMap[status.toLowerCase()] || status.toLowerCase();
  };

  // Build query params from filters
  const queryParams = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order_dir: filters.idSort }),
    ...(filters.statusFilter && {
      status: mapStatusToAPI(filters.statusFilter),
    }),
    ...(filters.columnFilters.find((f) => f.column === "jobId")?.value && {
      job_id: filters.columnFilters.find((f) => f.column === "jobId")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "client")?.value && {
      client: filters.columnFilters.find((f) => f.column === "client")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "model")?.value && {
      model: filters.columnFilters.find((f) => f.column === "model")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "technician")?.value && {
      technician: filters.columnFilters.find((f) => f.column === "technician")
        ?.value,
    }),
  };

  const { data, isLoading, error } = useGetInstallationsQuery(queryParams);

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
            Error loading installation data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto">
        <InstallationTableSection
          data={data?.data}
          isLoading={isLoading}
          currentPage={data?.meta.page || 1}
          totalPages={data?.meta.totalPage || 1}
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default InstallationPage;
