/** @format */

import baseApi from "../../api/baseAPI";

export interface PinLocation {
  latitude: string;
  longitude: string;
}

export interface HeaderSummary {
  job_id: string;
  job_type: string;
  scheduled_date: string;
  scheduled_time: string;
  priority: string;
  status: string;
}

export interface ClientInformation {
  client_id: string;
  client_name: string;
  contact_number: string;
  address: string;
  locality: string;
  notes: string;
  pin_location: PinLocation;
  location: string;
}

export interface TechnicianDetails {
  technician_id: string;
  technician_name: string;
  town: string;
  installed_date: string;
  last_service_date: string;
}

export interface ProductDetails {
  product_id: string;
  product_model_name: string;
  alias: string;
  installed_date: string;
  last_service_date: string;
}

export interface FrequentlyUsedPart {
  part_id: string;
  part_name: string;
  stock_required: number;
}

export interface ChecklistItem {
  step: number;
  part_code: string;
  task: string;
  status: string;
}

export interface ImageSection {
  before_images: string[];
  after_images: string[];
}

export interface CustomerSignature {
  client_name: string;
  signature_time: string;
  signature_status: string;
  signature_files: string[];
}

export interface JobDetailsData {
  type: string;
  object_id: string;
  header_summary: HeaderSummary;
  client_information: ClientInformation;
  technician_details: TechnicianDetails;
  product_details: ProductDetails;
  frequently_used_parts: FrequentlyUsedPart[];
  checklist_section: ChecklistItem[];
  image_section: ImageSection;
  customer_signature: CustomerSignature;
}

export interface JobDetailsResponse {
  success: boolean;
  message: string;
  data: JobDetailsData;
  requestId: string | null;
}

export interface JobDetailsQueryParams {
  job_id: string;
}

const jobDetailsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetails: builder.query<JobDetailsResponse, JobDetailsQueryParams>({
      query: (params) => ({
        url: `/api/admin/job-details/?job_id=${params.job_id}`,
        method: "GET",
      }),
      providesTags: ["JobDetails"],
    }),
    cancelJob: builder.mutation({
      query: (job_id: string) => ({
        url: `/api/admin/job-cancel/?job_id=${job_id}`,
        method: "POST",
      }),
      invalidatesTags: ["JobDetails"],
    }),
    rescheduleJob: builder.mutation({
      query: ({
        job_id,
        scheduled_date,
        scheduled_time,
      }: {
        job_id: string;
        scheduled_date: string;
        scheduled_time: string;
      }) => ({
        url: `/api/admin/job-reschedule/?job_id=${job_id}`,
        method: "POST",
        body: { scheduled_date, scheduled_time },
      }),
      invalidatesTags: ["JobDetails"],
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useCancelJobMutation,
  useRescheduleJobMutation,
} = jobDetailsAPI;
