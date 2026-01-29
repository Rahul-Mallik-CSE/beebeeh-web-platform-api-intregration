/** @format */

export interface Part {
  part_id: string;
  name: string;
  stock: number;
  unit: string;
  unit_price: string | null;
  min_stock: number;
  models: number;
}

export interface PartDetails {
  id: string;
  partId: string;
  name: string;
  unit: string;
  status: "Stocks In" | "Stocks Out" | "Low Stock";
  maintenanceStock: number;
  models: number;
  stock: number;
  usedHistory: UsedHistory[];
}

export interface UsedHistory {
  id: string;
  jobId: string;
  technician: string;
  type: string;
  date: string;
}
