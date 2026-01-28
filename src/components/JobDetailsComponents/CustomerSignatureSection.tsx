/** @format */
"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { getImageFullUrl } from "@/lib/utils";

interface CustomerSignature {
  client_name: string;
  signature_time: string;
  signature_status: string;
  signature_files: string[];
}

interface CustomerSignatureSectionProps {
  data?: CustomerSignature;
  isLoading?: boolean;
}

const CustomerSignatureSection = ({
  data,
  isLoading,
}: CustomerSignatureSectionProps) => {
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const sigCanvas = useRef<SignatureCanvas>(null);

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

  if (isLoading) {
    return (
      <div className="bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          Customer Signature Section:
        </h3>
        <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-1.5 sm:py-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
              <div className="flex items-center justify-between py-1.5 sm:py-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
              <div className="flex items-center justify-between py-1.5 sm:py-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-16 bg-gray-100 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-500 text-xs sm:text-sm">
                {data?.client_name || "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Signature time :
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {data?.signature_time
                  ? new Date(data.signature_time).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div className="flex items-center justify-between py-1.5 sm:py-2">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Signature Status :
              </p>
              <p
                className={`font-medium text-xs sm:text-sm ${
                  data?.signature_status === "complete"
                    ? "text-teal-500"
                    : "text-red-500"
                }`}
              >
                {data?.signature_status === "complete"
                  ? "Complete"
                  : "Incomplete"}
              </p>
            </div>
          </div>

          {/* Right side - Signature area and button */}
          <div className="space-y-3 sm:space-y-4">
            {!showCanvas ? (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-16 flex items-center justify-center">
                  {data?.signature_files && data.signature_files.length > 0 ? (
                    <Image
                      src={getImageFullUrl(data.signature_files[0])}
                      alt="Customer signature"
                      width={200}
                      height={64}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : signatureImage ? (
                    <Image
                      src={signatureImage}
                      alt="Customer signature"
                      width={200}
                      height={64}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-400 text-sm">Signature area</p>
                  )}
                </div>
                <div className="border border-black w-full"></div>
                <Button
                  onClick={handleCollectClick}
                  className="w-full bg-[#5C3D2E] hover:bg-[#4A2F22] text-white rounded-lg"
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
