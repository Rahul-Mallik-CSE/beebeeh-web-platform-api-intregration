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
import EditPartsModal from "./EditPartsModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Edit, Trash2 } from "lucide-react";

interface FrequentlyUsedPartsProps {
  parts: FrequentlyUsedPart[];
  jobId: string;
}

const FrequentlyUsedParts = ({ parts, jobId }: FrequentlyUsedPartsProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<FrequentlyUsedPart | null>(
    null,
  );

  const handleAddPartsClick = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleEditClick = (part: FrequentlyUsedPart) => {
    setSelectedPart(part);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPart(null);
  };

  const handleDeleteClick = (part: FrequentlyUsedPart) => {
    setSelectedPart(part);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPart(null);
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
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Actions
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
                    <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClick(part)}
                          className="p-1 h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(part)}
                          className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        jobId={jobId}
      />
      <EditPartsModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        jobId={jobId}
        part={selectedPart}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        jobId={jobId}
        partId={selectedPart?.part_id || ""}
        partName={selectedPart?.part_name || ""}
      />
    </div>
  );
};

export default FrequentlyUsedParts;
