/** @format */

import baseApi from "../../api/baseAPI";

// ============= Types =============

export interface TechnicianListItem {
  technician_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  town: string;
  skills: string[];
  status: string;
  total_jobs: number;
  profile_image: string | null;
  is_active: boolean;
  created_at: string;
}

export interface TechnicianFilters {
  page?: number;
  limit?: number;
  technician_id?: string;
  name?: string;
  contact_number?: string;
  skills?: string;
  order?: "asc" | "desc";
  status?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetTechniciansResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: TechnicianListItem[];
  requestId: string;
}

export interface TechnicianDetail {
  technician_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  town: string;
  skills: string[];
  status: string;
  total_jobs: number;
  profile_image: string | null;
  is_active: boolean;
  created_at: string;
}

export interface GetTechnicianDetailResponse {
  success: boolean;
  message: string;
  meta: { total: number };
  data: TechnicianDetail;
  requestId: string;
}

// Dashboard Types
export interface BarData {
  date: string;
  day: string;
  installations: number;
  repairs: number;
  maintenances: number;
}

export interface JobItem {
  job_id: string;
  type: string;
  client_name: string;
  contact_number: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  completed_at: string | null;
}

export interface TablePagination {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface TechnicianDashboardData {
  technician: {
    technician_id: string;
    full_name: string;
    email: string;
    contact_number: string;
    address: string;
    town: string;
    skills: string[];
    status: string;
    profile_image: string | null;
    is_active: boolean;
  };
  stats: {
    rating: number;
    total_jobs: number;
    completed_jobs: number;
    todays_jobs: number;
    job_type_distribution_this_week: {
      installations: number;
      repairs: number;
      maintenances: number;
      total: number;
    };
  };
  performance_analytics: {
    week_start: string;
    week_end: string;
    bars: BarData[];
  };
  tables: {
    todays_jobs: [JobItem[], TablePagination];
    full_job_history: [JobItem[], TablePagination];
  };
}

export interface GetTechnicianDashboardResponse {
  success: boolean;
  message: string;
  meta: { total: number };
  data: TechnicianDashboardData;
  requestId: string;
}

export interface AddTechnicianRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  town: string;
  contact_number: string;
  skills: string[];
  profile_image?: File;
  is_active: boolean;
}

export interface AddTechnicianResponse {
  success: boolean;
  message: string;

  requestId: string;
}

export interface DeleteTechnicianResponse {
  success: boolean;
  message: string;
  requestId: string;
}

export interface EditTechnicianRequest {
  full_name: string;
  contact_number: string;
  address: string;
  skills: string[];
  profile_image?: File;
}

export interface EditTechnicianResponse {
  success: boolean;
  message: string;
  requestId: string;
}

// ============= API Endpoints =============

const technicianAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all technicians with filters
    getTechnicians: builder.query<
      GetTechniciansResponse,
      TechnicianFilters | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
              if (key === "name") {
                queryParams.append("name", value.toString());
              } else {
                queryParams.append(key, value.toString());
              }
            }
          });
        }
        const queryString = queryParams.toString();
        return {
          url: `/api/technicians/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Technician"],
    }),

    // Get technician by ID
    getTechnicianById: builder.query<GetTechnicianDetailResponse, string>({
      query: (technicianId) => ({
        url: `/api/technicians/${technicianId}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Technician", id }],
    }),

    // Get technician dashboard
    getTechnicianDashboard: builder.query<
      GetTechnicianDashboardResponse,
      string
    >({
      query: (technicianId) => ({
        url: `/api/technicians/${technicianId}/dashboard/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "Technician", id: `${id}-dashboard` },
      ],
    }),

    // Add technician
    addTechnician: builder.mutation<AddTechnicianResponse, FormData>({
      query: (formData) => ({
        url: `/api/technicians/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Technician"],
    }),

    // Delete technician
    deleteTechnician: builder.mutation<DeleteTechnicianResponse, string>({
      query: (technicianId) => ({
        url: `/api/technicians/${technicianId}/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, technicianId) => [
        "Technician",
        { type: "Technician", id: technicianId },
      ],
    }),

    // Edit technician
    editTechnician: builder.mutation<
      EditTechnicianResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/technicians/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Technician",
        { type: "Technician", id },
        { type: "Technician", id: `${id}-dashboard` },
      ],
    }),
  }),
});

export const {
  useGetTechniciansQuery,
  useGetTechnicianByIdQuery,
  useGetTechnicianDashboardQuery,
  useAddTechnicianMutation,
  useDeleteTechnicianMutation,
  useEditTechnicianMutation,
} = technicianAPI;

export default technicianAPI;
