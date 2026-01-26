/** @format */
"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import HeaderSummaryCard from "./HeaderSummaryCard";
import FrequentlyUsedParts from "./FrequentlyUsedParts";
import ChecklistSection from "./ChecklistSection";
import ImageUploadSection from "./ImageUploadSection";
import ClientInfoSection from "./ClientInfoSection";
import ProductDetailsSection from "./ProductDetailsSection";
import CustomerSignatureSection from "./CustomerSignatureSection";
import { useGetJobDetailsQuery } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { JobStatus } from "@/types/JobDetailsTypes";
import {
  useStartJobMutation,
  useCancelJobMutation,
} from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface JobDetailsPageProps {
  jobId: string;
}

const JobDetailsPage = ({ jobId }: JobDetailsPageProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetJobDetailsQuery(jobId);
  const [startJob, { isLoading: isStartingJob }] = useStartJobMutation();
  const [cancelJob, { isLoading: isCancellingJob }] = useCancelJobMutation();

  // Debug logging
  console.log("Job Details API Response:", data);
  console.log("Job ID:", jobId);
  console.log("Is Error:", isError);
  console.log("Is Loading:", isLoading);

  // Handle start job
  const handleStartJob = async () => {
    try {
      await startJob(jobId).unwrap();
      toast.success("Job started successfully!");
    } catch (error) {
      console.error("Failed to start job:", error);
      toast.error("Failed to start job. Please try again.");
    }
  };

  // Handle cancel job
  const handleCancelJob = async () => {
    try {
      await cancelJob(jobId).unwrap();
      toast.success("Job cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel job:", error);
      toast.error("Failed to cancel job. Please try again.");
    }
  };

  // Get action buttons configuration based on job status
  const getActionButtons = (status: JobStatus) => {
    switch (status) {
      case "assign":
      case "rescheduled":
        return [
          {
            text: "Cancel Job",
            variant: "outline" as const,
            className:
              "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50",
            onClick: handleCancelJob,
            disabled: isCancellingJob,
          },
          {
            text: "Start Job",
            variant: "default" as const,
            className:
              "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white",
            onClick: handleStartJob,
            disabled: isStartingJob,
          },
        ];
      case "in_progress":
        return [
          {
            text: "Cancel Job",
            variant: "outline" as const,
            className:
              "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50",
            onClick: handleCancelJob,
            disabled: isCancellingJob,
          },
          {
            text: "Complete Job",
            variant: "default" as const,
            className:
              "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white",
            onClick: () => {}, // TODO: Implement complete job functionality
            disabled: false,
          },
        ];
      case "cancel":
      case "complete":
        return [
          {
            text: "Export",
            variant: "default" as const,
            className:
              "px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-green-600 hover:bg-green-700 text-white",
            onClick: () => {}, // TODO: Implement export functionality
            disabled: false,
          },
        ];
      default:
        return [];
    }
  };

  // Get status badge configuration
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "assign":
        return {
          text: "Pending",
          className: "bg-yellow-400 hover:bg-yellow-500 text-gray-800",
        };
      case "in_progress":
        return {
          text: "In Progress",
          className: "bg-blue-500 hover:bg-blue-600 text-white",
        };
      case "complete":
        return {
          text: "Completed",
          className: "bg-green-500 hover:bg-green-600 text-white",
        };
      case "cancel":
        return {
          text: "Cancelled",
          className: "bg-red-500 hover:bg-red-600 text-white",
        };
      case "rescheduled":
        return {
          text: "Rescheduled",
          className: "bg-yellow-400 hover:bg-yellow-500 text-gray-800",
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (isError || !data?.success || !data?.data) {
    console.error("API Error or Invalid Data Structure:", {
      isError,
      success: data?.success,
      hasData: !!data?.data,
      fullData: data,
    });
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-600">
          Failed to load job details. Please try again.
        </div>
      </div>
    );
  }

  const jobData = data.data;

  // Check if this is the new detailed structure or old structure
  const isDetailedStructure = !!jobData?.header_summary_card;

  if (!isDetailedStructure) {
    console.warn("Old/Different API structure detected:", jobData);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-orange-600">
          This job type uses a different data structure.
          <br />
          Job ID: {jobData?.header_summary_card?.job_id || "Unknown"}
          <br />
          Please update the API to return the standard job details structure.
        </div>
      </div>
    );
  }

  const statusBadge = getStatusBadge(jobData.header_summary_card.status);
  const actionButtons = getActionButtons(jobData.header_summary_card.status);

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center font-bold gap-1.5 sm:gap-2 text-gray-800 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <span className="text-lg sm:text-xl md:text-2xl font-bold">
            Job Details
          </span>
        </div>

        <Button
          className={`${statusBadge.className} text-sm sm:text-base font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2`}
        >
          {statusBadge.text}
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
          <HeaderSummaryCard data={jobData.header_summary_card} />
          <ClientInfoSection data={jobData.client_information_section} />
          <ProductDetailsSection data={jobData.product_details_section} />
        </div>
        {/* Right Column - 1/3 */}
        <div className="lg:col-span-3 xl:col-span-5  space-y-4 sm:space-y-6">
          <FrequentlyUsedParts
            parts={jobData.frequently_used_parts}
            jobId={jobId}
          />
          <ChecklistSection checklist={jobData.checklist_section} />
          <ImageUploadSection
            imageData={jobData.image_upload_section}
            jobId={jobId}
          />
          <CustomerSignatureSection
            signatureData={jobData.customer_signature_section}
            clientName={jobData.client_information_section.name}
            jobId={jobId}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
        {actionButtons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            className={button.className}
            onClick={button.onClick}
            disabled={button.disabled}
          >
            {button.disabled
              ? button.text === "Start Job"
                ? "Starting..."
                : button.text === "Cancel Job"
                  ? "Cancelling..."
                  : button.text
              : button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JobDetailsPage;
