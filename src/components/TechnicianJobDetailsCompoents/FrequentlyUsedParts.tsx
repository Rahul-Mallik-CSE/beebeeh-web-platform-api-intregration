/** @format */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { FrequentlyUsedPart } from "@/types/JobDetailsTypes";
import AddPartsModal from "./AddPartsModal";

interface FrequentlyUsedPartsProps {
  parts: FrequentlyUsedPart[];
  jobId: string;
}

const FrequentlyUsedParts = ({ parts, jobId }: FrequentlyUsedPartsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPartsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="bg-white">
      <div className="w-full flex justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          Frequently Used Parts:
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 text-lg hover:text-red-700"
          onClick={handleAddPartsClick}
        >
          Add Parts
        </Button>
      </div>
      <div className="rounded-2xl border border-gray-200 overflow-x-auto">
        <ScrollArea className="h-[190px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Parts Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Parts ID
                </TableHead>

                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Quantity Used
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.length > 0 ? (
                parts.map((part, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {part.part_name}
                    </TableCell>
                    <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {part.part_id}
                    </TableCell>

                    <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {part.quantity_used}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-4"
                  >
                    No parts used yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <AddPartsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        jobId={jobId}
      />
    </div>
  );
};

export default FrequentlyUsedParts;
