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

// Get maintenance interfaces
export interface MaintenanceClient {
  id: string;
  name: string;
  contact_number: string;
}

export interface MaintenanceProduct {
  id: string;
  model_name: string;
}

export interface MaintenanceTechnician {
  id: string;
  name: string;
}

export interface Maintenance {
  maintenance_id: string;
  client: MaintenanceClient;
  product: MaintenanceProduct;
  technician: MaintenanceTechnician;
  scheduled_date: string;
  scheduled_time: string;
  priority: "low" | "medium" | "high";
  problem_description: string;
  status: "assign" | "inprogress" | "completed";
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
  data: Maintenance[];
  requestId: string;
}

export interface GetMaintenanceParams {
  client_name?: string;
  model?: string;
  locality?: string;
  status?: "assign" | "inprogress" | "completed";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const maintenanceAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all maintenance
    getMaintenance: builder.query<
      MaintenanceResponse,
      GetMaintenanceParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params) {
          if (params.client_name)
            searchParams.append("client_name", params.client_name);
          if (params.model) searchParams.append("model", params.model);
          if (params.locality) searchParams.append("locality", params.locality);
          if (params.status) searchParams.append("status", params.status);
          if (params.order) searchParams.append("order", params.order);
          if (params.page) searchParams.append("page", params.page.toString());
          if (params.limit)
            searchParams.append("limit", params.limit.toString());
        }

        const queryString = searchParams.toString();
        return `/api/maintenance/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Maintenance"],
    }),

    addMaintenance: builder.mutation<
      AddMaintenanceResponse,
      AddMaintenanceRequest
    >({
      query: (maintenanceData) => ({
        url: `/api/maintenance/`,
        method: "POST",
        body: maintenanceData,
      }),
      invalidatesTags: ["Maintenance"],
    }),
  }),
});

export const { useGetMaintenanceQuery, useAddMaintenanceMutation } =
  maintenanceAPI;
