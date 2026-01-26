/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
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
import {
  useAddPartMutation,
  useAutocompletePartsQuery,
} from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Autocomplete states
  const [partIdQuery, setPartIdQuery] = useState("");
  const [partNameQuery, setPartNameQuery] = useState("");
  const [showPartIdDropdown, setShowPartIdDropdown] = useState(false);
  const [showPartNameDropdown, setShowPartNameDropdown] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [selectedPartName, setSelectedPartName] = useState<string | null>(null);

  const partIdRef = useRef<HTMLInputElement>(null);
  const partNameRef = useRef<HTMLInputElement>(null);

  const [addPart, { isLoading }] = useAddPartMutation();

  // Autocomplete queries with debouncing
  const { data: partIdSuggestions, isFetching: isFetchingPartId } =
    useAutocompletePartsQuery(partIdQuery, {
      skip: partIdQuery.length < 2,
    });

  const { data: partNameSuggestions, isFetching: isFetchingPartName } =
    useAutocompletePartsQuery(partNameQuery, {
      skip: partNameQuery.length < 2,
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Handle autocomplete queries
    if (name === "part_id") {
      setPartIdQuery(value);
      setSelectedPartId(null);
      setShowPartIdDropdown(value.length >= 2);
      if (selectedPartName && value !== selectedPartId) {
        setSelectedPartName(null);
        setFormData((prev) => ({ ...prev, part_name: "" }));
      }
    } else if (name === "part_name") {
      setPartNameQuery(value);
      setSelectedPartName(null);
      setShowPartNameDropdown(value.length >= 2);
      if (selectedPartId && value !== selectedPartName) {
        setSelectedPartId(null);
        setFormData((prev) => ({ ...prev, part_id: "" }));
      }
    }
  };

  const handlePartIdSelect = (part: any) => {
    setFormData((prev) => ({
      ...prev,
      part_id: part.part_id,
      part_name: part.part_name,
    }));
    setSelectedPartId(part.part_id);
    setSelectedPartName(part.part_name);
    setPartIdQuery("");
    setShowPartIdDropdown(false);
  };

  const handlePartNameSelect = (part: any) => {
    setFormData((prev) => ({
      ...prev,
      part_id: part.part_id,
      part_name: part.part_name,
    }));
    setSelectedPartId(part.part_id);
    setSelectedPartName(part.part_name);
    setPartNameQuery("");
    setShowPartNameDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        partIdRef.current &&
        !partIdRef.current.contains(event.target as Node)
      ) {
        setShowPartIdDropdown(false);
      }
      if (
        partNameRef.current &&
        !partNameRef.current.contains(event.target as Node)
      ) {
        setShowPartNameDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setPartIdQuery("");
    setPartNameQuery("");
    setShowPartIdDropdown(false);
    setShowPartNameDropdown(false);
    setSelectedPartId(null);
    setSelectedPartName(null);
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
              <div className="col-span-3 relative" ref={partIdRef}>
                <Input
                  id="part_id"
                  name="part_id"
                  value={formData.part_id}
                  onChange={handleInputChange}
                  placeholder="e.g., Pr-204"
                  className="w-full"
                  required
                />
                {showPartIdDropdown && partIdSuggestions?.data && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {isFetchingPartId ? (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        Searching...
                      </div>
                    ) : partIdSuggestions.data.length > 0 ? (
                      partIdSuggestions.data.map((part) => (
                        <div
                          key={part.part_id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handlePartIdSelect(part)}
                        >
                          <div className="font-medium">{part.part_id}</div>
                          <div className="text-gray-500 text-xs">
                            {part.part_name} • {part.stock_quantity} {part.unit}{" "}
                            in stock
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No parts found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="part_name" className="text-right">
                Part Name
              </Label>
              <div className="col-span-3 relative" ref={partNameRef}>
                <Input
                  id="part_name"
                  name="part_name"
                  value={formData.part_name}
                  onChange={handleInputChange}
                  placeholder="e.g., Filter A22"
                  className="w-full"
                  required
                />
                {showPartNameDropdown && partNameSuggestions?.data && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {isFetchingPartName ? (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        Searching...
                      </div>
                    ) : partNameSuggestions.data.length > 0 ? (
                      partNameSuggestions.data.map((part) => (
                        <div
                          key={part.part_id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handlePartNameSelect(part)}
                        >
                          <div className="font-medium">{part.part_name}</div>
                          <div className="text-gray-500 text-xs">
                            {part.part_id} • {part.stock_quantity} {part.unit}{" "}
                            in stock
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500">
                        No parts found
                      </div>
                    )}
                  </div>
                )}
              </div>
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
