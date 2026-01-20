/** @format */

import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#E8CFDA] to-[#F5E6EE] flex items-center justify-center p-4">
      <div className="text-center">
        {/* Logo dots */}
        <div className="flex gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8 animate-pulse">
          <div className="w-10 h-5 sm:w-12 sm:h-6 rounded-full bg-[#9E2729]"></div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9E2729]"></div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9E2729]"></div>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9E2729]"></div>
        </div>

        {/* Beebeeh text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#9E2729] mb-3 sm:mb-4">
          Beebeeh
        </h1>

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-3 sm:border-4 border-[#E8D5D8] border-t-[#9E2729] rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
