/** @format */
"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera } from "lucide-react";
import Image from "next/image";
import { ClientDetails } from "@/redux/features/adminFeatures/clientsAPI";
import { getImageFullUrl } from "@/lib/utils";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  clientData: ClientDetails;
}

const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  clientData,
}) => {
  const [formData, setFormData] = useState({
    first_name: clientData.first_name,
    last_name: clientData.last_name,
    email: clientData.email,
    address: clientData.address,
    town: clientData.town,
    contact_number: clientData.contact_number,
  });
  const [profileImage, setProfileImage] = useState<string | null>(
    getImageFullUrl(clientData.profile_image),
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        first_name: clientData.first_name,
        last_name: clientData.last_name,
        email: clientData.email,
        address: clientData.address,
        town: clientData.town,
        contact_number: clientData.contact_number,
      });
      setProfileImage(getImageFullUrl(clientData.profile_image));
      setProfileImageFile(null);
    }
  }, [isOpen, clientData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if filename is too long (max 100 characters)
      let processedFile = file;
      if (file.name.length > 100) {
        // Rename file to a shorter name while keeping extension
        const extension = file.name.split(".").pop();
        const timestamp = Date.now();
        const newName = `client_profile_${timestamp}.${extension}`;
        processedFile = new File([file], newName, { type: file.type });
      }

      setProfileImageFile(processedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(processedFile);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      // Only append changed fields
      if (formData.first_name !== clientData.first_name) {
        formDataToSend.append("first_name", formData.first_name);
      }
      if (formData.last_name !== clientData.last_name) {
        formDataToSend.append("last_name", formData.last_name);
      }
      if (formData.email !== clientData.email) {
        formDataToSend.append("email", formData.email);
      }
      if (formData.address !== clientData.address) {
        formDataToSend.append("address", formData.address);
      }
      if (formData.town !== clientData.town) {
        formDataToSend.append("town", formData.town);
      }
      if (formData.contact_number !== clientData.contact_number) {
        formDataToSend.append("contact_number", formData.contact_number);
      }

      if (profileImageFile) {
        formDataToSend.append("profile_image", profileImageFile);
      }

      await onSave(formDataToSend);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg p-0 gap-0 rounded-2xl">
        <div className="px-4 sm:px-6 py-6 sm:py-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-2 sm:mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800">
              Edit Client
            </DialogTitle>
          </DialogHeader>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-2 sm:mb-4">
            <label
              htmlFor="profile-upload-edit"
              className="relative cursor-pointer group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                )}
              </div>
              <input
                id="profile-upload-edit"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              Upload Profile Image
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-2 sm:space-y-3">
            {/* First Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                First Name
              </label>
              <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Last Name
              </label>
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Address
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Town */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Town
              </label>
              <Input
                type="text"
                name="town"
                value={formData.town}
                onChange={handleChange}
                placeholder="Enter town"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Contact Number
              </label>
              <Input
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="h-9 sm:h-10 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 h-9 sm:h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 h-9 sm:h-10 text-sm font-medium bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditClientModal;
