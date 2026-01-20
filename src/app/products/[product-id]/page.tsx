/** @format */
"use client";

import ProductsDetailsSection from "@/components/ProductsComponents/ProductsDetailsSection";
import ProductsDetailsTableSection from "@/components/ProductsComponents/ProductsDetailsTableSection";
import { productDetailsData } from "@/data/ProductsData";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params["product-id"] as string;

  // Get product data based on the ID from URL
  const product = productDetailsData[productId] || productDetailsData["1"];

  const handleEdit = () => {
    console.log("Edit product:", productId);
  };

  const handleView = () => {
    console.log("View product:", productId);
  };

  const handleDelete = () => {
    console.log("Delete product:", productId);
    // Add delete logic here
  };

  return (
    <div className="w-full p-2 sm:p-4 overflow-x-hidden">
      <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => router.back()}
                className="flex cursor-pointer items-center font-bold gap-2 text-gray-800 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                Products Details
              </span>
            </div>
          </div>

          {/* Product data section */}
          <ProductsDetailsSection
            product={product}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />

          {/* Product related tables section */}
          <ProductsDetailsTableSection />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
