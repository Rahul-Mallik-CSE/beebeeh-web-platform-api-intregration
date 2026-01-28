/** @format */
"use client";
import React, { useState } from "react";
import { Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomTable from "../CommonComponents/CustomTable";
import { useRouter } from "next/navigation";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";
import { useGetRepairsQuery } from "@/redux/features/adminFeatures/repairsAPI";
import TableLoadingView from "../LoadingComponents/TableLoadingView";

const RepairsTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  // Fetch repairs from API
  const { data: repairsData, isLoading, error } = useGetRepairsQuery();

  const handleAddRepairs = () => {
    router.push("/repairs/add-repairs");
  };

  // Transform API data to match table format
  const transformedData =
    repairsData?.data?.map((repair) => ({
      id: repair.repair_id,
      jobId: repair.repair_id,
      client: repair.client.name,
      model: repair.product.model_name,
      serial: "-", // Serial is not provided in API response
      technician: repair.technician.name,
      scheduled: `${new Date(repair.scheduled_date).toLocaleDateString()} ${repair.scheduled_time}`,
      status: repair.status.charAt(0).toUpperCase() + repair.status.slice(1),
      priority: repair.priority,
      problem_type: repair.problem_type,
      problem_description: repair.problem_description,
    })) || [];

  const filteredData = transformedData.filter(
    (job) =>
      job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.technician.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const repairsColumns = [
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
            onClick={() => router.push(`/repairs/${row.jobId}`)}
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
          Repairs
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
          Error loading repairs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
      {/* Header with Search and Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Repairs
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <Button
            onClick={handleAddRepairs}
            className="bg-red-800 hover:bg-red-700 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">Add Repairs</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="">
        <CustomTable
          data={filteredData}
          columns={repairsColumns}
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

export default RepairsTableSection;
