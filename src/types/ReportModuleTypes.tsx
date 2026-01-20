/** @format */

import type { IconType } from "react-icons/lib";

export interface StatsCardData {
  id: string;
  icon: IconType;
  title: string;
  value: number;
  trend: "up" | "down";
  percentage: number;
  bgColor: string;
  iconColor: string;
}

export interface WeeklyJobActivity {
  day: string;
  installation: number;
  repair: number;
  maintenance: number;
}

export interface JobDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
  [key: string]: string | number;
}

export interface TechnicianPerformance {
  id: string;
  technician: string;
  complete: number;
  avgTime: string;
  rating: number;
}

export interface PartsUsage {
  id: string;
  partsName: string;
  usedQty: string;
  jobs: string;
}

export interface ProductStock {
  id: string;
  productName: string;
  productId: string;
  availableUnits: number;
  status: "Stock Out" | "Low Stock" | "In Stock";
  lastStock: string;
}

export interface PartsStock {
  id: string;
  partName: string;
  partId: string;
  availableUnits: number;
  status: "Stock Out" | "Low Stock" | "In Stock";
  lastStock: string;
}

export interface ConsumablesUsage {
  id: string;
  technician: string;
  consumableCategory: string;
  totalQty: number;
  totalValue: string;
}

export interface DailyPartsUsage {
  id: string;
  technician: string;
  partName: string;
  usedQty: number;
  date: string;
  jobId: string;
}
