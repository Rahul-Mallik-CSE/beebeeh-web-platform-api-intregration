/** @format */

import React from "react";
import StatsSection from "./StatsSection";
import ChartSection from "./ChartSection";
import TableSection from "./TableSection";

const ReportModule = () => {
  return (
    <div className="w-full bg-transparent space-y-3 sm:space-y-4">
      <StatsSection />

      <ChartSection />
      <TableSection />
    </div>
  );
};

export default ReportModule;
