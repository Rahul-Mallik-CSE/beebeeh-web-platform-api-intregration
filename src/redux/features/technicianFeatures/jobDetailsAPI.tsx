/** @format */

import baseApi from "../../api/baseAPI";
import { JobDetailsResponse } from "@/types/JobDetailsTypes";

interface AddPartRequest {
  part_id: string;
  part_name: string;
  quantity_used: number;
}

interface AutocompletePart {
  part_id: string;
  part_name: string;
  unit: string;
  stock_quantity: number;
}

interface AutocompleteResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: AutocompletePart[];
  requestId: string;
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
    startJob: builder.mutation<void, string>({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/start/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, jobId) => [
        { type: "JobDetails", id: jobId },
      ],
    }),
    cancelJob: builder.mutation<void, string>({
      query: (jobId) => ({
        url: `/api/jobs/${jobId}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, jobId) => [
        { type: "JobDetails", id: jobId },
      ],
    }),
    completeJob: builder.mutation<void, { jobId: string; formData: FormData }>({
      query: ({ jobId, formData }) => ({
        url: `/api/jobs/${jobId}/media/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, { jobId }) => [
        { type: "JobDetails", id: jobId },
      ],
    }),
    autocompleteParts: builder.query<AutocompleteResponse, string>({
      query: (query) => ({
        url: `/api/autocomplete/parts/`,
        method: "GET",
        params: { q: query },
      }),
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useAddPartMutation,
  useStartJobMutation,
  useCancelJobMutation,
  useCompleteJobMutation,
  useAutocompletePartsQuery,
} = jobDetailsAPI;
