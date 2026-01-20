/** @format */

import React from "react";
import JobDetailsPage from "@/components/JobDetailsComponents/JobDetailsPage";

interface PageProps {
  params: {
    "job-id": string;
  };
}

const AllJobsDetailsPage = ({ params }: PageProps) => {
  const jobId = params["job-id"];

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          {" "}
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

export default AllJobsDetailsPage;
