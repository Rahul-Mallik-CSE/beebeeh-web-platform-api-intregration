/** @format */
"use client";

import { Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCog, Key, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogoutModal from "./LogOutModal";
import { SidebarTrigger } from "../ui/sidebar";
import { logout } from "@/services/authService";

interface User {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  role: string;
  profile_image: string;
}

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    // Clear all localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Clear cookies
    await logout();

    console.log("Logging out...");
    setIsLogoutModalOpen(false);
    router.push("/sign-in");
  };
  if (
    pathname == "/" ||
    pathname == "/sign-in" ||
    pathname == "/sign-up" ||
    pathname == "/create-new-pass" ||
    pathname == "/reset-pass" ||
    pathname == "/verify-email" ||
    pathname == "/verify-otp"
  )
    return null;
  return (
    <div className="w-full sticky top-0 z-9 px-2 sm:px-4">
      <div className="max-w-[2500px] rounded-2xl mx-auto flex items-center justify-between bg-white border border-gray-200 px-3 sm:px-4 md:px-6 py-3">
        <div className="flex gap-2 items-center">
          {/* mobile menu button */}
          <div className=" rounded-sm  md:hidden">
            <SidebarTrigger />
          </div>
          {/* Left side - Title */}
          <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl 2xl:text-3xl font-bold text-gray-800 truncate">
            Admin Dashboard
          </h1>
        </div>
        {/* Right side - Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Notification Bell */}
          <button
            onClick={() => router.push("/notifications")}
            className="cursor-pointer relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 sm:gap-2 hover:bg-gray-50 rounded-lg px-1 sm:px-2 py-1 transition-colors shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-800 flex items-center justify-center overflow-hidden shrink-0">
                {user?.profile_image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profile_image}`}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-lg">
                    {user?.full_name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-800">
                  {user?.full_name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "Role"}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                <UserCog className="w-5 h-5 text-blue-500" />
                <span className="text-base">Manage Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                <Key className="w-5 h-5 text-pink-500" />
                <span className="text-base">Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsLogoutModalOpen(true)}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-base">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default NavBar;
