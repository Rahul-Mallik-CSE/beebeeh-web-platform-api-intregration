/** @format */
"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { NotificationType } from "@/types/AllTypes";

interface NotificationPayload {
  job_type?: string;
  action?: string;
  job_id?: string;
  object_id?: string;
  status?: string;
  scheduled_date?: string;
  scheduled_time?: string;
}

interface WebSocketNotification {
  id: string;
  type: NotificationType;
  message: string;
  payload: NotificationPayload;
  created_at: string;
  is_read: boolean;
}

interface UseWebSocketNotificationsReturn {
  notifications: WebSocketNotification[];
  isConnected: boolean;
  connectionStatus: string;
}

export const useWebSocketNotifications =
  (): UseWebSocketNotificationsReturn => {
    const [notifications, setNotifications] = useState<WebSocketNotification[]>(
      [],
    );
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("disconnected");
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;

    // Clear any cached notifications on initialization
    useEffect(() => {
      console.log(
        "WebSocket Hook: Initializing, clearing any cached notifications",
      );
      setNotifications([]);
    }, []);

    const getWebSocketUrl = useCallback(() => {
      // Get token from localStorage
      const token = localStorage.getItem("accessToken");
      if (!token) {

        return null;
      }

      // Use the provided WebSocket URL with token
      return `ws://l9vtwvjb-8001.inc1.devtunnels.ms/ws/notifications/?token=${token}`;
    }, []);

    const connectWebSocket = useCallback(() => {
      const wsUrl = getWebSocketUrl();
      if (!wsUrl) {
        setConnectionStatus("no_token");
        return;
      }

      try {
        setConnectionStatus("connecting");
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log("WebSocket connected for notifications");
          setIsConnected(true);
          setConnectionStatus("connected");
          reconnectAttempts.current = 0;
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
            console.log(
              "Current notifications count before adding:",
              notifications.length,
            );

            // Handle connection confirmation
            if (data.type === "connected") {
              console.log("WebSocket connection confirmed");
              return;
            }

            // Handle notification messages
            if (data.id && data.message) {
              console.log("Processing notification message:", data);
              const notification: WebSocketNotification = {
                id: data.id,
                type: (data.type as NotificationType) || "admin",
                message: data.message,
                payload: data.payload || {},
                created_at: data.created_at,
                is_read: data.is_read || false,
              };

              console.log("Adding notification to state:", notification);
              // Add to notifications list
              setNotifications((prev) => {
                const newNotifications = [notification, ...prev];
                console.log(
                  "New notifications array length:",
                  newNotifications.length,
                );
                return newNotifications;
              });

              // Show toast notification
              toast.info(notification.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            } else {
              console.log("Received message but not a notification:", data);
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason);
          setIsConnected(false);
          wsRef.current = null;

          // Attempt to reconnect if not a normal closure
          if (
            event.code !== 1000 &&
            reconnectAttempts.current < maxReconnectAttempts
          ) {
            setConnectionStatus("reconnecting");
            reconnectAttempts.current += 1;
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket();
            }, 3000 * reconnectAttempts.current); // Exponential backoff
          } else {
            setConnectionStatus("disconnected");
          }
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setConnectionStatus("error");
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
        setConnectionStatus("error");
      }
    }, [getWebSocketUrl]);

    const disconnectWebSocket = useCallback(() => {
      if (wsRef.current) {
        wsRef.current.close(1000, "Component unmounting");
        wsRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      setIsConnected(false);
      setConnectionStatus("disconnected");
    }, []);

    useEffect(() => {
      connectWebSocket();

      return () => {
        disconnectWebSocket();
      };
    }, [connectWebSocket, disconnectWebSocket]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };
    }, []);

    return {
      notifications,
      isConnected,
      connectionStatus,
    };
  };
