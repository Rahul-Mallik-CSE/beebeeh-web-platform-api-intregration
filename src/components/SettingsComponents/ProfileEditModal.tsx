/** @format */
"use client";
import React, { useState } from "react";
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

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: {
    fullName: string;
    contactNumber: string;
    address: string;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

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
                  src="/logo.png"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <button className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
              </button>
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
            className="w-full bg-red-800 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base font-medium"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
