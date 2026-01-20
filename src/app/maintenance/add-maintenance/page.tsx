/** @format */
"use client";
import React from "react";
import CommonAddingPage from "@/components/CommonComponents/CommonAddingPage";
import { useRouter } from "next/navigation";

const AddMaintenancePage = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Maintenance data:", data);
    // Handle form submission here
    router.push("/maintenance");
  };

  const handleCancel = () => {
    router.push("/maintenance");
  };

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto bg-white">
        <CommonAddingPage
          title="Add Maintenance"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddMaintenancePage;
