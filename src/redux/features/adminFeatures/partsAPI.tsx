/** @format */

import baseApi from "../../api/baseAPI";

export interface Product {
  product_id: string;
  model_name: string;
  alias: string;
  frequency_domestic_month: number;
  frequency_commercial_month: number;
  parts_quantity: number;
  stock_quantity: number;
  maintenance_frequency_month: number;
  is_active: boolean;
}

export interface AutocompleteProductsResponse {
  success: boolean;
  data: Product[];
}

export interface AddPartRequest {
  product_id: string;
  part_name: string;
  unit: string;
  unit_price: number;
  stock_quantity: number;
  low_stock_warning: number;
}

export interface AddPartResponse {
  success: boolean;
  message: string;
  data: any;
  requestId: string;
}

export interface PartModel {
  product_id: string;
  model_name: string;
  alias: string;
}

export interface PartItem {
  part_id: string;
  name: string;
  stock: number;
  unit: string;
  unit_price: string | null;
  min_stock: number;
  models: PartModel[];
  status: "stock_in" | "low_stock" | "stock_out";
}

export interface PartsQueryParams {
  page?: number;
  limit?: number;
  part_id?: string;
  name?: string;
  model_name?: string;
  min?: number;
  stock?: number;
  status?: string;
  order_dir?: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface UsedHistoryItem {
  job_type: string;
  job_id: string;
  quantity_used: number;
  used_at: string;
}

export interface GetPartsResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: PartItem[];
  requestId: string;
}

export interface PartDetailsData {
  part_id: string;
  name: string;
  unit: string;
  unit_price: string;
  stock: number;
  min_stock: number;
  models: number;
  used_history: UsedHistoryItem[];
}

export interface GetPartDetailsResponse {
  success: boolean;
  message: string;
  data: PartDetailsData;
  requestId: string;
}

export interface DeletePartResponse {
  success: boolean;
  message: string;
  requestId: string;
}

export interface RestockPartRequest {
  stock_quantity: number;
}

export interface RestockPartResponse {
  success: boolean;
  message: string;
  requestId: string;
}

const partsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    autocompleteProducts: builder.query<AutocompleteProductsResponse, string>({
      query: (search) => ({
        url: `/api/products/?search=${search}`,
        method: "GET",
      }),
    }),
    addPart: builder.mutation<AddPartResponse, AddPartRequest>({
      query: (partData) => ({
        url: `/api/parts/`,
        method: "POST",
        body: partData,
      }),
    }),
    getParts: builder.query<GetPartsResponse, PartsQueryParams | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
              queryParams.append(key, value.toString());
            }
          });
        }
        const queryString = queryParams.toString();
        return {
          url: `/api/parts/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Part"],
    }),
    getPartDetails: builder.query<GetPartDetailsResponse, string>({
      query: (partId) => ({
        url: `/api/parts/${partId}/`,
        method: "GET",
      }),
      providesTags: ["Part"],
    }),
    deletePart: builder.mutation<DeletePartResponse, string>({
      query: (partId) => ({
        url: `/api/parts/${partId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Part"],
    }),
    restockPart: builder.mutation<
      RestockPartResponse,
      { partId: string; data: RestockPartRequest }
    >({
      query: ({ partId, data }) => ({
        url: `/api/parts/${partId}/restock/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Part"],
    }),
  }),
});

export const {
  useAutocompleteProductsQuery,
  useAddPartMutation,
  useGetPartsQuery,
  useGetPartDetailsQuery,
  useDeletePartMutation,
  useRestockPartMutation,
} = partsAPI;
