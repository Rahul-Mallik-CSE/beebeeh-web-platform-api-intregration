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

        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium px-3 sm:px-4 md:px-6 text-sm sm:text-base">
          Pending
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
          <HeaderSummaryCard jobId={jobId} />
          <ClientInfoSection />
          <ProductDetailsSection />
        </div>
        {/* Right Column - 1/3 */}
        <div className="lg:col-span-3 xl:col-span-5 space-y-4 sm:space-y-6">
          <FrequentlyUsedParts />
          <ChecklistSection />
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
                      {staticImages.beforeImage && (
                        <Image
                          src={staticImages.beforeImage}
                          alt="preview"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                  </div>

                  {/* After Image */}
                  <div className="space-y-4 min-h-[326px]">
                    <p className="text-base font-bold text-gray-800">
                      After Image
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl  flex flex-col items-center justify-center h-64">
                      {staticImages.afterImage && (
                        <Image
                          src={staticImages.afterImage}
                          alt="preview"
                          width={600}
                          height={400}
                          className="w-full h-full object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showSignature && !isOverview && <CustomerSignatureSection />}
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
                      <p className="text-gray-500 text-sm">John Doe</p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-800 font-medium text-base">
                        Signature time :
                      </p>
                      <p className="text-gray-500 text-sm">
                        24 Nov 2025, 2:30 PM
                      </p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-800 font-medium text-base">
                        Signature Status :
                      </p>
                      <p className="font-medium text-sm text-teal-500">
                        Complete
                      </p>
                    </div>
                  </div>

                  {/* Right side - Signature area */}
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg h-16 flex items-center justify-center">
                      <Image
                        src={staticImages.signatureImage}
                        alt="Customer signature"
                        width={400}
                        height={128}
                        className="max-h-full max-w-full object-contain"
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
        </div>
      </div>

      {/* Action Buttons */}
      {isOverview ? (
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50"
          >
            Cancel Job
          </Button>
          <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white">
            Rescheduled
          </Button>
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
