/** @format */

import SignUpForm from "@/components/AuthComponents/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#E8CFDA] flex items-center justify-center overflow-hidden relative">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-white/15 rounded-full blur-3xl"></div>
      </div>

      {/* Sign Up Card */}
      <SignUpForm />
    </div>
  );
}
