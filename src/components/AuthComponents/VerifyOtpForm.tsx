/** @format */

"use client";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const VerifyOtpForm = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleVerifyOtp = () => {
    // Here you would typically validate the OTP and make an API call
    router.push("/create-new-pass");
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus on the last filled input or the first empty one
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
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
        Verify with OTP
      </h1>
      <p className="text-sm sm:text-base text-[#9E2729] mb-6 sm:mb-8">
        Enter the OTP sent to your email
      </p>

      {/* OTP Input Boxes */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl font-semibold border border-[#E8D5D8] rounded-lg bg-white text-gray-800 focus:outline-none focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]"
          />
        ))}
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleVerifyOtp}
        className="w-full bg-[#9E2729] hover:bg-[#7A3333] text-white font-semibold py-3 rounded-lg mb-4 transition-colors"
      >
        Verify
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

export default VerifyOtpForm;
