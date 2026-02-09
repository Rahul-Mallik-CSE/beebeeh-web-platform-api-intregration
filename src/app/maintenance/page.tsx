/** @format */
"use client";
import React, { useState } from "react";
import MaintenanceTableSection from "@/components/MaintenanceComponents/MaintenanceTableSection";
import { useGetMaintenanceQuery } from "@/redux/features/adminFeatures/maintenanceAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const MaintenancePage = () => {
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
    order: filters.idSort || "asc",
    ...(filters.statusFilter && {
      status: mapStatusToAPI(filters.statusFilter),
    }),
    ...(filters.columnFilters.find((f) => f.column === "client")?.value && {
      client_name: filters.columnFilters.find((f) => f.column === "client")
        ?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "model")?.value && {
      model: filters.columnFilters.find((f) => f.column === "model")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "technician")?.value && {
      technician: filters.columnFilters.find((f) => f.column === "technician")
        ?.value,
    }),
    // Note: locality not included in filters, as per user request
  };

  const { data, isLoading, error } = useGetMaintenanceQuery(queryParams);

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
            Error loading maintenance data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto">
        <MaintenanceTableSection
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

export default MaintenancePage;
