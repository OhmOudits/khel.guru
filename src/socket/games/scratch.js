import { io } from "socket.io-client";

let scratchSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeScratchSocket = (token) => {
  scratchSocket = io(`${API_URL}/scratch`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  scratchSocket.on("connect", () => {
    console.log("Scratch namespace connected successfully");
  });

  scratchSocket.on("connect_error", (error) => {
    console.error("Scratch namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Scratch socket");
      disconnectScratchSocket();
    }
  });

  scratchSocket.on("disconnect", () => {
    console.log("Scratch namespace disconnected");
  });
};

export const getScratchSocket = () => {
  return scratchSocket;
};

export const disconnectScratchSocket = () => {
  if (scratchSocket) {
    scratchSocket.disconnect();
    scratchSocket = null;
  }
};
