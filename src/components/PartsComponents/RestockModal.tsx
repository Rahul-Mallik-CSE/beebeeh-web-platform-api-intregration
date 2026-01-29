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
import { FaBox } from "react-icons/fa";

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (stockQuantity: number) => void;
  isLoading: boolean;
  currentStock: number;
}

const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  currentStock,
}) => {
  const [stockQuantity, setStockQuantity] = useState("");

  const handleSubmit = () => {
    const quantity = parseInt(stockQuantity);
    if (isNaN(quantity) || quantity <= 0) {
      return;
    }
    onSubmit(quantity);
    setStockQuantity("");
  };

  const handleClose = () => {
    setStockQuantity("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95vw] xs:max-w-[90vw] sm:max-w-md md:max-w-lg p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-3 xs:px-4 sm:px-5 md:px-6 pt-3 xs:pt-4 sm:pt-5 md:pt-6 pb-2 xs:pb-3 sm:pb-4">
          <DialogTitle className="text-center text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            <FaBox className="w-5 h-5 text-red-600" />
            Restock Part
          </DialogTitle>
        </DialogHeader>

        <div className="px-3 xs:px-4 sm:px-5 md:px-6 pb-3 xs:pb-4 sm:pb-5 md:pb-6 space-y-4">
          {/* Current Stock Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Current Stock</p>
            <p className="text-xl font-semibold text-gray-800">
              {currentStock}
            </p>
          </div>

          {/* Stock Quantity Input */}
          <div className="space-y-2">
            <label
              htmlFor="stockQuantity"
              className="text-sm font-medium text-gray-700"
            >
              New Stock Quantity
            </label>
            <Input
              id="stockQuantity"
              type="number"
              placeholder="Enter new stock quantity"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full text-sm h-10"
              min="1"
            />
            <p className="text-xs text-gray-500">
              This will set the stock to the entered quantity
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 h-10 text-sm border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                isLoading || !stockQuantity || parseInt(stockQuantity) <= 0
              }
              className="flex-1 h-10 text-sm bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Restocking..." : "Restock"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RestockModal;
