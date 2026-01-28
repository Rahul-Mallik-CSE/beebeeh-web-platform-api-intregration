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
  }),
});

export const { useAddMaintenanceMutation } = maintenanceAPI;
