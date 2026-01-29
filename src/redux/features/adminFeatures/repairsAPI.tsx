/** @format */

import baseApi from "../../api/baseAPI";

export interface AddRepairRequest {
  client_id: string;
  client_name: string;
  product_id: string;
  model_name: string;
  technician_id: string;
  technician_name: string;
  scheduled_date: string;
  scheduled_time: string;
  priority: "low" | "medium" | "high";
  problem_type: "cooling_issue" | "noise_gas" | "electrical" | "other";
  problem_description: string;
}

export interface AddRepairResponse {
  success: boolean;
  message: string;
  data: AddRepairRequest;
  requestId: string;
}

// Repair list interfaces
export interface RepairItem {
  repair_id: string;
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
  problem_type: string;
  problem_description: string;
  status: string;
  created_at: string;
}

export interface RepairResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: RepairItem[];
  requestId: string;
}

export interface RepairQueryParams {
  page?: number;
  limit?: number;
  client_id?: string;
  client_name?: string;
  installation?: string;
  problem?: string;
  status?: string;
  technician?: string;
}

const repairsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRepair: builder.mutation<AddRepairResponse, AddRepairRequest>({
      query: (repairData) => ({
        url: `/api/repairs/`,
        method: "POST",
        body: repairData,
      }),
      invalidatesTags: ["Repair"],
    }),

    // Get repairs
    getRepairs: builder.query<RepairResponse, RepairQueryParams>({
      query: (params) => ({
        url: `/api/repairs/`,
        method: "GET",
        params,
      }),
      providesTags: ["Repair"],
    }),
  }),
});

export const { useAddRepairMutation, useGetRepairsQuery } = repairsAPI;
