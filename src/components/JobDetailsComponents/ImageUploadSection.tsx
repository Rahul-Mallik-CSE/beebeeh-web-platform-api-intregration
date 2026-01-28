/** @format */
"use client";
import React, { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { getImageFullUrl } from "@/lib/utils";
import { ImageSection } from "@/redux/features/adminFeatures/jobDetailsAPI";

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  preview?: string;
}

interface UploadAreaProps {
  type: "before" | "after";
  images: UploadedFile[];
  onFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    type: "before" | "after",
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemove: (id: number, type: "before" | "after") => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  type,
  images,
  onFileUpload,
  onDrop,
  onDragOver,
  onRemove,
}) => (
  <div className="space-y-3 sm:space-y-4 min-h-[280px] sm:min-h-[326px]">
    <p className="text-sm sm:text-base font-bold text-gray-800">
      {type === "before" ? "Before Image" : "After Image"}
    </p>
    <div
      className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center hover:border-blue-400 transition-colors cursor-pointer"
      onDrop={(e) => onDrop(e, type)}
      onDragOver={onDragOver}
      onClick={() => document.getElementById(`file-${type}`)?.click()}
    >
      <CloudUpload className="w-10 h-12 sm:w-12 sm:h-14 text-blue-500 mb-2 sm:mb-3" />
      <p className="text-sm sm:text-base text-gray-700 text-center">
        Drag your file(s) or{" "}
        <span className="text-blue-600 font-medium">browse</span>
      </p>
      <p className="text-xs sm:text-base text-gray-400 mt-1 sm:mt-2">
        Max 10 MB files are allowed
      </p>
      <input
        id={`file-${type}`}
        type="file"
        accept=".jpg,.png,.svg"
        className="hidden"
        onChange={(e) => onFileUpload(e, type)}
      />
    </div>

    {images.length > 0 && (
      <div className="space-y-2">
        {images.map((file) => (
          <div
            key={file.id}
            className="border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3 bg-white"
          >
            {file.preview && (
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={file.preview}
                  alt="preview"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                {file.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400">
                {file.size}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id, type);
              }}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shrink-0"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ImageUploadSection = ({
  data,
  isLoading,
}: {
  data?: ImageSection;
  isLoading?: boolean;
}) => {
  const [beforeImages, setBeforeImages] = useState<UploadedFile[]>([]);
  const [afterImages, setAfterImages] = useState<UploadedFile[]>([]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile: UploadedFile = {
          id: Date.now(),
          name: file.name,
          size: `${Math.round(file.size / 1024)}kb`,
          preview: event.target?.result as string,
        };

        // Replace the existing image with the new one
        if (type === "before") {
          setBeforeImages([newFile]);
        } else {
          setAfterImages([newFile]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: "before" | "after",
  ) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0]; // Only take the first file
      const reader = new FileReader();
      reader.onload = (event) => {
        const newFile: UploadedFile = {
          id: Date.now(),
          name: file.name,
          size: `${Math.round(file.size / 1024)}kb`,
          preview: event.target?.result as string,
        };

        // Replace the existing image with the new one
        if (type === "before") {
          setBeforeImages([newFile]);
        } else {
          setAfterImages([newFile]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (id: number, type: "before" | "after") => {
    if (type === "before") {
      setBeforeImages(beforeImages.filter((file) => file.id !== id));
    } else {
      setAfterImages(afterImages.filter((file) => file.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
          Image Upload Section:
        </h3>
        <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
        Image Upload Section:
      </h3>
      <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before Images */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-medium text-gray-700">
              Before Images:
            </h4>
            <div className="space-y-2">
              {data?.before_images && data.before_images.length > 0 ? (
                data.before_images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={getImageFullUrl(imageUrl)}
                      alt="Before work"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No before images</p>
                </div>
              )}
            </div>
          </div>

          {/* After Images */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-medium text-gray-700">
              After Images:
            </h4>
            <div className="space-y-2">
              {data?.after_images && data.after_images.length > 0 ? (
                data.after_images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={getImageFullUrl(imageUrl)}
                      alt="After work"
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No after images</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
