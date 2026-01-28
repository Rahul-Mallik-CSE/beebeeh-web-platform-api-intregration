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

// Get repairs interfaces
export interface RepairClient {
  id: string;
  name: string;
  contact_number: string;
}

export interface RepairProduct {
  id: string;
  model_name: string;
}

export interface RepairTechnician {
  id: string;
  name: string;
}

export interface Repair {
  repair_id: string;
  client: RepairClient;
  product: RepairProduct;
  technician: RepairTechnician;
  scheduled_date: string;
  scheduled_time: string;
  priority: "low" | "medium" | "high";
  problem_type: "cooling_issue" | "noise_gas" | "electrical" | "other";
  problem_description: string;
  status: "assign" | "inprogress" | "completed";
  created_at: string;
}

export interface RepairsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Repair[];
  requestId: string;
}

export interface GetRepairsParams {
  client_id?: string;
  client_name?: string;
  installation?: string;
  problem?: string;
  status?: "assign" | "inprogress" | "completed";
  technician?: string;
  page?: number;
  limit?: number;
}

const repairsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all repairs
    getRepairs: builder.query<RepairsResponse, GetRepairsParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params) {
          if (params.client_id)
            searchParams.append("client_id", params.client_id);
          if (params.client_name)
            searchParams.append("client_name", params.client_name);
          if (params.installation)
            searchParams.append("installation", params.installation);
          if (params.problem) searchParams.append("problem", params.problem);
          if (params.status) searchParams.append("status", params.status);
          if (params.technician)
            searchParams.append("technician", params.technician);
          if (params.page) searchParams.append("page", params.page.toString());
          if (params.limit)
            searchParams.append("limit", params.limit.toString());
        }

        const queryString = searchParams.toString();
        return `/api/repairs/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Repairs"],
    }),

    addRepair: builder.mutation<AddRepairResponse, AddRepairRequest>({
      query: (repairData) => ({
        url: `/api/repairs/`,
        method: "POST",
        body: repairData,
      }),
      invalidatesTags: ["Repairs"],
    }),
  }),
});

export const { useGetRepairsQuery, useAddRepairMutation } = repairsAPI;
