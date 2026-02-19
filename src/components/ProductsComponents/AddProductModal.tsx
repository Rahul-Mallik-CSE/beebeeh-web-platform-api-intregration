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
import { useAddProductMutation } from "@/redux/features/adminFeatures/productsAPI";
import { toast } from "react-toastify";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: ProductFormData) => void;
}

interface ProductFormData {
  modelName: string;
  alias: string;
  sku: string;
  frequencyDomestic: string;
  frequencyCommercial: string;
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
    sku: "",
    frequencyDomestic: "",
    frequencyCommercial: "",
    stockQuantity: "",
  });
  const [addProduct, { isLoading }] = useAddProductMutation();

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validation: Check if all required fields are filled
    if (
      !formData.modelName.trim() ||
      !formData.alias.trim() ||
      !formData.sku.trim() ||
      !formData.frequencyDomestic.trim() ||
      !formData.frequencyCommercial.trim() ||
      !formData.stockQuantity.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const freqDom = parseInt(formData.frequencyDomestic);
    if (isNaN(freqDom) || freqDom <= 0) {
      toast.error("Frequency Domestic must be a positive number.");
      return;
    }

    const freqCom = parseInt(formData.frequencyCommercial);
    if (isNaN(freqCom) || freqCom <= 0) {
      toast.error("Frequency Commercial must be a positive number.");
      return;
    }

    const stockQty = parseInt(formData.stockQuantity);
    if (isNaN(stockQty) || stockQty < 0) {
      toast.error("Stock Quantity must be a non-negative number.");
      return;
    }

    try {
      // Prepare the payload
      const productData = {
        model_name: formData.modelName,
        alias: formData.alias,
        sku: formData.sku,
        frequency_domestic_month: freqDom,
        frequency_commercial_month: freqCom,
        stock_quantity: stockQty,
        maintenance_frequency_month: freqDom, // Using domestic frequency as default
        is_active: true,
      };

      // Call the API
      await addProduct(productData).unwrap();

      // Show success message
      toast.success("Product added successfully!");

      // Call parent onSave callback
      onSave(formData);

      // Reset and close
      handleCancel();
    } catch (error: any) {
      // Show error message
      toast.error(
        error?.data?.message || "Failed to add product. Please try again.",
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      modelName: "",
      alias: "",
      sku: "",
      frequencyDomestic: "",
      frequencyCommercial: "",
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

          {/* SKU */}
          <div className="space-y-1.5">
            <label
              htmlFor="sku"
              className="text-[11px] xs:text-xs sm:text-lg font-medium text-gray-700"
            >
              SKU
            </label>
            <Input
              id="sku"
              type="text"
              placeholder="Enter SKU (e.g. WP-0029)"
              value={formData.sku}
              onChange={(e) => handleChange("sku", e.target.value)}
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
              type="number"
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
              type="number"
              placeholder="enter frequency commercial month number"
              value={formData.frequencyCommercial}
              onChange={(e) =>
                handleChange("frequencyCommercial", e.target.value)
              }
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
              type="number"
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
              disabled={isLoading}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-[11px] xs:text-xs sm:text-sm bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
