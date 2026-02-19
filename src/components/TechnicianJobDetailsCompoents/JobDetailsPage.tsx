/** @format */
"use client";
import React, { useState, useCallback } from "react";
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
import CompleteJobModal from "./CompleteJobModal";
import { useGetJobDetailsQuery } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { getJobStatusBadgeColor, getJobStatusLabel } from "@/lib/statusUtils";
import { JobStatus } from "@/types/JobDetailsTypes";
import {
  useStartJobMutation,
  useCancelJobMutation,
} from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface JobDetailsPageProps {
  jobId: string;
}

const JobDetailsPage = ({ jobId }: JobDetailsPageProps) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetJobDetailsQuery(jobId);
  const [startJob, { isLoading: isStartingJob }] = useStartJobMutation();
  const [cancelJob, { isLoading: isCancellingJob }] = useCancelJobMutation();

  // Complete job modal state
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // Validation error state
  const [showValidationError, setShowValidationError] = useState(false);

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

  // Handle export to PDF
  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Add title
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Job Details Report", pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 20;

      // Add job ID and status
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(`Job ID: ${jobData.header_summary_card.job_id}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Status: ${statusBadge.text}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPosition);
      yPosition += 20;

      // Client Information
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Client Information", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const clientInfo = jobData.client_information_section;
      pdf.text(`Name: ${clientInfo.name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Phone: ${clientInfo.contact_number}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Address: ${clientInfo.address}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Town: ${clientInfo.town}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Client Type: ${clientInfo.client_type}`, 20, yPosition);
      yPosition += 20;

      // Product Details
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Product Details", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const productInfo = jobData.product_details_section;
      pdf.text(`Model: ${productInfo.model_name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Alias: ${productInfo.alias}`, 20, yPosition);
      yPosition += 8;
      pdf.text(
        `Installed Date: ${productInfo.installed_date || "N/A"}`,
        20,
        yPosition,
      );
      yPosition += 8;
      pdf.text(
        `Last Service Date: ${productInfo.last_service_date || "N/A"}`,
        20,
        yPosition,
      );
      yPosition += 20;

      // Job Details
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Job Information", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const jobInfo = jobData.header_summary_card;
      pdf.text(`Priority: ${jobInfo.priority}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Type: ${jobInfo.job_type}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Product Model: ${jobInfo.product_model}`, 20, yPosition);
      yPosition += 8;
      pdf.text(
        `Serial Number: ${jobInfo.serial_number || "N/A"}`,
        20,
        yPosition,
      );
      yPosition += 8;
      pdf.text(`Client: ${jobInfo.client_name}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Location: ${jobInfo.client_location}`, 20, yPosition);
      yPosition += 8;
      pdf.text(`Scheduled Date: ${jobInfo.scheduled_datetime}`, 20, yPosition);
      yPosition += 20;

      // Checklist
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Checklist", 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      jobData.checklist_section.forEach((item, index) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        const status =
          item.status === "done" ? "✓" : item.status === "doing" ? "○" : "✗";
        pdf.text(`${status} ${item.task}`, 20, yPosition);
        yPosition += 8;
      });

      // Frequently Used Parts
      if (
        jobData.frequently_used_parts &&
        jobData.frequently_used_parts.length > 0
      ) {
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = 20;
        }

        yPosition += 10;
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Frequently Used Parts", 20, yPosition);
        yPosition += 10;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        jobData.frequently_used_parts.forEach((part, index) => {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(
            `${part.part_name} (${part.quantity_used} ${part.unit})`,
            20,
            yPosition,
          );
          yPosition += 8;
        });
      }

      // Save the PDF
      const fileName = `Job_${jobData.header_summary_card.job_id}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);

      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Failed to export PDF:", error);
      toast.error("Failed to export PDF. Please try again.");
    }
  };

  // Handle complete job - validate images/signature first for invoice_required, then open modal
  const handleCompleteJob = () => {
    const status = data?.data?.header_summary_card?.status;
    if (status === "invoice_required") {
      const getImageValidation = (
        window as unknown as {
          getImageValidation?: () => { hasBefore: boolean; hasAfter: boolean };
        }
      ).getImageValidation;
      const getSignatureValidation = (
        window as unknown as { getSignatureValidation?: () => boolean }
      ).getSignatureValidation;

      const imageVal = getImageValidation?.() ?? {
        hasBefore: false,
        hasAfter: false,
      };
      const hasSig = getSignatureValidation?.() ?? false;

      if (!imageVal.hasBefore || !imageVal.hasAfter || !hasSig) {
        setShowValidationError(true);
        toast.error(
          "Please upload before image, after image, and customer signature before completing.",
        );
        return;
      }
      setShowValidationError(false);
    }
    setShowCompleteModal(true);
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
            onClick: handleCompleteJob,
            disabled: false,
          },
        ];
      case "invoice_required":
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
            onClick: handleCompleteJob,
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
            onClick: handleExportPDF,
            disabled: false,
          },
        ];
      default:
        return [];
    }
  };

  // Get status badge configuration
  const getStatusBadge = (status: JobStatus) => {
    return {
      text: getJobStatusLabel(status),
      className: getJobStatusBadgeColor(status),
    };
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
          <ChecklistSection
            checklist={jobData.checklist_section}
            jobId={jobId}
          />
          <ImageUploadSection
            imageData={jobData.image_upload_section}
            jobId={jobId}
            jobStatus={jobData.header_summary_card.status}
            showValidationError={showValidationError}
            onGetImages={() => ({ beforeFiles: [], afterFiles: [] })}
          />
          <CustomerSignatureSection
            signatureData={jobData.customer_signature_section}
            clientName={jobData.client_information_section.name}
            jobId={jobId}
            jobStatus={jobData.header_summary_card.status}
            showValidationError={showValidationError}
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

      {/* Complete Job Modal */}
      <CompleteJobModal
        open={showCompleteModal}
        onOpenChange={setShowCompleteModal}
        jobId={jobId}
        jobStatus={jobData.header_summary_card.status}
      />
    </div>
  );
};

export default JobDetailsPage;
