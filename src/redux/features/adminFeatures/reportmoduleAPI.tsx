/** @format */

import baseApi from "../../api/baseAPI";

export interface ReportModuleRequest {
  show: "this_month" | "last_month" | "this_year";
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
    parts_used: number;
    parts_used_value: number;
    total_installations: number;
    total_repairs: number;
    total_maintenance: number;
  };
}

export interface WeeklyJobActivity {
  date: string;
  installation: number;
  repair: number;
  maintenance: number;
}

export interface JobDistribution {
  installation: number;
  repair: number;
  maintenance: number;
}

export interface TechnicianPerformance {
  technician: string;
  complete: number;
  avg_time: string;
  rating: number;
}

export interface PartsUsage {
  parts_name: string;
  used_qty: number;
  jobs: number;
  total_value: number;
}

export interface ProductStockLevel {
  product_name: string;
  product_id: string;
  available_units: number;
  status: string;
  last_stock: string | null;
}

export interface PartsStockLevel {
  part_name: string;
  part_id: string;
  available_units: number;
  status: string;
  last_stock: string | null;
}

export interface ConsumablesUsage {
  technician: string;
  consumable_category: string;
  total_qty: number;
  total_value: number;
}

export interface DailyPartsUsage {
  date: string;
  part_name: string;
  part_id: string;
  used_qty: number;
}

export interface ReportModuleData {
  show: string;
  range: {
    start_date: string;
    end_date: string;
  };
  header_summary: HeaderSummary;
  weekly_jobs_activity: WeeklyJobActivity[];
  job_distribution: JobDistribution;
  technician_performance_table: TechnicianPerformance[];
  parts_usage_table: PartsUsage[];
  product_stock_levels_table: ProductStockLevel[];
  parts_stock_levels_table: PartsStockLevel[];
  consumables_usage_report: ConsumablesUsage[];
  daily_parts_usage_report: DailyPartsUsage[];
}

export interface ReportModuleResponse {
  success: boolean;
  message: string;
  data: ReportModuleData;
  requestId: string | null;
}

const reportmoduleAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportModule: builder.query<ReportModuleResponse, ReportModuleRequest>({
      query: ({ show }) => ({
        url: `/api/report-module/`,
        method: "GET",
        params: { show },
      }),
      providesTags: ["ReportModule"],
    }),
  }),
});

export const { useGetReportModuleQuery } = reportmoduleAPI;
