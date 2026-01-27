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
  }),
});

export const { useAutocompleteProductsQuery, useAddPartMutation } = partsAPI;
