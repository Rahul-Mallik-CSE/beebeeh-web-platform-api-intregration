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

const repairsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRepair: builder.mutation<AddRepairResponse, AddRepairRequest>({
      query: (repairData) => ({
        url: `/api/repairs/`,
        method: "POST",
        body: repairData,
      }),
    }),
  }),
});

export const { useAddRepairMutation } = repairsAPI;
