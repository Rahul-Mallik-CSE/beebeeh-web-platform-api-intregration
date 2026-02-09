/** @format */
"use client";
import React, { useState, useMemo } from "react";
import { Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomTable from "../CommonComponents/CustomTable";
import type { InstallationJob } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";
import { InstallationItem } from "@/redux/features/adminFeatures/installationAPI";
import { FilterState } from "../CommonComponents/FilterCard";

interface InstallationTableSectionProps {
  data?: InstallationItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filterState: FilterState) => void;
}

const InstallationTableSection: React.FC<InstallationTableSectionProps> = ({
  data = [],
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const handleAddInstallations = () => {
    router.push("/installation/add-installation");
  };

  // Transform API data to match InstallationJob interface
  const transformedData: InstallationJob[] = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.map((item) => ({
      id: item.installation_id,
      jobId: item.installation_id,
      client: item.client.name,
      model: item.product.model_name,
      serial: "", // Assuming not provided
      technician: item.technician.name,
      scheduled: item.scheduled_date,
      status:
        item.status === "assign"
          ? "Pending"
          : (item.status
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ") as any),
    }));
  }, [data]);

  const installationColumns = [
    {
      header: "Job ID",
      accessor: "jobId" as keyof InstallationJob,
    },
    {
      header: "Client",
      accessor: "client" as keyof InstallationJob,
    },
    {
      header: "Model",
      accessor: "model" as keyof InstallationJob,
    },
    {
      header: "Technician",
      accessor: "technician" as keyof InstallationJob,
    },
    {
      header: "Scheduled",
      accessor: "scheduled" as keyof InstallationJob,
    },
    {
      header: "Status",
      accessor: "status" as keyof InstallationJob,
    },
    {
      header: "Action",
      accessor: (row: InstallationJob) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => router.push(`/installation/${row.jobId}`)}
            className="p-1.5 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ),
      className: "text-center",
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl py-6 px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
      {/* Header with Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Installations
        </h1>
        <Button
          onClick={handleAddInstallations}
          className="bg-red-800 hover:bg-red-700 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-sm"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span className="whitespace-nowrap">Add Installations</span>
        </Button>
      </div>

      {/* Table */}
      <div className="">
        <CustomTable
          data={transformedData}
          columns={installationColumns}
          itemsPerPage={10}
          serverSidePagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onFilterChange={onFilterChange}
          excludeFilterColumns={["Scheduled", "Action"]}
          predefinedStatusOptions={[
            "Pending",
            "In Progress",
            "Complete",
            "Cancel",
            "Rescheduled",
          ]}
        />
      </div>

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={selectedJobId}
      />
    </div>
  );
};

export default InstallationTableSection;
