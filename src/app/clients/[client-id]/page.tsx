/** @format */
"use client";

import  { useState, use } from "react";
import ClientDetailsSection from "@/components/ClientsComponents/ClientDetailsSection";
import ClientDetailsTableSection from "@/components/ClientsComponents/ClientDetailsTableSection";
import ClientDetailsSkeleton from "@/components/ClientsComponents/ClientDetailsSkeleton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useEnableClientMutation,
  useDisableClientMutation,
} from "@/redux/features/adminFeatures/clientsAPI";
import { toast } from "react-toastify";
import EditClientModal from "@/components/ClientsComponents/EditClientModal";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ "client-id": string }>;
}

const ClientDetailsPage = ({ params }: PageProps) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const clientId = resolvedParams["client-id"];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch client data
  const {
    data: clientResponse,
    isLoading,
    error,
    refetch,
  } = useGetClientByIdQuery(clientId);

  const [updateClient] = useUpdateClientMutation();
  const [enableClient, { isLoading: isEnabling }] = useEnableClientMutation();
  const [disableClient, { isLoading: isDisabling }] = useDisableClientMutation();

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = async () => {
    if (!clientResponse?.data) return;

    try {
      if (clientResponse.data.is_active) {
        await disableClient(clientId).unwrap();
        toast.success("Client disabled successfully!");
      } else {
        await enableClient(clientId).unwrap();
        toast.success("Client enabled successfully!");
      }
      refetch();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        `Failed to ${clientResponse.data.is_active ? "disable" : "enable"} client. Please try again.`;
      toast.error(errorMessage);
    }
  };

  const handleSaveEdit = async (data: any) => {
    try {
      await updateClient({ clientId, data }).unwrap();
      toast.success("Client updated successfully!");
      setIsEditModalOpen(false);
      refetch();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to update client. Please try again.";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => router.back()}
                  className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <span className="text-lg sm:text-xl md:text-2xl font-bold">
                  Client Details
                </span>
              </div>
            </div>

            {/* Skeleton */}
            <ClientDetailsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !clientResponse?.data) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
            <div className="text-center p-8">
              <p className="text-red-600 mb-4">
                Failed to load client details. Please try again.
              </p>
              <Button onClick={() => refetch()} variant="outline">
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const client = clientResponse.data;

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => router.back()}
                className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                Client Details
              </span>
            </div>
          </div>

          {/* Client data section */}
          <ClientDetailsSection
            client={{
              clientId: client.client_id,
              name: client.name,
              type: client.client_type,
              town: client.town,
              contactNumber: client.contact_number,
              installations: client.installations,
              lastService: client.last_service || "N/A",
              created: client.created_at,
              profileImage: client.profile_image || undefined,
              email: client.email,
              address: client.address,
              status: client.is_active ? "Available" : "Unavailable",
              totalJobs: client.total_job,
            }}
            onEdit={handleEdit}
            onDisable={handleToggleStatus}
            isTogglingStatus={isEnabling || isDisabling}
            isActive={client.is_active}
          />

          {/* Client related tables section */}
          <ClientDetailsTableSection
            clientId={clientId}
            jobHistory={client.job_history}
            jobHistoryMeta={client.job_history_meta}
          />
        </div>
      </div>

      {/* Edit Client Modal */}
      {isEditModalOpen && (
        <EditClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          clientData={client}
        />
      )}
    </div>
  );
};

export default ClientDetailsPage;
