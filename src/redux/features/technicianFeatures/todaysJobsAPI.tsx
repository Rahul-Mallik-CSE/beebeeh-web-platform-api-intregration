/** @format */

import baseApi from "../../api/baseAPI";
import { TodaysJobsResponse } from "@/types/AllTypes";

const todaysJobsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodaysJobs: builder.query<TodaysJobsResponse, number | void>({
      query: (page = 1) => ({
        url: `/api/todays-jobs/`,
        method: "GET",
        params: { page, page_size: 10 },
      }),
      providesTags: ["TodaysJobs"],
    }),
  }),
});

export const { useGetTodaysJobsQuery } = todaysJobsAPI;
