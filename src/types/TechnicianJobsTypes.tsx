/** @format */

export interface TodayJob {
  id: string;
  jobId: string;
  client: string;
  contactNumber: string;
  type: string;
  orderByDate: string;
  status: "Pending" | "In Progress" | "Complete";
}

export interface JobHistory {
  id: string;
  jobId: string;
  client: string;
  contactNumber: string;
  type: string;
  orderByDate: string;
  completeDate: string;
}
