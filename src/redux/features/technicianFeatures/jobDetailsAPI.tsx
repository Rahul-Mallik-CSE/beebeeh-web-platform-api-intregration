/** @format */

import baseApi from "../../api/baseAPI";
import { JobDetailsResponse } from "@/types/JobDetailsTypes";

const jobDetailsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetails: builder.query<JobDetailsResponse, string>({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/`,
        method: "GET",
      }),
      providesTags: (result, error, jobId) => [
        { type: "JobDetails", id: jobId },
      ],
    }),
  }),
});

export const { useGetJobDetailsQuery } = jobDetailsAPI;
