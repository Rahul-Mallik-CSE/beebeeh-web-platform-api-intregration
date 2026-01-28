/** @format */
import React from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns = 9,
}) => {
  return (
    <div className="w-full animate-pulse">
      {/* Table Header Skeleton */}
      <div className="bg-[#F1F4F9] rounded-t-lg p-3 sm:p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={`header-${i}`} className="h-4 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>

      {/* Table Body Skeleton */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="p-3 sm:p-4 bg-white hover:bg-gray-50"
          >
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-4 bg-gray-200 rounded"
                  style={{
                    width: colIndex === 0 ? "60%" : colIndex === columns - 1 ? "40%" : "80%",
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-2 p-4 bg-white rounded-b-lg border-t">
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
        <div className="h-10 w-10 bg-gray-200 rounded"></div>
        <div className="h-10 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
