import { io } from "socket.io-client";

let parachuteSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeParachuteSocket = (token) => {
  parachuteSocket = io(`${API_URL}/parachute`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  parachuteSocket.on("connect", () => {
    console.log("Parachute namespace connected successfully");
  });

  parachuteSocket.on("connect_error", (error) => {
    console.error("Parachute namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting parachute socket");
      disconnectParachuteSocket();
    }
  });

  parachuteSocket.on("disconnect", () => {
    console.log("Parachute namespace disconnected");
  });
};

export const getParachuteSocket = () => {
  return parachuteSocket;
};

export const disconnectParachuteSocket = () => {
  if (parachuteSocket) {
    parachuteSocket.disconnect();
    parachuteSocket = null;
  }
};
