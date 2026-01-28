/** @format */
"use client";
import { useState, useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AddTechnicianModal from "./AddTechnicianModal";
import { useGetTechniciansQuery, TechnicianListItem } from "@/redux/features/adminFeatures/technicianAPI";
import TableSkeleton from "../CommonComponents/TableSkeleton";

const TechniciansTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddTechnicianModalOpen, setIsAddTechnicianModalOpen] =
    useState(false);

  const { data: techniciansResponse, isLoading, error, refetch } = useGetTechniciansQuery({
    page: currentPage,
    limit: 10,
    name: searchQuery,
  });

  const handleAddTechnician = () => {
    setIsAddTechnicianModalOpen(false);
    refetch();
  };

  const tableData = useMemo(() => {
    if (!techniciansResponse?.data) return [];
    return techniciansResponse.data;
  }, [techniciansResponse]);

  const handleViewTechnician = (technician: TechnicianListItem) => {
    router.push(`/technicians/${technician.technician_id}`);
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
            <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-[10px] capitalize">
              {skill}
            </span>
          ))}
          {row.skills.length === 0 && <span className="text-gray-400 text-xs">No skills</span>}
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
          <span className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium capitalize ${getStatusColor(row.status)}`}>
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
            onClick={() => console.log("Delete", row.technician_id)}
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

  if (error) {
    return (
      <div className="w-full p-8 text-center text-red-600">
        <p>Failed to load technicians. Please try again.</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Technicians
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 w-40 sm:w-48 md:w-56 lg:w-64 text-sm"
            />
          </div>
          {/* Add Button */}
          <Button
            onClick={() => setIsAddTechnicianModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap font-bold">Add New Technician</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton rows={10} columns={7} />
        ) : (
          <CustomTable
            data={tableData}
            columns={columns}
            itemsPerPage={10}
            serverSidePagination={true}
            currentPage={currentPage}
            totalPages={techniciansResponse?.meta?.totalPage || 1}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Add Technician Modal */}
      <AddTechnicianModal
        open={isAddTechnicianModalOpen}
        onOpenChange={setIsAddTechnicianModalOpen}
        onSave={handleAddTechnician}
      />
    </div>
  );
};

export default TechniciansTableSection;
