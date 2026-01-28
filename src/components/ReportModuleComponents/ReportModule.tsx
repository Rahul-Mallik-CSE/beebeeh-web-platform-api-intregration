/** @format */
"use client";
import React, { useState } from "react";
import StatsSection from "./StatsSection";
import ChartSection from "./ChartSection";
import TableSection from "./TableSection";
import { useGetReportModuleQuery } from "@/redux/features/adminFeatures/reportmoduleAPI";

const ReportModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "this_month" | "last_month" | "this_year"
  >("this_year");

  const { data, isLoading, error } = useGetReportModuleQuery({
    show: selectedPeriod,
  });

  if (isLoading) {
    return <ReportModuleLoadingView />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        Error loading report data
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent space-y-3 sm:space-y-4">
      <StatsSection
        data={data?.data}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <ChartSection data={data?.data} />
      <TableSection data={data?.data} />
    </div>
  );
};

// Loading component for ReportModule
const ReportModuleLoadingView = () => {
  return (
    <div className="w-full bg-transparent space-y-3 sm:space-y-4">
      {/* Stats Section Loading */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
            >
              {/* Icon skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              </div>

              {/* Number skeleton */}
              <div className="h-8 bg-gray-200 rounded w-16 mb-3"></div>

              {/* Percentage skeleton */}
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Job Activity Chart Loading (takes 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-80 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Job Distribution Chart Loading (takes 1 column) */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="h-80 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Table Section Loading */}
      <div className="w-full space-y-4 sm:space-y-6">
        {/* First Row - Two Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-16 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Two Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[3, 4].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-16 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Third Row - Two Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[5, 6].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-16 bg-gray-200 rounded-t-2xl"></div>
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex space-x-4">
                    <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-18"></div>
                    <div className="h-4 bg-gray-200 rounded w-14"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportModule;
