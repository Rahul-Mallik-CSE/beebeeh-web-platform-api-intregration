/** @format */

import baseApi from "../../api/baseAPI";
import { JobDetailsResponse } from "@/types/JobDetailsTypes";

interface AddPartRequest {
  part_id: string;
  part_name: string;
  quantity_used: number;
}

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
    addPart: builder.mutation<
      void,
      { jobId: string; partData: AddPartRequest }
    >({
      query: ({ jobId, partData }) => ({
        url: `/api/jobs/${jobId}/parts/`,
        method: "POST",
        body: partData,
      }),
      invalidatesTags: (result, error, { jobId }) => [
        { type: "JobDetails", id: jobId },
      ],
    }),
  }),
});

export const { useGetJobDetailsQuery, useAddPartMutation } = jobDetailsAPI;
