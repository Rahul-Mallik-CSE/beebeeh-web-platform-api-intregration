/** @format */

import baseApi from "../../api/baseAPI";

// Autocomplete interfaces
export interface ClientAutocompleteItem {
  client_id: string;
  name: string;
  contact_number: string;
}

export interface ProductAutocompleteItem {
  product_id: string;
  model_name: string;
}

export interface TechnicianAutocompleteItem {
  technician_id: string;
  name: string;
  contact_number: string;
  status: string;
  skills: string[];
}

export interface AutocompleteResponse<T> {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T[];
  requestId: string;
}

// Installation interfaces
export interface AddInstallationRequest {
  client_id: string;
  client_name: string;
  product_id: string;
  model_name: string;
  technician_id: string;
  technician_name: string;
  scheduled_date: string;
  scheduled_time: string;
  maintenance_frequency_month: number;
  priority: "low" | "medium" | "high";
  notes: string;
}

export interface AddInstallationResponse {
  success: boolean;
  message: string;
  data: any;
  requestId: string;
}

// Installation list interfaces
export interface InstallationItem {
  installation_id: string;
  client: {
    id: string;
    name: string;
    contact_number: string;
  };
  product: {
    id: string;
    model_name: string;
  };
  technician: {
    id: string;
    name: string;
  };
  scheduled_date: string;
  scheduled_time: string;
  maintenance_frequency_month: number;
  priority: string;
  notes: string;
  status: string;
  created_at: string;
}

export interface InstallationResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: InstallationItem[];
  requestId: string;
}

export interface InstallationQueryParams {
  page?: number;
  limit?: number;
  order_dir?: "asc" | "desc";
  job_id?: string;
  client?: string;
  model?: string;
  technician?: string;
  status?: string;
}

const installationAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Autocomplete endpoints
    autocompleteClients: builder.query<
      AutocompleteResponse<ClientAutocompleteItem>,
      { q: string }
    >({
      query: (params) => ({
        url: `/api/autocomplete/clients/`,
        method: "GET",
        params,
      }),
    }),

    autocompleteProducts: builder.query<
      AutocompleteResponse<ProductAutocompleteItem>,
      { q: string }
    >({
      query: (params) => ({
        url: `/api/autocomplete/products/`,
        method: "GET",
        params,
      }),
    }),

    autocompleteTechnicians: builder.query<
      AutocompleteResponse<TechnicianAutocompleteItem>,
      { q: string }
    >({
      query: (params) => ({
        url: `/api/autocomplete/technicians/`,
        method: "GET",
        params,
      }),
    }),

    // Add installation
    addInstallation: builder.mutation<
      AddInstallationResponse,
      AddInstallationRequest
    >({
      query: (installationData) => ({
        url: `/api/installations/`,
        method: "POST",
        body: installationData,
      }),
      invalidatesTags: ["Installation"],
    }),

    // Get installations
    getInstallations: builder.query<
      InstallationResponse,
      InstallationQueryParams
    >({
      query: (params) => ({
        url: `/api/installations/`,
        method: "GET",
        params,
      }),
      providesTags: ["Installation"],
    }),
  }),
});

export const {
  useAutocompleteClientsQuery,
  useAutocompleteProductsQuery,
  useAutocompleteTechniciansQuery,
  useAddInstallationMutation,
  useGetInstallationsQuery,
} = installationAPI;
