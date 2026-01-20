/** @format */

import AllAssignJobTableSection from "@/components/MaintenanceComponents/AllAssignJobTableSection";

const MaintenancePage = () => {
  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto">
        <AllAssignJobTableSection />
      </div>
    </div>
  );
};

export default MaintenancePage;
