/** @format */

"use client";
import React from "react";
import StatsCard from "./StatsCard";
import { FaChartLine, FaClockRotateLeft } from "react-icons/fa6";
import { PiSunHorizonFill } from "react-icons/pi";
import { TbSettingsPlus } from "react-icons/tb";
import StatsCardLoadingView from "../LoadingComponents/StatsCardLoadingView";

interface StatsSectionProps {
  isLoading?: boolean;
  cards?: any;
  cardTrends?: any;
}

const StatsSection = ({ isLoading, cards, cardTrends }: StatsSectionProps) => {
  if (isLoading || !cards || !cardTrends) {
    return <StatsCardLoadingView />;
  }

  const statsData = [
    {
      id: 1,
      title: "Today's Jobs",
      value: cards.todays_jobs.toString(),
      icon: <FaChartLine className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />,
      trend: `${cardTrends.todays_jobs.change_pct}% ${cardTrends.todays_jobs.compare_text}`,
      trendDirection: cardTrends.todays_jobs.direction,
      iconBgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Completed Work",
      value: cards.completed_work.toString(),
      icon: (
        <PiSunHorizonFill className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
      ),
      trend: `${cardTrends.completed_work.change_pct}% ${cardTrends.completed_work.compare_text}`,
      trendDirection: cardTrends.completed_work.direction,
      iconBgColor: "bg-purple-100",
    },
    {
      id: 3,
      title: "Pending Jobs",
      value: cards.pending_jobs.toString(),
      icon: (
        <FaClockRotateLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#FEC12C]" />
      ),
      trend: `${cardTrends.pending_jobs.change_pct}% ${cardTrends.pending_jobs.compare_text}`,
      trendDirection: cardTrends.pending_jobs.direction,
      iconBgColor: "bg-[#FEC12C26]",
    },
    {
      id: 4,
      title: "Total Jobs This Month",
      value: cards.total_this_month.toString(),
      icon: <TbSettingsPlus className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />,
      trend: `${cardTrends.total_this_month.change_pct}% ${cardTrends.total_this_month.compare_text}`,
      trendDirection: cardTrends.total_this_month.direction,
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
