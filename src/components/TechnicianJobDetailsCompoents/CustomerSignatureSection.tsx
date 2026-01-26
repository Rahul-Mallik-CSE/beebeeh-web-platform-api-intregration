/** @format */
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { CustomerSignatureSection as SignatureData } from "@/types/JobDetailsTypes";
import { format } from "date-fns";
import { getImageFullUrl } from "@/lib/utils";

interface CustomerSignatureSectionProps {
  signatureData: SignatureData;
  clientName: string;
  jobId: string;
  jobStatus?: string;
}

const CustomerSignatureSection = ({
  signatureData,
  clientName,
  jobId,
  jobStatus,
}: CustomerSignatureSectionProps) => {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);

  // Check if signature collection should be enabled (only when job is in progress)
  const isSignatureEnabled =
    jobStatus === "in_progress" || jobStatus === "In Progress";

  // Initialize signature from API data
  useEffect(() => {
    if (signatureData.signature_media?.file) {
      setSignatureImage(getImageFullUrl(signatureData.signature_media.file));
    }
  }, [signatureData]);

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy, h:mm a");
    } catch {
      return dateString;
    }
  };

  const handleCollectClick = () => {
    setShowCanvas(true);
  };

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  const handleSave = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL();
      setSignatureImage(dataURL);
      setShowCanvas(false);
    }
  };

  const handleCancel = () => {
    setShowCanvas(false);
  };

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Customer Signature Section:
      </h3>
      <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left side - Client info */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between py-1.5 sm:py-2">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Client Name :
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">{clientName}</p>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Signature time :
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {formatDateTime(signatureData.signature_time)}
              </p>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Signature Status :
              </p>
              <p
                className={`font-medium text-xs sm:text-sm capitalize ${
                  signatureData.signature_status === "complete" ||
                  signatureImage
                    ? "text-teal-500"
                    : "text-red-500"
                }`}
              >
                {signatureData.signature_status === "complete" || signatureImage
                  ? "Complete"
                  : "Pending"}
              </p>
            </div>
          </div>

          {/* Right side - Signature area and button */}
          <div className="space-y-3 sm:space-y-4">
            {!showCanvas ? (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-16 flex items-center justify-center">
                  {signatureImage ? (
                    <Image
                      src={signatureImage}
                      alt="Customer signature"
                      width={200}
                      height={64}
                      className="max-h-full max-w-full object-contain"
                      unoptimized
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">Signature area</p>
                  )}
                </div>
                <div className="border border-black w-full"></div>
                <Button
                  onClick={handleCollectClick}
                  className="w-full bg-[#5C3D2E] hover:bg-[#4A2F22] text-white rounded-lg"
                  disabled={!isSignatureEnabled}
                >
                  Collect
                </Button>
              </>
            ) : (
              <>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{
                      className: "w-full h-16 sm:h-24",
                    }}
                    backgroundColor="white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-[#5C3D2E] hover:bg-[#4A2F22] text-white"
                  >
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignatureSection;
