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
import { getJobStatusHexColor } from "@/lib/statusUtils";

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
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#666",
    borderTop: "1 solid #ccc",
    paddingTop: 5,
    marginHorizontal: 30,
  },
  noImageBox: {
    width: "100%",
    height: 180,
    border: "1 solid #ccc",
    borderRadius: 4,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#9ca3af",
  },
});

interface PrefetchedImages {
  beforeImage?: string;
  afterImage?: string;
  signatureImage?: string;
}

interface TechnicianJobDetailsPDFProps {
  jobData: any;
  jobId: string;
  prefetchedImages?: PrefetchedImages;
}

const TechnicianJobDetailsPDF: React.FC<TechnicianJobDetailsPDFProps> = ({
  jobData,
  jobId,
  prefetchedImages = {},
}) => {
  const currentDate = new Date().toLocaleDateString();
  const summary = jobData?.header_summary_card;
  const clientInfo = jobData?.client_information_section;
  const productInfo = jobData?.product_details_section;
  const parts = jobData?.frequently_used_parts;
  const checklist = jobData?.checklist_section;
  const imageUpload = jobData?.image_upload_section;
  const signature = jobData?.customer_signature_section;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <Text style={styles.title}>Job Details Report</Text>
          <View style={styles.jobIdRow}>
            <Text>Job ID: {jobId}</Text>
            <Text
              style={{
                color: getJobStatusHexColor(summary?.status),
                fontWeight: "bold",
              }}
            >
              Status: {summary?.status?.toUpperCase() || "N/A"}
            </Text>
          </View>
        </View>

        {/* Job Summary Section */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Job ID:</Text>
              <Text style={styles.value}>{summary.job_id || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Job Type:</Text>
              <Text style={styles.value}>{summary.job_type || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Priority:</Text>
              <Text style={styles.value}>{summary.priority || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{summary.status || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Product Model:</Text>
              <Text style={styles.value}>{summary.product_model || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Serial Number:</Text>
              <Text style={styles.value}>{summary.serial_number || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Client:</Text>
              <Text style={styles.value}>{summary.client_name || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.value}>
                {summary.client_location || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Scheduled Date/Time:</Text>
              <Text style={styles.value}>
                {summary.scheduled_datetime || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Client Information Section */}
        {clientInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Client Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{clientInfo.name || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Contact Number:</Text>
              <Text style={styles.value}>
                {clientInfo.contact_number || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{clientInfo.address || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Town:</Text>
              <Text style={styles.value}>{clientInfo.town || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Client Type:</Text>
              <Text style={styles.value}>
                {clientInfo.client_type || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Product Details Section */}
        {productInfo && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Model Name:</Text>
              <Text style={styles.value}>
                {productInfo.model_name || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Alias:</Text>
              <Text style={styles.value}>{productInfo.alias || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Installed Date:</Text>
              <Text style={styles.value}>
                {productInfo.installed_date || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Service Date:</Text>
              <Text style={styles.value}>
                {productInfo.last_service_date || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Frequently Used Parts Section */}
        {parts && parts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Used Parts</Text>
            {parts.map((part: any, index: number) => (
              <View key={index} style={styles.partsItem}>
                <Text style={{ width: "50%" }}>{part.part_name}</Text>
                <Text style={{ width: "25%", textAlign: "center" }}>
                  {part.unit || "N/A"}
                </Text>
                <Text style={{ width: "25%", textAlign: "right" }}>
                  Qty: {part.quantity_used ?? "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Checklist Section */}
        {checklist && checklist.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Checklist</Text>
            {checklist.map((item: any, index: number) => (
              <View key={index} style={styles.checklistItem}>
                <Text style={styles.checklistStep}>
                  Step {item.step ?? index + 1}:
                </Text>
                <Text style={styles.checklistTask}>{item.task}</Text>
                <Text style={styles.checklistStatus}>{item.status}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Image Section */}
        {imageUpload && (
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Images</Text>
            <View style={styles.imageRow}>
              {/* Before Image */}
              <View style={styles.imageContainer}>
                <Text style={styles.imageLabel}>Before Image</Text>
                {prefetchedImages.beforeImage ? (
                  <Image
                    src={prefetchedImages.beforeImage}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.noImageBox}>
                    <Text style={styles.noImageText}>No image</Text>
                  </View>
                )}
              </View>

              {/* After Image */}
              <View style={styles.imageContainer}>
                <Text style={styles.imageLabel}>After Image</Text>
                {prefetchedImages.afterImage ? (
                  <Image
                    src={prefetchedImages.afterImage}
                    style={styles.image}
                  />
                ) : (
                  <View style={styles.noImageBox}>
                    <Text style={styles.noImageText}>No image</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Customer Signature Section */}
        {signature && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Signature</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Client Name:</Text>
              <Text style={styles.value}>{clientInfo?.name || "N/A"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Signature Time:</Text>
              <Text style={styles.value}>
                {signature.signature_time || "N/A"}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Signature Status:</Text>
              <Text style={styles.value}>
                {signature.signature_status || "N/A"}
              </Text>
            </View>
            {prefetchedImages.signatureImage && (
              <View style={styles.signatureContainer}>
                <Text style={styles.imageLabel}>Signature:</Text>
                <Image
                  src={prefetchedImages.signatureImage}
                  style={styles.signatureImage}
                />
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Generated on ${currentDate} | Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default TechnicianJobDetailsPDF;
