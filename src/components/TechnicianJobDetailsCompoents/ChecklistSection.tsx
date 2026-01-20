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

const ChecklistSection = () => {
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      step: 1,
      partCode: "Check water inlet",
      status: "Done",
      action: true,
    },
    {
      id: 2,
      step: 2,
      partCode: "Install main filter",
      status: "Done",
      action: false,
    },
    {
      id: 3,
      step: 3,
      partCode: "Install sediment filter",
      status: "Cancel",
      action: false,
    },
    {
      id: 4,
      step: 4,
      partCode: "Test water flow",
      status: "Pending",
      action: false,
    },
    {
      id: 5,
      step: 4,
      partCode: "Clean area",
      status: "Pending",
      action: false,
    },
  ]);

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
                  Part Code
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
              {checklist.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-gray-700 text-xs sm:text-sm">
                    {item.step}
                  </TableCell>
                  <TableCell className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                    {item.partCode}
                  </TableCell>
                  <TableCell
                    className={`font-medium text-xs sm:text-sm ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell>
                    {item.status.toLowerCase() === "pending" ? (
                      <div className="flex justify-center gap-1 sm:gap-2">
                        <button className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-green-50 text-green-500">
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center hover:bg-red-50 text-red-500">
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
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ChecklistSection;
