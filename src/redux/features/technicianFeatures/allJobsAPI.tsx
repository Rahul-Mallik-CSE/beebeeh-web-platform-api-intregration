/** @format */

import baseApi from "../../api/baseAPI";
import { AllJobsResponse } from "@/types/AllTypes";

export interface AllJobsFilters {
  page?: number;
  page_size?: number;
  client_name?: string;
  status?: string;
  job_type?: string;
  job_id_order?: "asc" | "desc";
}

const allJobsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<AllJobsResponse, AllJobsFilters | void>({
      query: (filters: AllJobsFilters = {}) => {
        const {
          page = 1,
          page_size = 10,
          client_name,
          status,
          job_type,
          job_id_order,
        } = filters;

        const params: Record<string, any> = { page, limit: page_size };

        if (client_name) params.client_name = client_name;
        if (status) params.status = status;
        if (job_type) params.job_type = job_type;
        if (job_id_order) params.job_id_order = job_id_order;

        return {
          url: `/api/all-jobs/`,
          method: "GET",
          params,
        };
      },
      providesTags: ["AllJobs"],
    }),
  }),
});

export const { useGetAllJobsQuery } = allJobsAPI;
