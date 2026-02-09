/** @format */
"use client";
import React, { useState } from "react";
import ProductsTableSection from "@/components/ProductsComponents/ProductsTableSection";
import {
  useGetProductsQuery,
  ProductQueryParams,
} from "@/redux/features/adminFeatures/productsAPI";
import { FilterState } from "@/components/CommonComponents/FilterCard";

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    idSort: null,
    statusFilter: "",
    jobTypeFilter: "",
    columnFilters: [],
  });

  // Map status display to API value (is_active)
  const mapStatusToAPI = (status: string): boolean | undefined => {
    const statusMap: Record<string, boolean> = {
      Active: true,
      Inactive: false,
    };
    return status in statusMap ? statusMap[status] : undefined;
  };

  // Helper to get column filter value
  const getColumnFilterValue = (column: string): string | undefined => {
    const found = filters.columnFilters.find((f) => f.column === column);
    return found?.value || undefined;
  };

  // Build query params from filters
  const queryParams: ProductQueryParams = {
    page: currentPage,
    limit: 10,
    ...(filters.idSort && { order_dir: filters.idSort }),

    ...(getColumnFilterValue("product_id") && {
      product_id: getColumnFilterValue("product_id"),
    }),
    ...(getColumnFilterValue("model_name") && {
      model_name: getColumnFilterValue("model_name"),
    }),
    ...(getColumnFilterValue("alias") && {
      alias: getColumnFilterValue("alias"),
    }),
    ...(getColumnFilterValue("frequency_domestic_month") && {
      frequency_domestic_month: Number(
        getColumnFilterValue("frequency_domestic_month"),
      ),
    }),
    ...(getColumnFilterValue("frequency_commercial_month") && {
      frequency_commercial_month: Number(
        getColumnFilterValue("frequency_commercial_month"),
      ),
    }),
    ...(getColumnFilterValue("stock_quantity") && {
      stock_quantity: Number(getColumnFilterValue("stock_quantity")),
    }),
  };

  const { data, isLoading, error, refetch } = useGetProductsQuery(queryParams);

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
            Error loading products data. Please try again later.
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
          <ProductsTableSection
            data={data?.data || []}
            isLoading={isLoading}
            currentPage={data?.meta?.page || currentPage}
            totalPages={data?.meta?.totalPage || 1}
            onPageChange={handlePageChange}
            onFilterChange={handleFilterChange}
            onProductAdded={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
