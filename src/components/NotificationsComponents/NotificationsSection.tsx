/** @format */
"use client";
import React from "react";
import NotificationCard from "./NotificationCard";
import { useWebSocketNotifications } from "@/hooks/useWebSocketNotifications";
import { Loader2 } from "lucide-react";

const NotificationsSection = () => {
  const { notifications, isConnected, connectionStatus } =
    useWebSocketNotifications();

  console.log("NotificationsSection: Rendering with", {
    notificationsCount: notifications.length,
    isConnected,
    connectionStatus,
    notifications: notifications.map((n) => ({ id: n.id, message: n.message })),
  });

  // Only show notifications if WebSocket is connected and we have data
  const shouldShowNotifications = isConnected && notifications.length > 0;

  if (connectionStatus === "no_token") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-red-500 mb-2">Authentication Required</p>
          <p className="text-gray-500 text-sm">
            Please log in to receive notifications
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Connection Status Indicator */}
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
        {shouldShowNotifications && (
          <span className="text-sm text-gray-500">
            {notifications.length} notification
            {notifications.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Notifications List - Only show if connected and have notifications */}
      {!shouldShowNotifications ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {isConnected ? "No notifications yet" : "Waiting for connection..."}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {isConnected
              ? "New notifications will appear here"
              : "Please wait while we connect"}
          </p>
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationsSection;
