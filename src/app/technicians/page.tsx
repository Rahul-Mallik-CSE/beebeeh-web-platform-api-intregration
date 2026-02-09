/** @format */
"use client";
import React, { useState } from "react";
import TechniciansTableSection from "@/components/TechniciansComponents/TechniciansTableSection";
import {
  useGetTechniciansQuery,
  TechnicianFilters,
} from "@/redux/features/adminFeatures/technicianAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const TechniciansPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Build query params from filters
  const queryParams: TechnicianFilters = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order: filters.idSort }),
    ...(filters.statusFilter && {
      status: filters.statusFilter.toLowerCase(),
    }),
    ...(filters.columnFilters.find((f) => f.column === "technician_id")
      ?.value && {
      technician_id: filters.columnFilters.find(
        (f) => f.column === "technician_id",
      )?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "full_name")?.value && {
      name: filters.columnFilters.find((f) => f.column === "full_name")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "contact_number")
      ?.value && {
      contact_number: filters.columnFilters.find(
        (f) => f.column === "contact_number",
      )?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "skills")?.value && {
      skills: filters.columnFilters.find((f) => f.column === "skills")?.value,
    }),
  };

  const { data, isLoading, error, refetch } =
    useGetTechniciansQuery(queryParams);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterState: FilterState) => {
    setFilters(filterState);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading technicians data. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        {/* table section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
          <TechniciansTableSection
            data={data?.data || []}
            isLoading={isLoading}
            currentPage={data?.meta?.page || currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onTechnicianAdded={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default TechniciansPage;
