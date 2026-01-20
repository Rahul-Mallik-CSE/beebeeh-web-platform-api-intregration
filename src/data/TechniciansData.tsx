/** @format */

import { Technician } from "@/types/TechniciansTypes";

export const techniciansData: Technician[] = [
  {
    id: "1",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Installation, Repair",
    totalJobs: 90,
    status: "Available",
  },
  {
    id: "2",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Maintenance",
    totalJobs: 90,
    status: "Unavailable",
  },
  {
    id: "3",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Maintenance",
    totalJobs: 90,
    status: "Unavailable",
  },
  {
    id: "4",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Installation, Repair",
    totalJobs: 90,
    status: "Available",
  },
  {
    id: "5",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Maintenance",
    totalJobs: 90,
    status: "Unavailable",
  },
  {
    id: "6",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Installation, Repair",
    totalJobs: 90,
    status: "Available",
  },
  {
    id: "7",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Installation, Repair",
    totalJobs: 90,
    status: "Available",
  },
  {
    id: "8",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Maintenance",
    totalJobs: 90,
    status: "Unavailable",
  },
  {
    id: "9",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Installation, Repair",
    totalJobs: 90,
    status: "Available",
  },
  {
    id: "10",
    techId: "T-501",
    name: "Malik Khan",
    contactNumber: "+44 223 882",
    skills: "Maintenance",
    totalJobs: 90,
    status: "Unavailable",
  },
];

export const techniciansColumns = [
  {
    header: "Tech ID",
    accessor: (row: Technician) => row.techId,
  },
  {
    header: "Name",
    accessor: (row: Technician) => row.name,
  },
  {
    header: "Contact Number",
    accessor: (row: Technician) => row.contactNumber,
  },
  {
    header: "Skills",
    accessor: (row: Technician) => row.skills,
  },
  {
    header: "Total Jobs",
    accessor: (row: Technician) => row.totalJobs,
  },
  {
    header: "Status",
    accessor: (row: Technician) => {
      const statusColors = {
        Available: "bg-emerald-100 text-emerald-700",
        Unavailable: "bg-red-100 text-red-700",
      };
      return (
        <span
          className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium ${
            statusColors[row.status]
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
];

import { TechnicianDetails, CalendarJobEvent } from "@/types/TechniciansTypes";

export const technicianDetailsData: TechnicianDetails = {
  id: "1",
  techId: "T-201",
  name: "Malik Ahmed",
  contactNumber: "+1 (555) 123-4567",
  email: "malik.ahmed@service.com",
  address: "123 Main St, New York",
  skills: "Install, Repair",
  rating: 5.0,
  completedJobs: 16,
  todaysJobs: 16,
  status: "Available",
  profileImage: undefined,
};

// Calendar events data matching the image design
export const technicianCalendarEvents: CalendarJobEvent[] = [
  // Row 1 - Feb 2025
  {
    date: new Date(2025, 1, 8), // Sunday Feb 8
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
    textColor: "#0369A1",
  },
  {
    date: new Date(2025, 1, 5), // Tuesday Feb 5
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#22C55E",
    bgColor: "#DCFCE7",
    textColor: "#15803D",
  },
  {
    date: new Date(2025, 1, 3), // Thursday Feb 3
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#F472B6",
    bgColor: "#FCE7F3",
    textColor: "#BE185D",
  },
  // Row 2
  {
    date: new Date(2025, 1, 13), // Monday Feb 13
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#F97316",
    bgColor: "#FFEDD5",
    textColor: "#C2410C",
  },
  {
    date: new Date(2025, 1, 11), // Wednesday Feb 11
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#FBBF24",
    bgColor: "#FEF3C7",
    textColor: "#B45309",
  },
  {
    date: new Date(2025, 1, 9), // Saturday Feb 9
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
    textColor: "#0369A1",
  },
  // Row 3
  {
    date: new Date(2025, 1, 22), // Sunday Feb 22
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
    textColor: "#0369A1",
  },
  {
    date: new Date(2025, 1, 19), // Tuesday Feb 19
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#FBBF24",
    bgColor: "#FEF3C7",
    textColor: "#B45309",
  },
  {
    date: new Date(2025, 1, 17), // Friday Feb 17
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#F472B6",
    bgColor: "#FCE7F3",
    textColor: "#BE185D",
  },
  {
    date: new Date(2025, 1, 16), // Saturday Feb 16
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#0EA5E9",
    bgColor: "#E0F2FE",
    textColor: "#0369A1",
  },
  // Row 4
  {
    date: new Date(2025, 1, 25), // Wednesday Feb 25
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#FBBF24",
    bgColor: "#FEF3C7",
    textColor: "#B45309",
  },
  {
    date: new Date(2025, 1, 24), // Thursday Feb 24
    installations: 5,
    repairs: 3,
    maintenance: 3,
    color: "#F472B6",
    bgColor: "#FCE7F3",
    textColor: "#BE185D",
  },
];
