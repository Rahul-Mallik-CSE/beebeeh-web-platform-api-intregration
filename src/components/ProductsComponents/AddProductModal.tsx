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

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
}

interface ProductFormData {
  modelName: string;
  alias: string;
  frequencyDomestic: string;
  frequencyCommercial: string;
  partsQuantity: string;
  stockQuantity: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    modelName: "",
    alias: "",
    frequencyDomestic: "",
    frequencyCommercial: "",
    partsQuantity: "",
    stockQuantity: "",
  });

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.modelName.trim()) {
      onSave(formData);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setFormData({
      modelName: "",
      alias: "",
      frequencyDomestic: "",
      frequencyCommercial: "",
      partsQuantity: "",
      stockQuantity: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md md:max-w-lg p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-3 xs:px-4 sm:px-5 md:px-6 pt-3 xs:pt-4 sm:pt-5 md:pt-6 pb-2 xs:pb-3 sm:pb-4">
          <DialogTitle className="text-center text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            Add Product
          </DialogTitle>
        </DialogHeader>

        <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 space-y-2 sm:space-y-3">
          {/* Model Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="modelName"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Model Name
            </label>
            <Input
              id="modelName"
              type="text"
              placeholder="Enter product model name"
              value={formData.modelName}
              onChange={(e) => handleChange("modelName", e.target.value)}
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Alias */}
          <div className="space-y-1.5">
            <label
              htmlFor="alias"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Alias{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <Input
              id="alias"
              type="text"
              placeholder="Enter alias"
              value={formData.alias}
              onChange={(e) => handleChange("alias", e.target.value)}
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Frequency Domestic */}
          <div className="space-y-1.5">
            <label
              htmlFor="frequencyDomestic"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Maintenance Frequency Domestic{" "}
              <span className="text-gray-500 font-normal">(month)</span>
            </label>
            <Input
              id="frequencyDomestic"
              type="text"
              placeholder="enter frequency domestic month number"
              value={formData.frequencyDomestic}
              onChange={(e) =>
                handleChange("frequencyDomestic", e.target.value)
              }
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Frequency Commercial */}
          <div className="space-y-1.5">
            <label
              htmlFor="frequencyCommercial"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Maintenance Frequency Commercial{" "}
              <span className="text-gray-500 font-normal">(month)</span>
            </label>
            <Input
              id="frequencyCommercial"
              type="text"
              placeholder="enter frequency commercial month number"
              value={formData.frequencyCommercial}
              onChange={(e) =>
                handleChange("frequencyCommercial", e.target.value)
              }
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Parts Quantity */}
          <div className="space-y-1.5">
            <label
              htmlFor="partsQuantity"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Parts Quantity
            </label>
            <Input
              id="partsQuantity"
              type="text"
              placeholder="Enter how many parts come with this product"
              value={formData.partsQuantity}
              onChange={(e) => handleChange("partsQuantity", e.target.value)}
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Stock Quantity */}
          <div className="space-y-1.5">
            <label
              htmlFor="stockQuantity"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              Stock Quantity
            </label>
            <Input
              id="stockQuantity"
              type="text"
              placeholder="enter stock number"
              value={formData.stockQuantity}
              onChange={(e) => handleChange("stockQuantity", e.target.value)}
              className="w-full text-[11px] xs:text-xs sm:text-sm h-8 xs:h-9 sm:h-10"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm bg-red-800 hover:bg-red-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
