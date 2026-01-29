/** @format */

import baseApi from "../../api/baseAPI";

export interface AddMaintenanceRequest {
  client_id: string;
  client_name: string;
  product_id: string;
  model_name: string;
  technician_id: string;
  technician_name: string;
  scheduled_date: string;
  scheduled_time: string;
  priority: "low" | "medium" | "high";
  problem_description: string;
}

export interface AddMaintenanceResponse {
  success: boolean;
  message: string;
  data: AddMaintenanceRequest;
  requestId: string;
}

// Maintenance list interfaces
export interface MaintenanceItem {
  maintenance_id: string;
  client: {
    id: string;
    name: string;
    contact_number: string;
  };
  product: {
    id: string;
    model_name: string;
  };
  technician: {
    id: string;
    name: string;
  };
  scheduled_date: string;
  scheduled_time: string;
  priority: string;
  problem_description: string;
  status: string;
  created_at: string;
}

export interface MaintenanceResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: MaintenanceItem[];
  requestId: string;
}

export interface MaintenanceQueryParams {
  page?: number;
  limit?: number;
  client_name?: string;
  model?: string;
  locality?: string;
  status?: string;
  order?: "asc" | "desc";
}

const maintenanceAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMaintenance: builder.mutation<
      AddMaintenanceResponse,
      AddMaintenanceRequest
    >({
      query: (maintenanceData) => ({
        url: `/api/maintenance/`,
        method: "POST",
        body: maintenanceData,
      }),
    }),

    // Get maintenance
    getMaintenance: builder.query<MaintenanceResponse, MaintenanceQueryParams>({
      query: (params) => ({
        url: `/api/maintenance/`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useAddMaintenanceMutation, useGetMaintenanceQuery } =
  maintenanceAPI;
