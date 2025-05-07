import Frame from "./Frame";
import "../../../styles/Scratch.css";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { initializeScratchSocket } from "../../../socket/games/scratch";

const BallonScratch = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeScratchSocket(token);
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

export default BallonScratch;
