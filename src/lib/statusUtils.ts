/** @format */

// ============================================================
// Shared Job Status Utilities
// Single source of truth for status labels, colors, and mappings
// ============================================================

// --- Status Label Mapping (API value → Display label) ---

const STATUS_LABEL_MAP: Record<string, string> = {
  assign: "Pending",
  pending: "Pending",
  in_progress: "In Progress",
  complete: "Completed",
  completed: "Completed",
  cancel: "Cancelled",
  cancelled: "Cancelled",
  rescheduled: "Rescheduled",
  invoice_required: "Invoice Required",
  overdue: "Overdue",
  upcoming: "Upcoming",
};

/**
 * Convert an API status value to a human-readable display label.
 * e.g. "assign" → "Pending", "in_progress" → "In Progress"
 */
export const getJobStatusLabel = (status: string): string => {
  return STATUS_LABEL_MAP[status?.toLowerCase()] ?? status ?? "Unknown";
};

// --- UI → API status mapping (for filters) ---

const STATUS_TO_API_MAP: Record<string, string> = {
  Pending: "assign",
  "In Progress": "in_progress",
  Completed: "complete",
  Cancelled: "cancel",
  Rescheduled: "rescheduled",
  "Invoice Required": "invoice_required",
  Overdue: "overdue",
  Upcoming: "upcoming",
};

/**
 * Convert a display status label back to the API value (for filter requests).
 * e.g. "In Progress" → "in_progress"
 */
export const mapStatusToAPI = (displayStatus: string): string => {
  return STATUS_TO_API_MAP[displayStatus] ?? displayStatus.toLowerCase();
};

// --- Table badge colors (light style: bg-xxx-100 text-xxx-800 border-xxx-200) ---

/**
 * Returns Tailwind classes for a light-style status badge used in tables.
 * Accepts EITHER the API value ("in_progress") or display value ("In Progress").
 */
export const getJobStatusBadgeColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "pending":
    case "assign":
      return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "in progress":
    case "in_progress":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "completed":
    case "complete":
      return "bg-green-100 text-green-800 border border-green-200";
    case "cancelled":
    case "cancel":
      return "bg-red-100 text-red-800 border border-red-200";
    case "rescheduled":
      return "bg-orange-100 text-orange-800 border border-orange-200";
    case "invoice required":
    case "invoice_required":
      return "bg-purple-100 text-purple-800 border border-purple-200";
    case "overdue":
      return "bg-red-100 text-red-800 border border-red-200";
    case "upcoming":
      return "bg-teal-100 text-teal-800 border border-teal-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};

// --- Detail page button colors (solid style: bg-xxx-600 hover:bg-xxx-700) ---

/**
 * Returns Tailwind classes for a solid-style status button used in detail page headers.
 * Accepts API status values like "in_progress", "assign", etc.
 */
export const getJobStatusButtonColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "pending":
    case "assign":
      return "bg-yellow-600 hover:bg-yellow-700";
    case "in_progress":
    case "in progress":
      return "bg-blue-600 hover:bg-blue-700";
    case "complete":
    case "completed":
      return "bg-green-600 hover:bg-green-700";
    case "cancel":
    case "cancelled":
      return "bg-red-600 hover:bg-red-700";
    case "rescheduled":
      return "bg-orange-600 hover:bg-orange-700";
    case "invoice_required":
    case "invoice required":
      return "bg-purple-600 hover:bg-purple-700";
    case "overdue":
      return "bg-red-800 hover:bg-red-900";
    case "upcoming":
      return "bg-teal-600 hover:bg-teal-700";
    default:
      return "bg-gray-600 hover:bg-gray-700";
  }
};

// --- PDF hex colors ---

/**
 * Returns a hex colour string for use in PDF generation.
 */
export const getJobStatusHexColor = (status: string): string => {
  switch (status?.toLowerCase()) {
    case "complete":
    case "completed":
      return "#10b981";
    case "in_progress":
    case "in progress":
      return "#3b82f6";
    case "assign":
    case "pending":
      return "#eab308";
    case "cancel":
    case "cancelled":
      return "#ef4444";
    case "rescheduled":
      return "#f97316";
    case "invoice_required":
    case "invoice required":
      return "#a855f7";
    case "overdue":
      return "#991b1b";
    case "upcoming":
      return "#0d9488";
    default:
      return "#6b7280";
  }
};

// --- Predefined status filter options (shared across all tables) ---

export const JOB_STATUS_FILTER_OPTIONS = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
  "Rescheduled",
  "Invoice Required",
];
