/** @format */
"use client";
import React, { useState, useMemo } from "react";
import { Filter, X, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type SortOption = {
  column: string;
  direction: "asc" | "desc" | null;
};

export type ColumnFilter = {
  column: string;
  value: string;
};

export type FilterState = {
  idSort: "asc" | "desc" | null;
  statusFilter: string;
  columnFilters: ColumnFilter[];
};

interface FilterCardProps<T> {
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
  }[];
  data: T[];
  onApplyFilter: (filterState: FilterState) => void;
  onClearFilter: () => void;
  currentFilter?: FilterState;
}

const FilterCard = <T extends Record<string, any>>({
  columns,
  data,
  onApplyFilter,
  onClearFilter,
  currentFilter,
}: FilterCardProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idSort, setIdSort] = useState<"asc" | "desc" | null>(
    currentFilter?.idSort || null
  );
  const [statusFilter, setStatusFilter] = useState<string>(
    currentFilter?.statusFilter || ""
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>(
    currentFilter?.columnFilters || []
  );

  // Helper function to get the data key from column header
  const getDataKeyFromHeader = (header: string): string => {
    // Convert header to camelCase data key
    // e.g., "Tech ID" -> "techId", "Product ID" -> "productId", "Model Name" -> "modelName"
    const words = header.split(" ");
    return words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  // Get all columns (both string and function accessors)
  const allColumns = columns.map((col) => ({
    header: col.header,
    dataKey:
      typeof col.accessor === "string"
        ? (col.accessor as string)
        : getDataKeyFromHeader(col.header),
  }));

  // Find ID column (any column with "id" in header)
  const idColumn = allColumns.find(
    (col) =>
      col.header.toLowerCase() === "id" ||
      col.header.toLowerCase().includes("id")
  );

  // Find Status column
  const statusColumn = allColumns.find(
    (col) => col.header.toLowerCase() === "status"
  );

  // Get unique status values from data
  const statusOptions = useMemo(() => {
    if (!statusColumn) return [];
    const uniqueStatuses = new Set<string>();
    data.forEach((row) => {
      const value = row[statusColumn.dataKey];
      if (value != null) {
        uniqueStatuses.add(String(value));
      }
    });
    return Array.from(uniqueStatuses).sort();
  }, [data, statusColumn]);

  // Get other columns (not ID, not Status)
  const otherColumns = allColumns.filter(
    (col) =>
      col.header !== idColumn?.header && col.header !== statusColumn?.header
  );

  const handleColumnFilterChange = (columnHeader: string, value: string) => {
    const column = otherColumns.find((col) => col.header === columnHeader);
    if (!column) return;

    const dataKey = column.dataKey;
    const existingIndex = columnFilters.findIndex(
      (filter) => filter.column === dataKey
    );

    if (value.trim() === "") {
      // Remove filter if value is empty
      if (existingIndex !== -1) {
        setColumnFilters(columnFilters.filter((_, i) => i !== existingIndex));
      }
    } else {
      if (existingIndex !== -1) {
        // Update existing filter
        const newFilters = [...columnFilters];
        newFilters[existingIndex] = { column: dataKey, value };
        setColumnFilters(newFilters);
      } else {
        // Add new filter
        setColumnFilters([...columnFilters, { column: dataKey, value }]);
      }
    }
  };

  const getColumnFilterValue = (dataKey: string) => {
    const filter = columnFilters.find((f) => f.column === dataKey);
    return filter?.value || "";
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      idSort,
      statusFilter,
      columnFilters,
    });
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    setIdSort(null);
    setStatusFilter("");
    setColumnFilters([]);
    onClearFilter();
    setIsOpen(false);
  };

  const hasActiveFilters =
    idSort !== null || statusFilter !== "" || columnFilters.length > 0;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 relative",
            hasActiveFilters && "border-red-800 text-red-800"
          )}
        >
          <Filter className="w-4 h-4" />
          Filter
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 bg-red-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {(idSort ? 1 : 0) + (statusFilter ? 1 : 0) + columnFilters.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter Options
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleClearFilter}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {/* ID Sort Section */}
            {idColumn && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {idColumn.header}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={idSort === "asc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIdSort(idSort === "asc" ? null : "asc")}
                    className={cn(
                      "flex-1",
                      idSort === "asc" &&
                        "bg-red-800 hover:bg-red-700 text-white"
                    )}
                  >
                    <ArrowUp className="w-4 h-4 mr-1" />
                    Ascending
                  </Button>
                  <Button
                    variant={idSort === "desc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIdSort(idSort === "desc" ? null : "desc")}
                    className={cn(
                      "flex-1",
                      idSort === "desc" &&
                        "bg-red-800 hover:bg-red-700 text-white"
                    )}
                  >
                    <ArrowDown className="w-4 h-4 mr-1" />
                    Descending
                  </Button>
                </div>
              </div>
            )}

            {/* Status Dropdown Section */}
            {statusColumn && statusOptions.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {statusColumn.header}
                </label>
                <Select
                  value={statusFilter || "all"}
                  onValueChange={(value) =>
                    setStatusFilter(value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Other Columns Input Fields */}
            {otherColumns.length > 0 && (
              <div className="space-y-3">
                {otherColumns.map((column) => {
                  return (
                    <div key={column.header} className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {column.header}
                      </label>
                      <Input
                        type="text"
                        placeholder={`Search ${column.header.toLowerCase()}...`}
                        value={getColumnFilterValue(column.dataKey)}
                        onChange={(e) =>
                          handleColumnFilterChange(
                            column.header,
                            e.target.value
                          )
                        }
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 border-t">
            <Button
              variant="outline"
              onClick={handleClearFilter}
              className="flex-1"
              disabled={!hasActiveFilters}
            >
              Clear All
            </Button>
            <Button
              onClick={handleApplyFilter}
              className="flex-1 bg-red-800 hover:bg-red-700 text-white"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterCard;
