/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import CustomTable from "../CommonComponents/CustomTable";
import { AllAssignJobColumn } from "@/types/MaintenanceTypes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";
import { useGetMaintenanceQuery } from "@/redux/features/adminFeatures/maintenanceAPI";
import TableLoadingView from "../LoadingComponents/TableLoadingView";

const AllAssignJobTableSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const router = useRouter();

  // Fetch maintenance from API
  const { data: maintenanceData, isLoading, error } = useGetMaintenanceQuery();

  // Transform API data to match table format
  const transformedData =
    maintenanceData?.data?.map((maintenance) => {
      const rawStatus =
        maintenance.status.charAt(0).toUpperCase() +
        maintenance.status.slice(1);
      const status: "Assign" | "In-Progress" | "Complete" =
        rawStatus === "Assign" ||
        rawStatus === "In-Progress" ||
        rawStatus === "Complete"
          ? rawStatus
          : "Assign";

      return {
        id: maintenance.maintenance_id,
        jobId: maintenance.maintenance_id,
        client: maintenance.client.name,
        product: maintenance.product.model_name,
        type: "Maintenance",
        technician: maintenance.technician.name,
        scheduled: `${new Date(maintenance.scheduled_date).toLocaleDateString()} ${maintenance.scheduled_time}`,
        status,
        priority: maintenance.priority,
        problem_description: maintenance.problem_description,
      };
    }) || [];

  const filteredData = transformedData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const allAssignJobColumns: AllAssignJobColumn[] = [
    {
      header: "Job ID",
      accessor: "jobId",
    },
    {
      header: "Client",
      accessor: "client",
    },
    {
      header: "Product",
      accessor: "product",
    },
    {
      header: "Type",
      accessor: "type",
    },
    {
      header: "Technician",
      accessor: "technician",
    },
    {
      header: "Scheduled",
      accessor: "scheduled",
    },
    {
      header: "Status",
      accessor: (row: any) => (
        <div
          className={`px-3 py-1 w-24  flex justify-center items-center rounded-md text-sm font-medium ${
            row.status === "Assign"
              ? "bg-blue-100 text-blue-700"
              : row.status === "In-Progress"
                ? "bg-purple-100 text-purple-700"
                : "bg-cyan-100 text-cyan-700"
          }`}
        >
          {row.status}
        </div>
      ),
    },
    {
      header: "Action",
      accessor: (row: any) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => router.push(`/maintenance/${row.jobId}`)}
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

  const handleAddMaintenance = () => {
    router.push("/maintenance/add-maintenance");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Maintenance
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
          Error loading maintenance jobs. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6 bg-white p-3 sm:p-4 md:p-6 rounded-2xl">
      {/* Header with Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Maintenance
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <Button
            onClick={handleAddMaintenance}
            className="bg-red-800 hover:bg-red-700 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-sm"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">Add Maintenance</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CustomTable data={filteredData} columns={allAssignJobColumns} />
      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={selectedJobId}
      />
    </div>
  );
};

export default AllAssignJobTableSection;
