/** @format */

import React from "react";
import JobDetailsPage from "@/components/JobDetailsComponents/JobDetailsPage";

interface PageProps {
  params: {
    "job-id": string;
  };
}

const JobDetailsOverviewPage = ({ params }: PageProps) => {
  const jobId = params["job-id"];

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
          <JobDetailsPage
            jobId={jobId}
            isOverview={true}
            showImageUpload={false}
            showSignature={false}
            staticImages={{
              beforeImage: "/workingImage.jpg",
              afterImage: "/workingImage.jpg",
              signatureImage: "/signature.png",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsOverviewPage;
