import { io } from "socket.io-client";

let hiloSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeHiloSocket = (token) => {
  hiloSocket = io(`${API_URL}/hilo`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  hiloSocket.on("connect", () => {
    console.log("Hilo namespace connected successfully");
  });

  hiloSocket.on("connect_error", (error) => {
    console.error("Hilo namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Hilo socket");
      disconnectHiloSocket();
    }
  });

  hiloSocket.on("disconnect", () => {
    console.log("Hilo namespace disconnected");
  });
};

export const getHiloSocket = () => {
  return hiloSocket;
};

export const disconnectHiloSocket = () => {
  if (hiloSocket) {
    hiloSocket.disconnect();
    hiloSocket = null;
  }
};
