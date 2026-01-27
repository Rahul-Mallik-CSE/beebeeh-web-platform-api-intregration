/** @format */

import baseApi from "../../api/baseAPI";

export interface AddProductRequest {
  model_name: string;
  alias: string;
  frequency_domestic_month: number;
  frequency_commercial_month: number;
  parts_quantity: number;
  stock_quantity: number;
  maintenance_frequency_month: number;
  is_active: boolean;
}

export interface AddProductResponse {
  success: boolean;
  message: string;
  data: any;
  requestId: string;
}

const productsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
      query: (productData) => ({
        url: `/api/products/`,
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const { useAddProductMutation } = productsAPI;
