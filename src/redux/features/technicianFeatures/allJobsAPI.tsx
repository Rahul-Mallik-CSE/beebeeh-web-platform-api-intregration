/** @format */

import baseApi from "../../api/baseAPI";
import { AllJobsResponse } from "@/types/AllTypes";

const allJobsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<AllJobsResponse, number | void>({
      query: (page = 1) => ({
        url: `/api/all-jobs/`,
        method: "GET",
        params: { page, page_size: 10 },
      }),
      providesTags: ["AllJobs"],
    }),
  }),
});

export const { useGetAllJobsQuery } = allJobsAPI;
