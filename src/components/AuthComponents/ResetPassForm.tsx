/** @format */

"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const ResetPassForm = () => {
  const router = useRouter();
  const handleSendOtp = () => {
    router.push("/verify-otp");
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
        Reset Your Password
      </h1>
      <p className="text-sm sm:text-base text-[#9E2729] mb-4 sm:mb-6">
        Enter your email to receive reset instructions
      </p>

      {/* Email Input */}
      <div className="mb-5 sm:mb-6">
        <label className="block text-sm sm:text-base font-medium text-[#9E2729] mb-1.5 sm:mb-2">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-[#E8D5D8] rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#8B3A3A] focus:ring-1 focus:ring-[#8B3A3A]"
        />
      </div>

      {/* Send OTP Button */}
      <Button
        onClick={handleSendOtp}
        className="w-full bg-[#9E2729] hover:bg-[#7A3333] text-white font-semibold py-3 rounded-lg mb-4 transition-colors"
      >
        Send OTP
      </Button>

      {/* Resend Link */}
      <p className="text-center text-sm text-gray-600">
        Don&apos;t receive the OTP?{" "}
        <Link href="#" className="text-[#9E2729] font-semibold hover:underline">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default ResetPassForm;
