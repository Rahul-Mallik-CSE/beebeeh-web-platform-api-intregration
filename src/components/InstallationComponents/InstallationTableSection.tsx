/** @format */
"use client";
import React, { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomTable from "../CommonComponents/CustomTable";
import { installationJobsData } from "@/data/InstallationData";
import type { InstallationJob } from "@/types/AllTypes";
import { useRouter } from "next/navigation";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";

const InstallationTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const handleAddInstallations = () => {
    router.push("/installation/add-installation");
  };

  const filteredData = installationJobsData.filter(
    (job) =>
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.technician.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
      {/* Header with Search and Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Installations
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <div className="relative w-40 sm:w-48 md:w-56 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
            />
          </div>
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
