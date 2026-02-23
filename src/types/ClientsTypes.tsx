/** @format */

export interface Client {
  clientId: string;
  name: string;
  type: string;
  town: string;
  contactNumber: string;
  installations: number;
  lastService: string;
  created: string;
}

export interface LastCompletedJobInfo {
  jobId: string;
  completeDate: string;
}

export interface UpcomingJobInfo {
  jobId: string;
  scheduledDate: string;
}

export interface MaintenanceReminderCancellation {
  installationId: string;
  reason: string;
  cancelledAt: string;
  cancelledBy: string;
}

export interface ClientDetails extends Client {
  profileImage?: string;
  email: string;
  address: string;
  status: "Available" | "Inactive" | "Busy";
  totalJobs: number;
  lastCompletedJob?: LastCompletedJobInfo | null;
  upcomingJob?: UpcomingJobInfo | null;
  maintenanceReminderCancellations?: MaintenanceReminderCancellation[];
}

export interface ClientColumn {
  header: string;
  accessor: keyof Client | ((row: Client) => React.ReactNode);
  className?: string;
}

export interface InfoCard {
  id: string;
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
}

export interface JobHistory {
  jobId: string;
  technician: string;
  contactNumber: string;
  type: string;
  orderByDate: string;
  completeDate: string;
  serviceStatus: "Serviced" | "Upcoming" | "Overdue";
}

export interface JobHistoryColumn {
  header: string;
  accessor: keyof JobHistory | ((row: JobHistory) => React.ReactNode);
  className?: string;
}
