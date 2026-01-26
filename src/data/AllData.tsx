/** @format */

import { Job, TableColumn, type OverviewJob } from "@/types/AllTypes";

export const columns: TableColumn<Job>[] = [
  {
    header: "Job ID",
    accessor: "id",
    className: "font-medium",
  },
  {
    header: "Job Type",
    accessor: "jobType",
  },
  {
    header: "Client Name",
    accessor: "clientName",
  },
  {
    header: "Contact Number",
    accessor: "contactNumber",
  },
  {
    header: "Scheduled time",
    accessor: "orderedByTime",
  },
  {
    header: "Status",
    accessor: "status",
  },
];

export const jobsData: Job[] = [
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Pending",
  },
  {
    id: "#CD1002",
    jobType: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "In Progress",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Completed",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Pending",
  },
  {
    id: "#CD1002",
    jobType: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "In Progress",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Completed",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Completed",
  },
  {
    id: "#CD1002",
    jobType: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "In Progress",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Pending",
  },
  {
    id: "#CD1002",
    jobType: "Repairing",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "In Progress",
  },
];

// Overview Table specific columns and data
export const overviewColumns: TableColumn<OverviewJob>[] = [
  {
    header: "Job ID",
    accessor: "jobId",
    className: "font-medium",
  },
  {
    header: "Client",
    accessor: "client",
  },
  {
    header: "Technician",
    accessor: "technician",
  },
  {
    header: "Type",
    accessor: "type",
  },
  {
    header: "Order by Date",
    accessor: "orderByDate",
  },
  {
    header: "Status",
    accessor: "status",
  },
];

export const overviewJobsData: OverviewJob[] = [
  {
    id: "1",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Repair",
    orderByDate: "25 Jul, 2024",
    status: "Pending",
  },
  {
    id: "2",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Maintenance",
    orderByDate: "26 Jul, 2024",
    status: "In Progress",
  },
  {
    id: "3",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Installations",
    orderByDate: "25 Jul, 2024",
    status: "Scheduled",
  },
  {
    id: "4",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Repair",
    orderByDate: "25 Jul, 2024",
    status: "Pending",
  },
  {
    id: "5",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Maintenance",
    orderByDate: "25 Jul, 2024",
    status: "In Progress",
  },
  {
    id: "6",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Installations",
    orderByDate: "25 Jul, 2024",
    status: "Scheduled",
  },
  {
    id: "7",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Repair",
    orderByDate: "05 Jul, 2024",
    status: "Pending",
  },
  {
    id: "8",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Installations",
    orderByDate: "29 Jul, 2024",
    status: "Scheduled",
  },
  {
    id: "9",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Maintenance",
    orderByDate: "25 Jul, 2024",
    status: "In Progress",
  },
  {
    id: "10",
    jobId: "J-0011",
    client: "Ravi Carter",
    technician: "Malik Rehman",
    type: "Installations",
    orderByDate: "25 Jul, 2024",
    status: "Scheduled",
  },
];

export const notificationsData = [
  {
    id: "1",
    title: "Schedule update: job #CD561 moved to a new time slot.",
    time: "2 hours ago",
    type: "schedule" as const,
  },
  {
    id: "2",
    title: "Admin assigned a new maintenance visit to your list.",
    time: "2 hours ago",
    type: "admin" as const,
  },
  {
    id: "3",
    title: "Report submitted for job #CD561 Awaiting admin review.",
    time: "2 hours ago",
    type: "report" as const,
  },
  {
    id: "4",
    title: "Report submitted for job #CD561 Awaiting admin review.",
    time: "2 hours ago",
    type: "report" as const,
  },
  {
    id: "5",
    title: "Schedule update: job #CD561 moved to a new time slot.",
    time: "2 hours ago",
    type: "schedule" as const,
  },
  {
    id: "6",
    title: "Admin assigned a new maintenance visit to your list.",
    time: "2 hours ago",
    type: "admin" as const,
  },
  {
    id: "7",
    title: "Checklist updated for an upcoming job.",
    time: "2 hours ago",
    type: "checklist" as const,
  },
];

export interface TechnicianForAssign {
  id: string;
  name: string;
  technicianId: string;
}

export const techniciansForAssign: TechnicianForAssign[] = [
  {
    id: "1",
    name: "Malik Rehman",
    technicianId: "T-001",
  },
  {
    id: "2",
    name: "Kameer Hossain",
    technicianId: "T-002",
  },
  {
    id: "3",
    name: "John Smith",
    technicianId: "T-003",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    technicianId: "T-004",
  },
  {
    id: "5",
    name: "David Brown",
    technicianId: "T-005",
  },
  {
    id: "6",
    name: "Emma Wilson",
    technicianId: "T-006",
  },
  {
    id: "7",
    name: "Michael Davis",
    technicianId: "T-007",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    technicianId: "T-008",
  },
];

export interface JobForAssign {
  id: string;
  jobId: string;
  clientName: string;
  jobType: string;
}

export const jobsForAssign: JobForAssign[] = [
  {
    id: "1",
    jobId: "J-001",
    clientName: "Zara Khan",
    jobType: "Installation",
  },
  {
    id: "2",
    jobId: "J-002",
    clientName: "Emma Wilson",
    jobType: "Repair",
  },
  {
    id: "3",
    jobId: "J-003",
    clientName: "John Doe",
    jobType: "Maintenance",
  },
  {
    id: "4",
    jobId: "J-004",
    clientName: "Sarah Johnson",
    jobType: "Installation",
  },
  {
    id: "5",
    jobId: "J-005",
    clientName: "Michael Brown",
    jobType: "Repair",
  },
  {
    id: "6",
    jobId: "J-006",
    clientName: "Lisa Anderson",
    jobType: "Maintenance",
  },
  {
    id: "7",
    jobId: "J-007",
    clientName: "David Wilson",
    jobType: "Installation",
  },
  {
    id: "8",
    jobId: "J-008",
    clientName: "Emily Davis",
    jobType: "Repair",
  },
];
