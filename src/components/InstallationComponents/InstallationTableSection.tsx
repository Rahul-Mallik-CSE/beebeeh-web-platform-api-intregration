/** @format */
"use client";
import React, { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomTable from "../CommonComponents/CustomTable";
import { useRouter } from "next/navigation";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";
import { useGetInstallationsQuery } from "@/redux/features/adminFeatures/installationAPI";
import type { Installation } from "@/redux/features/adminFeatures/installationAPI";
import TableLoadingView from "../LoadingComponents/TableLoadingView";

const InstallationTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  // Fetch installations from API
  const {
    data: installationsData,
    isLoading,
    error,
  } = useGetInstallationsQuery();

  const handleAddInstallations = () => {
    router.push("/installation/add-installation");
  };

  // Transform API data to match table format
  const transformedData =
    installationsData?.data?.map((installation) => ({
      id: installation.installation_id,
      jobId: installation.installation_id,
      client: installation.client.name,
      model: installation.product.model_name,
      serial: "-", // Serial is not provided in API response
      technician: installation.technician.name,
      scheduled: `${new Date(installation.scheduled_date).toLocaleDateString()} ${installation.scheduled_time}`,
      status:
        installation.status.charAt(0).toUpperCase() +
        installation.status.slice(1),
      priority: installation.priority,
      notes: installation.notes,
    })) || [];

  const filteredData = transformedData.filter(
    (job) =>
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.technician.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const installationColumns = [
    {
      header: "Job ID",
      accessor: "jobId" as keyof (typeof transformedData)[0],
    },
    {
      header: "Client",
      accessor: "client" as keyof (typeof transformedData)[0],
    },
    {
      header: "Model",
      accessor: "model" as keyof (typeof transformedData)[0],
    },
    {
      header: "Technician",
      accessor: "technician" as keyof (typeof transformedData)[0],
    },
    {
      header: "Scheduled",
      accessor: "scheduled" as keyof (typeof transformedData)[0],
    },
    {
      header: "Status",
      accessor: "status" as keyof (typeof transformedData)[0],
    },
    {
      header: "Action",
      accessor: (row: (typeof transformedData)[0]) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => router.push(`/installation/${row.jobId}`)}
            className="p-1.5 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          {row.status === "Assign" && (
            <button
              onClick={() => {
                setSelectedJobId(row.jobId);
                setIsModalOpen(true);
              }}
              className="p-1.5 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      ),
      className: "text-center",
    },
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Installations
        </h1>
        <TableLoadingView />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
        <div className="text-center text-red-600">
          Error loading installations. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
      {/* Header with Search and Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Installations
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <Button
            onClick={handleAddInstallations}
            className="bg-red-800 hover:bg-red-700 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">Add Installations</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <CustomTable
          data={filteredData}
          columns={installationColumns}
          itemsPerPage={10}
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
