/** @format */

"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import {
  useEditTechnicianMutation,
  TechnicianDashboardData,
} from "@/redux/features/adminFeatures/technicianAPI";
import { toast } from "react-toastify";
import { getImageFullUrl } from "@/lib/utils";

interface EditTechnicianModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technicianData: TechnicianDashboardData | null;
  onSave: () => void;
}

const EditTechnicianModal: React.FC<EditTechnicianModalProps> = ({
  open,
  onOpenChange,
  technicianData,
  onSave,
}) => {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [editTechnician, { isLoading }] = useEditTechnicianMutation();

  // Initialize form with technician data when modal opens
  useEffect(() => {
    if (technicianData && open) {
      const { technician } = technicianData;
      setFullName(technician.full_name);
      setContactNumber(technician.contact_number);
      setAddress(technician.address);
      setSkills(technician.skills);
      setProfileImage(technician.profile_image || null);
      setProfileImageFile(null);
    }
  }, [technicianData, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleSave = async () => {
    // Validation: Check if all required fields are filled
    if (
      !fullName.trim() ||
      !contactNumber.trim() ||
      !address.trim() ||
      skills.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Contact number validation (basic)
    if (contactNumber.trim().length < 10) {
      toast.error("Please enter a valid contact number.");
      return;
    }

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("full_name", fullName.trim());
      formDataToSend.append("contact_number", contactNumber.trim());
      formDataToSend.append("address", address.trim());

      // Handle skills array - send as individual items matching the API format
      skills.forEach((skill) => {
        formDataToSend.append("skills", skill);
      });

      // Only append profile image if a new one was selected
      if (profileImageFile) {
        formDataToSend.append("profile_image", profileImageFile);
      }

      // Call the API
      await editTechnician({
        id: technicianData!.technician.technician_id,
        data: formDataToSend,
      }).unwrap();

      // Show success message
      toast.success("Technician updated successfully!");

      // Call parent onSave callback
      onSave();

      // Close modal
      onOpenChange(false);
    } catch (error: any) {
      // Show error message
      const errorMessage =
        error?.data?.message ||
        "Failed to update technician. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (technicianData) {
      const { technician } = technicianData;
      setFullName(technician.full_name);
      setContactNumber(technician.contact_number);
      setAddress(technician.address);
      setSkills(technician.skills);
      setProfileImage(getImageFullUrl(technician.profile_image) || null);
      setProfileImageFile(null);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Technician</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          <label
            htmlFor="profile-upload-edit"
            className="relative cursor-pointer group"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <Camera className="w-6 h-6 text-gray-500" />
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
          <div className="text-sm text-center text-slate-600">
            {profileImageFile ? "New Image Selected" : "Upload Profile Image"}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div>
            <label className="text-sm text-slate-700">Full Name *</label>
            <Input
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Contact Number *</label>
            <Input
              placeholder="Enter contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Address *</label>
            <Input
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-700 mb-2 block">
              Skills *
            </label>
            <div className="flex gap-2">
              {["repair", "maintenance", "installations"].map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="w-4 h-4 rounded border-gray-300 text-red-800 focus:ring-red-800"
                  />
                  <span className="text-sm text-slate-700 capitalize">
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 h-9 sm:h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 h-9 sm:h-10 text-sm font-medium bg-red-800 hover:bg-red-700 text-white"
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTechnicianModal;
