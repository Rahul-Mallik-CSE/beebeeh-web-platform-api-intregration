/** @format */

import { send } from "process";
import baseApi from "../api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation<any, any>({
      query: (data) => ({
        url: `/api/auth/signup/`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `/api/auth/verify-email/`,
        method: "POST",
        body: { email, otp },
      }),
    }),
    forgetPassword: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: `/api/auth/forgetpassword/`,
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtpForForget: builder.mutation<any, { email: string; otp: string }>({
      query: ({ email, otp }) => ({
        url: `/api/auth/vefiry_for_forget/${email}/`,
        method: "POST",
        body: { otp },
      }),
    }),
    resetPassword: builder.mutation<
      any,
      { new_password: string; token: string }
    >({
      query: ({ new_password, token }) => ({
        url: `/api/auth/reset_password/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { new_password },
      }),
    }),
    changePassword: builder.mutation<
      any,
      { new_password: string; confirm_password: string }
    >({
      query: (data) => ({
        url: `/api/auth/change-password/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useVerifyOtpForForgetMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authAPI;
