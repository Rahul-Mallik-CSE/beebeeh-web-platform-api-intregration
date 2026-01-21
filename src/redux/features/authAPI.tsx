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
  }),
});

export const {
  //   useUpdatePasswordMutation,
  //   useResetPasswordMutation,
  //   useVerifyEmailMutation,
  //   useForgetPasswordMutation,
  useLoginMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useForgetPasswordMutation,
  useVerifyOtpForForgetMutation,
  useResetPasswordMutation,
} = authAPI;
