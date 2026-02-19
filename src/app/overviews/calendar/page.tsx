/** @format */
"use client";

import CalendarPageDesign from "@/components/TechniciansComponents/CalendarPageDesign";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const TechnicianCalendarInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const technicianId = searchParams.get("technicianId") ?? "";

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.back()}
                className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                Technician Calendar
              </span>
            </div>
          </div>
          <CalendarPageDesign technicianId={technicianId} />
        </div>
      </div>
    </div>
  );
};

const TechnicianCalendarPage = () => (
  <Suspense fallback={null}>
    <TechnicianCalendarInner />
  </Suspense>
);

export default TechnicianCalendarPage;
