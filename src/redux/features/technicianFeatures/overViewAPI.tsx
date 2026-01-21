/** @format */

import baseApi from "../../api/baseAPI";
import { DashboardResponse } from "@/types/AllTypes";

const overViewAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, number | void>({
      query: (page = 1) => ({
        url: `/api/dashboard/`,
        method: "GET",
        params: { page, page_size: 10 },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery } = overViewAPI;
