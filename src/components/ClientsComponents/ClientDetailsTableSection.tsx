/** @format */
"use client";
import React, { useState, useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { jobHistoryData, jobHistoryColumns } from "@/data/ClientsData";
import { JobHistory } from "@/types/ClientsTypes";
import { useRouter } from "next/navigation";
import { Eye, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AssignTechnicianModal from "../CommonComponents/AssignTechnicianModal";

const ClientDetailsTableSection = () => {
  const router = useRouter();
  const [serviceStatusFilter, setServiceStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const handleViewJob = (job: JobHistory) => {};

  // Filter data based on service status
  const filteredData = useMemo(() => {
    if (serviceStatusFilter === "all") {
      return jobHistoryData;
    }
    return jobHistoryData.filter(
      (job) => job.serviceStatus === serviceStatusFilter
    );
  }, [serviceStatusFilter]);

  const columnsWithActions = [
    ...jobHistoryColumns.map((col) => {
      // Add badge styling for Service Status column
      if (col.header === "Service Status") {
        return {
          ...col,
          accessor: (row: JobHistory) => {
            const statusColors = {
              Serviced: "bg-green-100 text-green-800",
              Upcoming: "bg-blue-100 text-blue-800",
              Overdue: "bg-red-100 text-red-800",
            };
            return (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusColors[row.serviceStatus]
                }`}
              >
                {row.serviceStatus}
              </span>
            );
          },
        };
      }
      return col;
    }),
    {
      header: "Action",
      accessor: (row: JobHistory) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleViewJob(row)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
          {row.serviceStatus === "Upcoming" && (
            <button
              onClick={() => {
                setSelectedJobId(row.jobId);
                setIsModalOpen(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg p-3 sm:p-4 md:p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          All Job History
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by Status:</span>
          <Select
            value={serviceStatusFilter}
            onValueChange={setServiceStatusFilter}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Serviced">Serviced</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CustomTable
        data={filteredData}
        columns={columnsWithActions}
        itemsPerPage={10}
      />

      {/* Assign Technician Modal */}
      <AssignTechnicianModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={selectedJobId}
      />
    </div>
  );
};

export default ClientDetailsTableSection;
