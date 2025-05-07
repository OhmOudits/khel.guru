import Frame from "./Frame";
import { initializeRouletteSocket } from "../../../socket/games/roulette";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";

const Roulette = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeRouletteSocket(token);
    }
  }, [socket, token]);

  return (
    <div className="w-full bg-secondry ">
      <div className="max-w-[1200px] mx-auto">
        <Frame />
      </div>
    </div>
  );
};

export default Roulette;
