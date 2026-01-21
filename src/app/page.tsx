/** @format */
"use client";
import LoadingScreen from "@/components/CommonComponents/LoadingScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");

      if (user && token) {
        const userData = JSON.parse(user);
        // Redirect based on role
        if (userData.role === "technician") {
          router.push("/overviews");
        } else {
          router.push("/overview");
        }
      } else {
        // No auth, redirect to sign in
        router.push("/sign-in");
      }

      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
}
