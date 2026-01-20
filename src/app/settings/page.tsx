/** @format */

import React from "react";
import ProfileSection from "@/components/SettingsComponents/ProfileSection";

const SettingsPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        {/* Profile section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
          <ProfileSection />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
