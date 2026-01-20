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

interface JobDetailsPageProps {
  jobId: string;
}

const JobDetailsPage = ({ jobId }: JobDetailsPageProps) => {
  const router = useRouter();

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

        <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm sm:text-base font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2">
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
        <div className="lg:col-span-3 xl:col-span-5  space-y-4 sm:space-y-6">
          <FrequentlyUsedParts />
          <ChecklistSection />
          <ImageUploadSection />
          <CustomerSignatureSection />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
        <Button
          variant="outline"
          className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-red-800 border-red-800 hover:bg-red-50"
        >
          Cancel Job
        </Button>
        <Button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white">
          Start Job
        </Button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
