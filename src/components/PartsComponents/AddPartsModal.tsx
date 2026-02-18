/** @format */
"use client";
import React, { useState, useRef, useEffect } from "react";
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
import { X } from "lucide-react";
import {
  useAutocompleteProductsQuery,
  useAddPartMutation,
} from "@/redux/features/adminFeatures/partsAPI";
import { toast } from "react-toastify";

interface AddPartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PartsFormData) => void;
}

export interface PartsFormData {
  selectedProducts: { product_id: string; model_name: string }[];
  sku: string;
  partName: string;
  unit: string;
  unitPrice: string;
  stockQuantity: string;
  lowStockWarning: string;
}

const AddPartsModal: React.FC<AddPartsModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<PartsFormData>({
    selectedProducts: [],
    sku: "",
    partName: "",
    unit: "",
    unitPrice: "",
    stockQuantity: "",
    lowStockWarning: "",
  });

  // Product search states
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const productSearchRef = useRef<HTMLDivElement>(null);

  const [addPart, { isLoading }] = useAddPartMutation();

  // Autocomplete query
  const { data: productSuggestions, isFetching: isFetchingProducts } =
    useAutocompleteProductsQuery(productSearchQuery, {
      skip: productSearchQuery.length < 2,
    });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productSearchRef.current &&
        !productSearchRef.current.contains(event.target as Node)
      ) {
        setShowProductDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setProductSearchQuery(value);
    setShowProductDropdown(value.length >= 2);
  };

  const handleProductSelect = (product: {
    product_id: string;
    model_name: string;
  }) => {
    // Check if product is already selected
    const isAlreadySelected = formData.selectedProducts.some(
      (p) => p.product_id === product.product_id,
    );

    if (isAlreadySelected) {
      toast.info("Product already selected");
      return;
    }

    // Add product to selected list
    setFormData((prev) => ({
      ...prev,
      selectedProducts: [
        ...prev.selectedProducts,
        { product_id: product.product_id, model_name: product.model_name },
      ],
    }));

    // Clear search
    setProductSearchQuery("");
    setShowProductDropdown(false);
  };

  const handleRemoveProduct = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(
        (p) => p.product_id !== productId,
      ),
    }));
  };

  const handleSubmit = async () => {
    // Validation: Check if all required fields are filled
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

    // Validate numeric fields
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
      // Prepare the payload
      const partData = {
        product_ids: formData.selectedProducts.map((p) => p.product_id),
        sku: formData.sku,
        part_name: formData.partName,
        unit: formData.unit,
        unit_price: unitPrice,
        stock_quantity: stockQty,
        low_stock_warning: lowStockWarn,
      };

      // Call the API
      await addPart(partData).unwrap();

      // Show success message
      toast.success("Part added successfully!");

      // Call parent onSave callback
      onSave(formData);

      // Reset and close
      handleReset();
      onClose();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : undefined;
      toast.error(errorMessage || "Failed to add part. Please try again.");
    }
  };

  const handleReset = () => {
    setFormData({
      selectedProducts: [],
      sku: "",
      partName: "",
      unit: "",
      unitPrice: "",
      stockQuantity: "",
      lowStockWarning: "",
    });
    setProductSearchQuery("");
    setShowProductDropdown(false);
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
            {/* Product Search - Multi-select */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Products
              </label>
              <div className="relative" ref={productSearchRef}>
                <Input
                  type="text"
                  value={productSearchQuery}
                  onChange={handleProductSearchChange}
                  placeholder="Search products by ID or name..."
                  className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
                />
                {showProductDropdown && productSuggestions?.data && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {isFetchingProducts ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : productSuggestions.data.length > 0 ? (
                      productSuggestions.data.map((product) => (
                        <button
                          key={product.product_id}
                          type="button"
                          onClick={() => handleProductSelect(product)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                          <div className="font-medium">
                            {product.product_id} - {product.model_name}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No products found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected Products Display */}
              {formData.selectedProducts.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.selectedProducts.map((product) => (
                    <div
                      key={product.product_id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-200 rounded-md text-xs sm:text-sm"
                    >
                      <span className="font-medium text-red-800">
                        {product.product_id}
                      </span>
                      <span className="text-red-600">-</span>
                      <span className="text-red-700">{product.model_name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.product_id)}
                        className="ml-1 text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                placeholder="Enter stock quantity number"
                className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
              />
            </div>

            {/* Low stock warning */}
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
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-8 xs:h-9 sm:h-10 text-xs xs:text-sm font-medium bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPartsModal;
