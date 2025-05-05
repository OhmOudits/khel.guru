import { io } from "socket.io-client";

let slideSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeSlideSocket = (token) => {
  slideSocket = io(`${API_URL}/slide`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  slideSocket.on("connect", () => {
    console.log("Slide namespace connected successfully");
  });

  slideSocket.on("connect_error", (error) => {
    console.error("Slide namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Slide socket");
      disconnectSlideSocket();
    }
  });

  slideSocket.on("disconnect", () => {
    console.log("Slide namespace disconnected");
  });
};

export const getSlideSocket = () => {
  return slideSocket;
};

export const disconnectSlideSocket = () => {
  if (slideSocket) {
    slideSocket.disconnect();
    slideSocket = null;
  }
};
