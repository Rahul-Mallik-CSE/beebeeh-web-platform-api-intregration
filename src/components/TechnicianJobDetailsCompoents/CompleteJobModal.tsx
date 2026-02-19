/** @format */
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCompleteJobMutation,
  useSendInvoiceMutation,
  useUploadMediaMutation,
} from "@/redux/features/technicianFeatures/jobDetailsAPI";
import { toast } from "react-toastify";

interface CompleteJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobStatus?: string;
}

type PaymentType = "cash_sale" | "invoice" | "";
type CashMethod = "cash" | "cheque" | "revolut" | "card" | "";

const CompleteJobModal = ({
  open,
  onOpenChange,
  jobId,
  jobStatus,
}: CompleteJobModalProps) => {
  const [technicianCharge, setTechnicianCharge] = useState("");
  const [paymentType, setPaymentType] = useState<PaymentType>("");
  const [cashSaleMethod, setCashSaleMethod] = useState<CashMethod>("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceSent, setInvoiceSent] = useState(false);

  const [completeJob, { isLoading: isCompleting }] = useCompleteJobMutation();
  const [sendInvoice, { isLoading: isSendingInvoice }] =
    useSendInvoiceMutation();
  const [uploadMedia, { isLoading: isUploadingMedia }] =
    useUploadMediaMutation();

  const resetForm = () => {
    setTechnicianCharge("");
    setPaymentType("");
    setCashSaleMethod("");
    setInvoiceNumber("");
    setInvoiceSent(false);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetForm();
    }
    onOpenChange(value);
  };

  // Handle "Send Invoice" button (invoice flow)
  const handleSendInvoice = async () => {
    if (!technicianCharge) {
      toast.error("Please enter the technician charge.");
      return;
    }

    try {
      await sendInvoice({
        jobId,
        body: {
          technician_charge: technicianCharge,
          payment_type: "invoice",
        },
      }).unwrap();
      setInvoiceSent(true);
      toast.success("Invoice sent successfully!");
    } catch (error) {
      console.error("Failed to send invoice:", error);
      const apiMessage = (error as { data?: { message?: string } })?.data
        ?.message;
      if (apiMessage === "quickbooks_invoice_failed") {
        toast.error(
          "QuickBooks integration failed. Please ask the admin to reconnect QuickBooks and try again.",
        );
      } else {
        toast.error("Failed to send invoice. Please try again.");
      }
    }
  };

  // Upload media (signature + before/after images) via /media/ endpoint
  const handleUploadMedia = async (): Promise<boolean> => {
    const getImageValidation = (
      window as unknown as {
        getImageValidation?: () => { hasBefore: boolean; hasAfter: boolean };
      }
    ).getImageValidation;
    const getSignatureValidation = (
      window as unknown as { getSignatureValidation?: () => boolean }
    ).getSignatureValidation;
    const getUploadedImages = (
      window as unknown as {
        getUploadedImages?: () => { beforeFiles: File[]; afterFiles: File[] };
      }
    ).getUploadedImages;
    const getSignatureBlob = (
      window as unknown as { getSignatureBlob?: () => Blob | null }
    ).getSignatureBlob;

    // Validate images and signature exist
    if (!getImageValidation || !getSignatureValidation) {
      toast.error(
        "Validation functions not available. Please refresh the page.",
      );
      return false;
    }

    const { hasBefore, hasAfter } = getImageValidation();
    const hasSig = getSignatureValidation();

    if (!hasBefore || !hasAfter || !hasSig) {
      toast.error(
        "Please upload signature, before image, and after image to complete the job.",
      );
      return false;
    }

    if (!getUploadedImages || !getSignatureBlob) {
      toast.error("Failed to retrieve uploaded media. Please try again.");
      return false;
    }

    const { beforeFiles, afterFiles } = getUploadedImages();
    const signatureBlob = getSignatureBlob();

    if (!beforeFiles?.[0] || !afterFiles?.[0] || !signatureBlob) {
      toast.error(
        "Please ensure all images and signature are properly captured.",
      );
      return false;
    }

    // Build FormData matching the API format:
    // kind: "signature", file: <signature>
    // kind: "before",    file: <before image>
    // kind: "after",     file: <after image>
    const formData = new FormData();
    formData.append("kind", "signature");
    formData.append("file", signatureBlob, "signature.jpg");
    formData.append("kind", "before");
    formData.append("file", beforeFiles[0]);
    formData.append("kind", "after");
    formData.append("file", afterFiles[0]);

    try {
      await uploadMedia({ jobId, formData }).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to upload media:", error);
      toast.error("Failed to upload images/signature. Please try again.");
      return false;
    }
  };

  // Handle "Complete" button
  const handleComplete = async () => {
    // Invoice required flow: validate invoice → complete job (server validates invoice) → upload media
    if (jobStatus === "invoice_required") {
      // Step 1: Validate invoice number
      if (!invoiceNumber) {
        toast.error("Please enter the invoice number.");
        return;
      }

      // Step 2: Complete job — server validates the invoice number
      try {
        await completeJob({
          jobId,
          body: {
            invoice_number: invoiceNumber,
          },
        }).unwrap();
      } catch (error) {
        console.error("Failed to complete job:", error);
        const apiMessage = (error as { data?: { message?: string } })?.data
          ?.message;
        if (apiMessage === "quickbooks_invoice_failed") {
          toast.error(
            "QuickBooks integration failed. Please ask the admin to reconnect QuickBooks and try again.",
          );
        } else {
          toast.error(
            "Invalid invoice number. Please take the invoice number from admin.",
          );
        }
        return;
      }

      // Step 3: Upload images + signature after invoice is validated
      const getUploadedImages = (
        window as unknown as {
          getUploadedImages?: () => { beforeFiles: File[]; afterFiles: File[] };
        }
      ).getUploadedImages;
      const getSignatureBlob = (
        window as unknown as { getSignatureBlob?: () => Blob | null }
      ).getSignatureBlob;

      if (getUploadedImages && getSignatureBlob) {
        const { beforeFiles, afterFiles } = getUploadedImages();
        const signatureBlob = getSignatureBlob();

        if (beforeFiles?.[0] && afterFiles?.[0] && signatureBlob) {
          const formData = new FormData();
          formData.append("kind", "signature");
          formData.append("file", signatureBlob, "signature.jpg");
          formData.append("kind", "before");
          formData.append("file", beforeFiles[0]);
          formData.append("kind", "after");
          formData.append("file", afterFiles[0]);

          try {
            await uploadMedia({ jobId, formData }).unwrap();
          } catch (error) {
            console.error("Failed to upload media:", error);
            toast.warning(
              "Job completed but failed to upload images/signature. Please contact support.",
            );
          }
        }
      }

      toast.success("Job completed successfully!");
      handleOpenChange(false);
      return;
    }

    if (!technicianCharge) {
      toast.error("Please enter the technician charge.");
      return;
    }

    if (!paymentType) {
      toast.error("Please select a payment type.");
      return;
    }

    // Cash sale flow
    if (paymentType === "cash_sale") {
      if (!cashSaleMethod) {
        toast.error("Please select a cash sale method.");
        return;
      }

      // Upload media first
      const mediaUploaded = await handleUploadMedia();
      if (!mediaUploaded) return;

      try {
        await completeJob({
          jobId,
          body: {
            technician_charge: technicianCharge,
            payment_type: "cash_sale",
            cash_sale_method: cashSaleMethod,
          },
        }).unwrap();
        toast.success("Job completed successfully!");
        handleOpenChange(false);
      } catch (error) {
        console.error("Failed to complete job:", error);
        toast.error("Failed to complete job. Please try again.");
      }
      return;
    }

    // Invoice flow - send invoice was already called, now complete with invoice number
    if (paymentType === "invoice") {
      if (!invoiceNumber) {
        toast.error("Please send the invoice and get the number from admin.");
        return;
      }

      // Upload media first
      const mediaUploaded = await handleUploadMedia();
      if (!mediaUploaded) return;

      try {
        await completeJob({
          jobId,
          body: {
            invoice_number: invoiceNumber,
          },
        }).unwrap();
        toast.success("Job completed successfully!");
        handleOpenChange(false);
      } catch (error) {
        console.error("Failed to complete job:", error);
        toast.error("Failed to complete job. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Complete the Job
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Invoice Required flow - only show invoice number */}
          {jobStatus === "invoice_required" ? (
            <div className="space-y-2">
              <Label htmlFor="invoice_number">Invoice Number</Label>
              <Input
                id="invoice_number"
                type="text"
                placeholder="Enter invoice number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
          ) : (
            <>
              {/* Technician Charge */}
              <div className="space-y-2">
                <Label htmlFor="technician_charge">Technician Charge</Label>
                <Input
                  id="technician_charge"
                  type="number"
                  placeholder="Enter charge amount"
                  value={technicianCharge}
                  onChange={(e) => setTechnicianCharge(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Payment Type */}
              <div className="space-y-2">
                <Label>Payment Type</Label>
                <Select
                  value={paymentType}
                  onValueChange={(value: PaymentType) => {
                    setPaymentType(value);
                    setCashSaleMethod("");
                    setInvoiceNumber("");
                    setInvoiceSent(false);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash_sale">Cash Sale</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Cash Sale Method (shown when cash_sale is selected) */}
              {paymentType === "cash_sale" && (
                <div className="space-y-2">
                  <Label>Cash Sale Method</Label>
                  <Select
                    value={cashSaleMethod}
                    onValueChange={(value: CashMethod) =>
                      setCashSaleMethod(value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select cash method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="revolut">Revolut</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Invoice flow (shown when invoice is selected) */}
              {paymentType === "invoice" && (
                <div className="space-y-3">
                  {/* Send Invoice Button */}
                  <Button
                    onClick={handleSendInvoice}
                    disabled={
                      isSendingInvoice || !technicianCharge || invoiceSent
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSendingInvoice
                      ? "Sending..."
                      : invoiceSent
                        ? "Invoice Sent"
                        : "Send Invoice"}
                  </Button>

                  {/* Invoice Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="invoice_number">Invoice Number</Label>
                    <Input
                      id="invoice_number"
                      type="text"
                      placeholder="Enter invoice number"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleComplete}
            disabled={isCompleting || isUploadingMedia}
            className="bg-red-800 hover:bg-red-700 text-white"
          >
            {isUploadingMedia
              ? "Uploading Media..."
              : isCompleting
                ? "Completing..."
                : "Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteJobModal;
