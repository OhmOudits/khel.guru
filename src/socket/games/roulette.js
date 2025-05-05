import { io } from "socket.io-client";

let rouletteSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeRouletteSocket = (token) => {
  rouletteSocket = io(`${API_URL}/roulette`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  rouletteSocket.on("connect", () => {
    console.log("Roulette namespace connected successfully");
  });

  rouletteSocket.on("connect_error", (error) => {
    console.error("Roulette namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Roulette socket");
      disconnectRouletteSocket();
    }
  });

  rouletteSocket.on("disconnect", () => {
    console.log("Roulette namespace disconnected");
  });
};

export const getRouletteSocket = () => {
  return rouletteSocket;
};

export const disconnectRouletteSocket = () => {
  if (rouletteSocket) {
    rouletteSocket.disconnect();
    rouletteSocket = null;
  }
};
