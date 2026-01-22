/** @format */
import React from "react";
import { ProductDetailsSection as ProductDetailsData } from "@/types/JobDetailsTypes";
import { format } from "date-fns";

interface ProductDetailsSectionProps {
  data: ProductDetailsData;
}

const ProductDetailsSection = ({ data }: ProductDetailsSectionProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy");
    } catch {
      return dateString;
    }
  };
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
          <p className="text-gray-500 text-xs sm:text-sm">{data.model_name}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Alias :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{data.alias}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Product ID :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">{data.id}</p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Installed Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data.installed_date
              ? formatDate(data.installed_date)
              : "Not installed (New Installation)"}
          </p>
        </div>
        <div className="flex items-center justify-between py-1.5 sm:py-2">
          <p className="text-gray-800 font-medium text-sm sm:text-base">
            Last Service Date :
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            {data.last_service_date
              ? formatDate(data.last_service_date)
              : "N/A (First time)"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
