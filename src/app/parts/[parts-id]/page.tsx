/** @format */
"use client";

import PartsDetailsSection from "@/components/PartsComponents/PartsDetailsSection";
import PartsDetailsTableSection from "@/components/PartsComponents/PartsDetailsTableSection";
import { partDetailsData } from "@/data/PartsData";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

const PartsDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const partsId = params["parts-id"] as string;

  // Get part data based on the ID from URL
  const part = partDetailsData[partsId] || partDetailsData["1"];

  const handleEdit = () => {
    console.log("Edit part:", partsId);
  };

  const handleDelete = () => {
    console.log("Delete part:", partsId);
  };

  const handleRestock = () => {
    console.log("Restock part:", partsId);
  };

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
            part={part}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestock={handleRestock}
          />

          {/* Part related tables section */}
          <PartsDetailsTableSection usedHistory={part.usedHistory} />
        </div>
      </div>
    </div>
  );
};

export default PartsDetailsPage;
