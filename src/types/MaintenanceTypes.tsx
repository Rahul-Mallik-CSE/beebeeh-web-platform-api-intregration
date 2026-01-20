/** @format */

export interface Maintenance {
  client: string;
  model: string;
  dueDate: string;
  dayLeft: string;
  locality: string;
  lastService: string;
  clientContacted: boolean;
  status: "Upcoming" | "Overdue";
}

export interface MaintenanceColumn {
  header: string;
  accessor: keyof Maintenance | ((row: Maintenance) => React.ReactNode);
  className?: string;
}

export interface AllAssignJob {
  jobId: string;
  client: string;
  product: string;
  type: string;
  technician: string;
  scheduled: string;
  status: "Assign" | "In-Progress" | "Complete";
}

export interface AllAssignJobColumn {
  header: string;
  accessor: keyof AllAssignJob | ((row: AllAssignJob) => React.ReactNode);
  className?: string;
}
