/** @format */
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "@/redux/features/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  return null; // This component doesn't render anything
}
