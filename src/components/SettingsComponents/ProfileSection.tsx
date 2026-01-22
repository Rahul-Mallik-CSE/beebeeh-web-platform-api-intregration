/** @format */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProfileEditModal from "./ProfileEditModal";
import ResetPassModal from "./ResetPassModal";
import { useGetProfileQuery } from "@/redux/features/settingAPI";
import { useChangePasswordMutation } from "@/redux/features/authAPI";
import { getImageFullUrl } from "@/lib/utils";
import { toast } from "react-toastify";

const ProfileSection = () => {
  const { data, isLoading, error } = useGetProfileQuery();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    role: "",
    password: "************",
    profileImage: null as string | null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);

  // Update form data when API data is loaded
  useEffect(() => {
    if (data?.data) {
      setFormData({
        fullName: data.data.full_name || "",
        email: data.data.email || "",
        contactNumber: data.data.contact_number || "",
        address: data.data.address || "",
        role: data.data.role || "",
        password: "************",
        profileImage:
          data.data.technician_profile?.profile_image ||
          data.data.profile_image ||
          null,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (data: {
    fullName: string;
    contactNumber: string;
    address: string;
  }) => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  const handleChangePassword = () => {
    setIsResetPassModalOpen(true);
  };

  const handleUpdatePassword = async (data: {
    new_password: string;
    confirm_password: string;
  }) => {
    try {
      const response = await changePassword(data).unwrap();
      if (response.success) {
        toast.success("Password changed successfully!");
        setIsResetPassModalOpen(false);
      } else {
        toast.error(response.message || "Failed to change password");
      }
    } catch (err: any) {
      console.error("Change password failed:", err);
      toast.error(
        err?.data?.message || "Failed to change password. Please try again.",
      );
    }
  };

  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 animate-pulse">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const profileImageUrl = formData.profileImage
    ? getImageFullUrl(formData.profileImage)
    : "/logo.png";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={profileImageUrl}
              alt="Profile"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {formData.fullName}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">{formData.role}</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <Button
            onClick={handleEdit}
            className="bg-red-800 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 text-sm"
          >
            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Edit
          </Button>
          <Button
            onClick={handleChangePassword}
            className="bg-[#5C3D2E] hover:bg-[#4A2F22] text-white flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 text-sm"
          >
            <span className="whitespace-nowrap">Change Password</span>
          </Button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
            placeholder="Your First Name"
            className="bg-white border-gray-200 h-9 sm:h-10 text-sm"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@gmail.com"
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

        {/* Role */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700">
            Role
          </label>
          <Input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Technician"
            className="bg-white border-gray-200 h-9 sm:h-10 text-sm"
            disabled
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="************"
              className="bg-white border-gray-200 pr-10 h-9 sm:h-10 text-sm"
              disabled
            />
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentData={{
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
          address: formData.address,
          profileImage: formData.profileImage,
        }}
        onSave={handleSaveChanges}
      />

      {/* Reset Password Modal */}
      <ResetPassModal
        isOpen={isResetPassModalOpen}
        onClose={() => setIsResetPassModalOpen(false)}
        onUpdate={handleUpdatePassword}
        isLoading={isChangingPassword}
      />
    </div>
  );
};

export default ProfileSection;
