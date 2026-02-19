/** @format */

"use client";
import OverviewTableSection from "@/components/OverviewsComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewsComponents/StatsSection";
import { Button } from "@/components/ui/button";
import {
  useGetDashboardQuery,
  DashboardFilters,
} from "@/redux/features/technicianFeatures/overViewAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OverviewPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<DashboardFilters>({
    page: 1,
    page_size: 10,
  });

  const { data, isLoading, error } = useGetDashboardQuery(filters);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: DashboardFilters) => {
    // Replace filters entirely to allow undefined values to clear previous filters
    setFilters({
      page: newFilters.page || 1,
      page_size: newFilters.page_size || 10,
      ...newFilters,
    });
  };

  const handleViewCalendar = () => {
    const userRaw = localStorage.getItem("user");
    const technicianId = userRaw ? JSON.parse(userRaw)?.id : "";
    router.push(`/overviews/calendar?technicianId=${technicianId}`);
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

        <div className="w-full flex justify-end">
          <Button
            onClick={handleViewCalendar}
            className="bg-red-900 hover:bg-red-950 "
          >
            View Calender
          </Button>
        </div>

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
