/** @format */

import baseApi from "../../api/baseAPI";

// ============= Types =============
export interface ClientListItem {
  client_id: string;
  name: string;
  client_type: string;
  town: string;
  contact_number: string;
  installations: number;
  last_service: string | null;
  created: string;
  is_active: boolean;
}

export interface JobHistoryItem {
  job_id: string;
  technician: string;
  contact_number: string;
  type: string;
  order_by_date: string;
  complete_date: string;
  object_id: string;
}

export interface ClientDetails {
  client_id: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  address: string;
  town: string;
  contact_number: string;
  client_type: string;
  profile_image: string | null;
  is_active: boolean;
  installations: number;
  last_service: string | null;
  total_job: number;
  job_history: JobHistoryItem[];
  created_at: string;
  updated_at: string;
  job_history_meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetClientsResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: ClientListItem[];
  requestId: string;
}

export interface GetClientDetailsResponse {
  success: boolean;
  message: string;
  data: ClientDetails;
  requestId: string;
}

export interface UpdateClientResponse {
  success: boolean;
  message: string;
  data: ClientDetails;
  requestId: string;
}

export interface DeleteClientResponse {
  success: boolean;
  message: string;
  requestId: string;
}

export interface ClientsQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  town?: string;
  type?: string;
  client_id?: string;
  contact_number?: string;
  order?: "asc" | "desc";
}

// ============= API Endpoints =============
const clientsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all clients with pagination and filters
    getClients: builder.query<GetClientsResponse, ClientsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        
        if (params) {
          if (params.page) queryParams.append("page", params.page.toString());
          if (params.limit) queryParams.append("limit", params.limit.toString());
          if (params.name) queryParams.append("name", params.name);
          if (params.town) queryParams.append("town", params.town);
          if (params.type) queryParams.append("type", params.type);
          if (params.client_id) queryParams.append("client_id", params.client_id);
          if (params.contact_number) queryParams.append("contact_number", params.contact_number);
          if (params.order) queryParams.append("order", params.order);
        }

        const queryString = queryParams.toString();
        return {
          url: `/api/clients/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Client"],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
    }),

    // Get single client details by ID
    getClientById: builder.query<GetClientDetailsResponse, string>({
      query: (clientId) => ({
        url: `/api/clients/${clientId}/`,
        method: "GET",
      }),
      providesTags: (result, error, clientId) => [{ type: "Client", id: clientId }],
      keepUnusedDataFor: 300, // Keep cache for 5 minutes
    }),

    // Add new client
    addClient: builder.mutation<UpdateClientResponse, FormData>({
      query: (formData) => ({
        url: `/api/clients/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Client"],
    }),

    // Update client by ID
    updateClient: builder.mutation<
      UpdateClientResponse,
      { clientId: string; data: FormData | Partial<ClientDetails> }
    >({
      query: ({ clientId, data }) => ({
        url: `/api/clients/${clientId}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { clientId }) => [
        "Client",
        { type: "Client", id: clientId },
      ],
    }),

    // Delete client by ID
    deleteClient: builder.mutation<DeleteClientResponse, string>({
      query: (clientId) => ({
        url: `/api/clients/${clientId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),

    // Enable client
    enableClient: builder.mutation<UpdateClientResponse, string>({
      query: (clientId) => ({
        url: `/api/clients/${clientId}/enable/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, clientId) => [
        "Client",
        { type: "Client", id: clientId },
      ],
    }),

    // Disable client
    disableClient: builder.mutation<UpdateClientResponse, string>({
      query: (clientId) => ({
        url: `/api/clients/${clientId}/disable/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, clientId) => [
        "Client",
        { type: "Client", id: clientId },
      ],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useEnableClientMutation,
  useDisableClientMutation,
} = clientsAPI;
