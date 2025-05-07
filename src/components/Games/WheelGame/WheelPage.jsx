import Frame from "./Frame";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { initializeWheelSocket } from "../../../socket/games/wheel";
import { useEffect } from "react";

const WheelPage = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeWheelSocket(token);
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

export default WheelPage;
