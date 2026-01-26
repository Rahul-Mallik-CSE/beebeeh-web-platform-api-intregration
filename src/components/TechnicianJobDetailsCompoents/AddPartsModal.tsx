/** @format */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddPartMutation } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface AddPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const AddPartsModal = ({ isOpen, onClose, jobId }: AddPartsModalProps) => {
  const [formData, setFormData] = useState({
    part_id: "",
    part_name: "",
    quantity_used: "",
  });

  const [addPart, { isLoading }] = useAddPartMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.part_id.trim() ||
      !formData.part_name.trim() ||
      !formData.quantity_used.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const quantity = parseInt(formData.quantity_used);
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Quantity must be a positive number");
      return;
    }

    try {
      await addPart({
        jobId,
        partData: {
          part_id: formData.part_id.trim(),
          part_name: formData.part_name.trim(),
          quantity_used: quantity,
        },
      }).unwrap();

      toast.success("Part added successfully!");
      // Reset form
      setFormData({
        part_id: "",
        part_name: "",
        quantity_used: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to add part:", error);
      toast.error("Failed to add part. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      part_id: "",
      part_name: "",
      quantity_used: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Part</DialogTitle>
          <DialogDescription>
            Add a new part to this job. Fill in the part details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="part_id" className="text-right">
                Part ID
              </Label>
              <Input
                id="part_id"
                name="part_id"
                value={formData.part_id}
                onChange={handleInputChange}
                placeholder="e.g., Pr-204"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="part_name" className="text-right">
                Part Name
              </Label>
              <Input
                id="part_name"
                name="part_name"
                value={formData.part_name}
                onChange={handleInputChange}
                placeholder="e.g., Filter A22"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity_used" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity_used"
                name="quantity_used"
                type="number"
                min="1"
                value={formData.quantity_used}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Part"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartsModal;
