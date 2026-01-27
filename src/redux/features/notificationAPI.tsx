/** @format */

import baseApi from "../api/baseAPI";

export interface NotificationPayload {
  job_type?: string;
  action?: string;
  job_id?: string;
  object_id?: string;
  status?: string;
  scheduled_date?: string;
  scheduled_time?: string;
  due_date?: string;
  problem_type?: string;
}

export interface Notification {
  id: string;
  type: string;
  icon_key: string;
  message: string;
  payload: NotificationPayload;
  is_read: boolean;
  created_at: string;
  time_ago: string;
}

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
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationAPI;
