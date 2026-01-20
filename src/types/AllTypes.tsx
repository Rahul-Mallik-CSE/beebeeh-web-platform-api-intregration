/** @format */

export type JobStatus = "Pending" | "In Progress" | "Complete";

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
