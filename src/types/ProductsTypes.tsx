/** @format */

export interface Product {
  id: string;
  productId: string;
  modelName: string;
  alias: string;
  domesticFreq: string;
  commercialFreq: string;
  parts: number;
  stock: string;
}

export interface ProductDetails {
  id: string;
  productId: string;
  modelName: string;
  alias: string;
  status: "Stock Out" | "In Stock" | "Low Stock";
  domesticFreq: string;
  commercialFreq: string;
  parts: string;
  stock: string;
  installationChecklist: ChecklistItem[];
  maintenanceChecklist: ChecklistItem[];
  partsInventory: PartInventory[];
  frequentlyUsedParts: FrequentPart[];
  relatedJobs: RelatedJob[];
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface PartInventory {
  id: string;
  partId: string;
  partName: string;
  availability: number;
  status: "Available" | "Low Stock" | "Out of Stock";
}

export interface FrequentPart {
  id: string;
  partId: string;
  partName: string;
  units: number;
  quantity: number;
}

export interface RelatedJob {
  id: string;
  jobId: string;
  client: string;
  type: string;
  technician: string;
  criteriaDate: string;
  completeDate: string;
  status: "Work" | "Done" | "Pending";
}
