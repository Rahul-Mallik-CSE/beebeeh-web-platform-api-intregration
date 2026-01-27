/** @format */

import baseApi from "../../api/baseAPI";

export interface AddClientRequest {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  town: string;
  contact_number: string;
  client_type: string;
  profile_image?: File;
  is_active: boolean;
}

export interface AddClientResponse {
  success: boolean;
  message: string;
  data: any;
  requestId: string;
}

const clientsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation<AddClientResponse, FormData>({
      query: (formData) => ({
        url: `/api/clients/`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useAddClientMutation } = clientsAPI;
