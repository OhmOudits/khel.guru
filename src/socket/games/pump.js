import { io } from "socket.io-client";

let pumpSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializePumpSocket = (token) => {
  pumpSocket = io(`${API_URL}/pump`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  pumpSocket.on("connect", () => {
    console.log("Pump namespace connected successfully");
  });

  pumpSocket.on("connect_error", (error) => {
    console.error("Pump namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Pump socket");
      disconnectPumpSocket();
    }
  });

  pumpSocket.on("disconnect", () => {
    console.log("Pump namespace disconnected");
  });
};

export const getPumpSocket = () => {
  return pumpSocket;
};

export const disconnectPumpSocket = () => {
  if (pumpSocket) {
    pumpSocket.disconnect();
    pumpSocket = null;
  }
};
