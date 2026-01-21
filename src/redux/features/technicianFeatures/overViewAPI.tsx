/** @format */

import baseApi from "../../api/baseAPI";
import { DashboardResponse } from "@/types/AllTypes";

const overViewAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: `/api/dashboard/`,
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = overViewAPI;
