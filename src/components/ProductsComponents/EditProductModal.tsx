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
import { Label } from "@/components/ui/label";
import {
  ProductDetailData,
  UpdateProductRequest,
  useUpdateProductMutation,
} from "@/redux/features/adminFeatures/productsAPI";
import { toast } from "react-toastify";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetailData;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [formData, setFormData] = useState<UpdateProductRequest>({
    model_name: "",
    alias: "",
    frequency_domestic_month: 0,
    frequency_commercial_month: 0,
    unit_cost: 0,
    unit_cost_currency_symbol: "€",
    sku: "",
  });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Pre-fill form when modal opens
  useEffect(() => {
    if (isOpen && product) {
      // Parse the raw numeric value from unit_cost_display (e.g. "€40.00" → 40)
      const rawCost =
        parseFloat((product.unit_cost_display || "").replace(/[^0-9.]/g, "")) ||
        0;
      setFormData({
        model_name: product.model_name || "",
        alias: product.alias || "",
        frequency_domestic_month: product.frequency_domestic_month ?? 0,
        frequency_commercial_month: product.frequency_commercial_month ?? 0,
        unit_cost: rawCost,
        unit_cost_currency_symbol: product.unit_cost_currency_symbol || "€",
        sku: product.sku || "",
      });
    }
  }, [isOpen, product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = [
      "frequency_domestic_month",
      "frequency_commercial_month",
      "unit_cost",
    ];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId: product.product_id,
        data: formData,
      }).unwrap();
      toast.success("Product updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  const fields: {
    name: keyof UpdateProductRequest;
    label: string;
    type: string;
    placeholder: string;
    step?: string;
  }[] = [
    {
      name: "model_name",
      label: "Model Name",
      type: "text",
      placeholder: "e.g. CoolMaster X20",
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "e.g. SKU-1001",
    },
    {
      name: "alias",
      label: "Alias",
      type: "text",
      placeholder: "e.g. Discover",
    },
    {
      name: "frequency_domestic_month",
      label: "Domestic Frequency (months)",
      type: "number",
      placeholder: "e.g. 2",
    },
    {
      name: "frequency_commercial_month",
      label: "Commercial Frequency (months)",
      type: "number",
      placeholder: "e.g. 4",
    },
    {
      name: "unit_cost",
      label: "Unit Cost",
      type: "number",
      placeholder: "e.g. 3430.50",
      step: "0.01",
    },
    {
      name: "unit_cost_currency_symbol",
      label: "Currency Symbol",
      type: "text",
      placeholder: "e.g. €",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl p-0 gap-0 max-h-[90vh] flex flex-col">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-gray-100">
          <DialogTitle className="text-base sm:text-lg font-semibold text-gray-800">
            Edit Product
            <span className="ml-2 text-xs sm:text-sm font-normal text-gray-500">
              #{product.product_id}
            </span>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-4 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.name === "model_name" ? "sm:col-span-2" : ""}
                >
                  <Label
                    htmlFor={field.name}
                    className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 block"
                  >
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={
                      formData[field.name] !== undefined
                        ? String(formData[field.name])
                        : ""
                    }
                    onChange={handleChange}
                    step={field.step}
                    min={field.type === "number" ? "0" : undefined}
                    className="h-9 sm:h-10 text-xs sm:text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 border-t border-gray-100">
            <div className="flex gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 h-9 sm:h-10 text-xs sm:text-sm border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-9 sm:h-10 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
