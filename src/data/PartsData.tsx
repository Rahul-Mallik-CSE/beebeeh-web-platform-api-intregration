/** @format */

import { Part } from "@/types/PartsTypes";

export const partsColumns = [
  {
    header: "Part ID",
    accessor: "part_id" as keyof Part,
  },
  {
    header: "Name",
    accessor: "name" as keyof Part,
  },
  {
    header: "Stock",
    accessor: "stock" as keyof Part,
  },
  {
    header: "Unit",
    accessor: "unit" as keyof Part,
  },
  {
    header: "Min",
    accessor: "min_stock" as keyof Part,
  },
  {
    header: "Model Name",
    accessor: (row: Part) =>
      row.models?.map((m) => m.model_name).join(", ") || "N/A",
  },
  {
    header: "Status",
    accessor: (row: Part) => {
      const statusMap: Record<string, { label: string; className: string }> = {
        stock_in: {
          label: "Stock In",
          className: "bg-green-100 text-green-700",
        },
        low_stock: {
          label: "Low Stock",
          className: "bg-orange-100 text-orange-700",
        },
        stock_out: {
          label: "Stock Out",
          className: "bg-red-100 text-red-700",
        },
      };
      const info = statusMap[row.status] || statusMap.stock_in;
      return (
        <span
          className={`px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium ${info.className}`}
        >
          {info.label}
        </span>
      );
    },
  },
];

export const usedHistoryColumns = [
  {
    header: "Job ID",
    accessor: (row: any) => row.jobId,
  },
  {
    header: "Technician",
    accessor: (row: any) => row.technician,
  },
  {
    header: "Type",
    accessor: (row: any) => row.type,
  },
  {
    header: "Date",
    accessor: (row: any) => row.date,
  },
];

import { PartDetails, UsedHistory } from "@/types/PartsTypes";

export const partDetailsData: Record<string, PartDetails> = {
  "1": {
    id: "1",
    partId: "Pr-Pr-501",
    name: "Filter A22",
    unit: "pcs",
    status: "Stocks In",
    maintenanceStock: 50,
    models: 15,
    stock: 505,
    usedHistory: [
      {
        id: "1",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
    ],
  },
};
