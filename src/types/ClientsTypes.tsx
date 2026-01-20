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

export interface ClientDetails extends Client {
  profileImage?: string;
  email: string;
  address: string;
  status: "Available" | "Unavailable" | "Busy";
  totalJobs: number;
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
