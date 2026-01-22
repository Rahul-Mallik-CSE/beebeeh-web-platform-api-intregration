/** @format */
import React from "react";
import { HeaderSummaryCard as HeaderSummaryCardData } from "@/types/JobDetailsTypes";
import { format } from "date-fns";

interface HeaderSummaryCardProps {
  data: HeaderSummaryCardData;
}

const HeaderSummaryCard = ({ data }: HeaderSummaryCardProps) => {
  // Format the scheduled datetime
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy, h:mm a");
    } catch {
      return dateString;
    }
  };
  return (
    <div className="bg-white   ">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Header Summary card:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Job ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">#{data.job_id}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Job Type :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{data.job_type}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Product Model :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data.product_model}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Serial Number :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data.serial_number || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Client Name :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{data.client_name}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Client Location :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data.client_location}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Scheduled Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {formatDateTime(data.scheduled_datetime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSummaryCard;
