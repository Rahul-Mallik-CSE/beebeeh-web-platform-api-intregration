/** @format */

import baseApi from "../../api/baseAPI";

export interface TrendData {
  current: number;
  previous: number;
  percent: number;
  direction: "up" | "down";
  period: string;
}

export interface HeaderCard {
  value: number;
  trend: TrendData;
}

export interface HeaderCards {
  total_service: HeaderCard;
  total_client: HeaderCard;
  total_technician: HeaderCard;
  active_service: HeaderCard;
}

export interface OverviewJobItem {
  job_id: string;
  type: string;
  client: string;
  technician: string;
  order_by_date: string;
  status: string;
  object_id: string;
}

export interface OverviewMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface HeaderSummary {
  parts_used: {
    total: number;
    total_value: number;
  };
  total_installations: number;
  total_repairs: number;
  total_maintenance: number;
  percentage: {
    installation: number;
    repair: number;
    maintenance: number;
  };
}

export interface ConsumablesUsage {
  technician: string;
  consumable_category: string;
  total_qty: number;
  total_value: number;
}

export interface OverviewData {
  header_cards: HeaderCards;
  recent_jobs: any;
  meta: OverviewMeta;
  data: OverviewJobItem[];
  header_summary: HeaderSummary;
  avg_time: string;
  product_stock_levels_table: any[];
  consumables_usage_report: ConsumablesUsage[];
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
  requestId: string | null;
}

export interface OverviewQueryParams {
  page?: number;
  limit?: number;
  client?: string;
  type?: string;
  technician?: string;
  order_dir?: "asc" | "desc";
  job_id?: string;
  status?: string;
}

const overViewAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, OverviewQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.client) queryParams.append("client", params.client);
        if (params.type) queryParams.append("type", params.type);
        if (params.technician)
          queryParams.append("technician", params.technician);
        if (params.order_dir) queryParams.append("order_dir", params.order_dir);
        if (params.job_id) queryParams.append("job_id", params.job_id);
        if (params.status) queryParams.append("status", params.status);

        return {
          url: `/api/admin/overview/?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Overview"],
    }),
  }),
});

export const { useGetOverviewQuery } = overViewAPI;
