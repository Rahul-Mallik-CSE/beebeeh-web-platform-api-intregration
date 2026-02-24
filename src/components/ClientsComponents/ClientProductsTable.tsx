/** @format */
"use client";

import React from "react";
import { ProductDetail } from "@/redux/features/adminFeatures/clientsAPI";
import { CheckCircle, XCircle } from "lucide-react";

interface ClientProductsTableProps {
  products: ProductDetail[];
}

const ClientProductsTable: React.FC<ClientProductsTableProps> = ({
  products,
}) => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
      {/* Section Header */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Product Details
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          {products.length} product{products.length !== 1 ? "s" : ""} associated
          with this client
        </p>
      </div>

      {/* Scrollable Table Container */}
      <div className="h-64 overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200">
                Product ID
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200">
                Model Name
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200">
                Alias
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200">
                SKU
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200 text-center">
                Maintenance (months)
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200 text-center">
                Status
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200 text-center">
                Installations
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200 text-center">
                Repairs
              </th>
              <th className="px-3 sm:px-4 py-2.5 font-semibold text-gray-600 whitespace-nowrap border-b border-gray-200 text-center">
                Maintenances
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-8 text-center text-gray-400 text-sm"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={product.product_id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-3 sm:px-4 py-2.5 font-medium text-gray-800 whitespace-nowrap">
                    {product.product_id}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    {product.model_name}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-gray-600 whitespace-nowrap">
                    {product.alias}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-gray-500 whitespace-nowrap">
                    {product.sku ?? (
                      <span className="text-gray-400 italic">—</span>
                    )}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center text-gray-700 whitespace-nowrap">
                    {product.maintenance_frequency_month}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center whitespace-nowrap">
                    {product.is_active ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {product.jobs_summary.installations}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      {product.jobs_summary.repairs}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 py-2.5 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      {product.jobs_summary.maintenances}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientProductsTable;
