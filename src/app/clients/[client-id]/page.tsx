/** @format */
"use client";

import ClientDetailsSection from "@/components/ClientsComponents/ClientDetailsSection";
import ClientDetailsTableSection from "@/components/ClientsComponents/ClientDetailsTableSection";
import { clientDetailsData } from "@/data/ClientsData";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

const ClientDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const clientId = params["client-id"] as string;

  // Get client data based on the ID from URL
  const client = clientDetailsData[clientId] || clientDetailsData["C-501"];

  const handleEdit = () => {};

  const handleDisable = () => {
    console.log("Disable account:", clientId);
    // Add disable logic here
  };

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
            client={client}
            onEdit={handleEdit}
            onDisable={handleDisable}
          />

          {/* Client related tables section */}
          <ClientDetailsTableSection />
        </div>
      </div>
    </div>
  );
};

export default ClientDetailsPage;
