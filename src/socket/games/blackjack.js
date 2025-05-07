import { io } from "socket.io-client";

let blackjackSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeBlackjackSocket = (token) => {
  blackjackSocket = io(`${API_URL}/blackjack`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  blackjackSocket.on("connect", () => {
    console.log("Blackjack namespace connected successfully");
  });

  blackjackSocket.on("connect_error", (error) => {
    console.error("Blackjack namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Blackjack socket");
      disconnectBlackjackSocket();
    }
  });

  blackjackSocket.on("disconnect", () => {
    console.log("Blackjack namespace disconnected");
  });
};

export const getBlackjackSocket = () => {
  return blackjackSocket;
};

export const disconnectBlackjackSocket = () => {
  if (blackjackSocket) {
    blackjackSocket.disconnect();
    blackjackSocket = null;
  }
};
