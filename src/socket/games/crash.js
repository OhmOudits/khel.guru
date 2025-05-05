import { io } from "socket.io-client";

let crashSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeCrashSocket = (token) => {
  crashSocket = io(`${API_URL}/crash`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  crashSocket.on("connect", () => {
    console.log("crash namespace connected successfully");
  });

  crashSocket.on("connect_error", (error) => {
    console.error("Crash namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Crash socket");
      disconnectCrashSocket();
    }
  });

  crashSocket.on("disconnect", () => {
    console.log("Crash namespace disconnected");
  });
};

export const getCrashSocket = () => {
  return crashSocket;
};

export const disconnectCrashSocket = () => {
  if (crashSocket) {
    crashSocket.disconnect();
    crashSocket = null;
  }
};
