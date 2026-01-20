/** @format */

import OverviewTableSection from "@/components/OverviewComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewComponents/StatsSection";
import React from "react";

const OverviewPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        {/* table section */}
        <div>
          {/* Stats section */}
          <StatsSection />
          <OverviewTableSection />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
