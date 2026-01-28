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
import Image from "next/image";
import { useGetJobDetailsQuery } from "@/redux/features/adminFeatures/jobDetailsAPI";
import { getImageFullUrl } from "@/lib/utils";
import { get } from "http";

interface JobDetailsPageProps {
  jobId: string;
  showImageUpload?: boolean;
  showSignature?: boolean;
  isOverview?: boolean;
  staticImages?: {
    beforeImage?: string;
    afterImage?: string;
    signatureImage?: string;
  };
}

const JobDetailsPage = ({
  jobId,
  showImageUpload = true,
  showSignature = true,
  isOverview = false,
  staticImages,
}: JobDetailsPageProps) => {
  const router = useRouter();

  const { data, isLoading, error } = useGetJobDetailsQuery({ job_id: jobId });

  const handleCancel = () => {
    // Handle cancel job
    console.log("Cancel job:", jobId);
  };

  const handleReschedule = () => {
    // Handle reschedule job
    console.log("Reschedule job:", jobId);
  };

  const handleExportPDF = () => {
    // Handle export PDF
    console.log("Export PDF for job:", jobId);
  };

  if (error) {
    return (
      <div className="w-full p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading job details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full p-4">
        <div className="max-w-625 mx-auto space-y-4 sm:space-y-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-1.5 sm:gap-2 items-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse w-32 sm:w-40"></div>
            </div>
            <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Main Content Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 xl:col-span-5 space-y-4 sm:space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse mb-3 w-3/4"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center py-2"
                      >
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
            <div className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const jobData = data?.data;
  const jobStatus = jobData?.header_summary.status;

  // Determine which buttons to show based on status
  const showRescheduleAndCancel = ["pending", "cancel", "rescheduled"].includes(
    jobStatus || "",
  );
  const showCancelOnly = jobStatus === "in_progress";
  const showExportPDF = jobStatus === "complete";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1.5 sm:gap-2 items-center">
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center font-bold gap-1 sm:gap-2 text-gray-800 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <span className="text-lg sm:text-xl md:text-2xl font-bold">
            Job Details
          </span>
        </div>

        <Button
          className={`px-3 sm:px-4 md:px-6 text-sm sm:text-base ${
            jobStatus === "complete"
              ? "bg-green-600 hover:bg-green-700"
              : jobStatus === "in_progress"
                ? "bg-blue-600 hover:bg-blue-700"
                : jobStatus === "assign"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : jobStatus === "cancel"
                    ? "bg-red-600 hover:bg-red-700"
                    : jobStatus === "rescheduled"
                      ? "bg-orange-600 hover:bg-orange-700"
                      : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {jobStatus === "complete"
            ? "Complete"
            : jobStatus === "in_progress"
              ? "In Progress"
              : jobStatus === "pending"
                ? "Assign"
                : jobStatus === "cancel"
                  ? "Cancel"
                  : jobStatus === "rescheduled"
                    ? "Rescheduled"
                    : "Unknown"}
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
          <HeaderSummaryCard data={jobData?.header_summary} />
          <ClientInfoSection data={jobData?.client_information} />
          <ProductDetailsSection data={jobData?.product_details} />
        </div>
        {/* Right Column - 1/3 */}
        <div className="lg:col-span-3 xl:col-span-5 space-y-4 sm:space-y-6">
          <FrequentlyUsedParts data={jobData?.frequently_used_parts} />
          <ChecklistSection data={jobData?.checklist_section} />
          {showImageUpload && !isOverview && <ImageUploadSection />}
          {isOverview && staticImages && (
            <div className="bg-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Image Upload Section:
                </h3>
                <p className="text-xs text-gray-400">
                  Only support .jpg, .png and .svg files.
                </p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Before Image */}
                  <div className="space-y-4 min-h-[326px]">
                    <p className="text-base font-bold text-gray-800">
                      Before Image
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl  flex flex-col items-center justify-center h-64">
                      {jobData?.image_section.before_images ? (
                        <Image
                          src={getImageFullUrl(
                            jobData.image_section.before_images[0] || "",
                          )}
                          alt="preview"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover rounded"
                          unoptimized
                        />
                      ) : (
                        <p>Wait for image upload..</p>
                      )}
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="space-y-4 min-h-[326px]">
                    <p className="text-base font-bold text-gray-800">
                      After Image
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl  flex flex-col items-center justify-center h-64">
                      {jobData?.image_section.after_images ? (
                        <Image
                          src={getImageFullUrl(
                            jobData.image_section.after_images[0] || "",
                          )}
                          alt="preview"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover rounded"
                          unoptimized
                        />
                      ) : (
                        <p>Wait for image upload..</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showImageUpload && isOverview && jobData?.image_section && (
            <ImageUploadSection data={jobData.image_section} />
          )}
          {showSignature && !isOverview && (
            <CustomerSignatureSection data={jobData?.customer_signature} />
          )}
          {isOverview && staticImages?.signatureImage && (
            <div className="bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Customer Signature Section:
              </h3>
              <div className="border border-gray-200 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left side - Client info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-800 font-medium text-base">
                        Client Name :
                      </p>
                      <p className="text-gray-500 text-sm">
                        {jobData?.customer_signature.client_name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-800 font-medium text-base">
                        Signature time :
                      </p>
                      <p className="text-gray-500 text-sm">
                        {jobData?.customer_signature.signature_time}
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-800 font-medium text-base">
                        Signature Status :
                      </p>
                      <p
                        className={`font-medium text-sm ${
                          jobData?.customer_signature.signature_status ===
                          "complete"
                            ? "text-teal-500"
                            : "text-red-500"
                        }`}
                      >
                        {jobData?.customer_signature.signature_status ===
                        "complete"
                          ? "Complete"
                          : "Incomplete"}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Signature area */}
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg h-16 flex items-center justify-center">
                      <Image
                        src={getImageFullUrl(
                          jobData?.customer_signature.signature_files[0] || "",
                        )}
                        alt="Customer signature"
                        width={400}
                        height={128}
                        className="max-h-full max-w-full object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="border border-black w-full"></div>
                    <Button className="w-full bg-[#5C3D2E] hover:bg-[#4A2F22] text-white rounded-lg cursor-default">
                      Signature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showSignature && isOverview && jobData?.customer_signature && (
            <CustomerSignatureSection data={jobData.customer_signature} />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {isOverview ? (
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
          {showRescheduleAndCancel && (
            <>
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50"
                onClick={handleCancel}
              >
                Cancel Job
              </Button>
              <Button
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-orange-600 hover:bg-orange-700 text-white"
                onClick={handleReschedule}
              >
                Rescheduled
              </Button>
            </>
          )}
          {showCancelOnly && (
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-800"
              onClick={handleCancel}
            >
              Cancel Job
            </Button>
          )}
          {showExportPDF && (
            <Button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50"
          >
            Cancel Job
          </Button>
          <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white">
            Start Job
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
