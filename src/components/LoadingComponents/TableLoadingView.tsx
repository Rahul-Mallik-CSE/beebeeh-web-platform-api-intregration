/** @format */

import React from "react";

const TableLoadingView = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header with Filter button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </th>
              <th className="px-6 py-4 text-left">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <tr
                key={row}
                className="border-b border-gray-100 last:border-b-0"
              >
                {/* Job ID */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </td>
                {/* Job Type */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </td>
                {/* Client Name */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                </td>
                {/* Contact Number */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </td>
                {/* Ordered by time */}
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
                </td>
                {/* Status */}
                <td className="px-6 py-4">
                  <div className="h-7 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                </td>
                {/* Action */}
                <td className="px-6 py-4">
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableLoadingView;
