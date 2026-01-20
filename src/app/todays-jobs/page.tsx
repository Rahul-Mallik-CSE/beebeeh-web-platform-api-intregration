/** @format */

import React from "react";
import TodaysJobsTableSection from "@/components/TodaysJobsComponents/TodaysJobsTableSection";

const TodaysJobsPage = () => {
  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* table section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <TodaysJobsTableSection />
        </div>
      </div>
    </div>
  );
};

export default TodaysJobsPage;
