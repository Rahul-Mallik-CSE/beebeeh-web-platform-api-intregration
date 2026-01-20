/** @format */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const FrequentlyUsedParts = () => {
  const parts = [
    { partName: "O-Ring", partCode: "CF-010", stock: "High", stockRequired: 1 },
    {
      partName: "Sediment filter",
      partCode: "CF-050",
      stock: "High",
      stockRequired: 5,
    },
    {
      partName: "O-Ring",
      partCode: "OR-112",
      stock: "Medium",
      stockRequired: 1,
    },
    { partName: "O-Ring", partCode: "CF-010", stock: "High", stockRequired: 1 },
  ];

  const getStockColor = (stock: string) => {
    switch (stock.toLowerCase()) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Frequently Used Parts:
      </h3>
      <div className="rounded-2xl border border-gray-200 overflow-x-auto">
        <ScrollArea className="h-[190px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Part Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Part Code
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Part Code
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Stock Required
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map((part, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                    {part.partName}
                  </TableCell>
                  <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                    {part.partCode}
                  </TableCell>
                  <TableCell
                    className={`${getStockColor(
                      part.stock
                    )} text-xs sm:text-sm whitespace-nowrap`}
                  >
                    {part.stock}
                  </TableCell>
                  <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                    {part.stockRequired}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FrequentlyUsedParts;
