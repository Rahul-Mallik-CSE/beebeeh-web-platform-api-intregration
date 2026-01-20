/** @format */
"use client";
import LoadingScreen from "@/components/CommonComponents/LoadingScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push("/overview");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
}
