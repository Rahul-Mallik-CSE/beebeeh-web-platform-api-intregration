/** @format */
"use client";
import React, { useState } from "react";
import {
  ProductDetailData,
  useRestockProductMutation,
} from "@/redux/features/adminFeatures/productsAPI";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Package } from "lucide-react";
import { IoIosCard } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface ProductsDetailsSectionProps {
  product: ProductDetailData;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductsDetailsSection: React.FC<ProductsDetailsSectionProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState("");

  const [restockProduct, { isLoading: isRestocking }] =
    useRestockProductMutation();

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  };

  const handleRestock = async () => {
    const quantity = parseInt(restockQuantity);
    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    try {
      await restockProduct({
        productId: product.product_id,
        quantity,
      }).unwrap();
      toast.success("Product restocked successfully");
      setIsRestockModalOpen(false);
      setRestockQuantity("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to restock product");
    }
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white">
        {/* Product Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 uppercase">
              {product.model_name}
            </h1>
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-1">
              Product ID: {product.product_id}
            </p>
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-0.5">
              Alias : {product.alias}
            </p>
            <span
              className={`inline-block px-2 sm:px-3 py-1 rounded-md text-xs font-medium mt-2 ${getStatusColor(
                product.is_active,
              )}`}
            >
              {product.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setIsRestockModalOpen(true)}
              className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm px-2 sm:px-3 md:px-4 h-8 sm:h-9"
            >
              <FaBox className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
              Re-stock
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={<IoIosCard className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Domestic Freq"
            value={`${product.frequency_domestic_month} Months`}
            bgColor="bg-pink-100"
            iconColor="text-pink-500"
          />
          <StatCard
            icon={<IoIosCard className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Commercial Freq"
            value={`${product.frequency_commercial_month} Months`}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            icon={<GiAutoRepair className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Parts Qty"
            value={product.parts_quantity.toString()}
            bgColor="bg-[#E0E7FF]"
            iconColor="text-[#4f46e5]"
          />
          <StatCard
            icon={<Package className="w-5 h-5 sm:w-6 sm:h-6" />}
            title="Stock Qty"
            value={product.stock_quantity.toString()}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>
      </div>

      {/* Restock Modal */}
      <Dialog open={isRestockModalOpen} onOpenChange={setIsRestockModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Restock Product</DialogTitle>
            <DialogDescription>
              Enter the quantity to add to the stock for {product.model_name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                placeholder="Enter quantity"
                className="col-span-3"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRestockModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleRestock}
              disabled={isRestocking}
              className="bg-red-800 hover:bg-red-700"
            >
              {isRestocking ? "Restocking..." : "Restock"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 h-full">
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className={`${bgColor} ${iconColor} p-2 sm:p-2.5 rounded-lg flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-[13px] text-gray-500 font-medium mb-0.5">
            {title}
          </p>
          <p className="text-sm sm:text-base font-bold text-gray-800 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetailsSection;
