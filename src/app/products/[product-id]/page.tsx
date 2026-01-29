/** @format */
"use client";

import ProductsDetailsSection from "@/components/ProductsComponents/ProductsDetailsSection";
import ProductsDetailsTableSection from "@/components/ProductsComponents/ProductsDetailsTableSection";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/redux/features/adminFeatures/productsAPI";
import ClientDetailsSkeleton from "@/components/ClientsComponents/ClientDetailsSkeleton"; // Using existing skeleton structure
import { Button } from "@/components/ui/button";

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params["product-id"] as string;

  const {
    data: productResponse,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);

  const handleEdit = () => {
    console.log("Edit product:", productId);
  };

  const handleView = () => {
    console.log("View product:", productId);
  };

  const handleDelete = () => {
    console.log("Delete product:", productId);
  };

  if (isLoading) {
    return (
      <div className="w-full p-2 sm:p-4 overflow-x-hidden">
        <div className="max-w-[2500px] rounded-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={() => router.back()} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <ClientDetailsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error || !productResponse?.data) {
    return (
      <div className="w-full p-8 text-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-red-600 mb-4">Failed to load product details.</p>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="ml-2"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const productData = productResponse.data;

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
            product={productData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Product related tables section */}
          <ProductsDetailsTableSection product={productData} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
