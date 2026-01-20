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
import { Eye, EyeOff } from "lucide-react";

interface ResetPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (password: string) => void;
}

const ResetPassModal = ({ isOpen, onClose, onUpdate }: ResetPassModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdate = () => {
    if (password === confirmPassword && password.length > 0) {
      onUpdate(password);
      setPassword("");
      setConfirmPassword("");
      onClose();
    } else {
      alert("Passwords do not match or are empty!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white max-w-[90vw]">
        <DialogHeader>
          {/* Logo Dots */}
          <div className="flex gap-1.5 sm:gap-2 mb-2">
            <div className="w-7 h-2.5 sm:w-9 sm:h-3 rounded-full bg-red-800"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-800"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-800"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-800"></div>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-semibold text-red-800">
            Reset Password
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-5 py-3 sm:py-4">
          {/* Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-red-800">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="bg-white border-gray-200 pr-10 h-9 sm:h-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-red-800">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="bg-white border-gray-200 pr-10 h-9 sm:h-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Update Button */}
          <Button
            onClick={handleUpdate}
            className="w-full bg-red-800 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base font-medium mt-4 sm:mt-6"
          >
            Update Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassModal;
