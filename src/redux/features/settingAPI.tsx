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
  }),
});

export const { useGetProfileQuery } = settingAPI;
