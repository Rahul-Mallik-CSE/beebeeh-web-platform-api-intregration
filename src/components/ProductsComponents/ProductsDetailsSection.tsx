/** @format */
"use client";
import React from "react";
import { ProductDetails } from "@/types/ProductsTypes";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { IoIosCard } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";

interface ProductsDetailsSectionProps {
  product: ProductDetails;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

const ProductsDetailsSection: React.FC<ProductsDetailsSectionProps> = ({
  product,
  onEdit,
  onView,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stock Out":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "In Stock":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white">
      {/* Product Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            {product.modelName}
          </h1>
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-1">
            ID: {product.productId}
          </p>
          <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-0.5">
            Alias : {product.alias}
          </p>
          <span
            className={`inline-block px-2 sm:px-3 py-1 rounded-md text-xs font-medium mt-2 ${getStatusColor(
              product.status
            )}`}
          >
            {product.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm px-2 sm:px-3 md:px-4 h-8 sm:h-9"
          >
            <Pencil className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Edit Product</span>
            <span className="xs:hidden">Edit</span>
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm px-2 sm:px-3 md:px-4 h-8 sm:h-9 border-none bg-gray-100 hover:bg-gray-50"
          >
            <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Delete Product</span>
            <span className="xs:hidden">Delete</span>
          </Button>
          <Button
            onClick={onView}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm px-2 sm:px-3 md:px-4 h-8 sm:h-9"
          >
            <FaBox className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            Re-stock
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={<IoIosCard className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Domestic Freq"
          value={product.domesticFreq}
          bgColor="bg-pink-200"
          iconColor="text-pink-500"
        />
        <StatCard
          icon={<IoIosCard className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Commercial Freq"
          value={product.commercialFreq}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={<GiAutoRepair className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Parts"
          value={product.parts}
          bgColor="bg-[#E0E7FF]"
          iconColor="text-[#4f46e5]"
        />
        <StatCard
          icon={<FaBox className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Stock"
          value={product.stock}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-gray-50  rounded-xl p-3 sm:p-4">
      <div className="flex items-start gap-2 sm:gap-3">
        <div
          className={`${bgColor} ${iconColor} p-2 sm:p-2.5 rounded-lg flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-sm sm:text-base font-medium text-gray-800 wrap-break-word">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsSection;
