/** @format */

import React from "react";

const StatsCardLoadingView = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
        >
          {/* Title skeleton */}
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>

          {/* Number and icon container */}
          <div className="flex items-center justify-between mb-3">
            {/* Large number skeleton */}
            <div className="h-10 bg-gray-200 rounded w-24"></div>

            {/* Icon skeleton */}
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          </div>

          {/* Percentage text skeleton */}
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default StatsCardLoadingView;
