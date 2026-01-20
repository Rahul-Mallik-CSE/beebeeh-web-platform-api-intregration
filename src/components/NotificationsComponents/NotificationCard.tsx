/** @format */

import { CheckSquare } from "lucide-react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Notification } from "@/types/AllTypes";
import { cn } from "@/lib/utils";
import { FaUserCheck } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const getIconAndColor = (type: string) => {
    switch (type) {
      case "schedule":
        return {
          icon: IoCalendarNumber,
          bgColor: "bg-[#00B69B26]",
          iconColor: "text-[#00B69B]",
        };
      case "admin":
        return {
          icon: FaUserCheck,
          bgColor: "bg-[#4285F426]",
          iconColor: "text-[#4285F4]",
        };
      case "report":
        return {
          icon: BsFillBookmarkCheckFill,
          bgColor: "bg-[#7738F826]",
          iconColor: "text-[#7738F8]",
        };
      case "checklist":
        return {
          icon: CheckSquare,
          bgColor: "bg-purple-100",
          iconColor: "text-purple-600",
        };
      default:
        return {
          icon: FaUserCheck,
          bgColor: "bg-[#4285F426]",
          iconColor: "text-[#4285F4]",
        };
    }
  };

  const { icon: Icon, bgColor, iconColor } = getIconAndColor(notification.type);

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
      <div
        className={cn(
          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0",
          bgColor
        )}
      >
        <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
          {notification.title}
        </p>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base">
          {notification.time}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
