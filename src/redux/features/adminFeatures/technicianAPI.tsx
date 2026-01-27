/** @format */

import baseApi from "../../api/baseAPI";

export interface AddTechnicianRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  town: string;
  contact_number: string;
  skills: string[];
  profile_image?: File;
  is_active: boolean;
}

export interface AddTechnicianResponse {
  success: boolean;
  message: string;
  data: any;
  requestId: string;
}

const technicianAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTechnician: builder.mutation<AddTechnicianResponse, FormData>({
      query: (formData) => ({
        url: `/api/technicians/`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAddTechnicianMutation } = technicianAPI;
