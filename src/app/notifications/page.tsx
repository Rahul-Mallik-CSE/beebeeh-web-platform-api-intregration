/** @format */

import React from "react";
import NotificationsSection from "@/components/NotificationsComponents/NotificationsSection";

const NotificationsPage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-4 sm:space-y-6">
        <div className="bg-transparent rounded-2xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600">
            Notifications
          </h1>
        </div>
        <div>
          <NotificationsSection />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
