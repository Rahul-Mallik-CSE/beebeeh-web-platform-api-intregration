/** @format */
"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeletePartMutation } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  partId: string;
  partName: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  jobId,
  partId,
  partName,
}: DeleteConfirmationModalProps) => {
  const [deletePart, { isLoading }] = useDeletePartMutation();

  const handleDelete = async () => {
    try {
      await deletePart({
        jobId,
        part_id: partId,
      }).unwrap();

      toast.success("Part deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to delete part:", error);
      toast.error("Failed to delete part. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Part</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the part "{partName}" (ID: {partId}
            )? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
