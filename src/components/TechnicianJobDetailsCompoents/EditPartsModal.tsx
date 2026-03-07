/** @format */
"use client";
import React, { useState, useEffect } from "react";
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
import { useEditPartMutation } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";
import { FrequentlyUsedPart } from "@/types/JobDetailsTypes";

interface EditPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  part: FrequentlyUsedPart | null;
}

const EditPartsModal = ({
  isOpen,
  onClose,
  jobId,
  part,
}: EditPartsModalProps) => {
  const [quantity, setQuantity] = useState("");

  const [editPart, { isLoading }] = useEditPartMutation();

  useEffect(() => {
    if (part) {
      setQuantity(part.quantity_used.toString());
    }
  }, [part]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quantity.trim()) {
      toast.error("Please enter quantity");
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast.error("Quantity must be a positive number");
      return;
    }

    if (!part) return;

    try {
      await editPart({
        jobId,
        part_id: part.part_id,
        quantity_used: qty,
      }).unwrap();

      toast.success("Part updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update part:", error);
      toast.error("Failed to update part. Please try again.");
    }
  };

  const handleClose = () => {
    setQuantity("");
    onClose();
  };

  if (!part) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Part Quantity</DialogTitle>
          <DialogDescription>
            Update the quantity for this part.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Part ID</Label>
              <div className="col-span-3">
                <Input value={part.part_id} disabled className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Part Name</Label>
              <div className="col-span-3">
                <Input value={part.part_name} disabled className="w-full" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
              {isLoading ? "Updating..." : "Update Part"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPartsModal;
