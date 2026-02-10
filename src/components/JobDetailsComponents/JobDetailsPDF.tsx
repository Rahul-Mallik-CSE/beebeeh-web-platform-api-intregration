/** @format */

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { getImageFullUrl } from "@/lib/utils";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2 solid #333",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  jobIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    borderBottom: "1 solid #ccc",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingVertical: 2,
  },
  label: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#555",
    width: "40%",
  },
  value: {
    fontSize: 10,
    color: "#333",
    width: "60%",
    textAlign: "right",
  },
  checklistItem: {
    flexDirection: "row",
    marginBottom: 4,
    paddingVertical: 2,
  },
  checklistStep: {
    width: 40,
    fontWeight: "bold",
  },
  checklistTask: {
    flex: 1,
    marginRight: 10,
  },
  checklistStatus: {
    width: 80,
    textAlign: "right",
    textTransform: "capitalize",
  },
  partsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingVertical: 2,
  },
  imageSection: {
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  imageContainer: {
    width: "48%",
  },
  imageLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "contain",
    border: "1 solid #ccc",
    borderRadius: 4,
  },
  signatureContainer: {
    marginTop: 10,
  },
  signatureImage: {
    width: 200,
    height: 80,
    objectFit: "contain",
    border: "1 solid #ccc",
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#666",
    borderTop: "1 solid #ccc",
    paddingTop: 5,
  },
  statusBadge: {
    padding: "4 8",
    borderRadius: 4,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
    marginBottom: 10,
  },
});

interface JobDetailsPDFProps {
  jobData: any;
  jobId: string;
}

const JobDetailsPDF: React.FC<JobDetailsPDFProps> = ({ jobData, jobId }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "complete":
      case "completed":
        return "#10b981";
      case "in_progress":
        return "#3b82f6";
      case "assign":
      case "pending":
        return "#eab308";
      case "cancel":
      case "cancelled":
        return "#ef4444";
      case "rescheduled":
        return "#f97316";
      default:
        return "#6b7280";
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      {/* Page 1 - Job Summary, Client, Technician, Product */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Job Details Report</Text>
          <View style={styles.jobIdRow}>
            <Text>Job ID: {jobId}</Text>
            <Text
              style={{
                color: getStatusColor(jobData?.header_summary?.status),
                fontWeight: "bold",
              }}
            >
              Status: {jobData?.header_summary?.status?.toUpperCase() || "N/A"}
            </Text>
          </View>
        </View>

        {/* Job Summary Section */}
        {jobData?.header_summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Job ID:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.job_id || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Job Type:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.job_type || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Priority:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.priority || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.status || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Scheduled Date:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.scheduled_date || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Scheduled Time:</Text>
              <Text style={styles.value}>
                {jobData.header_summary.scheduled_time || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Client Information Section */}
        {jobData?.client_information && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Client ID:</Text>
              <Text style={styles.value}>
                {jobData.client_information.client_id || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {jobData.client_information.client_name || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Contact Number:</Text>
              <Text style={styles.value}>
                {jobData.client_information.contact_number || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {jobData.client_information.address || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Locality:</Text>
              <Text style={styles.value}>
                {jobData.client_information.locality || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>
                {jobData.client_information.notes || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Problem Type:</Text>
              <Text style={styles.value}>
                {jobData.client_information.problem_type || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Technician Details Section */}
        {jobData?.technician_details && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technician Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Technician ID:</Text>
              <Text style={styles.value}>
                {jobData.technician_details.technician_id || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {jobData.technician_details.technician_name || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Town:</Text>
              <Text style={styles.value}>
                {jobData.technician_details.town || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Installed Date:</Text>
              <Text style={styles.value}>
                {jobData.technician_details.installed_date || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Service Date:</Text>
              <Text style={styles.value}>
                {jobData.technician_details.last_service_date || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Product Details Section */}
        {jobData?.product_details && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Product ID:</Text>
              <Text style={styles.value}>
                {jobData.product_details.product_id || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Product Model:</Text>
              <Text style={styles.value}>
                {jobData.product_details.product_model_name || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Alias:</Text>
              <Text style={styles.value}>
                {jobData.product_details.alias || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Installation Date:</Text>
              <Text style={styles.value}>
                {jobData.product_details.installed_date || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Service Date:</Text>
              <Text style={styles.value}>
                {jobData.product_details.last_service_date || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated on {currentDate}</Text>
          <Text>Page 1</Text>
        </View>
      </Page>

      {/* Page 2 - Checklist and Parts */}
      <Page size="A4" style={styles.page}>
        {/* Frequently Used Parts Section */}
        {jobData?.frequently_used_parts &&
          jobData.frequently_used_parts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Frequently Used Parts</Text>
              {jobData.frequently_used_parts.map((part: any, index: number) => (
                <View key={index} style={styles.partsItem}>
                  <Text style={{ width: "50%" }}>{part.part_name}</Text>
                  <Text style={{ width: "25%", textAlign: "center" }}>
                    {part.unit || "N/A"}
                  </Text>
                  <Text style={{ width: "25%", textAlign: "right" }}>
                    Stock: {part.stock_required || "N/A"}
                  </Text>
                </View>
              ))}
            </View>
          )}

        {/* Checklist Section */}
        {jobData?.checklist_section && jobData.checklist_section.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Checklist</Text>
            {jobData.checklist_section.map((item: any, index: number) => (
              <View key={index} style={styles.checklistItem}>
                <Text style={styles.checklistStep}>Step {item.step}:</Text>
                <Text style={styles.checklistTask}>{item.task}</Text>
                <Text style={styles.checklistStatus}>
                  {item.status}
                  {item.part_code ? ` (${item.part_code})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Generated on {currentDate}</Text>
          <Text>Page 2</Text>
        </View>
      </Page>

      {/* Page 3 - Images and Signature */}
      {((jobData?.image_section?.before_images &&
        jobData.image_section.before_images.length > 0) ||
        (jobData?.image_section?.after_images &&
          jobData.image_section.after_images.length > 0) ||
        (jobData?.customer_signature?.signature_files &&
          jobData.customer_signature.signature_files.length > 0)) && (
        <Page size="A4" style={styles.page}>
          {/* Image Section */}
          {jobData?.image_section && (
            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>Images</Text>
              <View style={styles.imageRow}>
                {/* Before Image */}
                <View style={styles.imageContainer}>
                  <Text style={styles.imageLabel}>Before Image</Text>
                  {jobData.image_section.before_images &&
                  jobData.image_section.before_images.length > 0 &&
                  jobData.image_section.before_images[0] ? (
                    <Image
                      src={getImageFullUrl(
                        jobData.image_section.before_images[0],
                      )}
                      style={styles.image}
                    />
                  ) : (
                    <View
                      style={{
                        ...styles.image,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text style={{ color: "#9ca3af" }}>No image</Text>
                    </View>
                  )}
                </View>

                {/* After Image */}
                <View style={styles.imageContainer}>
                  <Text style={styles.imageLabel}>After Image</Text>
                  {jobData.image_section.after_images &&
                  jobData.image_section.after_images.length > 0 &&
                  jobData.image_section.after_images[0] ? (
                    <Image
                      src={getImageFullUrl(
                        jobData.image_section.after_images[0],
                      )}
                      style={styles.image}
                    />
                  ) : (
                    <View
                      style={{
                        ...styles.image,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text style={{ color: "#9ca3af" }}>No image</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}

          {/* Customer Signature Section */}
          {jobData?.customer_signature && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Signature</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Client Name:</Text>
                <Text style={styles.value}>
                  {jobData.customer_signature.client_name || "N/A"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Signature Time:</Text>
                <Text style={styles.value}>
                  {jobData.customer_signature.signature_time || "N/A"}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Signature Status:</Text>
                <Text style={styles.value}>
                  {jobData.customer_signature.signature_status || "N/A"}
                </Text>
              </View>

              {/* Signature Image */}
              {jobData.customer_signature.signature_files &&
                jobData.customer_signature.signature_files.length > 0 &&
                jobData.customer_signature.signature_files[0] && (
                  <View style={styles.signatureContainer}>
                    <Text style={styles.imageLabel}>Signature:</Text>
                    <Image
                      src={getImageFullUrl(
                        jobData.customer_signature.signature_files[0],
                      )}
                      style={styles.signatureImage}
                    />
                  </View>
                )}
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text>Generated on {currentDate}</Text>
            <Text>Page 3</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

export default JobDetailsPDF;
