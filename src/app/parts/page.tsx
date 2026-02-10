/** @format */
"use client";
import React, { useState } from "react";
import PartsTableSection from "@/components/PartsComponents/PartsTableSection";
import {
  useGetPartsQuery,
  PartsQueryParams,
} from "@/redux/features/adminFeatures/partsAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const PartsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Map status display to API value
  const mapStatusToAPI = (status: string): string | undefined => {
    const statusMap: Record<string, string> = {
      "Stock In": "stock_in",
      "Low Stock": "low_stock",
      "Stock Out": "stock_out",
    };
    return statusMap[status] || undefined;
  };

  // Helper to get column filter value
  const getColumnFilterValue = (column: string): string | undefined => {
    const found = filters.columnFilters.find((f) => f.column === column);
    return found?.value || undefined;
  };

  // Build query params from filters
  const queryParams: PartsQueryParams = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order_dir: filters.idSort }),
    ...(filters.statusFilter &&
      mapStatusToAPI(filters.statusFilter) && {
        status: mapStatusToAPI(filters.statusFilter),
      }),
    ...(getColumnFilterValue("part_id") && {
      part_id: getColumnFilterValue("part_id"),
    }),
    ...(getColumnFilterValue("name") && {
      name: getColumnFilterValue("name"),
    }),
    ...(getColumnFilterValue("stock") && {
      stock: Number(getColumnFilterValue("stock")),
    }),
    ...(getColumnFilterValue("min_stock") && {
      min: Number(getColumnFilterValue("min_stock")),
    }),
    ...(getColumnFilterValue("modelName") && {
      model_name: getColumnFilterValue("modelName"),
    }),
  };

  const { data, isLoading, error, refetch } = useGetPartsQuery(queryParams);

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
            Error loading parts data. Please try again later.
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
          <PartsTableSection
            data={data?.data || []}
            isLoading={isLoading}
            currentPage={data?.meta?.page || currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onPartAdded={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default PartsPage;
