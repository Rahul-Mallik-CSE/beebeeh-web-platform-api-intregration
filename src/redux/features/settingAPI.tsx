/** @format */

import baseApi from "../api/baseAPI";
import { ProfileResponse } from "@/types/AllTypes";

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
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = settingAPI;
