/** @format */

import { Job, TableColumn } from "@/types/AllTypes";

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
    header: "Ordered by time",
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
    status: "Complete",
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
    status: "Complete",
  },
  {
    id: "#CD1002",
    jobType: "Maintenance",
    clientName: "Zara Khan",
    contactNumber: "1235 021500 54 22",
    orderedByTime: "Dec 10, 2024: 10:30 am",
    status: "Complete",
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
