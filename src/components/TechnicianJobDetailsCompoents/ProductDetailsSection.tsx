/** @format */
import React from "react";

const ProductDetailsSection = () => {
  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Product Details Section:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Product Model :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">AquaFilter Pro 200</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Alias :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">AP-200</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Serial Number :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">SN-20498</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Installed Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Not installed (New Installation)
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Last Service Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">N/A (First time)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
