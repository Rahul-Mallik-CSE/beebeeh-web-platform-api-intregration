/** @format */
import React from "react";
import { MapPin } from "lucide-react";

const ClientInfoSection = () => {
  // Example coordinates for the address
  const latitude = 34.0522;
  const longitude = -118.2437;

  const handleMapClick = () => {
    // Open Google Maps with the coordinates
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Client Information Section:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Client Name :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">John Doe</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Contact Number :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">+1 345 824 9384</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Address :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            24 New Street, Los Angeles
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Locality :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">Downtown</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Notes :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Water pressure low last visit
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Pin Location :
          </p>
          <button
            onClick={handleMapClick}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FF6F001A] text-gray-600 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoSection;
