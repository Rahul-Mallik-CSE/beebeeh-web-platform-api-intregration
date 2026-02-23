/** @format */
"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCancelMaintenanceMutation } from "@/redux/features/adminFeatures/maintenanceAPI";
import { toast } from "react-toastify";

interface CancelMaintenanceModalProps {
  isOpen: boolean;
  maintenanceId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const CancelMaintenanceModal: React.FC<CancelMaintenanceModalProps> = ({
  isOpen,
  maintenanceId,
  onClose,
  onSuccess,
}) => {
  const [reason, setReason] = useState("");
  const [cancelMaintenance, { isLoading }] = useCancelMaintenanceMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    try {
      await cancelMaintenance({
        installation_id: maintenanceId,
        reason: reason.trim(),
      }).unwrap();
      toast.success("Maintenance cancelled successfully.");
      setReason("");
      onSuccess?.();
      onClose();
    } catch {
      toast.error("Failed to cancel maintenance. Please try again.");
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Cancel Maintenance
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Job ID info */}
        <div className="mb-4 px-3 py-2 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-500">Job ID: </span>
          <span className="text-sm font-medium text-gray-800">
            {maintenanceId}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter the reason for cancellation..."
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="px-5 py-2 text-sm cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 text-sm cursor-pointer"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelMaintenanceModal;
