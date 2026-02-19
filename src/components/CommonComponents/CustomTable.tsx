/** @format */
"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { View } from "lucide-react";
import { cn } from "@/lib/utils";
import { getJobStatusBadgeColor } from "@/lib/statusUtils";
import FilterCard, { FilterState } from "./FilterCard";

interface CustomTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  onAction?: (row: T) => void;
  itemsPerPage?: number;
  title?: string;
  additionalCount?: number;
  // Server-side pagination props
  serverSidePagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  // Server-side filtering props
  onFilterChange?: (filterState: FilterState) => void;
  excludeFilterColumns?: string[];
  predefinedStatusOptions?: string[];
  predefinedJobTypeOptions?: string[];
  showFilter?: boolean;
  showActions?: boolean;
}

const CustomTable = <T extends Record<string, any>>({
  data,
  columns,
  onAction,
  itemsPerPage = 10,
  title,
  serverSidePagination = false,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  onPageChange: externalOnPageChange,
  onFilterChange,
  excludeFilterColumns = [],
  predefinedStatusOptions,
  predefinedJobTypeOptions,
  showFilter = true,
  showActions = true,
}: CustomTableProps<T>) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState<FilterState | null>(null);

  // Use external pagination if provided, otherwise use internal
  const currentPage =
    serverSidePagination && externalCurrentPage
      ? externalCurrentPage
      : internalCurrentPage;
  const handlePageChangeInternal =
    serverSidePagination && externalOnPageChange
      ? externalOnPageChange
      : setInternalCurrentPage;

  // Helper function to get the data key from column header
  const getDataKeyFromHeader = (header: string): string => {
    const words = header.split(" ");
    return words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
      )
      .join("");
  };

  // Apply filtering and sorting to data
  const filteredAndSortedData = useMemo(() => {
    // When using server-side pagination, skip client-side filtering/sorting
    // because the server already handles it
    if (serverSidePagination) {
      return [...data];
    }

    let result = [...data];

    if (filterState) {
      // Apply column filters (text search)
      if (filterState.columnFilters.length > 0) {
        result = result.filter((row) => {
          return filterState.columnFilters.every((filter) => {
            const value = row[filter.column];
            if (value == null) return false;
            return String(value)
              .toLowerCase()
              .includes(filter.value.toLowerCase());
          });
        });
      }

      // Apply status filter
      if (filterState.statusFilter) {
        const statusColumn = columns.find(
          (col) => col.header.toLowerCase() === "status",
        );
        if (statusColumn) {
          const dataKey =
            typeof statusColumn.accessor === "string"
              ? statusColumn.accessor
              : getDataKeyFromHeader(statusColumn.header);
          result = result.filter((row) => {
            const value = row[dataKey as keyof T];
            return String(value) === filterState.statusFilter;
          });
        }
      }

      // Apply ID sorting
      if (filterState.idSort) {
        const idColumn = columns.find(
          (col) =>
            col.header.toLowerCase() === "id" ||
            col.header.toLowerCase().includes("id"),
        );
        if (idColumn) {
          const dataKey =
            typeof idColumn.accessor === "string"
              ? idColumn.accessor
              : getDataKeyFromHeader(idColumn.header);
          result.sort((a, b) => {
            const aValue = a[dataKey as keyof T];
            const bValue = b[dataKey as keyof T];

            // Handle null/undefined values
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            // Compare values
            let comparison = 0;
            if (typeof aValue === "number" && typeof bValue === "number") {
              comparison = aValue - bValue;
            } else {
              comparison = String(aValue).localeCompare(String(bValue));
            }

            return filterState.idSort === "asc" ? comparison : -comparison;
          });
        }
      }
    }

    return result;
  }, [data, filterState, columns, serverSidePagination]);

  // For server-side pagination, use all filtered data (no slicing)
  // For client-side pagination, slice the data
  const totalPages =
    serverSidePagination && externalTotalPages
      ? externalTotalPages
      : Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const currentData = serverSidePagination
    ? filteredAndSortedData
    : filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      );

  const handleApplyFilter = (newFilterState: FilterState) => {
    setFilterState(newFilterState);
    // For server-side filtering, call the callback
    if (onFilterChange) {
      onFilterChange(newFilterState);
    }
    // Reset to first page when filter is applied
    if (serverSidePagination && externalOnPageChange) {
      externalOnPageChange(1);
    } else {
      setInternalCurrentPage(1);
    }
  };

  const handleClearFilter = () => {
    setFilterState(null);
    // For server-side filtering, call the callback with null
    if (onFilterChange) {
      onFilterChange({
        idSort: null,
        statusFilter: "",
        jobTypeFilter: "",
        columnFilters: [],
      });
    }
    if (serverSidePagination && externalOnPageChange) {
      externalOnPageChange(1);
    } else {
      setInternalCurrentPage(1);
    }
  };

  const getStatusColor = getJobStatusBadgeColor;

  const renderCell = (row: T, column: (typeof columns)[0]) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }

    const value = row[column.accessor as keyof T];

    // Special rendering for status
    if (column.header === "Status" && typeof value === "string") {
      return (
        <div
          className={cn(
            "w-28 px-2  py-1 flex justify-center items-center rounded-md text-sm font-medium",
            getStatusColor(value),
          )}
        >
          {value}
        </div>
      );
    }

    return value as React.ReactNode;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handlePageChangeInternal(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-2 sm:px-0 gap-4">
        {title ? (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            {title}
          </h2>
        ) : (
          <div></div>
        )}
        {showFilter && (
          <FilterCard
            columns={columns}
            data={data}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilter}
            currentFilter={filterState || undefined}
            excludeColumns={excludeFilterColumns}
            predefinedStatusOptions={predefinedStatusOptions}
            predefinedJobTypeOptions={predefinedJobTypeOptions}
          />
        )}
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="rounded-lg overflow-hidden border border-gray-200 sm:border-0">
        <div className="overflow-x-auto">
          <Table className="border-none min-w-full">
            <TableHeader>
              <TableRow className="bg-[#F1F4F9] hover:bg-[#F1F4F9] border-none">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "font-semibold text-gray-700 text-xs sm:text-sm py-2 sm:py-3 whitespace-nowrap",
                      column.className,
                    )}
                  >
                    {column.header}
                  </TableHead>
                ))}
                {showActions && onAction && (
                  <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm text-right py-2 sm:py-3 whitespace-nowrap">
                    Action
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (showActions && onAction ? 1 : 0)}
                    className="text-center py-12 sm:py-16"
                  >
                    <p className="text-gray-500 text-sm sm:text-base font-medium">
                      No results found
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={cn(
                          "text-gray-700 py-3 sm:py-5 text-xs sm:text-sm whitespace-nowrap",
                          column.className,
                        )}
                      >
                        {renderCell(row, column)}
                      </TableCell>
                    ))}
                    {showActions && onAction && (
                      <TableCell className="text-right py-3 sm:py-5">
                        <button
                          onClick={() => onAction(row)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center"
                        >
                          <View className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {currentData.length > 0 && (
        <Pagination>
          <PaginationContent className="flex-wrap gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4",
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index} className="hidden xs:inline-flex">
                {page === "..." ? (
                  <PaginationEllipsis className="h-8 sm:h-10" />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className={cn(
                      "cursor-pointer text-xs sm:text-sm h-8 sm:h-10 w-8 sm:w-10",
                      currentPage === page &&
                        "bg-red-800 text-white hover:bg-red-700 hover:text-white",
                    )}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Mobile: Show only current page */}
            <PaginationItem className="xs:hidden">
              <PaginationLink
                isActive={true}
                className="cursor-default bg-red-800 text-white h-8 w-8 text-xs"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4",
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CustomTable;
