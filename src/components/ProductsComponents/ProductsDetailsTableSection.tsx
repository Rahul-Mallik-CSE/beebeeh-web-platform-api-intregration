/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { productDetailsData } from "@/data/ProductsData";
import { Button } from "@/components/ui/button";
import { PartInventory, FrequentPart, RelatedJob } from "@/types/ProductsTypes";
import AddCheckListModal from "./AddCheckListModal";

const ProductsDetailsTableSection = () => {
  const product = productDetailsData["1"];
  const [isInstallationModalOpen, setIsInstallationModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const handleAddInstallationTask = (task: string) => {
    console.log("Adding installation task:", task);
    // Add logic to update installation checklist
  };

  const handleAddMaintenanceTask = (task: string) => {
    console.log("Adding maintenance task:", task);
    // Add logic to update maintenance checklist
  };

  // Installation Checklist Columns
  const installationColumns = [
    {
      header: "Step",
      accessor: (row: any) => row.id,
      className: "w-20",
    },
    {
      header: "Check List",
      accessor: (row: any) => row.task,
      className: "w-full text-right",
    },
  ];

  // Parts Inventory Columns
  const partsInventoryColumns = [
    {
      header: "Part ID",
      accessor: (row: PartInventory) => row.partId,
    },
    {
      header: "Part Name",
      accessor: (row: PartInventory) => row.partName,
    },
    {
      header: "Availability",
      accessor: (row: PartInventory) => row.availability,
    },
    {
      header: "Status",
      className: " text-right",
      accessor: (row: PartInventory) => {
        const statusColors = {
          Available: "bg-green-100 text-green-700",
          "Low Stock": "bg-yellow-100 text-yellow-700",
          "Out of Stock": "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
              statusColors[row.status]
            }`}
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
      accessor: (row: FrequentPart) => row.partId,
    },
    {
      header: "Part Name",
      accessor: (row: FrequentPart) => row.partName,
    },
    {
      header: "Units",
      accessor: (row: FrequentPart) => row.units,
    },
    {
      header: "Used Stock",
      className: " text-right",
      accessor: (row: FrequentPart) => row.quantity,
    },
  ];

  // Related Jobs Columns
  const relatedJobsColumns = [
    {
      header: "Job ID",
      accessor: (row: RelatedJob) => row.jobId,
    },
    {
      header: "Client",
      accessor: (row: RelatedJob) => row.client,
    },
    {
      header: "Type",
      accessor: (row: RelatedJob) => row.type,
    },
    {
      header: "Technician",
      accessor: (row: RelatedJob) => row.technician,
    },
    {
      header: "Criteria Date",
      accessor: (row: RelatedJob) => row.criteriaDate,
    },
    {
      header: "Complete Date",
      accessor: (row: RelatedJob) => row.completeDate,
    },
    {
      header: "Status",
      accessor: (row: RelatedJob) => {
        const statusColors = {
          Work: "bg-blue-100 text-blue-700",
          Done: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-700",
        };
        return (
          <span
            className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
              statusColors[row.status]
            }`}
          >
            {row.status}
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
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
              Installation Checklist
            </h3>
            <Button
              onClick={() => setIsInstallationModalOpen(true)}
              variant="ghost"
              size="sm"
              className="text-[10px] xs:text-xs sm:text-sm md:text-base h-7 sm:h-8 md:h-9 px-1.5 xs:px-2 sm:px-3 bg-transparent border-none text-red-800 hover:text-red-700 hover:bg-transparent"
            >
              Add Checklist
            </Button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CustomTable
              data={product.installationChecklist}
              columns={installationColumns}
              itemsPerPage={6}
            />
          </div>
        </div>

        {/* Maintenance Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
              Maintenance Checklist
            </h3>
            <Button
              onClick={() => setIsMaintenanceModalOpen(true)}
              variant="ghost"
              size="sm"
              className="text-[10px] xs:text-xs sm:text-sm md:text-base h-7 sm:h-8 md:h-9 px-1.5 xs:px-2 sm:px-3 bg-transparent border-none text-red-800 hover:text-red-700 hover:bg-transparent"
            >
              Add Checklist
            </Button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CustomTable
              data={product.maintenanceChecklist}
              columns={installationColumns}
              itemsPerPage={6}
            />
          </div>
        </div>
      </div>

      {/* All Parts Inventory Status */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
          All Parts Inventory Status
        </h3>
        <div className="bg-white ">
          <CustomTable
            data={product.partsInventory}
            columns={partsInventoryColumns}
            itemsPerPage={5}
          />
        </div>
      </div>

      {/* Frequently Used Parts */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
          Frequently Used Parts
        </h3>
        <div className="bg-white ">
          <CustomTable
            data={product.frequentlyUsedParts}
            columns={frequentPartsColumns}
            itemsPerPage={5}
          />
        </div>
      </div>

      {/* Related Jobs */}
      <div className="space-y-3 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 bg-white">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-600">
          Related Jobs
        </h3>
        <div className="bg-white ">
          <CustomTable
            data={product.relatedJobs}
            columns={relatedJobsColumns}
            itemsPerPage={5}
          />
        </div>
      </div>

      {/* Modals */}
      <AddCheckListModal
        isOpen={isInstallationModalOpen}
        onClose={() => setIsInstallationModalOpen(false)}
        onSave={handleAddInstallationTask}
      />
      <AddCheckListModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => setIsMaintenanceModalOpen(false)}
        onSave={handleAddMaintenanceTask}
      />
    </div>
  );
};

export default ProductsDetailsTableSection;
        
