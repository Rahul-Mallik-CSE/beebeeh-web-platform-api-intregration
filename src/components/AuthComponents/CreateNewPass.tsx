/** @format */

"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CreateNewPass = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePass = () => {
    router.push("/sign-in");
  };

  return (
    <div className="relative z-10 w-full max-w-[90vw] sm:max-w-lg bg-white rounded-2xl shadow-lg py-6 sm:py-8 px-4 sm:px-6">
      {/* Logo dots */}
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <div className="w-7 h-3.5 sm:w-8 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E2729] mb-1">
        Create New Password
      </h1>
      <p className="text-sm sm:text-base text-[#9E2729] mb-4 sm:mb-6">
        Enter your email to receive reset instructions
      </p>

      {/* Password Input */}
      <div className="mb-4 sm:mb-5">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1.5 sm:mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mb-5 sm:mb-6">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1.5 sm:mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter password"
            className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Update Password Button */}
      <Button
        onClick={handleUpdatePass}
        className="w-full bg-[#9E2729] hover:bg-[#7A3333] text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Update Password
      </Button>
    </div>
  );
};

export default CreateNewPass;
