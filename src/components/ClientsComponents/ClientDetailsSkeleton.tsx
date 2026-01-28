/** @format */
import React from "react";

const ClientDetailsSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Profile Section Skeleton */}
      <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header with Profile */}
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
          {/* Profile Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Profile Image Skeleton */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 shrink-0"></div>

            {/* Name and ID Skeleton */}
            <div className="space-y-2">
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-40 sm:w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="h-9 sm:h-10 bg-gray-200 rounded flex-1 sm:flex-none w-full sm:w-32"></div>
            <div className="h-9 sm:h-10 bg-gray-200 rounded flex-1 sm:flex-none w-full sm:w-36"></div>
          </div>
        </div>

        {/* Info Cards Grid Skeleton */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-lg shrink-0"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Job History Section Skeleton */}
      <div className="w-full bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200 mt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="h-6 bg-gray-300 rounded w-48"></div>
        </div>

        {/* Table Skeleton */}
        <div className="space-y-3">
          {/* Table Header */}
          <div className="bg-[#F1F4F9] rounded-lg p-3 sm:p-4">
            <div className="grid grid-cols-7 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={`header-${i}`} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={`row-${row}`} className="p-3 sm:p-4 bg-white border-b border-gray-200">
              <div className="grid grid-cols-7 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((col) => (
                  <div
                    key={`cell-${row}-${col}`}
                    className="h-4 bg-gray-200 rounded"
                    style={{ width: col === 7 ? "40%" : "80%" }}
                  ></div>
                ))}
              </div>
            </div>
          ))}

          {/* Pagination Skeleton */}
          <div className="flex justify-center items-center gap-2 p-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsSkeleton;
