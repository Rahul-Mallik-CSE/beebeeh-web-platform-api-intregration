/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { getJobStatusBadgeColor, getJobStatusLabel } from "@/lib/statusUtils";
import { Button } from "@/components/ui/button";
import {
  ProductDetailData,
  ChecklistItem,
  RelatedJob,
  PartInventoryStatus,
  FrequentlyUsedPart,
  useAddInstallationChecklistMutation,
  useAddMaintenanceChecklistMutation,
  useDeleteInstallationChecklistMutation,
  useDeleteMaintenanceChecklistMutation,
  useReorderInstallationChecklistMutation,
  useReorderMaintenanceChecklistMutation,
} from "@/redux/features/adminFeatures/productsAPI";
import AddCheckListModal from "./AddCheckListModal";
import { toast } from "react-toastify";

interface ProductsDetailsTableSectionProps {
  product: ProductDetailData;
}

const ProductsDetailsTableSection: React.FC<
  ProductsDetailsTableSectionProps
> = ({ product }) => {
  const [isInstallationModalOpen, setIsInstallationModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const [addInstallationTask] = useAddInstallationChecklistMutation();
  const [addMaintenanceTask] = useAddMaintenanceChecklistMutation();
  const [deleteInstallationTask] = useDeleteInstallationChecklistMutation();
  const [deleteMaintenanceTask] = useDeleteMaintenanceChecklistMutation();
  const [reorderInstallationTask] = useReorderInstallationChecklistMutation();
  const [reorderMaintenanceTask] = useReorderMaintenanceChecklistMutation();

  const handleAddInstallationTask = async (task: string) => {
    try {
      await addInstallationTask({
        productId: product.product_id,
        task,
      }).unwrap();
      toast.success("Installation task added successfully");
    } catch (error) {
      toast.error("Failed to add installation task");
    }
  };

  const handleAddMaintenanceTask = async (task: string) => {
    try {
      await addMaintenanceTask({
        productId: product.product_id,
        task,
      }).unwrap();
      toast.success("Maintenance task added successfully");
    } catch (error) {
      toast.error("Failed to add maintenance task");
    }
  };

  const handleDeleteInstallationTask = async (steps: number[]) => {
    try {
      await deleteInstallationTask({
        productId: product.product_id,
        steps,
      }).unwrap();
      toast.success("Installation task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete installation task");
    }
  };

  const handleDeleteMaintenanceTask = async (steps: number[]) => {
    try {
      await deleteMaintenanceTask({
        productId: product.product_id,
        steps,
      }).unwrap();
      toast.success("Maintenance task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete maintenance task");
    }
  };

  const handleReorderInstallationTask = async (orderedSteps: number[]) => {
    try {
      await reorderInstallationTask({
        productId: product.product_id,
        ordered_steps: orderedSteps,
      }).unwrap();
      toast.success("Installation checklist reordered successfully");
    } catch (error) {
      toast.error("Failed to reorder installation checklist");
    }
  };

  const handleReorderMaintenanceTask = async (orderedSteps: number[]) => {
    try {
      await reorderMaintenanceTask({
        productId: product.product_id,
        ordered_steps: orderedSteps,
      }).unwrap();
      toast.success("Maintenance checklist reordered successfully");
    } catch (error) {
      toast.error("Failed to reorder maintenance checklist");
    }
  };

  // Checklist Columns
  const checklistColumns = [
    {
      header: "Step",
      accessor: "step" as keyof ChecklistItem,
      className: "w-20",
    },
    {
      header: "Check List",
      accessor: "task" as keyof ChecklistItem,
      className: "w-full text-right capitalize",
    },
  ];

  // Parts Inventory Columns
  const partsInventoryColumns = [
    {
      header: "Part ID",
      accessor: "part_id" as keyof PartInventoryStatus,
    },
    {
      header: "Part Name",
      accessor: "part_name" as keyof PartInventoryStatus,
    },
    {
      header: "Available Units",
      accessor: "available_units" as keyof PartInventoryStatus,
    },
    {
      header: "Status",
      className: "text-right",
      accessor: (row: PartInventoryStatus) => {
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "in stock":
              return "bg-green-100 text-green-700";
            case "low stock":
              return "bg-yellow-100 text-yellow-700";
            case "out of stock":
              return "bg-red-100 text-red-700";
            default:
              return "bg-gray-100 text-gray-700";
          }
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getStatusColor(row.status)}`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  // Frequently Used Parts Columns
  const frequentPartsColumns = [
    {
      header: "Part ID",
      accessor: "part_id" as keyof FrequentlyUsedPart,
    },
    {
      header: "Part Name",
      accessor: "part_name" as keyof FrequentlyUsedPart,
    },
    {
      header: "Unit",
      accessor: "unit" as keyof FrequentlyUsedPart,
    },
    {
      header: "Used Stock",
      className: "text-right",
      accessor: "used_stock" as keyof FrequentlyUsedPart,
    },
  ];

  // Related Jobs Columns
  const relatedJobsColumns = [
    {
      header: "Job ID",
      accessor: "job_id" as keyof RelatedJob,
    },
    {
      header: "Client",
      accessor: "client" as keyof RelatedJob,
    },
    {
      header: "Type",
      accessor: (row: RelatedJob) => (
        <span className="capitalize">{row.type}</span>
      ),
    },
    {
      header: "Technician",
      accessor: "technician" as keyof RelatedJob,
    },
    {
      header: "Order Date",
      accessor: "order_by_date" as keyof RelatedJob,
    },
    {
      header: "Status",
      className: "text-right",
      accessor: (row: RelatedJob) => {
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${getJobStatusBadgeColor(row.status)}`}
          >
            {getJobStatusLabel(row.status)}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Checklists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Installation Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
              Installation Checklist
            </h3>
            <Button
              onClick={() => setIsInstallationModalOpen(true)}
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm h-8 px-3 text-red-800 hover:text-red-700 hover:bg-red-50"
            >
              Edit Checklist
            </Button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <CustomTable
              data={product.installation_checklist}
              columns={checklistColumns}
              itemsPerPage={6}
              showFilter={false}
            />
          </div>
        </div>

        {/* Maintenance Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
              Maintenance Checklist
            </h3>
            <Button
              onClick={() => setIsMaintenanceModalOpen(true)}
              variant="ghost"
              size="sm"
              className="text-xs sm:text-sm h-8 px-3 text-red-800 hover:text-red-700 hover:bg-red-50"
            >
              Edit Checklist
            </Button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <CustomTable
              data={product.maintenance_checklist}
              columns={checklistColumns}
              itemsPerPage={6}
              showFilter={false}
            />
          </div>
        </div>
      </div>

      {/* All Parts Inventory Status */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
          All Parts Inventory Status
        </h3>
        <CustomTable
          data={product.all_parts_inventory_status}
          columns={partsInventoryColumns}
          itemsPerPage={5}
          showFilter={false}
        />
      </div>

      {/* Frequently Used Parts */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
          Frequently Used Parts
        </h3>
        <CustomTable
          data={product.frequently_used_parts}
          columns={frequentPartsColumns}
          itemsPerPage={5}
          showFilter={false}
        />
      </div>

      {/* Related Jobs */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-700">
          Related Jobs
        </h3>
        <CustomTable
          data={product.related_jobs}
          columns={relatedJobsColumns}
          itemsPerPage={5}
          showFilter={false}
        />
      </div>

      {/* Modals */}
      <AddCheckListModal
        isOpen={isInstallationModalOpen}
        onClose={() => setIsInstallationModalOpen(false)}
        onSave={handleAddInstallationTask}
        onDelete={handleDeleteInstallationTask}
        onReorder={handleReorderInstallationTask}
        existingChecklists={product.installation_checklist}
        title="Installation Checklist"
      />
      <AddCheckListModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSave={handleAddMaintenanceTask}
        onDelete={handleDeleteMaintenanceTask}
        onReorder={handleReorderMaintenanceTask}
        existingChecklists={product.maintenance_checklist}
        title="Maintenance Checklist"
      />
    </div>
  );
};

export default ProductsDetailsTableSection;
