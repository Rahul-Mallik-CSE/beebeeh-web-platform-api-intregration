/** @format */
"use client";
import React, { useState, useEffect } from "react";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import { ImageUploadSection as ImageUploadData } from "@/types/JobDetailsTypes";
import { getImageFullUrl } from "@/lib/utils";

// Extend Window interface
declare global {
  interface Window {
    getUploadedImages?: () => { beforeFiles: File[]; afterFiles: File[] };
    getImageValidation?: () => { hasBefore: boolean; hasAfter: boolean };
  }
}

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
  isJobCompleted: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({
  type,
  images,
  onFileUpload,
  onDrop,
  onDragOver,
  onRemove,
  isJobCompleted,
}) => {
  // isJobCompleted is actually the inverse - true means upload is disabled
  const isUploadEnabled = !isJobCompleted;
  return (
    <div className="space-y-3 sm:space-y-4 min-h-[280px] sm:min-h-[326px]">
      <p className="text-sm sm:text-base font-bold text-gray-800">
        {type === "before" ? "Before Image" : "After Image"}
      </p>
      <div
        className={`border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center transition-colors ${
          isUploadEnabled ? "hover:border-blue-400 cursor-pointer" : ""
        }`}
        onDrop={isUploadEnabled ? (e) => onDrop(e, type) : undefined}
        onDragOver={isUploadEnabled ? onDragOver : undefined}
        onClick={
          isUploadEnabled
            ? () => document.getElementById(`file-${type}`)?.click()
            : undefined
        }
      >
        {images.length > 0 ? (
          <div className=" w-full">
            {images.map((file) => (
              <div
                key={file.id}
                className="relative border border-gray-200 rounded-lg bg-white overflow-hidden  p-2"
              >
                <div className="w-full h-48 sm:h-56 bg-gray-100 rounded flex items-center justify-center overflow-hidden mx-auto">
                  <Image
                    src={file.preview || "/logo.png"}
                    alt="preview"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover rounded"
                    unoptimized
                  />
                </div>
                <p className="text-xs font-medium text-gray-700 truncate mt-1">
                  {file.name}
                </p>
                {isUploadEnabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(file.id, type);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          isUploadEnabled && (
            <>
              <CloudUpload className="w-10 h-12 sm:w-12 sm:h-14 text-blue-500 mb-2 sm:mb-3" />
              <p className="text-sm sm:text-base text-gray-700 text-center">
                Drag your file(s) or{" "}
                <span className="text-blue-600 font-medium">browse</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2 text-center">
                Max 10 MB files are allowed
              </p>
            </>
          )
        )}
        {isUploadEnabled && (
          <input
            id={`file-${type}`}
            type="file"
            multiple
            accept=".jpg,.png,.svg"
            className="hidden"
            onChange={(e) => onFileUpload(e, type)}
          />
        )}
      </div>
    </div>
  );
};

interface ImageUploadSectionProps {
  imageData: ImageUploadData;
  jobId: string;
  jobStatus?: string;
  showValidationError?: boolean;
  onGetImages?: () => { beforeFiles: File[]; afterFiles: File[] };
}

const ImageUploadSection = ({
  imageData,
  jobId,
  jobStatus,
  showValidationError,
  onGetImages,
}: ImageUploadSectionProps) => {
  const [beforeImages, setBeforeImages] = useState<UploadedFile[]>([]);
  const [afterImages, setAfterImages] = useState<UploadedFile[]>([]);
  const [beforeFiles, setBeforeFiles] = useState<File[]>([]);
  const [afterFiles, setAfterFiles] = useState<File[]>([]);

  // Check if image upload should be enabled (only when job is in progress)
  const isImageUploadEnabled =
    jobStatus === "in_progress" || jobStatus === "In Progress";

  // Expose function to get files
  useEffect(() => {
    if (onGetImages) {
      window.getUploadedImages = () => ({ beforeFiles, afterFiles });
    }
  }, [beforeFiles, afterFiles, onGetImages]);

  // Expose validation function
  useEffect(() => {
    window.getImageValidation = () => ({
      hasBefore: beforeImages.length > 0,
      hasAfter: afterImages.length > 0,
    });
  }, [beforeImages, afterImages]);

  // Initialize images from API data
  useEffect(() => {
    if (imageData.before_images) {
      const formattedBeforeImages = imageData.before_images.map((img) => ({
        id: img.id,
        name: img.file.split("/").pop() || "image.jpg",
        size: "Unknown",
        preview: getImageFullUrl(img.file),
      }));
      setBeforeImages(formattedBeforeImages);
    }

    if (imageData.after_images) {
      const formattedAfterImages = imageData.after_images.map((img) => ({
        id: img.id,
        name: img.file.split("/").pop() || "image.jpg",
        size: "Unknown",
        preview: getImageFullUrl(img.file),
      }));
      setAfterImages(formattedAfterImages);
    }
  }, [imageData]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after",
  ) => {
    const files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);

      // Store actual files
      if (type === "before") {
        setBeforeFiles(filesArray);
      } else {
        setAfterFiles(filesArray);
      }

      filesArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newFile: UploadedFile = {
            id: Date.now() + index,
            name: file.name,
            size: `${Math.round(file.size / 1024)}kb`,
            preview: event.target?.result as string,
          };

          if (type === "before") {
            setBeforeImages((prev) => [...prev, newFile]);
          } else {
            setAfterImages((prev) => [...prev, newFile]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: "before" | "after",
  ) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const filesArray = Array.from(files);

      // Store actual files
      if (type === "before") {
        setBeforeFiles(filesArray);
      } else {
        setAfterFiles(filesArray);
      }

      filesArray.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newFile: UploadedFile = {
            id: Date.now() + index,
            name: file.name,
            size: `${Math.round(file.size / 1024)}kb`,
            preview: event.target?.result as string,
          };

          if (type === "before") {
            setBeforeImages((prev) => [...prev, newFile]);
          } else {
            setAfterImages((prev) => [...prev, newFile]);
          }
        };
        reader.readAsDataURL(file);
      });
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

  return (
    <div className="bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Image Upload Section:
        </h3>
        <p className="text-xs text-gray-400">
          Only support .jpg, .png and .svg files.
        </p>
      </div>
      <div
        className={`border rounded-2xl p-3 sm:p-4 md:p-6 transition-colors ${
          showValidationError &&
          (beforeImages.length === 0 || afterImages.length === 0)
            ? "border-red-500 border-2"
            : "border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ">
          <UploadArea
            type="before"
            images={beforeImages}
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onRemove={removeFile}
            isJobCompleted={!isImageUploadEnabled}
          />
          <UploadArea
            type="after"
            images={afterImages}
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onRemove={removeFile}
            isJobCompleted={!isImageUploadEnabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
