/** @format */
"use client";
import React, { Suspense } from "react";
import CommonAddingPage from "@/components/CommonComponents/CommonAddingPage";
import { useRouter, useSearchParams } from "next/navigation";

const AddMaintenancePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialData = {
    clientId: searchParams.get("clientId") || "",
    clientName: searchParams.get("clientName") || "",
    productId: searchParams.get("productId") || "",
    productModel: searchParams.get("productModel") || "",
  };

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
          initialData={initialData}
        />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddMaintenancePage />
    </Suspense>
  );
};

export default Page;
