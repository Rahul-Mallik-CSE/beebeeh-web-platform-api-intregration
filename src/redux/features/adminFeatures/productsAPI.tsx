/** @format */

import baseApi from "../../api/baseAPI";

// ============= Types =============

export interface ProductListItem {
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

export interface ChecklistItem {
  step: number;
  task: string;
}

export interface FrequentlyUsedPart {
  part_id: string;
  part_name: string;
  unit: string;
  used_stock: number;
}

export interface RelatedJob {
  job_id: string;
  type: string;
  client: string;
  technician: string;
  order_by_date: string;
  status: string;
  object_id: string;
}

export interface PartInventoryStatus {
  part_id: string;
  part_name: string;
  available_units: number;
  status: string;
}

export interface ProductDetailData {
  product_id: string;
  model_name: string;
  alias: string;
  frequency_domestic_month: number;
  frequency_commercial_month: number;
  parts_quantity: number;
  stock_quantity: number;
  maintenance_frequency_month: number;
  installation_checklist: ChecklistItem[];
  maintenance_checklist: ChecklistItem[];
  all_parts_inventory_status: PartInventoryStatus[];
  frequently_used_parts: FrequentlyUsedPart[];
  related_jobs: RelatedJob[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface GetProductsResponse {
  success: boolean;
  message: string;
  meta: PaginationMeta;
  data: ProductListItem[];
  requestId: string;
}

export interface GetProductDetailResponse {
  success: boolean;
  message: string;
  data: ProductDetailData;
  requestId: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  product_id?: string;
  model_name?: string;
  alias?: string;
  frequency_domestic_month?: number;
  frequency_commercial_month?: number;
  parts_quantity?: number;
  stock_quantity?: number;
  maintenance_frequency_month?: number;
  order_dir?: "asc" | "desc";
}

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

export interface DeleteProductResponse {
  success: boolean;
  message: string;
  requestId: string;
}

// ============= API Endpoints =============

const productsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with pagination and filters
    getProducts: builder.query<GetProductsResponse, ProductQueryParams | void>({
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
          url: `/api/products/${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    // Get product by ID
    getProductById: builder.query<GetProductDetailResponse, string>({
      query: (productId) => ({
        url: `/api/products/${productId}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Add product
    addProduct: builder.mutation<AddProductResponse, AddProductRequest>({
      query: (productData) => ({
        url: `/api/products/`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete product
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `/api/products/${productId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Add installation checklist task
    addInstallationChecklist: builder.mutation<
      GetProductDetailResponse,
      { productId: string; task: string }
    >({
      query: ({ productId, task }) => ({
        url: `/api/products/${productId}/checklists/installation/`,
        method: "POST",
        body: { task },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),

    // Add maintenance checklist task
    addMaintenanceChecklist: builder.mutation<
      GetProductDetailResponse,
      { productId: string; task: string }
    >({
      query: ({ productId, task }) => ({
        url: `/api/products/${productId}/checklists/maintenance/`,
        method: "POST",
        body: { task },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useAddInstallationChecklistMutation,
  useAddMaintenanceChecklistMutation,
} = productsAPI;

export default productsAPI;
