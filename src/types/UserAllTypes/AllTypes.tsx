/** @format */

export type JobStatus = "Pending" | "In Progress" | "Complete";

export type JobType =
  | "Maintenance"
  | "Repairing"
  | "Installation"
  | "Inspection";

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
