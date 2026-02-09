/** @format */
"use client";
import React, { useState } from "react";
import ClientsTableSections from "@/components/ClientsComponents/ClientsTableSections";
import {
  useGetClientsQuery,
  ClientsQueryParams,
} from "@/redux/features/adminFeatures/clientsAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const ClientsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Map client type display to API value
  const mapClientTypeToAPI = (type: string): string => {
    const typeMap: Record<string, string> = {
      Commercial: "commercial",
      Domestic: "domestic",
    };
    return typeMap[type] || type.toLowerCase();
  };

  // Map status display to API value (is_active)
  const mapStatusToAPI = (status: string): boolean | undefined => {
    const statusMap: Record<string, boolean> = {
      Active: true,
      Inactive: false,
    };
    return status in statusMap ? statusMap[status] : undefined;
  };

  // Build query params from filters
  const queryParams: ClientsQueryParams = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order: filters.idSort }),
    ...(filters.statusFilter &&
      mapStatusToAPI(filters.statusFilter) !== undefined && {
        is_active: mapStatusToAPI(filters.statusFilter),
      }),
    ...(filters.jobTypeFilter && {
      type: mapClientTypeToAPI(filters.jobTypeFilter),
    }),
    ...(filters.columnFilters.find((f) => f.column === "name")?.value && {
      name: filters.columnFilters.find((f) => f.column === "name")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "town")?.value && {
      town: filters.columnFilters.find((f) => f.column === "town")?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "client_id")?.value && {
      client_id: filters.columnFilters.find((f) => f.column === "client_id")
        ?.value,
    }),
    ...(filters.columnFilters.find((f) => f.column === "contact_number")
      ?.value && {
      contact_number: filters.columnFilters.find(
        (f) => f.column === "contact_number",
      )?.value,
    }),
  };

  const { data, isLoading, error, refetch } = useGetClientsQuery(queryParams);

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
            Error loading clients data. Please try again later.
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
          <ClientsTableSections
            data={data?.data || []}
            isLoading={isLoading}
            currentPage={data?.meta?.page || currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onClientAdded={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
