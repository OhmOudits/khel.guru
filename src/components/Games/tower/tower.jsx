import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import Frame from "./Frame";
import { useEffect } from "react";
import { initializeTowerSocket } from "../../../socket/games/tower";

const Tower = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeTowerSocket(token);
    }
  }, [socket, token]);

  return (
    <div className="w-full bg-secondry min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <Frame />
      </div>
    </div>
  );
};

export default Tower;
