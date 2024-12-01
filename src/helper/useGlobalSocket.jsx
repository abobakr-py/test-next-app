'use client'
import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://dev.api.sabika.app";

export const useGlobalSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    if (!socketRef.current) {
      console.log("Initializing new socket connection.");
      const socket = io(SOCKET_SERVER_URL, {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        setConnectionStatus("Connected");
        console.log("Connected to the server.");
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.on("disconnect", () => {
        setConnectionStatus("Disconnected");
        console.log("Disconnected from the server.");
      });
    }
  }, []);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null; // Reset the reference to avoid reconnecting accidentally
      setConnectionStatus("Disconnected");
      console.log("Manually disconnected from the server.");
    }
  }, []);

  const addEventListener = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  const removeEventListener = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null; // Clean up the socket reference on unmount
        setConnectionStatus("Disconnected");
        console.log("Socket connection cleaned up on component unmount.");
      }
    };
  }, [connectSocket]);

  return {
    connectSocket,
    disconnectSocket,
    addEventListener,
    removeEventListener,
    connectionStatus,
  };
};
