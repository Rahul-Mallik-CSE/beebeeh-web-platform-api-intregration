/** @format */

import OverviewTableSection from "@/components/OverviewsComponents/OverviewTableSection";
import StatsSection from "@/components/OverviewsComponents/StatsSection";
import React from "react";

const OverviewPage = () => {
  return (
    <div className="w-full p-4">
      <div className=" max-w-[2500px] rounded-2xl mx-auto space-y-4">
        {/* table section */}
        <div className=" ">
          {/* Stats section */}
          <StatsSection />
          <OverviewTableSection />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
