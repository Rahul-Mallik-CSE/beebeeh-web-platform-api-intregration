/** @format */

import React from "react";
import StatsCard from "./SubComponents/StatsCard";

/** @format */

import { StatsCardData } from "@/types/ReportModuleTypes";
import { FaTools } from "react-icons/fa";
import { TbSettingsCheck, TbSettingsCog } from "react-icons/tb";

export const statsCardsData: StatsCardData[] = [
  {
    id: "1",
    icon: FaTools,
    title: "Parts Used",
    value: 123,
    trend: "up",
    percentage: 10,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    id: "2",
    icon: FaTools,
    title: "Total Installations",
    value: 568,
    trend: "down",
    percentage: 5,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    id: "3",
    icon: TbSettingsCog,
    title: "Total Repairs",
    value: 123,
    trend: "up",
    percentage: 10,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    id: "4",
    icon: TbSettingsCheck,
    title: "Total Maintenance",
    value: 568,
    trend: "down",
    percentage: 5,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

const StatsSection = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-[#535F72]">
          Report Module
        </h1>
        <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
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
