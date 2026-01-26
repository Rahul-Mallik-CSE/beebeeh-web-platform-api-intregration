/** @format */

export type JobStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Rescheduled";

export type JobType =
  | "Maintenance"
  | "Repairing"
  | "Installation"
  | "Inspection";

export type OverviewJobStatus = "Pending" | "In Progress" | "Scheduled";

export type OverviewJobType =
  | "Repair"
  | "Maintenance"
  | "Installations"
  | "Inspection";

export interface OverviewJob {
  id: string;
  jobId: string;
  client: string;
  technician: string;
  type: OverviewJobType;
  orderByDate: string;
  status: OverviewJobStatus;
}

export type InstallationJobStatus = "Assign" | "In Progress" | "Complete";

export interface InstallationJob {
  id: string;
  jobId: string;
  client: string;
  model: string;
  serial: string;
  technician: string;
  scheduled: string;
  status: InstallationJobStatus;
}

export interface Job {
  id: string;
  jobType: JobType;
  clientName: string;
  contactNumber: string;
  orderedByTime: string;
  status: JobStatus;
}

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export type NotificationType = "schedule" | "admin" | "report" | "checklist";

export interface Notification {
  id: string;
  title: string;
  time: string;
  type: NotificationType;
}

// Dashboard API Types
export interface CardTrend {
  change_pct: number;
  direction: "up" | "down";
  compare_text: string;
}

export interface DashboardCards {
  todays_jobs: number;
  completed_work: number;
  pending_jobs: number;
  total_this_month: number;
}

export interface CardTrends {
  todays_jobs: CardTrend;
  completed_work: CardTrend;
  pending_jobs: CardTrend;
  total_this_month: CardTrend;
}

export interface RecentJob {
  job_pk: number | string;
  job_id: string;
  job_type: string;
  client_name: string;
  contact_number: string;
  ordered_time: string;
  status: string;
}

export interface DashboardMeta {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface DashboardTechnician {
  technician_id: string;
  full_name: string;
  email: string;
  role: string;
}

export interface DashboardData {
  cards: DashboardCards;
  card_trends: CardTrends;
  recent_jobs: RecentJob[];
  meta: DashboardMeta;
  technician: DashboardTechnician;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

// Today's Jobs API Types
export interface TodaysJob {
  job_id: string;
  job_type: string;
  client_name: string;
  contact_number: string;
  ordered_by_time: string;
  status: string;
}

export interface TodaysJobsMeta {
  date: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TodaysJobsResponse {
  success: boolean;
  message: string;
  meta: TodaysJobsMeta;
  data: TodaysJob[];
}

// All Jobs API Types
export interface AllJob {
  job_id: string;
  job_type: string;
  client_name: string;
  contact_number: string;
  scheduled_time: string;
  status: string;
}

export interface AllJobsMeta {
  date: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AllJobsResponse {
  success: boolean;
  message: string;
  meta: AllJobsMeta;
  data: AllJob[];
}

// Profile API Types
export interface TechnicianProfile {
  technician_id: string;
  skills: string[];
  total_jobs: number;
  status: string;
  profile_image: string | null;
}

export interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  role: string;
  profile_image: string | null;
  technician_profile: TechnicianProfile;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: ProfileData;
  requestId: string;
}
