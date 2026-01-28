/** @format */
import React from "react";

const TechnicianDetailsSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4 sm:space-y-6">
      {/* Profile Section Skeleton */}
      <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header with Profile */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300 shrink-0"></div>
            <div className="space-y-2">
              <div className="h-6 sm:h-7 bg-gray-300 rounded w-40 sm:w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="h-9 sm:h-10 bg-gray-200 rounded w-full sm:w-32"></div>
            <div className="h-9 sm:h-10 bg-gray-200 rounded w-full sm:w-36"></div>
            <div className="h-9 sm:h-10 bg-gray-200 rounded w-full sm:w-32"></div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-lg"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
          <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded-full w-48 mx-auto"></div>
        </div>
      </div>

      {/* Tables Section Skeleton */}
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
            <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((row) => (
                <div key={row} className="h-10 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianDetailsSkeleton;
