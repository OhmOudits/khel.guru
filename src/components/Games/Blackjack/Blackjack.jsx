import { useSelector } from "react-redux";
import Frame from "./Frame";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";
import "./styles.css";
import { initializeBlackjackSocket } from "../../../socket/games/blackjack";

const Baccarat = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeBlackjackSocket(token);
    }
  }, [socket, token]);

  return (
    <div className="w-full bg-secondry">
      <div className="max-w-[1200px] mx-auto">
        <Frame />
      </div>
    </div>
  );
};

export default Baccarat;
