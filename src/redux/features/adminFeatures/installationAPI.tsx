/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Get installations interfaces
export interface InstallationClient {
  id: string;
  name: string;
  contact_number: string;
}

export interface InstallationProduct {
  id: string;
  model_name: string;
}

export interface InstallationTechnician {
  id: string;
  name: string;
}

export interface Installation {
  installation_id: string;
  client: InstallationClient;
  product: InstallationProduct;
  technician: InstallationTechnician;
  scheduled_date: string;
  scheduled_time: string;
  maintenance_frequency_month: number;
  priority: "low" | "medium" | "high";
  notes: string;
  status: "assign" | "inprogress" | "completed";
  created_at: string;
}

export interface InstallationsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Installation[];
  requestId: string;
}

export interface GetInstallationsParams {
  order_dir?: "asc" | "desc";
  job_id?: string;
  client?: string;
  model?: string;
  technician?: string;
  status?: "assign" | "inprogress" | "completed";
  page?: number;
  limit?: number;
}

const installationAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all installations
    getInstallations: builder.query<
      InstallationsResponse,
      GetInstallationsParams | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params) {
          if (params.order_dir)
            searchParams.append("order_dir", params.order_dir);
          if (params.job_id) searchParams.append("job_id", params.job_id);
          if (params.client) searchParams.append("client", params.client);
          if (params.model) searchParams.append("model", params.model);
          if (params.technician)
            searchParams.append("technician", params.technician);
          if (params.status) searchParams.append("status", params.status);
          if (params.page) searchParams.append("page", params.page.toString());
          if (params.limit)
            searchParams.append("limit", params.limit.toString());
        }

        const queryString = searchParams.toString();
        return `/api/installations/${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Installation"],
    }),

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
    }),
  }),
});

export const {
  useGetInstallationsQuery,
  useAutocompleteClientsQuery,
  useAutocompleteProductsQuery,
  useAutocompleteTechniciansQuery,
  useAddInstallationMutation,
} = installationAPI;
