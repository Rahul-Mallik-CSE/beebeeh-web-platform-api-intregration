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
import { FrequentlyUsedPart } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface FrequentlyUsedPartsProps {
  data?: FrequentlyUsedPart[];
}

const FrequentlyUsedParts = ({ data }: FrequentlyUsedPartsProps) => {
  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Frequently Used Parts:
      </h3>
      <div className="rounded-2xl border border-gray-200">
        <ScrollArea className="h-[190px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Part Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Part ID
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Stock Required
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((part, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {part.part_name}
                    </TableCell>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {part.part_id}
                    </TableCell>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {part.stock_required}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-gray-500 text-xs sm:text-sm py-4"
                  >
                    No parts data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FrequentlyUsedParts;
