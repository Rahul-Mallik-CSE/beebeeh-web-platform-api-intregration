/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { MdBlockFlipped, MdEmail, MdLocalPhone } from "react-icons/md";
import { FaMapMarkerAlt, FaWrench } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { TbSquareRoundedCheck } from "react-icons/tb";
import { BsCalendar2Check } from "react-icons/bs";
import { IoIosRadioButtonOn } from "react-icons/io";
import { TechnicianDashboardData } from "@/redux/features/adminFeatures/technicianAPI";

interface TechnicianDetailsSectionProps {
  data: TechnicianDashboardData;
  onEdit?: () => void;
  onDisable?: () => void;
  onAssignJob?: () => void;
}

const TechnicianDetailsSection: React.FC<TechnicianDetailsSectionProps> = ({
  data,
  onEdit,
  onDisable,
  onAssignJob,
}) => {
  const { technician, stats } = data;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-emerald-100 text-emerald-700";
      case "unavailable":
        return "bg-red-100 text-red-700";
      case "busy":
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
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-purple-500 shrink-0">
            {technician.profile_image ? (
              <Image
                src={technician.profile_image}
                alt={technician.full_name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                {technician.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* Name and ID */}
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              {technician.full_name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              ID: {technician.technician_id}
            </p>
            <div
              className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm text-xs font-medium capitalize ${getStatusColor(
                technician.status,
              )}`}
            >
              {technician.status}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Edit Technician Button */}
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Edit Technician</span>
            <span className="sm:hidden">Edit</span>
          </Button>

          {/* Disable Account Button */}
          <Button
            onClick={onDisable}
            variant="outline"
            className="border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <MdBlockFlipped className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              {technician.is_active ? "Disable Account" : "Enable Account"}
            </span>
            <span className="sm:hidden">
              {technician.is_active ? "Disable" : "Enable"}
            </span>
          </Button>

          {/* Assign Job Button */}
          <Button
            onClick={onAssignJob}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <span className="hidden sm:inline">Assign Job</span>
            <span className="sm:hidden">Assign</span>
          </Button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            id: "phone",
            label: "Phone",
            value: technician.contact_number,
            icon: MdLocalPhone,
            iconBgColor: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            id: "email",
            label: "Email",
            value: technician.email,
            icon: MdEmail,
            iconBgColor: "bg-purple-100",
            iconColor: "text-purple-600",
          },
          {
            id: "address",
            label: "Address",
            value:
              technician.address +
              (technician.town ? `, ${technician.town}` : ""),
            icon: FaMapMarkerAlt,
            iconBgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
          {
            id: "skills",
            label: "Skills",
            value: technician.skills.join(", ") || "No skills listed",
            icon: FaWrench,
            iconBgColor: "bg-amber-100",
            iconColor: "text-amber-600",
          },
        ].map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2"
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
              <p className="text-sm sm:text-base font-semibold text-gray-800 wrap-break-words h-12 overflow-hidden line-clamp-2">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            id: "rating",
            label: "Rating",
            value: stats.rating.toFixed(1),
            icon: FaStar,
            iconBgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
          },
          {
            id: "completedJobs",
            label: "Complete Job",
            value: stats.completed_jobs,
            icon: TbSquareRoundedCheck,
            iconBgColor: "bg-teal-100",
            iconColor: "text-teal-600",
          },
          {
            id: "todaysJobs",
            label: "Today's Job",
            value: stats.todays_jobs,
            icon: BsCalendar2Check,
            iconBgColor: "bg-pink-100",
            iconColor: "text-pink-600",
          },
          {
            id: "status",
            label: "Status",
            value: (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-medium capitalize ${getStatusColor(
                  technician.status,
                )}`}
              >
                {technician.status}
              </span>
            ),
            icon: IoIosRadioButtonOn,
            iconBgColor: "bg-emerald-100",
            iconColor: "text-emerald-600",
          },
        ].map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.id}
              className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2"
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
              <div className="text-xl sm:text-2xl font-semibold text-gray-800">
                {card.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechnicianDetailsSection;
