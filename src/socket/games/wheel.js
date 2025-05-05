import { io } from "socket.io-client";

let wheelSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeWheelSocket = (token) => {
  wheelSocket = io(`${API_URL}/wheel`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  wheelSocket.on("connect", () => {
    console.log("Wheel namespace connected successfully");
  });

  wheelSocket.on("connect_error", (error) => {
    console.error("Wheel namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Wheel socket");
      disconnectWheelSocket();
    }
  });

  wheelSocket.on("disconnect", () => {
    console.log("Wheel namespace disconnected");
  });
};

export const getWheelSocket = () => {
  return wheelSocket;
};

export const disconnectWheelSocket = () => {
  if (wheelSocket) {
    wheelSocket.disconnect();
    wheelSocket = null;
  }
};
