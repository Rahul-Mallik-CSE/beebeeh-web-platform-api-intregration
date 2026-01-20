/** @format */
"use client";
import React from "react";
import CommonAddingPage from "@/components/CommonComponents/CommonAddingPage";
import { useRouter } from "next/navigation";

const AddRepairs = () => {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("Installation data:", data);
    // Handle form submission here
    router.push("/installation");
  };

  const handleCancel = () => {
    router.push("/installation");
  };

  return (
    <div className="w-full p-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto bg-white">
        <CommonAddingPage
          title="Add Repairs"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AddRepairs;
