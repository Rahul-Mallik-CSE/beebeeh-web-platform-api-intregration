/** @format */

import React from "react";
import InstallationTableSection from "@/components/InstallationComponents/InstallationTableSection";

const InstallationPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto">
        <InstallationTableSection />
      </div>
    </div>
  );
};

export default InstallationPage;
