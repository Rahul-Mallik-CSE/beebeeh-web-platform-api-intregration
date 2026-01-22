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
import { toast } from "react-toastify";

interface ResetPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { new_password: string; confirm_password: string }) => void;
  isLoading?: boolean;
}

const ResetPassModal = ({
  isOpen,
  onClose,
  onUpdate,
  isLoading = false,
}: ResetPassModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  // Password validation
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    if (/^\d+$/.test(password)) {
      errors.push("Password cannot be entirely numeric");
    }

    // Check for common passwords
    const commonPasswords = [
      "password",
      "12345678",
      "qwerty",
      "abc123",
      "password123",
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push("This password is too common");
    }

    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const errors = validatePassword(value);
    setPasswordErrors(errors);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdate = () => {
    if (
      password === confirmPassword &&
      password.length > 0 &&
      passwordErrors.length === 0
    ) {
      onUpdate({ new_password: password, confirm_password: confirmPassword });

      setPassword("");
      setConfirmPassword("");
      setPasswordErrors([]);
      onClose();
    } else {
      toast.error("Please fix the errors and ensure passwords match!");
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
                onChange={handlePasswordChange}
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

          {/* Password validation errors */}
          {password && passwordErrors.length > 0 && (
            <div className="mt-2 space-y-1">
              {passwordErrors.map((error, index) => (
                <p
                  key={index}
                  className="text-xs text-red-600 flex items-center gap-1"
                >
                  <span className="text-red-600">•</span> {error}
                </p>
              ))}
            </div>
          )}

          {/* Password strength indicator */}
          {password && passwordErrors.length === 0 && (
            <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <span className="text-green-600">✓</span> Password is strong
            </p>
          )}

          {/* Confirm Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm font-medium text-red-800">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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

          {/* Password mismatch error */}
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <span className="text-red-600">•</span> Passwords do not match
            </p>
          )}

          {/* Password match indicator */}
          {confirmPassword &&
            password === confirmPassword &&
            passwordErrors.length === 0 && (
              <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                <span className="text-green-600">✓</span> Passwords match
              </p>
            )}

          {/* Update Button */}
          <Button
            onClick={handleUpdate}
            disabled={
              isLoading ||
              passwordErrors.length > 0 ||
              password !== confirmPassword
            }
            className="w-full bg-red-800 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base font-medium mt-4 sm:mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassModal;
