import Frame from "./Frame";
import { initializeBaccaratSocket } from "../../../socket/games/baccarat";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";

const Baccarat = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeBaccaratSocket(token);
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
