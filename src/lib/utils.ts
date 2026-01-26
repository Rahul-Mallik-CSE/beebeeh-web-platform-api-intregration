/** @format */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageFullUrl = (
  imagePath: string | null | undefined,
): string => {
  if (!imagePath) return "";

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://l9vtwvjb-8001.inc1.devtunnels.ms";

  // If it's already a full URL, return as is unless it's localhost dev URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    if (imagePath.startsWith("http://localhost:8001")) {
      return imagePath.replace("http://localhost:8001", baseUrl);
    }
    return imagePath;
  }

  // If it starts with /media, prepend the backend URL
  if (imagePath.startsWith("/media")) {
    return `${baseUrl}${imagePath}`;
  }

  // Otherwise return as is (for paths like /hero.jpg)
  return imagePath;
};
