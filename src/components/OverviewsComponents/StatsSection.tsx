/** @format */

import React from "react";
import StatsCard from "./StatsCard";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";
import { PiSunHorizonFill } from "react-icons/pi";
import { TbSettingsPlus } from "react-icons/tb";

const StatsSection = () => {
  const statsData = [
    {
      id: 1,
      title: "Today's Jobs",
      value: "10293",
      icon: <FaChartLine className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
      trend: "1.3% Up from past week",
      trendDirection: "up" as const,
      iconBgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Pending Jobs Today",
      value: "10293",
      icon: (
        <PiSunHorizonFill className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
      ),
      trend: "4.3% Down from yesterday",
      trendDirection: "down" as const,
      iconBgColor: "bg-purple-100",
    },
    {
      id: 3,
      title: "Pending Jobs Today",
      value: "10293",
      icon: (
        <FaClockRotateLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#FEC12C]" />
      ),
      trend: "1.3% Up from past week",
      trendDirection: "up" as const,
      iconBgColor: "bg-[#FEC12C26]",
    },
    {
      id: 4,
      title: "Total Jobs This Month",
      value: "4",
      icon: <TbSettingsPlus className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />,
      trend: "1.3% Up from past week",
      trendDirection: "up" as const,
      iconBgColor: "bg-red-100",
    },
  ];

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
