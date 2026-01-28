/** @format */

import React from "react";
import StatsCard from "./StatsCard";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";
import { PiSunHorizonFill } from "react-icons/pi";
import { TbSettingsPlus } from "react-icons/tb";
import { HeaderCards } from "@/redux/features/adminFeatures/overViewAPI";

interface StatsSectionProps {
  data?: HeaderCards;
  isLoading?: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatTrend = (trend: {
    percent: number;
    direction: string;
    period: string;
  }) => {
    return `${trend.percent.toFixed(1)}% ${trend.direction === "up" ? "Up" : "Down"} from ${trend.period.replace("_", " ")}`;
  };

  const statsData = data
    ? [
        {
          id: 1,
          title: "Total Service",
          value: data.total_service.value.toString(),
          icon: <FaChartLine className="w-7 h-7 text-green-600" />,
          trend: formatTrend(data.total_service.trend),
          trendDirection: data.total_service.trend.direction,
          iconBgColor: "bg-green-50",
        },
        {
          id: 2,
          title: "Total Client",
          value: data.total_client.value.toString(),
          icon: <PiSunHorizonFill className="w-7 h-7 text-purple-600" />,
          trend: formatTrend(data.total_client.trend),
          trendDirection: data.total_client.trend.direction,
          iconBgColor: "bg-purple-100",
        },
        {
          id: 3,
          title: "Total Technician",
          value: data.total_technician.value.toString(),
          icon: <FaClockRotateLeft className="w-7 h-7 text-[#FEC12C]" />,
          trend: formatTrend(data.total_technician.trend),
          trendDirection: data.total_technician.trend.direction,
          iconBgColor: "bg-[#FEC12C26]",
        },
        {
          id: 4,
          title: "Active Service",
          value: data.active_service.value.toString(),
          icon: <TbSettingsPlus className="w-7 h-7 text-red-600" />,
          trend: formatTrend(data.active_service.trend),
          trendDirection: data.active_service.trend.direction,
          iconBgColor: "bg-red-100",
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          trendDirection={stat.trendDirection}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  );
};

export default StatsSection;
