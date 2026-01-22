/** @format */

"use client";
import OverviewTableSection from "@/components/OverviewsComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewsComponents/StatsSection";
import {
  useGetDashboardQuery,
  DashboardFilters,
} from "@/redux/features/technicianFeatures/overViewAPI";
import React, { useState } from "react";

const OverviewPage = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    page: 1,
    page_size: 10,
  });

  const { data, isLoading, error } = useGetDashboardQuery(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: DashboardFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1, // Reset to page 1 on filter change
    }));
  };

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* Stats section */}
        <StatsSection
          isLoading={isLoading}
          cards={data?.data?.cards}
          cardTrends={data?.data?.card_trends}
        />

        {/* Table section */}
        <OverviewTableSection
          isLoading={isLoading}
          recentJobs={data?.data?.recent_jobs}
          meta={data?.data?.meta}
          onPageChange={handlePageChange}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
