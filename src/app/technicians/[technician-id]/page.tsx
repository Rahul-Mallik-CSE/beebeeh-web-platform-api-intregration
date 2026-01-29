/** @format */
"use client";
import TechnicianChartSection from "@/components/TechniciansComponents/TechnicianChartSection";
import TechnicianDetailsSection from "@/components/TechniciansComponents/TechnicianDetailsSection";
import TechnicianDetailsTableSection from "@/components/TechniciansComponents/TechnicianDetailsTableSection";
import TechnicianDetailsSkeleton from "@/components/TechniciansComponents/TechnicianDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import AssignJobModal from "@/components/CommonComponents/AssignJobModal";
import EditTechnicianModal from "@/components/TechniciansComponents/EditTechnicianModal";
import {
  useGetTechnicianDashboardQuery,
  useDisableTechnicianMutation,
  useEnableTechnicianMutation,
} from "@/redux/features/adminFeatures/technicianAPI";
import { toast } from "react-toastify";

const TechnicianDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const technicianId = params["technician-id"] as string;
  const [isAssignJobModalOpen, setIsAssignJobModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch technician dashboard data
  const {
    data: dashboardResponse,
    isLoading,
    error,
    refetch,
  } = useGetTechnicianDashboardQuery(technicianId);

  // Disable/Enable mutations
  const [disableTechnician, { isLoading: isDisabling }] =
    useDisableTechnicianMutation();
  const [enableTechnician, { isLoading: isEnabling }] =
    useEnableTechnicianMutation();

  const handleViewCalendar = () => {
    router.push(`/technicians/${technicianId}/technician-calendar`);
  };

  const handleAssignJob = () => {
    setIsAssignJobModalOpen(true);
  };

  const handleEditTechnician = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    // RTK Query will automatically refetch due to invalidatesTags
    setIsEditModalOpen(false);
  };

  const handleDisableEnable = async () => {
    if (!dashboardResponse?.data) return;

    const isActive = dashboardResponse.data.technician.is_active;

    try {
      if (isActive) {
        await disableTechnician(technicianId).unwrap();
        toast.success("Technician disabled successfully!");
      } else {
        await enableTechnician(technicianId).unwrap();
        toast.success("Technician enabled successfully!");
      }
      // RTK Query will automatically refetch due to invalidatesTags
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        `Failed to ${isActive ? "disable" : "enable"} technician. Please try again.`;
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button onClick={() => router.back()} className="p-2">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              </div>
            </div>
            <TechnicianDetailsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !dashboardResponse?.data) {
    return (
      <div className="w-full p-2 sm:p-4 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-600 mb-4">
            Failed to load technician details.
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="ml-2"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const dashboardData = dashboardResponse.data;

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                Technician Details
              </span>
            </div>
            {/* <div className="w-full sm:w-auto">
              <Button
                onClick={handleViewCalendar}
                className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">View Calendar</span>
              </Button>
            </div> */}
          </div>

          {/* Technician data section */}
          <TechnicianDetailsSection
            data={dashboardData}
            onAssignJob={handleAssignJob}
            onEdit={handleEditTechnician}
            onDisable={handleDisableEnable}
            isDisabling={isDisabling || isEnabling}
          />

          <TechnicianChartSection data={dashboardData} />

          <TechnicianDetailsTableSection
            todaysJobs={dashboardData.tables.todays_jobs}
            fullJobHistory={dashboardData.tables.full_job_history}
          />
        </div>
      </div>

      {/* Assign Job Modal */}
      <AssignJobModal
        isOpen={isAssignJobModalOpen}
        onClose={() => setIsAssignJobModalOpen(false)}
        technicianId={technicianId}
        technicianName={dashboardData.technician.full_name}
      />

      {/* Edit Technician Modal */}
      <EditTechnicianModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        technicianData={dashboardData}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default TechnicianDetailsPage;
