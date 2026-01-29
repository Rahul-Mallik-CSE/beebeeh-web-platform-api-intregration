/** @format */

import baseApi from "../api/baseAPI";
import { Notification } from "@/types/AllTypes";

export interface NotificationsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Notification[];
  requestId: string | null;
}

const notificationAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<
      NotificationsResponse,
      { page?: number; limit?: number }
    >({
      query: (params = {}) => ({
        url: `/api/notifications/`,
        method: "GET",
        params,
      }),
      providesTags: ["Notification"],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationAPI;
