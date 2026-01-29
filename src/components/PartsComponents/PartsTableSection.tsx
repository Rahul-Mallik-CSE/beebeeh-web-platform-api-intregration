/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import TableSkeleton from "@/components/CommonComponents/TableSkeleton";
import { partsColumns } from "@/data/PartsData";
import { Part } from "@/types/PartsTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AddPartsModal from "./AddPartsModal";
import {
  useGetPartsQuery,
  useSearchPartsQuery,
} from "@/redux/features/adminFeatures/partsAPI";

const PartsTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);

  const queryParams = { page: 1, limit: 1000 };

  const { data: allData, isLoading: allLoading } = useGetPartsQuery(
    queryParams,
    { skip: !!searchQuery },
  );
  const { data: searchData, isLoading: searchLoading } = useSearchPartsQuery(
    { search: searchQuery, ...queryParams },
    { skip: !searchQuery },
  );

  const data = searchQuery ? searchData : allData;
  const isLoading = searchQuery ? searchLoading : allLoading;

  const parts = data?.data || [];

  const handleAddPart = (partData: any) => {
    console.log("Adding part:", partData);
    // Add logic to save part
  };

  const handleViewPart = (part: Part) => {
    router.push(`/parts/${part.part_id}`);
  };

  const columnsWithActions = [
    ...partsColumns,
    {
      header: "Action",
      accessor: (row: Part) => (
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => handleViewPart(row)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button
            onClick={() => console.log("Delete", row.part_id)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Parts
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Add Button */}
          <Button
            onClick={() => setIsAddPartModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Add New Parts</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton rows={10} columns={7} />
        ) : (
          <CustomTable
            data={parts}
            columns={columnsWithActions}
            itemsPerPage={10}
            excludeFilterColumns={["Action"]}
          />
        )}
      </div>

      {/* Add Parts Modal */}
      <AddPartsModal
        isOpen={isAddPartModalOpen}
        onClose={() => setIsAddPartModalOpen(false)}
        onSave={handleAddPart}
      />
    </div>
  );
};

export default PartsTableSection;
