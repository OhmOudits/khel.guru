import Frame from "./Frame";
import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import { initializeMinesSocket } from "../../../socket/games/mines";
import { useEffect } from "react";

const Diamond = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeMinesSocket(token);
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

export default Diamond;
