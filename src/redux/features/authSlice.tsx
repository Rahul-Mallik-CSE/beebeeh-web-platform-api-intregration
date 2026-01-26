/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  role: string;
  profile_image: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true to check localStorage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>,
    ) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;

      // Also save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    initializeAuth: (state) => {
      // Check localStorage on app initialization
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (userData && accessToken) {
          try {
            const user = JSON.parse(userData);
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            // Clear corrupted data
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }
      }
      state.isLoading = false;
    },
  },
});

export const { setCredentials, setUser, setLoading, logout, initializeAuth } =
  authSlice.actions;

export default authSlice.reducer;
