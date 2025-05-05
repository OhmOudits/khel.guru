import { io } from "socket.io-client";

let twistSocket = null;
const API_URL = import.meta.env.VITE_APP_SOCKET_URL;

export const initializeTwistSocket = (token) => {
  twistSocket = io(`${API_URL}/twist`, {
    auth: {
      token: token,
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 3,
  });

  twistSocket.on("connect", () => {
    console.log("Twist namespace connected successfully");
  });

  twistSocket.on("connect_error", (error) => {
    console.error("Twist namespace connection error:", error);
    if (
      error.message === "Authentication required" ||
      error.message === "Invalid token"
    ) {
      console.log("Authentication failed, disconnecting Twist socket");
      disconnectTwistSocket();
    }
  });

  twistSocket.on("disconnect", () => {
    console.log("Twist namespace disconnected");
  });
};

export const getTwistSocket = () => {
  return twistSocket;
};

export const disconnectTwistSocket = () => {
  if (twistSocket) {
    twistSocket.disconnect();
    twistSocket = null;
  }
};
