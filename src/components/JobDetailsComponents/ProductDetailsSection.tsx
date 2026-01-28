/** @format */
import React from "react";
import { ProductDetails } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface ProductDetailsSectionProps {
  data?: ProductDetails;
  isLoading?: boolean;
}

const ProductDetailsSection = ({
  data,
  isLoading,
}: ProductDetailsSectionProps) => {
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

  if (isLoading) {
    return (
      <div className="bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          Product Details Section:
        </h3>
        <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Product Details Section:
      </h3>
      <div className="space-y-3 sm:space-y-4 border border-gray-200 p-3 sm:p-4 rounded-2xl">
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Product ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.product_id || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Product Model Name :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.product_model_name || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Alias :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data?.alias || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Installed Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {formatDate(data?.installed_date)}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Last Service Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {formatDate(data?.last_service_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
