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
import { ChecklistItem } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface ChecklistSectionProps {
  data?: ChecklistItem[];
  isLoading?: boolean;
}

const ChecklistSection = ({ data, isLoading }: ChecklistSectionProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(data || []);

  React.useEffect(() => {
    if (data) {
      setChecklist(data);
    }
  }, [data]);

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

  const updateStatus = (index: number, newStatus: string) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index] = { ...updatedChecklist[index], status: newStatus };
    setChecklist(updatedChecklist);
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          Checklist Section:
        </h3>
        <div className="rounded-2xl border border-gray-200">
          <div className="animate-pulse p-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Checklist Section:
      </h3>
      <div className="rounded-2xl border border-gray-200">
        <ScrollArea className="h-[250px] rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Step
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Task
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs sm:text-sm">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center text-xs sm:text-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklist && checklist.length > 0 ? (
                checklist.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {item.step}
                    </TableCell>
                    <TableCell className="text-gray-700 text-xs sm:text-sm">
                      {item.task}
                    </TableCell>
                    <TableCell
                      className={`font-medium text-xs sm:text-sm ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </TableCell>
                    <TableCell>
                      {item.status.toLowerCase() === "pending" ? (
                        <div className="flex justify-center gap-1 sm:gap-2">
                          <button
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-green-50 text-green-500"
                            onClick={() => updateStatus(index, "done")}
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-red-50 text-red-500"
                            onClick={() => updateStatus(index, "cancel")}
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
                    className="text-center text-gray-500 text-xs sm:text-sm py-4"
                  >
                    No checklist data available
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
