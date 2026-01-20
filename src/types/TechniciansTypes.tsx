/** @format */

export interface Technician {
  id: string;
  techId: string;
  name: string;
  contactNumber: string;
  skills: string;
  totalJobs: number;
  status: "Available" | "Unavailable";
}

export interface TechnicianDetails {
  id: string;
  techId: string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  skills: string;
  rating: number;
  completedJobs: number;
  todaysJobs: number;
  status: "Available" | "Unavailable";
  profileImage?: string;
}

export interface CalendarJobEvent {
  date: Date;
  installations: number;
  repairs: number;
  maintenance: number;
  color: string;
  bgColor: string;
  textColor: string;
}
