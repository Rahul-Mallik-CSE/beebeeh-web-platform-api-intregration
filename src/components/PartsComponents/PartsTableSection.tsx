/** @format */
"use client";
import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import TableSkeleton from "@/components/CommonComponents/TableSkeleton";
import { partsColumns } from "@/data/PartsData";
import { Part } from "@/types/PartsTypes";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import AddPartsModal from "./AddPartsModal";
import { toast } from "react-toastify";
import { FilterState } from "../CommonComponents/FilterCard";
import {
  useDeletePartMutation,
  PartItem,
} from "@/redux/features/adminFeatures/partsAPI";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PartsTableSectionProps {
  data?: PartItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filterState: FilterState) => void;
  onPartAdded?: () => void;
}

const PartsTableSection: React.FC<PartsTableSectionProps> = ({
  data = [],
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  onPartAdded,
}) => {
  const router = useRouter();
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);
  const [deletePartId, setDeletePartId] = useState<string | null>(null);

  // Delete mutation
  const [deletePart, { isLoading: isDeleting }] = useDeletePartMutation();

  const handleAddPart = () => {
    setIsAddPartModalOpen(false);
    onPartAdded?.();
  };

  const handleViewPart = (part: Part) => {
    router.push(`/parts/${part.part_id}`);
  };

  const handleDeletePart = async () => {
    if (!deletePartId) return;

    try {
      await deletePart(deletePartId).unwrap();
      toast.success("Part deleted successfully");
      setDeletePartId(null);
      onPartAdded?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete part");
    }
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
            title="View Details"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
          <TableSkeleton rows={10} columns={8} />
        ) : (
          <CustomTable
            key={`parts-${currentPage}`}
            data={data}
            columns={columnsWithActions}
            itemsPerPage={10}
            serverSidePagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onFilterChange={onFilterChange}
            excludeFilterColumns={["Action", "Unit"]}
            predefinedStatusOptions={["Stock In", "Low Stock", "Stock Out"]}
          />
        )}
      </div>

      {/* Add Parts Modal */}
      <AddPartsModal
        isOpen={isAddPartModalOpen}
        onClose={() => setIsAddPartModalOpen(false)}
        onSave={handleAddPart}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletePartId}
        onOpenChange={() => setDeletePartId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Part</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this part? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePart}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PartsTableSection;
