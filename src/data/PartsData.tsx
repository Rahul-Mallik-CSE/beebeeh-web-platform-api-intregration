/** @format */

import { Part } from "@/types/PartsTypes";

export const partsData: Part[] = [
  {
    id: "1",
    partId: "Pr - 501",
    name: "Filter A22",
    stock: 15,
    unit: "pcs",
    min: 20,
    models: "12 models",
  },
  {
    id: "2",
    partId: "Pr - 501",
    name: "Copper Coil",
    stock: 15,
    unit: "rolls",
    min: 20,
    models: "8 models",
  },
  {
    id: "3",
    partId: "Pr - 501",
    name: "Filter A22",
    stock: 15,
    unit: "pcs",
    min: 20,
    models: "12 models",
  },
  {
    id: "4",
    partId: "Pr - 501",
    name: "Copper Coil",
    stock: 15,
    unit: "rolls",
    min: 20,
    models: "8 models",
  },
  {
    id: "5",
    partId: "Pr - 501",
    name: "Copper Coil",
    stock: 15,
    unit: "rolls",
    min: 20,
    models: "8 models",
  },
  {
    id: "6",
    partId: "Pr - 501",
    name: "Filter A22",
    stock: 15,
    unit: "pcs",
    min: 20,
    models: "12 models",
  },
  {
    id: "7",
    partId: "Pr - 501",
    name: "Copper Coil",
    stock: 15,
    unit: "rolls",
    min: 20,
    models: "8 models",
  },
  {
    id: "8",
    partId: "Pr - 501",
    name: "Filter A22",
    stock: 15,
    unit: "pcs",
    min: 20,
    models: "12 models",
  },
  {
    id: "9",
    partId: "Pr - 501",
    name: "Copper Coil",
    stock: 15,
    unit: "rolls",
    min: 20,
    models: "8 models",
  },
  {
    id: "10",
    partId: "Pr - 501",
    name: "Filter A22",
    stock: 15,
    unit: "pcs",
    min: 20,
    models: "12 models",
  },
];

export const partsColumns = [
  {
    header: "Part ID",
    accessor: (row: Part) => row.partId,
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
    accessor: (row: Part) => row.min,
  },
  {
    header: "Models",
    accessor: (row: Part) => row.models,
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
      {
        id: "2",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "3",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "4",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "5",
        jobId: "J-8022",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "6",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "7",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "8",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "9",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
      {
        id: "10",
        jobId: "J-8001",
        technician: "Linda Kian",
        type: "Repair",
        date: "23 Jan, 2024",
      },
    ],
  },
};

export const usedHistoryColumns = [
  {
    header: "Job ID",
    accessor: (row: UsedHistory) => row.jobId,
  },
  {
    header: "Technician",
    accessor: (row: UsedHistory) => row.technician,
  },
  {
    header: "Type",
    accessor: (row: UsedHistory) => row.type,
  },
  {
    header: "Date",
    accessor: (row: UsedHistory) => row.date,
  },
];
