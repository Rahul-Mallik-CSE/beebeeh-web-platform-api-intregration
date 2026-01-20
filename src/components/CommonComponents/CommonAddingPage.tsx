/** @format */
"use client";
import React, { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";

interface CommonAddingPageProps {
  title: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const CommonAddingPage: React.FC<CommonAddingPageProps> = ({
  title,
  onSubmit,
  onCancel,
}) => {
  const router = useRouter();

  // Determine if this is a repairs page or maintenance page
  const isRepairs = title.toLowerCase().includes("repair");
  const isMaintenance = title.toLowerCase().includes("maintenance");

  const [formData, setFormData] = useState({
    clientId: "",
    searchClient: "",
    clientName: "",
    productId: "",
    productModel: "",
    serialNumber: "",
    date: "",
    time: "",
    maintenanceFrequency: "",
    priority: "",
    technicianId: "",
    technicianName: "",
    problemType: "",
    problemDescription: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center font-bold gap-1 sm:gap-2 text-gray-800 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Form Container */}
      <div>
        <div className="space-y-4 sm:space-y-6">
          {/* Client ID - Only for maintenance */}
          {isMaintenance && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Client id
              </label>
              <Input
                type="text"
                placeholder="Select client id"
                value={formData.clientId}
                onChange={(e) => handleChange("clientId", e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Search Client ID or Name - For non-maintenance */}
          {!isMaintenance && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Search Client ID or Name
              </label>
              <Input
                type="text"
                placeholder="Search client ID or client name"
                value={formData.searchClient}
                onChange={(e) => handleChange("searchClient", e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Client Name */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Client name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="AutoComplete"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                className="w-full pr-10"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Product ID or Model Name - Only for non-maintenance */}
          {!isMaintenance && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Product ID or Model Name
              </label>
              <Input
                type="text"
                placeholder="Search product id or model name"
                value={formData.productId}
                onChange={(e) => handleChange("productId", e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Product Model Name */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Product Model Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="AutoComplete"
                value={formData.productModel}
                onChange={(e) => handleChange("productModel", e.target.value)}
                className="w-full pr-10"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Serial Number */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Serial Number
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="AutoComplete"
                value={formData.serialNumber}
                onChange={(e) => handleChange("serialNumber", e.target.value)}
                className="w-full pr-10"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  placeholder="14 April, 2025"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full pr-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Time
              </label>
              <div className="relative">
                <Input
                  type="time"
                  placeholder="10:20 pm"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  className="w-full pr-10"
                />
              </div>
            </div>
          </div>

          {/* Maintenance Frequency - Only for non-repairs */}
          {!isRepairs && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Maintenance Frequency
              </label>
              <Input
                type="text"
                placeholder="enter maintenance frequency month"
                value={formData.maintenanceFrequency}
                onChange={(e) =>
                  handleChange("maintenanceFrequency", e.target.value)
                }
                className="w-full"
              />
            </div>
          )}

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Priority
            </label>
            <Select
              value={formData.priority}
              onValueChange={(value) => handleChange("priority", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select priority section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Technician ID - Only for maintenance */}
          {isMaintenance && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Technician ID
              </label>
              <Input
                type="text"
                placeholder="Select technician id"
                value={formData.technicianId}
                onChange={(e) => handleChange("technicianId", e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Technician Name */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              {isRepairs ? "Technician name and email" : "Technician name"}
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="AutoComplete"
                value={formData.technicianName}
                onChange={(e) => handleChange("technicianName", e.target.value)}
                className="w-full pr-10"
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Problem Type - Only for repairs */}
          {isRepairs && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Problem Type
              </label>
              <Select
                value={formData.problemType}
                onValueChange={(value) => handleChange("problemType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="select problem type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Cooling issue</SelectItem>
                  <SelectItem value="mechanical">Noise, Gas</SelectItem>
                  <SelectItem value="software">Electrical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Problem Description / Notes */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              {isRepairs || isMaintenance ? "Problem Description" : "Notes"}
            </label>
            <Textarea
              placeholder={
                isRepairs || isMaintenance
                  ? "enter problem description"
                  : "enter installation job note"
              }
              value={
                isRepairs || isMaintenance
                  ? formData.problemDescription
                  : formData.notes
              }
              onChange={(e) =>
                handleChange(
                  isRepairs || isMaintenance ? "problemDescription" : "notes",
                  e.target.value
                )
              }
              className="w-full min-h-[100px] resize-none"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-2xl">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-full sm:w-auto px-8 sm:px-12 py-2 text-sm sm:text-base text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-8 sm:px-12 py-2 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white"
        >
          Create Job
        </Button>
      </div>
    </div>
  );
};

export default CommonAddingPage;
