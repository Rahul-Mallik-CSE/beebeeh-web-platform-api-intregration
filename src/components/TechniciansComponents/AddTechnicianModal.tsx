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
import { Technician } from "@/types/TechniciansTypes";

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
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [skills, setSkills] = useState("");

  const handleSave = () => {
    const name = `${firstName.trim()} ${lastName.trim()}`.trim() || "Unnamed";
    const newTech: Technician = {
      id: String(Date.now()),
      techId: `T-${Math.floor(Math.random() * 900 + 100)}`,
      name,
      contactNumber,
      skills,
      totalJobs: 0,
      status: "Available",
    };

    onSave(newTech);
    onOpenChange(false);
    // Reset fields
    setFirstName("");
    setLastName("");
    setContactNumber("");
    setEmail("");
    setAddress("");
    setTown("");
    setSkills("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add Technician</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <Camera className="w-6 h-6 text-gray-500" />
          </div>
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
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border rounded-md p-2"
                onClick={() => console.log("Open map")}
              >
                <MapPin className="w-4 h-4 text-slate-600" />
              </button>
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
            <label className="text-sm text-slate-700">Skill</label>
            <Input
              placeholder="Select multipole skill"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <div className="flex w-full gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className=" flex-1 h-9 sm:h-10 text-sm font-medium border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 h-9 sm:h-10 text-sm font-medium bg-red-800 hover:bg-red-700 text-white "
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTechnicianModal;
