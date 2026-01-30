/** @format */
"use client";

import { useState, use } from "react";
import ClientDetailsSection from "@/components/ClientsComponents/ClientDetailsSection";
import ClientDetailsTableSection from "@/components/ClientsComponents/ClientDetailsTableSection";
import ClientDetailsSkeleton from "@/components/ClientsComponents/ClientDetailsSkeleton";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useEnableClientMutation,
  useDisableClientMutation,
  useDeleteClientMutation,
} from "@/redux/features/adminFeatures/clientsAPI";
import { toast } from "react-toastify";
import EditClientModal from "@/components/ClientsComponents/EditClientModal";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PageProps {
  params: Promise<{ "client-id": string }>;
}

const ClientDetailsPage = ({ params }: PageProps) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const clientId = resolvedParams["client-id"];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch client data
  const {
    data: clientResponse,
    isLoading,
    error,
    refetch,
  } = useGetClientByIdQuery(clientId);

  const [updateClient] = useUpdateClientMutation();
  const [enableClient, { isLoading: isEnabling }] = useEnableClientMutation();
  const [disableClient, { isLoading: isDisabling }] =
    useDisableClientMutation();
  const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();

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

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteClient(clientId).unwrap();
      toast.success("Client deleted successfully!");
      router.push("/clients");
    } catch (error: any) {
      const errorMessage =
        error?.data?.message || "Failed to delete client. Please try again.";
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
          {/* Delete button in bottom section */}
          <div className="mt-4 flex justify-end">
            <Button
              onClick={handleDeleteClick}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Client
            </Button>
          </div>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteOpen}
        onOpenChange={(open: boolean) => setIsDeleteOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              client and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientDetailsPage;
