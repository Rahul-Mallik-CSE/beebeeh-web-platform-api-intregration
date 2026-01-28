/** @format */
"use client";
import React from "react";
import StatsCard from "./SubComponents/StatsCard";
import { StatsCardData } from "@/types/ReportModuleTypes";
import { FaTools } from "react-icons/fa";
import { TbSettingsCheck, TbSettingsCog } from "react-icons/tb";
import { ReportModuleData } from "@/redux/features/adminFeatures/reportmoduleAPI";

interface StatsSectionProps {
  data?: ReportModuleData;
  selectedPeriod: "this_month" | "last_month" | "this_year";
  onPeriodChange: (period: "this_month" | "last_month" | "this_year") => void;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  data,
  selectedPeriod,
  onPeriodChange,
}) => {
  const generateStatsCardsData = (): StatsCardData[] => {
    if (!data) return [];

    const { header_summary } = data;

    return [
      {
        id: "1",
        icon: FaTools,
        title: "Parts Used",
        value: header_summary.parts_used.total,
        trend: "up",
        percentage: header_summary.percentage.parts_used,
        bgColor: "bg-yellow-50",
        iconColor: "text-yellow-500",
      },
      {
        id: "2",
        icon: FaTools,
        title: "Total Installations",
        value: header_summary.total_installations,
        trend: "down",
        percentage: header_summary.percentage.total_installations,
        bgColor: "bg-pink-50",
        iconColor: "text-pink-500",
      },
      {
        id: "3",
        icon: TbSettingsCog,
        title: "Total Repairs",
        value: header_summary.total_repairs,
        trend: "up",
        percentage: header_summary.percentage.total_repairs,
        bgColor: "bg-purple-50",
        iconColor: "text-purple-500",
      },
      {
        id: "4",
        icon: TbSettingsCheck,
        title: "Total Maintenance",
        value: header_summary.total_maintenance,
        trend: "down",
        percentage: header_summary.percentage.total_maintenance,
        bgColor: "bg-orange-50",
        iconColor: "text-orange-500",
      },
    ];
  };

  const statsCardsData = generateStatsCardsData();

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "this_month" | "last_month" | "this_year";
    onPeriodChange(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#535F72]">
          Report Module
        </h1>
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="this_year">This Year</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statsCardsData.map((cardData) => (
          <StatsCard key={cardData.id} data={cardData} />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
