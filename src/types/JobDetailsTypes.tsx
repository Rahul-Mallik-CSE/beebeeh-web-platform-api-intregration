/** @format */

export type JobStatus =
  | "assign"
  | "complete"
  | "cancel"
  | "in_progress"
  | "rescheduled"
  | "invoice_required";
export type JobPriority = "high" | "medium" | "low";
export type ClientType = "commercial" | "residential";
export type ChecklistStatus = "done" | "doing" | "cancel" | "pending";
export type ImageKind = "before" | "after" | "signature";

export interface PinLocation {
  latitude: number | null;
  longitude: number | null;
}

export interface HeaderSummaryCard {
  job_id: string;
  job_type: string;
  product_model: string;
  serial_number: string | null;
  client_name: string;
  client_location: string;
  scheduled_datetime: string;
  status: JobStatus;
  priority: JobPriority;
}

export interface ClientInformationSection {
  id: string;
  name: string;
  contact_number: string;
  address: string;
  town: string;
  client_type: ClientType;
  location: string;
  notes: string;
  pin_location: PinLocation;
}

export interface ProductDetailsSection {
  id: string;
  model_name: string;
  alias: string;
  installed_date: string | null;
  last_service_date: string | null;
}

export interface FrequentlyUsedPart {
  part_id: string;
  part_name: string;
  unit: string;
  quantity_used: number;
}

export interface ChecklistItem {
  id: number;
  step: number;
  task: string;
  status: ChecklistStatus;
  updated_at: string;
}

export interface ImageMedia {
  id: number;
  kind: ImageKind;
  file: string;
  uploaded_at: string;
}

export interface ImageUploadSection {
  before_images: ImageMedia[];
  after_images: ImageMedia[];
}

export interface SignatureMedia {
  id: number;
  kind: string;
  file: string;
  uploaded_at: string;
}

export interface CustomerSignatureSection {
  signature_status: string;
  signature_time: string | null;
  signature_media: SignatureMedia | null;
}

export interface Technician {
  id: string;
  name: string;
  contact_number: string;
  status: string;
  skills: string[];
}

export interface JobDetailsData {
  header_summary_card: HeaderSummaryCard;
  client_information_section: ClientInformationSection;
  product_details_section: ProductDetailsSection;
  frequently_used_parts: FrequentlyUsedPart[];
  checklist_section: ChecklistItem[];
  image_upload_section: ImageUploadSection;
  customer_signature_section: CustomerSignatureSection;
  technician: Technician;
}

export interface JobDetailsMeta {
  total: number;
  checklist_section: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  frequently_used_parts: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface JobDetailsResponse {
  success: boolean;
  message: string;
  meta: JobDetailsMeta;
  data: JobDetailsData;
  requestId: string;
}
