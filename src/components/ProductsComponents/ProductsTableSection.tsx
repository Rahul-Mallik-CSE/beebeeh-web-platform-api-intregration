/** @format */
"use client";
import React, { useState } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { productsData, productsColumns } from "@/data/ProductsData";
import { Product } from "@/types/ProductsTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AddProductModal from "./AddProductModal";

const ProductsTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleAddProduct = (productData: any) => {
    console.log("Adding product:", productData);
    // Add logic to save product
  };

  const filteredProducts = productsData.filter(
    (product) =>
      product.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.alias.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewProduct = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const columnsWithActions = [
    ...productsColumns,
    {
      header: "Action",
      accessor: (row: Product) => (
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => handleViewProduct(row)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button
            onClick={() => console.log("Delete", row.id)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Products
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 sm:pl-10 w-40 sm:w-48 md:w-56 lg:w-64 text-sm"
            />
          </div>
          {/* Add Button */}
          <Button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap">Add New Product</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        <CustomTable
          data={filteredProducts}
          columns={columnsWithActions}
          itemsPerPage={10}
        />
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default ProductsTableSection;
