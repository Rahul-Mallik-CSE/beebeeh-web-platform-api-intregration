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
import { Lock } from "lucide-react";
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
  productId: string;
  productName: string;
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
    productId: "",
    productName: "",
    partName: "",
    unit: "",
    unitPrice: "",
    stockQuantity: "",
    lowStockWarning: "",
  });

  // Autocomplete states
  const [productIdQuery, setProductIdQuery] = useState("");
  const [productNameQuery, setProductNameQuery] = useState("");
  const [showProductIdDropdown, setShowProductIdDropdown] = useState(false);
  const [showProductNameDropdown, setShowProductNameDropdown] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [selectedProductName, setSelectedProductName] = useState<string | null>(
    null,
  );

  const productIdRef = useRef<HTMLInputElement>(null);
  const productNameRef = useRef<HTMLInputElement>(null);

  const [addPart, { isLoading }] = useAddPartMutation();

  // Autocomplete queries with debouncing
  const { data: productIdSuggestions, isFetching: isFetchingProductId } =
    useAutocompleteProductsQuery(productIdQuery, {
      skip: productIdQuery.length < 2,
    });

  const { data: productNameSuggestions, isFetching: isFetchingProductName } =
    useAutocompleteProductsQuery(productNameQuery, {
      skip: productNameQuery.length < 2,
    });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        productIdRef.current &&
        !productIdRef.current.contains(event.target as Node)
      ) {
        setShowProductIdDropdown(false);
      }
      if (
        productNameRef.current &&
        !productNameRef.current.contains(event.target as Node)
      ) {
        setShowProductNameDropdown(false);
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

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, productId: value }));
    setProductIdQuery(value);
    setShowProductIdDropdown(value.length >= 2);

    // Clear selected product if user modifies ID
    if (selectedProductId && value !== selectedProductId) {
      setSelectedProductId(null);
      setSelectedProductName(null);
      setFormData((prev) => ({ ...prev, productName: "" }));
    }
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, productName: value }));
    setProductNameQuery(value);
    setShowProductNameDropdown(value.length >= 2);

    // Clear selected product if user modifies name
    if (selectedProductName && value !== selectedProductName) {
      setSelectedProductId(null);
      setSelectedProductName(null);
      setFormData((prev) => ({ ...prev, productId: "" }));
    }
  };

  const handleProductIdSelect = (product: any) => {
    setFormData((prev) => ({
      ...prev,
      productId: product.product_id,
      productName: product.model_name,
    }));
    setSelectedProductId(product.product_id);
    setSelectedProductName(product.model_name);
    setProductIdQuery("");
    setShowProductIdDropdown(false);
  };

  const handleProductNameSelect = (product: any) => {
    setFormData((prev) => ({
      ...prev,
      productId: product.product_id,
      productName: product.model_name,
    }));
    setSelectedProductId(product.product_id);
    setSelectedProductName(product.model_name);
    setProductNameQuery("");
    setShowProductNameDropdown(false);
  };

  const handleSubmit = async () => {
    // Validation: Check if all required fields are filled
    if (
      !formData.productId.trim() ||
      !formData.productName.trim() ||
      !formData.partName.trim() ||
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
        product_id: formData.productId,
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
    } catch (error: any) {
      // Show error message
      toast.error(
        error?.data?.message || "Failed to add part. Please try again.",
      );
    }
  };

  const handleReset = () => {
    setFormData({
      productId: "",
      productName: "",
      partName: "",
      unit: "",
      unitPrice: "",
      stockQuantity: "",
      lowStockWarning: "",
    });
    setProductIdQuery("");
    setProductNameQuery("");
    setShowProductIdDropdown(false);
    setShowProductNameDropdown(false);
    setSelectedProductId(null);
    setSelectedProductName(null);
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
            {/* Product ID - Search with Autocomplete */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Product ID
              </label>
              <div className="relative" ref={productIdRef}>
                <Input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  onChange={handleProductIdChange}
                  placeholder="Search by product ID..."
                  className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
                />
                {showProductIdDropdown && productIdSuggestions?.data && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {isFetchingProductId ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : productIdSuggestions.data.length > 0 ? (
                      productIdSuggestions.data.map((product) => (
                        <button
                          key={product.product_id}
                          type="button"
                          onClick={() => handleProductIdSelect(product)}
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
            </div>

            {/* Product Name - Search with Autocomplete */}
            <div>
              <label className="block text-[11px] xs:text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">
                Product Name
              </label>
              <div className="relative" ref={productNameRef}>
                <Input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleProductNameChange}
                  placeholder="Search by product name..."
                  className="h-8 xs:h-9 sm:h-10 text-xs xs:text-sm"
                />
                {showProductNameDropdown && productNameSuggestions?.data && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {isFetchingProductName ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : productNameSuggestions.data.length > 0 ? (
                      productNameSuggestions.data.map((product) => (
                        <button
                          key={product.product_id}
                          type="button"
                          onClick={() => handleProductNameSelect(product)}
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
