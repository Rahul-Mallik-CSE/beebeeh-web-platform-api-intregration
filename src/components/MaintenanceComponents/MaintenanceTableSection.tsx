/** @format */
"use client";
import { Eye, Search } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomTable from "../CommonComponents/CustomTable";
import { maintenanceData } from "@/data/MaintenanceData";
import { Maintenance, MaintenanceColumn } from "@/types/MaintenanceTypes";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

const MaintenanceTableSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleViewAssignJob = () => {
    router.push(`/maintenance/all-assign-job`);
  };

  const filteredData = maintenanceData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const maintenanceColumns: MaintenanceColumn[] = [
    {
      header: "Client",
      accessor: "client",
    },
    {
      header: "Model",
      accessor: "model",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
    },
    {
      header: "Day Left",
      accessor: "dayLeft",
    },
    {
      header: "Locality",
      accessor: "locality",
    },
    {
      header: "Last Service",
      accessor: "lastService",
    },
    {
      header: "Client Contacted",
      accessor: (row: Maintenance) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.clientContacted}
            className="h-5 w-5 border-2 data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
          />
        </div>
      ),
      className: "text-center",
    },
    {
      header: "Status",
      accessor: (row: Maintenance) => (
        <div
          className={`px-3 py-1 rounded-md text-sm font-medium inline-flex ${
            row.status === "Upcoming"
              ? "bg-purple-100 text-purple-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </div>
      ),
    },
    {
      header: "Action",
      accessor: (row: Maintenance) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() =>
              router.push(
                `/maintenance/${row.client
                  .toLowerCase()
                  .replace(" ", "-")}-maintenance`
              )
            }
            className="p-1.5 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiPlusCircle className="w-4 h-4 text-gray-600" />
          </button>
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
          Maintenance
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
            onClick={handleViewAssignJob}
            className="bg-red-800 hover:bg-red-700 text-white px-3 sm:px-4 md:px-6 py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 text-sm"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <span className="whitespace-nowrap">View Assign Job</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CustomTable data={filteredData} columns={maintenanceColumns} />
    </div>
  );
};

export default MaintenanceTableSection;
