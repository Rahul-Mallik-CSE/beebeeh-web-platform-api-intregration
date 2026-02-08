/** @format */

import React from "react";

interface Column {
  key: string;
  label: string;
  width?: string;
}

interface CustomReportTableProps {
  title: string;
  columns: Column[];
  data: any[];
  renderCell?: (key: string, value: any, row: any) => React.ReactNode;
}

const CustomReportTable: React.FC<CustomReportTableProps> = ({
  title,
  columns,
  data,
  renderCell,
}) => {
  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      "Stock Out": "bg-red-100 text-red-700",
      "Low Stock": "bg-yellow-100 text-yellow-700",
      "In Stock": "bg-cyan-100 text-cyan-700",
    };

    return (
      <div
        className={`px-2 sm:px-3 py-1 w-16 sm:w-20 flex items-center justify-center rounded-md text-[10px] sm:text-xs font-medium ${
          statusStyles[status] || ""
        }`}
      >
        {status}
      </div>
    );
  };

  return (
    <div className="bg-transparent">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#535F72] pb-3 sm:pb-4">
        {title}
      </h2>
      <div className="bg-white rounded-2xl overflow-auto h-[380px]">
        <table className="w-full relative">
          <thead className="sticky top-0 z-10 bg-[#5C2E2E]">
            <tr className="bg-[#5C2E2E]">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`text-white font-semibold text-xs sm:text-sm h-10 sm:h-12 px-2 sm:px-4 whitespace-nowrap bg-[#5C2E2E] text-left ${
                    index === 0 ? "rounded-tl-2xl" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-2xl" : ""}`}
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="py-3 sm:py-4 text-xs sm:text-sm text-gray-700 px-2 sm:px-4 whitespace-nowrap"
                  >
                    {renderCell ? (
                      renderCell(column.key, row[column.key], row)
                    ) : column.key === "status" ? (
                      getStatusBadge(row[column.key])
                    ) : column.key === "rating" ? (
                      <span className="flex items-center gap-1">
                        ⭐ {row[column.key]}
                      </span>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomReportTable;
