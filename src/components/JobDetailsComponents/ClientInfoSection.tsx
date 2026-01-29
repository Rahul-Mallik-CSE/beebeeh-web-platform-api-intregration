/** @format */
"use client";
import React from "react";
import { MapPin } from "lucide-react";
import { ClientInformation } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface ClientInfoSectionProps {
  data?: ClientInformation;
}

const ClientInfoSection = ({ data }: ClientInfoSectionProps) => {
  const handleMapClick = () => {
    if (data?.pin_location?.latitude && data?.pin_location?.longitude) {
      const googleMapsUrl = `https://www.google.com/maps?q=${data.pin_location.latitude},${data.pin_location.longitude}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Client Information Section:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Client ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.client_id || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Client Name :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.client_name || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Contact Number :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.contact_number || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Address :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.address || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Locality :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.locality || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Notes :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.notes || "N/A"}
          </p>
        </div>
        {/* <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Pin Location :
          </p>
          <button
            onClick={handleMapClick}
            disabled={
              !data?.pin_location?.latitude || !data?.pin_location?.longitude
            }
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors cursor-pointer ${
              data?.pin_location?.latitude && data?.pin_location?.longitude
                ? "bg-[#FF6F001A] text-gray-600 hover:bg-orange-100"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Map</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ClientInfoSection;
