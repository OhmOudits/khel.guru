import { io } from "socket.io-client";

let limboSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeLimboSocket = (token) => {
  limboSocket = io(`${API_URL}/limbo`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  limboSocket.on("connect", () => {
    console.log("Limbo namespace connected successfully");
  });

  limboSocket.on("connect_error", (error) => {
    console.error("Limbo namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Limbo socket");
      disconnectLimboSocket();
    }
  });

  limboSocket.on("disconnect", () => {
    console.log("Limbo namespace disconnected");
  });
};

export const getLimboSocket = () => {
  return limboSocket;
};

export const disconnectLimboSocket = () => {
  if (limboSocket) {
    limboSocket.disconnect();
    limboSocket = null;
  }
};
