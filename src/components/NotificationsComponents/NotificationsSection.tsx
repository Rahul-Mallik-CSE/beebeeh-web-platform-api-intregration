/** @format */
"use client";
import React from "react";
import NotificationCard from "./NotificationCard";
import { useWebSocketNotifications } from "@/hooks/useWebSocketNotifications";
import { Loader2 } from "lucide-react";
import { useGetNotificationsQuery } from "@/redux/features/notificationAPI";

const NotificationsSection = () => {
  const {
    notifications: wsNotifications,
    isConnected,
    connectionStatus,
  } = useWebSocketNotifications();
  const { data: apiData, isLoading: apiLoading } = useGetNotificationsQuery({
    limit: 50,
  });

  // Combine API notifications and WebSocket notifications, avoiding duplicates
  const apiNotifications = apiData?.data || [];
  const allNotifications = [
    ...apiNotifications,
    ...wsNotifications.filter(
      (ws) => !apiNotifications.find((api) => api.id === ws.id),
    ),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  console.log("NotificationsSection: Rendering with", {
    apiNotificationsCount: apiNotifications.length,
    wsNotificationsCount: wsNotifications.length,
    allNotificationsCount: allNotifications.length,
    isConnected,
    connectionStatus,
  });

  // Show loading if API is loading
  if (apiLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading notifications...</span>
      </div>
    );
  }

  // Only show notifications if we have data
  const shouldShowNotifications = allNotifications.length > 0;

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
            {allNotifications.length} notification
            {allNotifications.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Notifications List */}
      {!shouldShowNotifications ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {isConnected ? "No notifications yet" : "Loading notifications..."}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {isConnected
              ? "New notifications will appear here"
              : "Please wait while we load your notifications"}
          </p>
        </div>
      ) : (
        allNotifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationsSection;
