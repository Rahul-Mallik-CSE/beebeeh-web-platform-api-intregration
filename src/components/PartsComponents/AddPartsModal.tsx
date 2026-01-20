/** @format */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface AddPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PartsFormData) => void;
}

export interface PartsFormData {
  productIdAndName: string;
  productName: string;
  partName: string;
  stockQuantity: string;
  lowStockWarning: string;
}

const AddPartsModal: React.FC<AddPartsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PartsFormData>({
    productIdAndName: "",
    productName: "",
    partName: "",
    stockQuantity: "",
    lowStockWarning: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      productIdAndName: "",
      productName: "",
      partName: "",
      stockQuantity: "",
      lowStockWarning: "",
    });
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md md:max-w-lg p-0 gap-0 rounded-2xl">
        <div className="px-3 xs:px-4 sm:px-5 md:px-6 py-4 xs:py-5 sm:py-6 md:py-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-3 xs:mb-4 sm:mb-5 md:mb-6">
            <DialogTitle className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-800">
              Add Parts
            </DialogTitle>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-2.5 xs:space-y-3 sm:space-y-4">
            {/* Product ID and Name */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Product ID and Name
              </label>
              <Input
                type="text"
                name="productIdAndName"
                value={formData.productIdAndName}
                onChange={handleChange}
                placeholder="search product id and name..."
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Product Name
              </label>
              <div className="relative">
                <Input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter parts name"
                  className="h-8 xs:h-9 sm:h-10 pr-9 xs:pr-10 text-xs xs:text-sm"
                  readOnly
                />
                <div className="absolute right-2 xs:right-3 top-1/2 -translate-y-1/2">
                  <Lock className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-400" />
                </div>
              </div>
            </div>

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
                placeholder="Enter parts name"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Stock Quantity */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Stock Quantity
              </label>
              <Input
                type="text"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="Enter stock quantity number"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Low stock warning */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Low stock warning
              </label>
              <Input
                type="text"
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
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium bg-red-800 hover:bg-red-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartsModal;
