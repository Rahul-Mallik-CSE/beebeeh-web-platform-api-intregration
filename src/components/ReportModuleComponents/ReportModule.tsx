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
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
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

export default ReportModule;
