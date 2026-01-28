/** @format */
import React from "react";
import { HeaderSummary } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface HeaderSummaryCardProps {
  data?: HeaderSummary;
}

const HeaderSummaryCard = ({ data }: HeaderSummaryCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "assign":
        return "bg-yellow-100 text-yellow-800";
      case "cancel":
        return "bg-red-100 text-red-800";
      case "rescheduled":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return "N/A";
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Header Summary card:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Job ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            #{data?.job_id || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Job Type :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm capitalize">
            {data?.job_type || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Priority :
          </p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(data?.priority)}`}
          >
            {data?.priority
              ? data.priority.charAt(0).toUpperCase() + data.priority.slice(1)
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Status :
          </p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data?.status)}`}
          >
            {data?.status
              ? data.status.charAt(0).toUpperCase() +
                data.status.slice(1).replace("_", " ")
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Scheduled Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {formatDate(data?.scheduled_date)}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Scheduled Time :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {formatTime(data?.scheduled_time)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderSummaryCard;
