/** @format */

"use client";
import OverviewTableSection from "@/components/OverviewsComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewsComponents/StatsSection";
import { useGetDashboardQuery } from "@/redux/features/technicianFeatures/overViewAPI";
import React from "react";

const OverviewPage = () => {
  const { data, isLoading, error } = useGetDashboardQuery();

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
        />
      </div>
    </div>
  );
};

export default OverviewPage;
