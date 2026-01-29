/** @format */
"use client";

import PartsDetailsSection from "@/components/PartsComponents/PartsDetailsSection";
import PartsDetailsTableSection from "@/components/PartsComponents/PartsDetailsTableSection";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { useGetPartDetailsQuery } from "@/redux/features/adminFeatures/partsAPI";
import TableSkeleton from "@/components/CommonComponents/TableSkeleton";
import { Button } from "@/components/ui/button";

const PartsDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const partsId = params["parts-id"] as string;

  // Fetch part details from API
  const {
    data: partResponse,
    isLoading,
    error,
  } = useGetPartDetailsQuery(partsId);

  // Transform API data to match component expectations
  const transformedPart = partResponse?.data
    ? {
        id: partResponse.data.part_id,
        partId: partResponse.data.part_id,
        name: partResponse.data.name,
        unit: partResponse.data.unit,
        status: (partResponse.data.stock > partResponse.data.min_stock
          ? "Stocks In"
          : partResponse.data.stock === 0
            ? "Stocks Out"
            : "Low Stock") as "Stocks In" | "Stocks Out" | "Low Stock",
        maintenanceStock: partResponse.data.stock, // Using stock as maintenance stock for now
        models: partResponse.data.models,
        stock: partResponse.data.stock,
        usedHistory: partResponse.data.used_history.map((history, index) => ({
          id: `${history.job_id}-${index}`,
          jobId: history.job_id,
          technician: "Unknown", // API doesn't provide technician info
          type: history.job_type,
          date: new Date(history.used_at).toLocaleDateString(),
        })),
      }
    : null;

  const handleEdit = () => {
    console.log("Edit part:", partsId);
  };

  const handleDelete = () => {
    console.log("Delete part:", partsId);
  };

  const handleRestock = () => {
    console.log("Restock part:", partsId);
  };

  if (error) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="text-center text-red-600">
              <p>Failed to load part details. Please try again.</p>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="mt-4"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !transformedPart) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => router.back()}
                  className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">
                  Parts Details
                </span>
              </div>
            </div>
            <TableSkeleton rows={5} columns={3} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => router.back()}
                className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                Parts Details
              </span>
            </div>
          </div>

          {/* Part data section */}
          <PartsDetailsSection
            part={transformedPart}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestock={handleRestock}
          />

          {/* Part related tables section */}
          <PartsDetailsTableSection usedHistory={transformedPart.usedHistory} />
        </div>
      </div>
    </div>
  );
};

export default PartsDetailsPage;
