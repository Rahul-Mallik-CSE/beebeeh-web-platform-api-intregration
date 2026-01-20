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
import { jobsForAssign, JobForAssign } from "@/data/AllData";

interface AssignJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  technicianId: string;
  technicianName: string;
}

const AssignJobModal: React.FC<AssignJobModalProps> = ({
  isOpen,
  onClose,
  technicianId,
  technicianName,
}) => {
  const [selectedJob, setSelectedJob] = useState<JobForAssign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    return jobsForAssign.filter(
      (job) =>
        job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectJob = (job: JobForAssign) => {
    setSelectedJob(job);
  };

  const handleAssignJob = () => {
    if (selectedJob) {
      console.log(
        `Assigning job ${selectedJob.jobId} to technician ${technicianId}`
      );
      // Handle job assignment logic here
      onClose();
      // Reset state
      setSelectedJob(null);
      setSearchQuery("");
    }
  };

  const handleClose = () => {
    setSelectedJob(null);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Assign Job
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Technician Info Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Technician
            </label>
            <Input
              value={`${technicianName} (${technicianId})`}
              disabled
              className="bg-gray-50"
            />
          </div>

          {/* Selected Job Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Selected Job
            </label>
            <Input
              value={
                selectedJob
                  ? `${selectedJob.jobId} - ${selectedJob.clientName} (${selectedJob.jobType})`
                  : ""
              }
              placeholder="Select a job from the list below"
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Search Job
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by job ID, client name, or job type"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Available Jobs
            </label>
            <ScrollArea className="h-[200px] border rounded-lg">
              <div className="p-2 space-y-1">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handleSelectJob(job)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedJob?.id === job.id
                          ? "bg-red-800 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">
                            {job.jobId}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              selectedJob?.id === job.id
                                ? "bg-white/20"
                                : "bg-gray-100"
                            }`}
                          >
                            {job.jobType}
                          </span>
                        </div>
                        <p className="text-xs opacity-80">{job.clientName}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No jobs found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Assign Button */}
          <Button
            onClick={handleAssignJob}
            disabled={!selectedJob}
            className="w-full bg-red-800 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign Job
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignJobModal;
