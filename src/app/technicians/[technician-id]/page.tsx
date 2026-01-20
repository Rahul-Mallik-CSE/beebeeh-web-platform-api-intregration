/** @format */
"use client";
import TechnicianChartSection from "@/components/TechniciansComponents/TechnicianChartSection";
import TechnicianDetailsSection from "@/components/TechniciansComponents/TechnicianDetailsSection";
import TechnicianDetailsTableSection from "@/components/TechniciansComponents/TechnicianDetailsTableSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import AssignJobModal from "@/components/CommonComponents/AssignJobModal";

const TechnicianDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const technicianId = params["technician-id"] as string;
  const [isAssignJobModalOpen, setIsAssignJobModalOpen] = useState(false);

  const handleViewCalendar = () => {
    router.push(`/technicians/${technicianId}/technician-calendar`);
  };

  const handleAssignJob = () => {
    setIsAssignJobModalOpen(true);
  };

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
            <div className="w-full sm:w-auto">
              {/* Action buttons can be added here */}
              <Button
                onClick={handleViewCalendar}
                className="w-full sm:w-auto bg-red-800 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">View Calendar</span>
              </Button>
            </div>
          </div>

          {/* Technician data section */}
          <TechnicianDetailsSection onAssignJob={handleAssignJob} />

          <TechnicianChartSection />

          <TechnicianDetailsTableSection />
        </div>
      </div>

      {/* Assign Job Modal */}
      <AssignJobModal
        isOpen={isAssignJobModalOpen}
        onClose={() => setIsAssignJobModalOpen(false)}
        technicianId={technicianId}
        technicianName="Malik Rehman"
      />
    </div>
  );
};

export default TechnicianDetailsPage;
