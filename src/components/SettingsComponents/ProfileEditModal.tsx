/** @format */
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { useUpdateProfileMutation } from "@/redux/features/settingAPI";
import { toast } from "react-toastify";
import { getImageFullUrl } from "@/lib/utils";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    fullName: string;
    contactNumber: string;
    address: string;
    profileImage?: string | null;
  };
  onSave: (data: {
    fullName: string;
    contactNumber: string;
    address: string;
  }) => void;
}

const ProfileEditModal = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}: ProfileEditModalProps) => {
  const [formData, setFormData] = useState(currentData);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update form data when currentData changes
  useEffect(() => {
    setFormData(currentData);
    setSelectedImage(null);
    setPreviewUrl(null);
  }, [currentData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", formData.fullName);
      formDataToSend.append("contact_number", formData.contactNumber);
      formDataToSend.append("address", formData.address);

      if (selectedImage) {
        formDataToSend.append("profile_image", selectedImage);
      }

      const response = await updateProfile(formDataToSend).unwrap();

      toast.success("Profile updated successfully!");
      onSave(formData);
      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  const displayImageUrl =
    previewUrl ||
    (formData.profileImage
      ? getImageFullUrl(formData.profileImage)
      : "/logo.png");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white max-w-[90vw]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
            Edit Account Info
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-xs sm:text-sm">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={displayImageUrl}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={handleImageClick}
                className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3 sm:space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jony Paul"
                className="bg-white border-gray-200 h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <Input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+1 345 824 9384"
                className="bg-white border-gray-200 h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5 sm:space-y-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Address
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="24 New Street, Los Angeles"
                className="bg-white border-gray-200 h-9 sm:h-10 text-sm"
              />
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-red-800 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
