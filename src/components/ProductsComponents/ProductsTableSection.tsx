/** @format */
"use client";
import React, { useState, useMemo } from "react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AddProductModal from "./AddProductModal";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  ProductListItem,
} from "@/redux/features/adminFeatures/productsAPI";
import TableSkeleton from "../CommonComponents/TableSkeleton";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductsTableSection = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Delete mutation
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  // Fetch products with search and pagination
  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    limit: 10,
    model_name: searchQuery,
  });

  const handleAddProductSuccess = () => {
    setIsAddProductModalOpen(false);
    refetch();
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    try {
      await deleteProduct(deleteProductId).unwrap();
      toast.success("Product deleted successfully");
      setDeleteProductId(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };

  const tableData = useMemo(() => {
    if (!productsResponse?.data) return [];
    return productsResponse.data;
  }, [productsResponse]);

  const handleViewProduct = (product: ProductListItem) => {
    router.push(`/products/${product.product_id}`);
  };

  const columns = [
    {
      header: "Product ID",
      accessor: "product_id" as keyof ProductListItem,
    },
    {
      header: "Model Name",
      accessor: "model_name" as keyof ProductListItem,
    },
    {
      header: "Alias",
      accessor: "alias" as keyof ProductListItem,
    },
    {
      header: "Domestic Freq (Mo)",
      accessor: "frequency_domestic_month" as keyof ProductListItem,
    },
    {
      header: "Commercial Freq (Mo)",
      accessor: "frequency_commercial_month" as keyof ProductListItem,
    },
    {
      header: "Stock Qty",
      accessor: "stock_quantity" as keyof ProductListItem,
    },
    {
      header: "Status",
      accessor: (row: ProductListItem) => {
        const isActive = row.is_active;
        return (
          <span
            className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: (row: ProductListItem) => (
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <button
            onClick={() => handleViewProduct(row)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setDeleteProductId(row.product_id)}
            className="p-1.5 sm:p-2 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  if (error) {
    return (
      <div className="w-full p-8 text-center text-red-600">
        <p>Failed to load products. Please try again.</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Products
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {/* Add Button */}
          <Button
            onClick={() => setIsAddProductModalOpen(true)}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center gap-1.5 sm:gap-2 text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="whitespace-nowrap font-bold">Add New Product</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        {isLoading ? (
          <TableSkeleton rows={10} columns={9} />
        ) : (
          <CustomTable
            data={tableData}
            columns={columns}
            itemsPerPage={10}
            serverSidePagination={true}
            currentPage={currentPage}
            totalPages={productsResponse?.meta?.totalPage || 1}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSave={handleAddProductSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteProductId}
        onOpenChange={() => setDeleteProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductsTableSection;
