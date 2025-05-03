import { useEffect } from "react";
import Frame from "./Frame";
import { initializeParachuteSocket } from "../../../socket/games/parachute";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";

const Balloon = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeParachuteSocket(token);
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

export default Balloon;
