/** @format */
"use client";
import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Calendar,
} from "lucide-react";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { VscTools } from "react-icons/vsc";
import { LiaUserCogSolid } from "react-icons/lia";
import { Button } from "../ui/button";
import LogoutModal from "./LogOutModal";
import { PiSuitcaseSimple } from "react-icons/pi";
import { GiAutoRepair } from "react-icons/gi";
import { BsBox } from "react-icons/bs";
import { AiFillTool } from "react-icons/ai";
import { GrUserWorker, GrVmMaintenance } from "react-icons/gr";
import { logout } from "@/services/authService";

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const isCollapsed = state === "collapsed";

  //Get user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserRole(user.role);
          console.log("User role loaded:", user.role);
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserRole("admin"); // fallback
        }
      } else {
        setUserRole("admin"); // fallback if no user data
      }
    }
  }, []);

  // Admin navigation items
  const adminNavItems = [
    {
      href: "/overview",
      icon: LayoutGrid,
      label: "Overview",
    },
    {
      href: "/my-jobs",
      icon: PiSuitcaseSimple,
      label: "My Jobs",
    },
    {
      href: "/clients",
      icon: LiaUserCogSolid,
      label: "Clients",
    },
    {
      href: "/technicians",
      icon: GrUserWorker,
      label: "Technicians",
    },
    {
      href: "/products",
      icon: BsBox,
      label: "Products",
    },
    {
      href: "/parts",
      icon: AiFillTool,
      label: "Parts",
    },
    {
      href: "/installation",
      icon: VscTools,
      label: "Installation",
    },
    {
      href: "/repairs",
      icon: GiAutoRepair,
      label: "Repairs",
    },
    {
      href: "/maintenance",
      icon: GrVmMaintenance,
      label: "Maintenance",
    },
    {
      href: "/report-module",
      icon: LuChartNoAxesCombined,
      label: "Report Module",
    },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  // Technician navigation items
  const technicianNavItems = [
    {
      href: "/overviews",
      icon: LayoutGrid,
      label: "Overviews",
    },
    {
      href: "/todays-jobs",
      icon: Calendar,
      label: "Today's Jobs",
    },
    {
      href: "/all-jobs",
      icon: Briefcase,
      label: "All Jobs",
    },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  // Select navigation items based on user role
  // If userRole is null (still loading), return empty array to avoid showing wrong nav
  const navItems = !userRole
    ? []
    : userRole === "technician"
      ? technicianNavItems
      : adminNavItems;

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

  // Add console.log to debug
  console.log("Current userRole:", userRole);
  console.log("NavItems count:", navItems.length);

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
    <>
      {/* Sidebar content goes here */}
      <Sidebar
        className="shadow-none px-3 py-4 md:px-2 bg-white border-r border-gray-200"
        collapsible="icon"
      >
        <SidebarContent className="bg-white rounded-tr-xl shadow-none">
          <div
            className={`mb-2 flex h-20 items-end justify-start rounded-md bg-[#9E2729] md:h-40 ${
              isCollapsed
                ? " flex items-center w-full justify-center mx-auto p-1 "
                : "gap-2"
            }`}
          >
            <Link href="/overview" className="flex gap-2 ">
              {isCollapsed ? (
                <h1 className="mt-2 mb-3 font-bold text-sm text-white rounded-full px-1 border-2 border-gray-200">
                  B
                </h1>
              ) : (
                // <div className="mt-2 flex items-center gap-2">
                //   <Image src="/logo.png" alt="Logo" width={70} height={70} />
                // </div>
                <div className="pl-4 flex flex-col justify-center items-center">
                  {/* Logo dots */}
                  <div className="flex gap-0.5 sm:gap-1 justify-center mb-1 ">
                    <div className="w-8 h-4 sm:w-6 sm:h-3 rounded-full bg-white"></div>
                    <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                    <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                    <div className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-white"></div>
                  </div>

                  {/* Beebeeh text */}
                  <h1 className="text-xl  font-bold text-white mb-3 sm:mb-4">
                    Beebeeh
                  </h1>
                </div>
              )}
            </Link>
            {/* Toggle button for mobile */}

            {/* Collapse button for desktop */}
            <div
              className={`absolute top-6 hidden md:block ${
                isCollapsed ? "right-2" : "right-2"
              }`}
            >
              <SidebarTrigger className="text-white hover:bg-transparent hover:text-white" />
            </div>
          </div>
          <SidebarMenu
            className={
              isCollapsed
                ? "px-2 space-y-1 items-center"
                : "md:px-1 space-y-0.5"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={
                  !!(
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                  )
                }
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="pb-4 bg-white rounded-br-2xl shadow-none">
          {/* Footer content can go here if needed */}
          <div className="w-full flex justify-center">
            <Button
              variant="default"
              size="sm"
              className={cn(
                "flex text-black grow items-center justify-center bg-gray-50 font-medium hover:bg-[#F5E9EA] hover:text-[#9E2729]",
                isCollapsed
                  ? "rounded-md w-8 h-8 p-0"
                  : "h-10 md:h-12 w-full gap-2 rounded-md p-3",
              )}
              onClick={() => setIsLogoutModalOpen(true)}
            >
              {isCollapsed ? (
                <LogOut size={20} />
              ) : (
                <>
                  <LogOut size={18} />
                  <span className="text-base">Log Out</span>
                </>
              )}
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 h-10 md:h-12 rounded-md p-3 transition-colors text-sm",
            active
              ? "bg-[#9E2729]  text-white hover:bg-[#9E2729]! hover:text-white! font-medium"
              : "text-gray-700  hover:bg-[#F5E9EA]! hover:text-[#9E2729]!  font-medium",
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
