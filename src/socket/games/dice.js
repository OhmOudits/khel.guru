import { io } from "socket.io-client";

let diceSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeDiceSocket = (token) => {
  diceSocket = io(`${API_URL}/dice`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  diceSocket.on("connect", () => {
    console.log("Dice namespace connected successfully");
  });

  diceSocket.on("connect_error", (error) => {
    console.error("Dice namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Dice socket");
      disconnectDiceSocket();
    }
  });

  diceSocket.on("disconnect", () => {
    console.log("Dice namespace disconnected");
  });
};

export const getDiceSocket = () => {
  return diceSocket;
};

export const disconnectDiceSocket = () => {
  if (diceSocket) {
    diceSocket.disconnect();
    diceSocket = null;
  }
};
