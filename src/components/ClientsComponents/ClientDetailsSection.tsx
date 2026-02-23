/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { MdBlockFlipped, MdEmail, MdLocalPhone } from "react-icons/md";
import {
  ClientDetails,
  MaintenanceReminderCancellation,
} from "@/types/ClientsTypes";
import { BriefcaseBusiness, CalendarCheck } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbSquareRoundedCheck } from "react-icons/tb";
import { getImageFullUrl } from "@/lib/utils";

interface ClientDetailsSectionProps {
  client: ClientDetails;
  onEdit?: () => void;
  onDisable?: () => void;
  isTogglingStatus?: boolean;
  isActive?: boolean;
  maintenanceReminderCancellations?: MaintenanceReminderCancellation[];
}

const ClientDetailsSection: React.FC<ClientDetailsSectionProps> = ({
  client,
  onEdit,
  onDisable,
  isTogglingStatus = false,
  isActive = true,
  maintenanceReminderCancellations = [],
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-emerald-100 text-emerald-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      case "Busy":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
        {/* Profile Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Profile Image */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-linear-to-br from-pink-400 to-purple-500 shrink-0">
            {client.profileImage ? (
              <Image
                src={getImageFullUrl(client.profileImage)}
                alt={client.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Name and ID */}
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {client.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              ID: {client.clientId}
            </p>
            <div
              className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm text-xs font-medium ${getStatusColor(
                client.status,
              )}`}
            >
              {client.status}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Edit Client Button */}
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Edit Client</span>
            <span className="sm:hidden">Edit</span>
          </Button>

          {/* Disable/Enable Account Button */}
          <Button
            onClick={onDisable}
            variant="outline"
            disabled={isTogglingStatus}
            className="border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <MdBlockFlipped className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline">
              {isTogglingStatus
                ? isActive
                  ? "Disabling..."
                  : "Enabling..."
                : isActive
                  ? "Disable Account"
                  : "Enable Account"}
            </span>
            <span className="lg:hidden">
              {isTogglingStatus
                ? isActive
                  ? "Disabling..."
                  : "Enabling..."
                : isActive
                  ? "Disable"
                  : "Enable"}
            </span>
          </Button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            id: "phone",
            label: "Phone",
            value: client.contactNumber,
            icon: MdLocalPhone,
            iconBgColor: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            id: "email",
            label: "Email",
            value: client.email,
            icon: MdEmail,
            iconBgColor: "bg-purple-100",
            iconColor: "text-purple-600",
          },
          {
            id: "address",
            label: "Address",
            value: client.address,
            icon: FaMapMarkerAlt,
            iconBgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            id: "totalJob",
            label: "Total Job",
            value: client.totalJobs,
            icon: TbSquareRoundedCheck,
            iconBgColor: "bg-cyan-100",
            iconColor: "text-cyan-600",
          },
        ].map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${card.iconBgColor} rounded-lg flex items-center justify-center shrink-0`}
                >
                  <IconComponent
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${card.iconColor}`}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  {card.label}
                </span>
              </div>
              <p
                className={`${
                  card.id === "totalJob"
                    ? "text-xl sm:text-2xl"
                    : "text-sm sm:text-base"
                } font-semibold text-gray-800 wrap-break-words`}
              >
                {card.value}
              </p>
            </div>
          );
        })}

        {/* Last Completed Job Box */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
              <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Last Job
            </span>
          </div>
          {client.lastCompletedJob ? (
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                {client.lastCompletedJob.jobId}
              </p>
              <p className="text-xs text-gray-500">
                Completed Date: {client.lastCompletedJob.completeDate}
              </p>
            </div>
          ) : (
            <p className="text-sm sm:text-base font-semibold text-gray-400">
              N/A
            </p>
          )}
        </div>

        {/* Upcoming Job Box */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
              <BriefcaseBusiness className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-600">
              Next Job
            </span>
          </div>
          {client.upcomingJob ? (
            <div className="space-y-0.5">
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                {client.upcomingJob.jobId}
              </p>
              <p className="text-xs text-gray-500">
                Scheduled Date: {client.upcomingJob.scheduledDate}
              </p>
            </div>
          ) : (
            <p className="text-sm sm:text-base font-semibold text-gray-400">
              N/A
            </p>
          )}
        </div>
      </div>

      {/* Maintenance Reminder Cancellations */}
      {maintenanceReminderCancellations.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Maintenance Reminder Cancellations
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                {maintenanceReminderCancellations.length}
              </span>
            </span>
          </div>

          <div className="divide-y divide-gray-200">
            {maintenanceReminderCancellations.map((item, index) => (
              <div
                key={index}
                className="py-3 first:pt-0 last:pb-0 space-y-1 border-b border-gray-200"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-800 bg-gray-200 px-2 py-0.5 rounded">
                    {item.installationId}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(item.cancelledAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <p className="text-xs text-gray-500">
                    Cancelled by:{" "}
                    <span className="font-medium text-gray-700">
                      {item.cancelledBy}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-gray-700">Reason: {item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetailsSection;
