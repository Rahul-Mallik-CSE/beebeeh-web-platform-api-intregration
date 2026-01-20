/** @format */
"use client";
import React, { useState } from "react";
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
import { Camera, MapPin } from "lucide-react";
import Image from "next/image";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
}

export interface ClientFormData {
  firstName: string;
  lastName: string;
  address: string;
  town: string;
  contactNumber: string;
  type: string;
  profileImage?: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<ClientFormData>({
    firstName: "",
    lastName: "",
    address: "",
    town: "",
    contactNumber: "",
    type: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave({ ...formData, profileImage: profileImage || undefined });
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      town: "",
      contactNumber: "",
      type: "",
    });
    setProfileImage(null);
  };

  const handleCancel = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg p-0 gap-0 rounded-2xl">
        <div className="px-4 sm:px-6 py-6 sm:py-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="mb-2 sm:mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-gray-800">
              Add Client
            </DialogTitle>
          </DialogHeader>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-2 sm:mb-4">
            <label
              htmlFor="profile-upload"
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
                id="profile-upload"
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
                name="firstName"
                value={formData.firstName}
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
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Address
              </label>
              <div className="relative">
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="enter your address"
                  className="h-9 sm:h-10 pr-16 text-sm"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Map</span>
                </button>
              </div>
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
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Type
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-9 sm:h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-9 sm:h-10 text-sm font-medium bg-red-800 hover:bg-red-700 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientModal;
