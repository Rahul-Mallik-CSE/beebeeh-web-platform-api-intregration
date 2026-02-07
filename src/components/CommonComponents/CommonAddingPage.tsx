/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Lock, ChevronDown } from "lucide-react";
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
import { toast } from "react-toastify";
import {
  useAutocompleteClientsQuery,
  useAutocompleteProductsQuery,
  useAutocompleteTechniciansQuery,
  useAddInstallationMutation,
  ClientAutocompleteItem,
  ProductAutocompleteItem,
  TechnicianAutocompleteItem,
} from "@/redux/features/adminFeatures/installationAPI";
import { useAddRepairMutation } from "@/redux/features/adminFeatures/repairsAPI";
import { useAddMaintenanceMutation } from "@/redux/features/adminFeatures/maintenanceAPI";

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
  const isInstallation = title.toLowerCase().includes("installation");

  const [formData, setFormData] = useState({
    clientId: "",
    searchClient: "",
    clientName: "",
    productId: "",
    searchProduct: "",
    productModel: "",
    serialNumber: "",
    date: "",
    time: "",
    maintenanceFrequency: "",
    priority: "",
    technicianId: "",
    searchTechnician: "",
    technicianName: "",
    problemType: "",
    problemDescription: "",
    notes: "",
  });

  // Autocomplete states
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showTechnicianDropdown, setShowTechnicianDropdown] = useState(false);

  // Refs for dropdowns
  const clientDropdownRef = useRef<HTMLDivElement>(null);
  const productDropdownRef = useRef<HTMLDivElement>(null);
  const technicianDropdownRef = useRef<HTMLDivElement>(null);

  // API hooks
  const {
    data: clientData,
    isFetching: clientFetching,
    error: clientError,
  } = useAutocompleteClientsQuery(
    { q: formData.searchClient },
    { skip: formData.searchClient.length < 2 },
  );
  const {
    data: productData,
    isFetching: productFetching,
    error: productError,
  } = useAutocompleteProductsQuery(
    { q: formData.searchProduct },
    { skip: formData.searchProduct.length < 2 },
  );
  const {
    data: technicianData,
    isFetching: technicianFetching,
    error: technicianError,
  } = useAutocompleteTechniciansQuery(
    { q: formData.searchTechnician },
    { skip: formData.searchTechnician.length < 2 },
  );

  const [addInstallation, { isLoading: isSubmitting }] =
    useAddInstallationMutation();
  const [addRepair, { isLoading: isSubmittingRepair }] = useAddRepairMutation();
  const [addMaintenance, { isLoading: isSubmittingMaintenance }] =
    useAddMaintenanceMutation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clientDropdownRef.current &&
        !clientDropdownRef.current.contains(event.target as Node)
      ) {
        setShowClientDropdown(false);
      }
      if (
        productDropdownRef.current &&
        !productDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProductDropdown(false);
      }
      if (
        technicianDropdownRef.current &&
        !technicianDropdownRef.current.contains(event.target as Node)
      ) {
        setShowTechnicianDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Show dropdowns when typing
    if (field === "searchClient" && value.length >= 2) {
      setShowClientDropdown(true);
    } else if (field === "searchClient") {
      setShowClientDropdown(false);
    }

    if (field === "searchProduct" && value.length >= 2) {
      setShowProductDropdown(true);
    } else if (field === "searchProduct") {
      setShowProductDropdown(false);
    }

    if (field === "searchTechnician" && value.length >= 2) {
      setShowTechnicianDropdown(true);
    } else if (field === "searchTechnician") {
      setShowTechnicianDropdown(false);
    }
  };

  const handleClientSelect = (client: ClientAutocompleteItem) => {
    setFormData((prev) => ({
      ...prev,
      clientId: client.client_id,
      clientName: client.name,
      searchClient: client.client_id,
    }));
    setShowClientDropdown(false);
  };

  const handleProductSelect = (product: ProductAutocompleteItem) => {
    setFormData((prev) => ({
      ...prev,
      productId: product.product_id,
      productModel: product.model_name,
      searchProduct: product.product_id,
    }));
    setShowProductDropdown(false);
  };

  const handleTechnicianSelect = (technician: TechnicianAutocompleteItem) => {
    setFormData((prev) => ({
      ...prev,
      technicianId: technician.technician_id,
      technicianName: technician.name,
      searchTechnician: technician.technician_id,
    }));
    setShowTechnicianDropdown(false);
  };

  const validateForm = () => {
    if (isInstallation) {
      if (!formData.clientId.trim()) {
        toast.error("Please select a client.");
        return false;
      }
      if (!formData.clientName.trim()) {
        toast.error("Client name is required.");
        return false;
      }
      if (!formData.productId.trim()) {
        toast.error("Please select a product.");
        return false;
      }
      if (!formData.productModel.trim()) {
        toast.error("Product model is required.");
        return false;
      }
      if (!formData.technicianId.trim()) {
        toast.error("Please select a technician.");
        return false;
      }
      if (!formData.technicianName.trim()) {
        toast.error("Technician name is required.");
        return false;
      }
      if (!formData.date) {
        toast.error("Please select a date.");
        return false;
      }
      if (!formData.time) {
        toast.error("Please select a time.");
        return false;
      }
      if (!formData.maintenanceFrequency.trim()) {
        toast.error("Maintenance frequency is required.");
        return false;
      }
      const freq = parseInt(formData.maintenanceFrequency);
      if (isNaN(freq) || freq <= 0) {
        toast.error("Maintenance frequency must be a positive number.");
        return false;
      }
      if (!formData.priority) {
        toast.error("Please select a priority.");
        return false;
      }
      if (!formData.notes.trim()) {
        toast.error("Notes are required.");
        return false;
      }
    } else if (isRepairs) {
      if (!formData.clientId.trim()) {
        toast.error("Please select a client.");
        return false;
      }
      if (!formData.clientName.trim()) {
        toast.error("Client name is required.");
        return false;
      }
      if (!formData.productId.trim()) {
        toast.error("Please select a product.");
        return false;
      }
      if (!formData.productModel.trim()) {
        toast.error("Product model is required.");
        return false;
      }
      if (!formData.technicianId.trim()) {
        toast.error("Please select a technician.");
        return false;
      }
      if (!formData.technicianName.trim()) {
        toast.error("Technician name is required.");
        return false;
      }
      if (!formData.date) {
        toast.error("Please select a date.");
        return false;
      }
      if (!formData.time) {
        toast.error("Please select a time.");
        return false;
      }
      if (!formData.priority) {
        toast.error("Please select a priority.");
        return false;
      }
      if (!formData.problemType) {
        toast.error("Please select a problem type.");
        return false;
      }
      if (!formData.problemDescription.trim()) {
        toast.error("Problem description is required.");
        return false;
      }
    } else if (isMaintenance) {
      if (!formData.clientId.trim()) {
        toast.error("Please select a client.");
        return false;
      }
      if (!formData.clientName.trim()) {
        toast.error("Client name is required.");
        return false;
      }
      if (!formData.productId.trim()) {
        toast.error("Please select a product.");
        return false;
      }
      if (!formData.productModel.trim()) {
        toast.error("Product model is required.");
        return false;
      }
      if (!formData.technicianId.trim()) {
        toast.error("Please select a technician.");
        return false;
      }
      if (!formData.technicianName.trim()) {
        toast.error("Technician name is required.");
        return false;
      }
      if (!formData.date) {
        toast.error("Please select a date.");
        return false;
      }
      if (!formData.time) {
        toast.error("Please select a time.");
        return false;
      }
      if (!formData.priority) {
        toast.error("Please select a priority.");
        return false;
      }
      if (!formData.problemDescription.trim()) {
        toast.error("Problem description is required.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (isInstallation) {
      try {
        const installationData = {
          client_id: formData.clientId,
          client_name: formData.clientName,
          product_id: formData.productId,
          model_name: formData.productModel,
          technician_id: formData.technicianId,
          technician_name: formData.technicianName,
          scheduled_date: formData.date,
          scheduled_time: formData.time,
          maintenance_frequency_month: parseInt(formData.maintenanceFrequency),
          priority: formData.priority as "low" | "medium" | "high",
          notes: formData.notes,
        };

        await addInstallation(installationData).unwrap();
        toast.success("Installation added successfully!");

        if (onSubmit) {
          onSubmit(formData);
        } else {
          router.push("/installation");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message ||
            "Failed to add installation. Please try again.",
        );
      }
    } else if (isRepairs) {
      try {
        const repairData = {
          client_id: formData.clientId,
          client_name: formData.clientName,
          product_id: formData.productId,
          model_name: formData.productModel,
          technician_id: formData.technicianId,
          technician_name: formData.technicianName,
          scheduled_date: formData.date,
          scheduled_time: formData.time,
          priority: formData.priority as "low" | "medium" | "high",
          problem_type: formData.problemType as
            | "cooling_issue"
            | "noise_gas"
            | "electrical"
            | "other",
          problem_description: formData.problemDescription,
        };

        await addRepair(repairData).unwrap();
        toast.success("Repair added successfully!");

        if (onSubmit) {
          onSubmit(formData);
        } else {
          router.push("/repairs");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message || "Failed to add repair. Please try again.",
        );
      }
    } else if (isMaintenance) {
      try {
        const maintenanceData = {
          client_id: formData.clientId,
          client_name: formData.clientName,
          product_id: formData.productId,
          model_name: formData.productModel,
          technician_id: formData.technicianId,
          technician_name: formData.technicianName,
          scheduled_date: formData.date,
          scheduled_time: formData.time,
          priority: formData.priority as "low" | "medium" | "high",
          problem_description: formData.problemDescription,
        };

        await addMaintenance(maintenanceData).unwrap();
        toast.success("Maintenance added successfully!");

        if (onSubmit) {
          onSubmit(formData);
        } else {
          router.push("/maintenance");
        }
      } catch (error: any) {
        toast.error(
          error?.data?.message ||
            "Failed to add maintenance. Please try again.",
        );
      }
    } else {
      if (onSubmit) {
        onSubmit(formData);
      }
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
          {/* Search Client ID or Name - For non-maintenance */}

          <div className="space-y-2 relative" ref={clientDropdownRef}>
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Search Client ID or Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Start with C- to search client ID or client name"
                value={formData.searchClient}
                onChange={(e) => handleChange("searchClient", e.target.value)}
                className="w-full pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {showClientDropdown && formData.searchClient.length >= 2 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {clientFetching ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Loading...
                  </div>
                ) : clientData?.data?.length ? (
                  clientData.data.map((client) => (
                    <div
                      key={client.client_id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="font-medium">
                        {client.client_id} - {client.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {client.contact_number}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No clients found
                  </div>
                )}
              </div>
            )}
          </div>

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
                disabled
              />
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Product ID or Model Name - Only for non-maintenance */}

          <div className="space-y-2 relative" ref={productDropdownRef}>
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Product ID or Model Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Start with P- to search product id or model name"
                value={formData.searchProduct}
                onChange={(e) => handleChange("searchProduct", e.target.value)}
                className="w-full pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {showProductDropdown && formData.searchProduct.length >= 2 && (
              <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                {productFetching ? (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Loading...
                  </div>
                ) : productError ? (
                  <div className="px-4 py-2 text-sm text-red-500">
                    Error loading products
                  </div>
                ) : productData?.data?.length ? (
                  productData.data.map((product) => (
                    <div
                      key={product.product_id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="font-medium">
                        {product.product_id} - {product.model_name}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

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
                disabled
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
          {isInstallation && (
            <div className="space-y-2">
              <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                Maintenance Frequency
              </label>
              <Input
                type="number"
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
              </SelectContent>
            </Select>
          </div>

          {/* Technician ID /Name */}
          <div className="space-y-2 relative" ref={technicianDropdownRef}>
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Technician ID /Name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Start with T- to search technician id"
                value={formData.searchTechnician}
                onChange={(e) =>
                  handleChange("searchTechnician", e.target.value)
                }
                className="w-full pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {showTechnicianDropdown &&
              formData.searchTechnician.length >= 2 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
                  {technicianFetching ? (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Loading...
                    </div>
                  ) : technicianData?.data?.length ? (
                    technicianData.data.map((technician) => (
                      <div
                        key={technician.technician_id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleTechnicianSelect(technician)}
                      >
                        <div className="font-medium">
                          {technician.technician_id} - {technician.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {technician.contact_number} • {technician.status}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No technicians found
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* Technician Name */}
          <div className="space-y-2">
            <label className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Technician name
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="AutoComplete"
                value={formData.technicianName}
                onChange={(e) => handleChange("technicianName", e.target.value)}
                className="w-full pr-10"
                disabled
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
                  <SelectItem value="cooling_issue">Cooling issue</SelectItem>
                  <SelectItem value="noise_gas">Noise, Gas</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
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
                  ? "Enter problem description"
                  : "Enter installation job note"
              }
              value={
                isRepairs || isMaintenance
                  ? formData.problemDescription
                  : formData.notes
              }
              onChange={(e) =>
                handleChange(
                  isRepairs || isMaintenance ? "problemDescription" : "notes",
                  e.target.value,
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
          disabled={
            isSubmitting || isSubmittingRepair || isSubmittingMaintenance
          }
          className="w-full sm:w-auto px-8 sm:px-12 py-2 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
        >
          {isSubmitting || isSubmittingRepair || isSubmittingMaintenance
            ? "Creating..."
            : "Create Job"}
        </Button>
      </div>
    </div>
  );
};

export default CommonAddingPage;
