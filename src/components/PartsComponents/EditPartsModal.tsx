/** @format */
"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useUpdatePartMutation } from "@/redux/features/adminFeatures/partsAPI";
import { toast } from "react-toastify";

interface EditPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  partId: string;
  initialData: {
    sku: string;
    name: string;
    unit: string;
    unit_price: string | null;
    stock: number;
    min_stock: number;
  };
}

interface EditFormData {
  sku: string;
  partName: string;
  unit: string;
  unitPrice: string;
  stockQuantity: string;
  lowStockWarning: string;
}

const EditPartsModal: React.FC<EditPartsModalProps> = ({
  isOpen,
  onClose,
  partId,
  initialData,
}) => {
  const [formData, setFormData] = useState<EditFormData>({
    sku: "",
    partName: "",
    unit: "",
    unitPrice: "",
    stockQuantity: "",
    lowStockWarning: "",
  });

  const [updatePart, { isLoading }] = useUpdatePartMutation();

  // Populate form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        sku: initialData.sku ?? "",
        partName: initialData.name ?? "",
        unit: initialData.unit ?? "",
        unitPrice:
          initialData.unit_price != null ? String(initialData.unit_price) : "",
        stockQuantity: String(initialData.stock ?? ""),
        lowStockWarning: String(initialData.min_stock ?? ""),
      });
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !formData.partName.trim() ||
      !formData.sku.trim() ||
      !formData.unit.trim() ||
      !formData.unitPrice.trim() ||
      !formData.stockQuantity.trim() ||
      !formData.lowStockWarning.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const unitPrice = parseFloat(formData.unitPrice);
    if (isNaN(unitPrice) || unitPrice <= 0) {
      toast.error("Unit price must be a positive number.");
      return;
    }

    const stockQty = parseInt(formData.stockQuantity);
    if (isNaN(stockQty) || stockQty < 0) {
      toast.error("Stock quantity must be a non-negative number.");
      return;
    }

    const lowStockWarn = parseInt(formData.lowStockWarning);
    if (isNaN(lowStockWarn) || lowStockWarn < 0) {
      toast.error("Low stock warning must be a non-negative number.");
      return;
    }

    try {
      await updatePart({
        partId,
        data: {
          sku: formData.sku,
          part_name: formData.partName,
          unit: formData.unit,
          unit_price: unitPrice,
          stock_quantity: stockQty,
          low_stock_warning: lowStockWarn,
        },
      }).unwrap();

      toast.success("Part updated successfully!");
      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      toast.error(errorMessage || "Failed to update part. Please try again.");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md md:max-w-lg p-0 gap-0 rounded-2xl">
        <div className="px-3 xs:px-4 sm:px-5 md:px-6 py-4 xs:py-5 sm:py-6 md:py-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
            <DialogTitle className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
              <Edit className="w-5 h-5 text-blue-700" />
              Edit Part
            </DialogTitle>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
            {/* Part Name */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Part Name
              </label>
              <Input
                type="text"
                name="partName"
                value={formData.partName}
                onChange={handleChange}
                placeholder="Enter part name"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                SKU
              </label>
              <Input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Enter SKU (e.g. MP-002)"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Unit
              </label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                  <SelectItem value="rolls">Rolls</SelectItem>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="meter">Meter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Unit Price */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Unit Price
              </label>
              <Input
                type="number"
                step="0.01"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={handleChange}
                placeholder="Enter unit price"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Stock Quantity
              </label>
              <Input
                type="number"
                min="0"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Low Stock Warning */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Low Stock Warning
              </label>
              <Input
                type="number"
                min="0"
                name="lowStockWarning"
                value={formData.lowStockWarning}
                onChange={handleChange}
                placeholder="Enter low stock quantity"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-4 xs:mt-5 sm:mt-6 md:mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium bg-blue-800 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPartsModal;
