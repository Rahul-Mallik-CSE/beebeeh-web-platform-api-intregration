/** @format */

import { WeeklyJobActivity, JobDistribution } from "@/types/ReportModuleTypes";

export const weeklyJobActivityData: WeeklyJobActivity[] = [
  { day: "Sat", installation: 480, repair: 180, maintenance: 340 },
  { day: "Sun", installation: 470, repair: 160, maintenance: 330 },
  { day: "Mon", installation: 480, repair: 170, maintenance: 340 },
  { day: "Tue", installation: 490, repair: 160, maintenance: 320 },
  { day: "Wed", installation: 480, repair: 190, maintenance: 330 },
  { day: "Thu", installation: 470, repair: 170, maintenance: 340 },
  { day: "Fri", installation: 490, repair: 150, maintenance: 350 },
];

export const jobDistributionData: JobDistribution[] = [
  { name: "Installation", value: 45, percentage: 45, color: "#6B3838" },
  { name: "Repair", value: 35, percentage: 35, color: "#E8D4D4" },
  { name: "Maintenance", value: 35, percentage: 35, color: "#A14545" },
];

import {
  TechnicianPerformance,
  PartsUsage,
  ProductStock,
  PartsStock,
  ConsumablesUsage,
  DailyPartsUsage,
} from "@/types/ReportModuleTypes";

export const technicianPerformanceData: TechnicianPerformance[] = [
  {
    id: "1",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
  {
    id: "2",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
  {
    id: "3",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
  {
    id: "4",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
  {
    id: "5",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
  {
    id: "6",
    technician: "Zara Khan",
    complete: 150,
    avgTime: "1h 10m",
    rating: 4.2,
  },
];

export const partsUsageData: PartsUsage[] = [
  { id: "1", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
  { id: "2", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
  { id: "3", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
  { id: "4", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
  { id: "5", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
  { id: "6", partsName: "Filter A2", usedQty: "150 pcs", jobs: "18 Jobs" },
];

export const productStockData: ProductStock[] = [
  {
    id: "1",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "Stock Out",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "2",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "Low Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "3",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "In Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "4",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "Stock Out",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "5",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "In Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "6",
    productName: "CoolMaster X200",
    productId: "p-150",
    availableUnits: 150,
    status: "Low Stock",
    lastStock: "25 Jun, 2025",
  },
];

export const partsStockData: PartsStock[] = [
  {
    id: "1",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "Stock Out",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "2",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "Low Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "3",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "In Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "4",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "Stock Out",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "5",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "In Stock",
    lastStock: "25 Jun, 2025",
  },
  {
    id: "6",
    partName: "CoolMaster X200",
    partId: "p-150",
    availableUnits: 150,
    status: "Low Stock",
    lastStock: "25 Jun, 2025",
  },
];

export const consumablesUsageData: ConsumablesUsage[] = [
  {
    id: "1",
    technician: "Malik Ahmed",
    consumableCategory: "Oil Filter",
    totalQty: 15,
    totalValue: "$300",
  },
  {
    id: "2",
    technician: "John Smith",
    consumableCategory: "Filter",
    totalQty: 8,
    totalValue: "$120",
  },
  {
    id: "3",
    technician: "Malik Ahmed",
    consumableCategory: "Oil Filter",
    totalQty: 15,
    totalValue: "$300",
  },
  {
    id: "4",
    technician: "John Smith",
    consumableCategory: "Filter",
    totalQty: 8,
    totalValue: "$120",
  },
  {
    id: "5",
    technician: "Malik Ahmed",
    consumableCategory: "Oil Filter",
    totalQty: 15,
    totalValue: "$300",
  },
  {
    id: "6",
    technician: "John Smith",
    consumableCategory: "Filter",
    totalQty: 8,
    totalValue: "$120",
  },
];

export const dailyPartsUsageData: DailyPartsUsage[] = [
  {
    id: "1",
    technician: "Malik Ahmed",
    partName: "Oil Filter",
    usedQty: 150,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
  {
    id: "2",
    technician: "John Smith",
    partName: "Fuse",
    usedQty: 1,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
  {
    id: "3",
    technician: "Malik Ahmed",
    partName: "Oil Filter",
    usedQty: 150,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
  {
    id: "4",
    technician: "John Smith",
    partName: "Fuse",
    usedQty: 1,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
  {
    id: "5",
    technician: "Malik Ahmed",
    partName: "Oil Filter",
    usedQty: 150,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
  {
    id: "6",
    technician: "John Smith",
    partName: "Fuse",
    usedQty: 1,
    date: "25 Jun, 2025",
    jobId: "JB-1023",
  },
];
