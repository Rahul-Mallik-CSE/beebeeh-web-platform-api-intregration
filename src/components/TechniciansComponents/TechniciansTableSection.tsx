/** @format */
"use client";
import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AddTechnicianModal from "./AddTechnicianModal";
import {
  useDeleteTechnicianMutation,
  TechnicianListItem,
} from "@/redux/features/adminFeatures/technicianAPI";
import TableSkeleton from "../CommonComponents/TableSkeleton";
import { toast } from "react-toastify";
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
import { FilterState } from "../CommonComponents/FilterCard";

interface TechniciansTableSectionProps {
  data?: TechnicianListItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filterState: FilterState) => void;
  onTechnicianAdded?: () => void;
}

const TechniciansTableSection: React.FC<TechniciansTableSectionProps> = ({
  data = [],
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  onTechnicianAdded,
}) => {
  const router = useRouter();
  const [isAddTechnicianModalOpen, setIsAddTechnicianModalOpen] =
    useState(false);
  const [deleteTechnicianId, setDeleteTechnicianId] = useState<string | null>(
    null,
  );

  const [deleteTechnician, { isLoading: isDeleting }] =
    useDeleteTechnicianMutation();

  const handleAddTechnician = () => {
    setIsAddTechnicianModalOpen(false);
    onTechnicianAdded?.();
  };

  const handleViewTechnician = (technician: TechnicianListItem) => {
    router.push(`/technicians/${technician.technician_id}`);
  };

  const handleDeleteClick = (technicianId: string) => {
    setDeleteTechnicianId(technicianId);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTechnicianId) return;

    try {
      await deleteTechnician(deleteTechnicianId).unwrap();
      toast.success("Technician deleted successfully!");
      setDeleteTechnicianId(null);
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        "Failed to delete technician. Please try again.";
      toast.error(errorMessage);
    }
  };

  const columns = [
    {
      header: "Tech ID",
      accessor: "technician_id" as keyof TechnicianListItem,
    },
    {
      header: "Name",
      accessor: "full_name" as keyof TechnicianListItem,
    },
    {
      header: "Contact Number",
      accessor: "contact_number" as keyof TechnicianListItem,
    },
    {
      header: "Skills",
      accessor: (row: TechnicianListItem) => (
        <div className="flex flex-wrap gap-1">
          {row.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-gray-100 px-2 py-0.5 rounded text-[10px] capitalize"
            >
              {skill}
            </span>
          ))}
          {row.skills.length === 0 && (
            <span className="text-gray-400 text-xs">No skills</span>
          )}
        </div>
      ),
    },
    {
      header: "Total Jobs",
      accessor: "total_jobs" as keyof TechnicianListItem,
    },
    {
      header: "Status",
      accessor: (row: TechnicianListItem) => {
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "available":
              return "bg-emerald-100 text-emerald-700";
            case "busy":
              return "bg-amber-100 text-amber-700";
            case "unavailable":
              return "bg-red-100 text-red-700";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium capitalize ${getStatusColor(row.status)}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: (row: TechnicianListItem) => (
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => handleViewTechnician(row)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button
            onClick={() => handleDeleteClick(row.technician_id)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
            title="Delete Technician"
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
          Technicians
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Add Button */}
          <Button
            onClick={() => setIsAddTechnicianModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap font-bold">
              Add New Technician
            </span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton rows={10} columns={7} />
        ) : (
          <CustomTable
            data={data}
            columns={columns}
            itemsPerPage={10}
            serverSidePagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onFilterChange={onFilterChange}
            excludeFilterColumns={["Total Jobs", "Action"]}
            predefinedStatusOptions={["Available", "Busy", "Unavailable"]}
          />
        )}
      </div>

      {/* Add Technician Modal */}
      <AddTechnicianModal
        open={isAddTechnicianModalOpen}
        onOpenChange={setIsAddTechnicianModalOpen}
        onSave={handleAddTechnician}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTechnicianId}
        onOpenChange={() => setDeleteTechnicianId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Technician</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this technician? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-500"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TechniciansTableSection;
