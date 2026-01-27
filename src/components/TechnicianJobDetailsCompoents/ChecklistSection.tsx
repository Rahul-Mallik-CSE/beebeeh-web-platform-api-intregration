/** @format */
"use client";
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChecklistItem } from "@/types/JobDetailsTypes";
import { useUpdateChecklistItemMutation } from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface ChecklistSectionProps {
  checklist: ChecklistItem[];
  jobId: string;
}

const ChecklistSection = ({ checklist, jobId }: ChecklistSectionProps) => {
  const [updateChecklistItem] = useUpdateChecklistItemMutation();

  const handleUpdateStatus = async (checklistId: number, status: string) => {
    try {
      await updateChecklistItem({
        jobId,
        checklistId: checklistId.toString(),
        status,
      }).unwrap();
      toast.success(`Checklist item ${status} successfully!`);
    } catch (error) {
      toast.error("Failed to update checklist item.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "done":
        return "text-teal-500";
      case "doing":
        return "text-cyan-500";
      case "cancel":
        return "text-red-600";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Checklist Section:
      </h3>
      <div className="rounded-2xl border border-gray-200 overflow-x-auto">
        <ScrollArea className="h-[250px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Step
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Task
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm text-center whitespace-nowrap">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklist.length > 0 ? (
                checklist.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {item.step}
                    </TableCell>
                    <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {item.task}
                    </TableCell>
                    <TableCell
                      className={`font-medium text-xs sm:text-sm capitalize ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell>
                      {item.status.toLowerCase() === "pending" ? (
                        <div className="flex justify-center gap-1 sm:gap-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(item.step, "done")
                            }
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-green-50 text-green-500"
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(item.step, "cancel")
                            }
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-red-50 text-red-500"
                          >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center text-gray-400 text-xs sm:text-sm">
                          ---
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-4"
                  >
                    No checklist items
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

export default ChecklistSection;
