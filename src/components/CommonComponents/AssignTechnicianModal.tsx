/** @format */
"use client";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { techniciansForAssign, TechnicianForAssign } from "@/data/AllData";

interface AssignTechnicianModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const AssignTechnicianModal: React.FC<AssignTechnicianModalProps> = ({
  isOpen,
  onClose,
  jobId,
}) => {
  const [selectedTechnician, setSelectedTechnician] =
    useState<TechnicianForAssign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechnicians = useMemo(() => {
    return techniciansForAssign.filter(
      (tech) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.technicianId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectTechnician = (technician: TechnicianForAssign) => {
    setSelectedTechnician(technician);
  };

  const handleAssignJob = () => {
    if (selectedTechnician) {
      console.log(
        `Assigning job ${jobId} to technician ${selectedTechnician.technicianId}`
      );
      // Handle job assignment logic here
      onClose();
      // Reset state
      setSelectedTechnician(null);
      setSearchQuery("");
    }
  };

  const handleClose = () => {
    setSelectedTechnician(null);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Assign Technician
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Job ID Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Job ID</label>
            <Input value={jobId} disabled className="bg-gray-50" />
          </div>

          {/* Selected Technician Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Selected Technician
            </label>
            <Input
              value={
                selectedTechnician
                  ? `${selectedTechnician.name} (${selectedTechnician.technicianId})`
                  : ""
              }
              placeholder="Select a technician from the list below"
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Search Technician
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Technician List */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Available Technicians
            </label>
            <ScrollArea className="h-[200px] border rounded-lg">
              <div className="p-2 space-y-1">
                {filteredTechnicians.length > 0 ? (
                  filteredTechnicians.map((technician) => (
                    <div
                      key={technician.id}
                      onClick={() => handleSelectTechnician(technician)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTechnician?.id === technician.id
                          ? "bg-red-800 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">
                          {technician.name}
                        </span>
                        <span className="text-xs opacity-80">
                          {technician.technicianId}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No technicians found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Assign Button */}
          <Button
            onClick={handleAssignJob}
            disabled={!selectedTechnician}
            className="w-full bg-red-800 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Job
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTechnicianModal;
