import { useSelector } from "react-redux";
import Frame from "./Frame";
import { getSocket } from "../../../socket/socket";
import { initializePlinkoSocket } from "../../../socket/games/plinko";
import { useEffect } from "react";

const Plinko = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializePlinkoSocket(token);
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

export default Plinko;
