/** @format */
import React from "react";
import { TechnicianDetails } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface TechnicianDetailsSectionProps {
  data?: TechnicianDetails;
}

const TechnicianDetailsSection = ({ data }: TechnicianDetailsSectionProps) => {
  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Technician Information Section:
      </h3>
      <div className="space-y-2 sm:space-y-3 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Technician ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.technician_id || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Technician Name :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.technician_name || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Contact Number :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.contact_number || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailsSection;
