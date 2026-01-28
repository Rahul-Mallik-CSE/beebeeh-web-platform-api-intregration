/** @format */

import React from "react";
import JobActivityChart from "./SubComponents/JobActivityChart";
import JobDistributionChart from "./SubComponents/JobDistributionChart";
import { ReportModuleData } from "@/redux/features/adminFeatures/reportmoduleAPI";

interface ChartSectionProps {
  data?: ReportModuleData;
}

const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
      <div className="lg:col-span-2">
        <JobActivityChart data={data?.weekly_jobs_activity} />
      </div>
      <div className="lg:col-span-1">
        <JobDistributionChart data={data?.job_distribution} />
      </div>
    </div>
  );
};

export default ChartSection;
