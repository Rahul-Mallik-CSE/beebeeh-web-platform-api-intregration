/** @format */

import { Part } from "@/types/PartsTypes";

export const partsColumns = [
  {
    header: "Part ID",
    accessor: (row: Part) => row.part_id,
  },
  {
    header: "Name",
    accessor: (row: Part) => row.name,
  },
  {
    header: "Stock",
    accessor: (row: Part) => row.stock,
  },
  {
    header: "Unit",
    accessor: (row: Part) => row.unit,
  },
  {
    header: "Min",
    accessor: (row: Part) => row.min_stock,
  },
  {
    header: "Models",
    accessor: (row: Part) => row.models,
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
