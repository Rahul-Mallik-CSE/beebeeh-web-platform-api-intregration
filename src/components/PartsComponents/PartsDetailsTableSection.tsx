/** @format */
"use client";
import React from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { usedHistoryColumns } from "@/data/PartsData";
import { UsedHistory } from "@/types/PartsTypes";

interface PartsDetailsTableSectionProps {
  usedHistory: UsedHistory[];
}

const PartsDetailsTableSection: React.FC<PartsDetailsTableSectionProps> = ({
  usedHistory,
}) => {
  return (
    <div className="w-full bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
        Used History
      </h3>
      <CustomTable
        data={usedHistory}
        columns={usedHistoryColumns}
        itemsPerPage={10}
        showFilter={false}
      />
    </div>
  );
};

export default PartsDetailsTableSection;
