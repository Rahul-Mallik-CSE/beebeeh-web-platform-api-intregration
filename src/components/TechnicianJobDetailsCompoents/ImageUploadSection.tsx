/** @format */
"use client";
import React, { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";

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
    type: "before" | "after"
  ) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    type: "before" | "after"
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
      className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center hover:border-blue-400 transition-colors cursor-pointer "
      onDrop={(e) => onDrop(e, type)}
      onDragOver={onDragOver}
      onClick={() => document.getElementById(`file-${type}`)?.click()}
    >
      <CloudUpload className="w-10 h-12 sm:w-12 sm:h-14 text-blue-500 mb-2 sm:mb-3" />
      <p className="text-sm sm:text-base text-gray-700 text-center">
        Drag your file(s) or{" "}
        <span className="text-blue-600 font-medium">browse</span>
      </p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2 text-center">
        Max 10 MB files are allowed
      </p>
      <input
        id={`file-${type}`}
        type="file"
        multiple
        accept=".jpg,.png,.svg"
        className="hidden"
        onChange={(e) => onFileUpload(e, type)}
      />
    </div>

    {images.length > 0 && (
      <div className="space-y-1.5 sm:space-y-2">
        {images.map((file) => (
          <div
            key={file.id}
            className="border border-gray-200 rounded-lg p-2 sm:p-3 flex items-center gap-2 sm:gap-3 bg-white"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
              {file.preview ? (
                <Image
                  src={file.preview}
                  alt="preview"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="preview"
                  width={40}
                  height={40}
                  className="rounded object-cover"
                />
              )}
            </div>
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

const ImageUploadSection = () => {
  const [beforeImages, setBeforeImages] = useState<UploadedFile[]>([
    { id: 1, name: "Installation potrait.jpg", size: "500kb" },
  ]);
  const [afterImages, setAfterImages] = useState<UploadedFile[]>([
    { id: 1, name: "Installation potrait.jpg", size: "500kb" },
  ]);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    const files = e.target.files;
    if (files) {
      const newFiles: UploadedFile[] = [];

      Array.from(files).forEach((file, index) => {
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
    type: "before" | "after"
  ) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
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
      <div className="border border-gray-200 rounded-2xl p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ">
          <UploadArea
            type="before"
            images={beforeImages}
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onRemove={removeFile}
          />
          <UploadArea
            type="after"
            images={afterImages}
            onFileUpload={handleFileUpload}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onRemove={removeFile}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;
