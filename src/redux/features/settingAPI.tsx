/** @format */

import baseApi from "../api/baseAPI";
import { ProfileResponse } from "@/types/AllTypes";

interface TechnicianStatusResponse {
  success: boolean;
  message: string;
  data: {
    status: "available" | "unavailable" | "busy";
  };
  requestId: string;
}

const settingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: `/api/auth/profile/`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<ProfileResponse, FormData>({
      query: (formData) => ({
        url: `/api/auth/profile/`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),
    getTechnicianStatus: builder.query<TechnicianStatusResponse, void>({
      query: () => ({
        url: `/api/tech/status/`,
        method: "GET",
      }),
      providesTags: ["TechnicianStatus"],
    }),
    updateTechnicianStatus: builder.mutation<
      TechnicianStatusResponse,
      { status: "available" | "unavailable" | "busy" }
    >({
      query: (data) => ({
        url: `/api/tech/status/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TechnicianStatus"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetTechnicianStatusQuery,
  useUpdateTechnicianStatusMutation,
} = settingAPI;
