/** @format */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { PartDetails } from "@/types/PartsTypes";
import { GiAutoRepair } from "react-icons/gi";
import { FaBox } from "react-icons/fa";
import { IoIosCard } from "react-icons/io";

interface PartsDetailsSectionProps {
  part: PartDetails;
  onEdit?: () => void;
  onDelete?: () => void;
  onRestock?: () => void;
}

const PartsDetailsSection: React.FC<PartsDetailsSectionProps> = ({
  part,
  onEdit,
  onDelete,
  onRestock,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stocks In":
        return "bg-emerald-100 text-emerald-700";
      case "Stocks Out":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
        {/* Part Info Section */}
        <div className="space-y-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {part.name}
          </h2>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">
              Part ID: {part.partId}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">SKU: {part.sku}</p>
            <p className="text-xs sm:text-sm text-gray-600">
              Unit: {part.unit}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Unit Price: {part.unit_price}$
            </p>
          </div>
          <div
            className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-sm text-xs font-medium ${getStatusColor(
              part.status,
            )}`}
          >
            {part.status}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Restock Button */}
          <Button
            onClick={onRestock}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm flex-1 sm:flex-none px-3 sm:px-4"
          >
            <FaBox className="w-3 h-3 sm:w-4 sm:h-4" />
            Restock
          </Button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[
          {
            id: "maintenanceStock",
            label: "Maintenance Stock",
            value: part.maintenanceStock,
            icon: GiAutoRepair,
            iconBgColor: "bg-purple-100",
            iconColor: "text-purple-600",
          },
          {
            id: "models",
            label: "Models",
            value: part.models,
            icon: IoIosCard,
            iconBgColor: "bg-blue-100",
            iconColor: "text-blue-600",
          },
          {
            id: "stock",
            label: "Stock",
            value: part.stock,
            icon: FaBox,
            iconBgColor: "bg-cyan-100",
            iconColor: "text-cyan-600",
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
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartsDetailsSection;
