/** @format */

import React from "react";
import Image from "next/image";
import { StatsCardData } from "@/types/ReportModuleTypes";

import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

interface StatsCardProps {
  data: StatsCardData;
}

const StatsCard: React.FC<StatsCardProps> = ({ data }) => {
  const {
    icon: Icon,
    title,
    value,
    trend,
    percentage,
    bgColor,
    iconColor,
  } = data;

  return (
    <div
      className={`bg-white rounded-2xl p-3 sm:p-4 space-y-3 sm:space-y-4 transition-all hover:shadow-md`}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div
          className={` ${bgColor} w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xl sm:text-2xl`}
        >
          <Icon className={`text-lg sm:text-xl ${iconColor}`} />
        </div>
        <div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl font-bold">
            {title}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={`text-xs sm:text-sm flex items-center font-semibold ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <GoTriangleUp size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <GoTriangleDown size={16} className="sm:w-5 sm:h-5" />
            )}
            {percentage}%
          </span>
          <Image
            src={trend === "up" ? "/statsUp.png" : "/statsDown.png"}
            alt={trend === "up" ? "Trending up" : "Trending down"}
            width={60}
            height={40}
            className="object-contain w-10 h-7 sm:w-[60px] sm:h-10"
          />
        </div>
        <div>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
