/** @format */

import baseApi from "../../api/baseAPI";
import { TodaysJobsResponse } from "@/types/AllTypes";

export interface TodaysJobsFilters {
  page?: number;
  page_size?: number;
  client_name?: string;
  status?: string;
  job_type?: string;
  job_id_order?: "asc" | "desc";
}

const todaysJobsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysJobs: builder.query<TodaysJobsResponse, TodaysJobsFilters | void>({
      query: (filters: TodaysJobsFilters = {}) => {
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
          url: `/api/todays-jobs/`,
          method: "GET",
          params,
        };
      },
      providesTags: ["TodaysJobs"],
    }),
  }),
});

export const { useGetTodaysJobsQuery } = todaysJobsAPI;
