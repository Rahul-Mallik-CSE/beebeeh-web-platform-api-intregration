/** @format */
"use client";
import LoadingScreen from "@/components/CommonComponents/LoadingScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Get auth state from Redux
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!authLoading) {
      if (isAuthenticated && user) {
        // Redirect based on role
        if (user.role === "technician") {
          router.push("/overviews");
        } else {
          router.push("/overview");
        }
      } else {
        // No auth, redirect to sign in
        router.push("/sign-in");
      }
      setIsLoading(false);
    }
  }, [authLoading, isAuthenticated, user, router]);

  if (isLoading || authLoading) {
    return <LoadingScreen />;
  }

  return null;
}
