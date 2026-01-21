/** @format */

"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    // Here you would typically validate the form and make an API call
    // For now, we'll just navigate to the verify-email page
    router.push("/verify-email");
  };

  return (
    <div className="relative z-10 w-full max-w-sm sm:max-w-lg bg-white rounded-2xl shadow-lg py-6 px-4 sm:py-8 sm:px-6">
      {/* Logo dots */}
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        <div className="w-6 h-3 sm:w-8 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#9E2729]"></div>
      </div>

      {/* Welcome Text */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E2729] mb-1">
        Create an Account
      </h1>
      <p className="text-sm sm:text-base text-[#9E2729] mb-2">
        Get started with Beebeeh
      </p>

      {/* Full Name Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
        />
      </div>

      {/* Email Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
        />
      </div>

      {/* Contact Number Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Contact Number
        </label>
        <input
          type="tel"
          placeholder="Enter your contact number"
          className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
        />
      </div>

      {/* Address Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Address
        </label>
        <input
          type="text"
          placeholder="Enter your address"
          className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
        />
      </div>

      {/* Password Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mb-2">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter password"
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Sign Up Button */}
      <Button
        onClick={handleSignUp}
        className="w-full bg-[#9E2729] hover:bg-[#7A3333] text-white text-sm sm:text-base font-semibold py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 mb-2 transition-colors"
      >
        Sign Up
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <div className="flex-1 h-px bg-[#E8D5D8]"></div>
        <span className="text-sm text-gray-400">or</span>
        <div className="flex-1 h-px bg-[#E8D5D8]"></div>
      </div>

      {/* Google Sign Up */}
      <Button className="w-full border bg-white border-[#E8D5D8] text-gray-700 text-sm sm:text-base font-medium py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Log in with Google
      </Button>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-[#9E2729] font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
