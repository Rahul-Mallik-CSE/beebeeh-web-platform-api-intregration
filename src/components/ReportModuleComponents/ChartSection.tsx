/** @format */

import React from "react";
import JobActivityChart from "./SubComponents/JobActivityChart";
import JobDistributionChart from "./SubComponents/JobDistributionChart";

const ChartSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
      <div className="lg:col-span-2">
        <JobActivityChart />
      </div>
      <div className="lg:col-span-1">
        <JobDistributionChart />
      </div>
    </div>
  );
};

export default ChartSection;
