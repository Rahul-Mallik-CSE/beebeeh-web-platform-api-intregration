/** @format */

export interface PartModel {
  product_id: string;
  model_name: string;
  alias: string;
}

export interface Part {
  part_id: string;
  name: string;
  stock: number;
  unit: string;
  unit_price: string | null;
  min_stock: number;
  models: PartModel[];
  status: "stock_in" | "low_stock" | "stock_out";
}

export interface PartDetails {
  id: string;
  partId: string;
  name: string;
  unit: string;
  status: "Stocks In" | "Stocks Out" | "Low Stock";
  maintenanceStock: number;
  models: string;
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
