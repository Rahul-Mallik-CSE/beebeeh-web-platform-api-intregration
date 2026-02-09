/** @format */
"use client";
import { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import TableSkeleton from "@/components/CommonComponents/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import AddClientModal, { ClientFormData } from "./AddClientModal";
import { ClientListItem } from "@/redux/features/adminFeatures/clientsAPI";
import { FilterState } from "../CommonComponents/FilterCard";

interface ClientsTableSectionsProps {
  data?: ClientListItem[];
  isLoading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filterState: FilterState) => void;
  onClientAdded?: () => void;
}

const ClientsTableSections: React.FC<ClientsTableSectionsProps> = ({
  data = [],
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  onClientAdded,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClient = (client: ClientListItem) => {
    router.push(`/clients/${client.client_id}`);
  };

  const handleSaveClient = (data: ClientFormData) => {
    // This is handled in AddClientModal, just close the modal
    setIsModalOpen(false);
    onClientAdded?.();
  };

  // Define table columns
  const columns = [
    {
      header: "Client ID",
      accessor: "client_id" as keyof ClientListItem,
    },
    {
      header: "Name",
      accessor: "name" as keyof ClientListItem,
    },
    {
      header: "Type",
      accessor: (row: ClientListItem) => (
        <span className="capitalize">{row.client_type}</span>
      ),
    },
    {
      header: "Town",
      accessor: "town" as keyof ClientListItem,
    },
    {
      header: "Contact Number",
      accessor: "contact_number" as keyof ClientListItem,
    },
    {
      header: "Installations",
      accessor: "installations" as keyof ClientListItem,
    },
    {
      header: "Last Service",
      accessor: (row: ClientListItem) => row.last_service || "N/A",
    },
    {
      header: "Created",
      accessor: "created" as keyof ClientListItem,
    },
    {
      header: "Status",
      accessor: (row: ClientListItem) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            row.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Action",
      accessor: (row: ClientListItem) => (
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => handleViewClient(row)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Clients
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Add Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Add New Client</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton rows={10} columns={9} />
        ) : (
          <CustomTable
            data={data}
            columns={columns}
            itemsPerPage={10}
            serverSidePagination={true}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onFilterChange={onFilterChange}
            excludeFilterColumns={[
              "Last Service",
              "Created",
              "Action",
              "Installations",
              "Type",
            ]}
            predefinedStatusOptions={["Active", "Inactive"]}
            predefinedJobTypeOptions={["Commercial", "Domestic"]}
          />
        )}
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
      />
    </div>
  );
};

export default ClientsTableSections;
