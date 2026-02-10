/** @format */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { TechnicianDetails } from "@/redux/features/adminFeatures/jobDetailsAPI";
import { Button } from "@/components/ui/button";
import { UserPlus, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAutocompleteTechniciansQuery } from "@/redux/features/adminFeatures/installationAPI";
import { useReassignTechnicianMutation } from "@/redux/features/adminFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface TechnicianDetailsSectionProps {
  data?: TechnicianDetails;
  jobId?: string;
  jobStatus?: string;
}

const TechnicianDetailsSection = ({
  data,
  jobId,
  jobStatus,
}: TechnicianDetailsSectionProps) => {
  const [isAddTechnicianModalOpen, setIsAddTechnicianModalOpen] =
    useState(false);
  const [technicianIdName, setTechnicianIdName] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [technicianId, setTechnicianId] = useState("");
  const [showTechnicianDropdown, setShowTechnicianDropdown] = useState(false);
  const technicianRef = useRef<HTMLDivElement>(null);

  const [reassignTechnician, { isLoading: isReassigning }] =
    useReassignTechnicianMutation();

  // Technician autocomplete
  const { data: technicianSuggestions, isFetching: isFetchingTechnicians } =
    useAutocompleteTechniciansQuery(
      { q: technicianIdName },
      {
        skip: technicianIdName.length < 2,
      },
    );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        technicianRef.current &&
        !technicianRef.current.contains(event.target as Node)
      ) {
        setShowTechnicianDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTechnicianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechnicianIdName(value);
    setShowTechnicianDropdown(value.length >= 2);

    // Clear selected technician if user modifies input
    if (technicianId && value !== technicianId) {
      setTechnicianName("");
      setTechnicianId("");
    }
  };

  const handleTechnicianSelect = (technician: {
    technician_id: string;
    name: string;
    contact_number: string;
    status: string;
    skills: string[];
  }) => {
    setTechnicianIdName(technician.technician_id);
    setTechnicianId(technician.technician_id);
    setTechnicianName(technician.name);
    setShowTechnicianDropdown(false);
  };

  const handleAddTechnician = async () => {
    if (!technicianId || !technicianName) {
      toast.error("Please select a technician");
      return;
    }

    if (!jobId) {
      toast.error("Job ID is missing");
      return;
    }

    try {
      await reassignTechnician({
        job_id: jobId,
        technician_id: technicianId,
        technician_name: technicianName,
      }).unwrap();

      toast.success("Technician assigned successfully");
      setIsAddTechnicianModalOpen(false);
      setTechnicianIdName("");
      setTechnicianName("");
      setTechnicianId("");
      setShowTechnicianDropdown(false);
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      toast.error(errorMessage || "Failed to assign technician");
    }
  };

  const shouldShowAddButton = jobStatus !== "in_progress";

  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Technician Information Section:
          </h3>
          {shouldShowAddButton && (
            <Button
              onClick={() => setIsAddTechnicianModalOpen(true)}
              className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              size="sm"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Add Technician</span>
            </Button>
          )}
        </div>
        <div className="space-y-2 sm:space-y-3 border border-gray-200 p-3 sm:p-4 rounded-2xl">
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              Technician ID :
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {data?.technician_id || "N/A"}
            </p>
          </div>
          <div className="flex items-center justify-between py-1.5 sm:py-2 border-b border-gray-100">
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              Technician Name :
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {data?.technician_name || "N/A"}
            </p>
          </div>
          <div className="flex items-center justify-between py-1.5 sm:py-2">
            <p className="text-gray-800 font-medium text-sm sm:text-base">
              Contact Number :
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              {data?.contact_number || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Add Technician Modal */}
      <Dialog
        open={isAddTechnicianModalOpen}
        onOpenChange={(open) => {
          setIsAddTechnicianModalOpen(open);
          if (!open) {
            // Reset form when modal closes
            setTechnicianIdName("");
            setTechnicianName("");
            setTechnicianId("");
            setShowTechnicianDropdown(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Technician</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="technicianIdName">Technician ID / Name</Label>
              <div className="relative" ref={technicianRef}>
                <Input
                  id="technicianIdName"
                  type="text"
                  placeholder="Start with T- to search technician id"
                  value={technicianIdName}
                  onChange={handleTechnicianChange}
                  className="w-full pr-10"
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {showTechnicianDropdown && technicianIdName.length >= 2 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                    {isFetchingTechnicians ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : technicianSuggestions?.data?.length ? (
                      technicianSuggestions.data.map((technician) => (
                        <div
                          key={technician.technician_id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleTechnicianSelect(technician)}
                        >
                          <div className="font-medium">
                            {technician.technician_id}
                          </div>
                          <div className="text-gray-500">{technician.name}</div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No technicians found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="technicianName">Technician Name</Label>
              <Input
                id="technicianName"
                type="text"
                value={technicianName}
                disabled
                className="w-full bg-gray-50"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddTechnicianModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTechnician} disabled={isReassigning}>
                {isReassigning ? "Adding..." : "Add Technician"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechnicianDetailsSection;
