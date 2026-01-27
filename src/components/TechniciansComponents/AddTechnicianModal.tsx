/** @format */

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, MapPin } from "lucide-react";
import Image from "next/image";
import { Technician } from "@/types/TechniciansTypes";
import { useAddTechnicianMutation } from "@/redux/features/adminFeatures/technicianAPI";
import { toast } from "react-toastify";

interface AddTechnicianModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (tech: Technician) => void;
}

const AddTechnicianModal: React.FC<AddTechnicianModalProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [addTechnician, { isLoading }] = useAddTechnicianMutation();

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
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !address.trim() ||
      !town.trim() ||
      !contactNumber.trim() ||
      skills.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", firstName);
      formDataToSend.append("last_name", lastName);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("address", address);
      formDataToSend.append("town", town);
      formDataToSend.append("contact_number", contactNumber);
      formDataToSend.append("is_active", "true");

      // Handle skills array
      skills.forEach((skill) => {
        formDataToSend.append("skills", skill);
      });

      if (profileImageFile) {
        formDataToSend.append("profile_image", profileImageFile);
      }

      // Call the API
      await addTechnician(formDataToSend).unwrap();

      // Show success message
      toast.success("Technician added successfully!");

      // Call parent onSave callback if needed
      const name = `${firstName.trim()} ${lastName.trim()}`.trim();
      const newTech: Technician = {
        id: String(Date.now()),
        techId: `T-${Math.floor(Math.random() * 900 + 100)}`,
        name,
        contactNumber,
        skills: skills.join(", "),
        totalJobs: 0,
        status: "Available",
      };
      onSave(newTech);

      // Reset and close
      handleReset();
      onOpenChange(false);
    } catch (error: any) {
      // Show error message
      toast.error("Email Already Exists");
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
    setPassword("");
    setAddress("");
    setTown("");
    setSkills([]);
    setProfileImage(null);
    setProfileImageFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add Technician</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          <label
            htmlFor="profile-upload"
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
                />
              ) : (
                <Camera className="w-6 h-6 text-gray-500" />
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
          <div className="text-sm text-center text-slate-600">
            Upload Profile Image
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <div>
            <label className="text-sm text-slate-700">First Name</label>
            <Input
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Last Name</label>
            <Input
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Contact Number</label>
            <Input
              placeholder="Enter your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-700">Password</label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Address</label>
            <div className="relative">
              <Input
                placeholder="enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {/* <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-md p-2"
                onClick={() => console.log("Open map")}
              >
                <MapPin className="w-4 h-4 text-slate-600" />
              </button> */}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700">Town</label>
            <Input
              placeholder="Enter town"
              value={town}
              onChange={(e) => setTown(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-slate-700 mb-2 block">Skills</label>
            <div className="flex  gap-2">
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
              onClick={() => {
                handleReset();
                onOpenChange(false);
              }}
              className="flex-1 h-9 sm:h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="flex-1 h-9 sm:h-10 text-sm font-medium bg-red-800 hover:bg-red-700 text-white disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTechnicianModal;
