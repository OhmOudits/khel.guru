import { useSelector } from "react-redux";
import DiceFrame from "./Frame";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";
import { initializeDiceSocket } from "../../../socket/games/dice";

const DicePage = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeDiceSocket(token);
    }
  }, [socket, token]);

  return (
    <div className="w-full bg-secondry">
      <div className="max-w-[1200px] mx-auto">
        <DiceFrame />
      </div>
    </div>
  );
};

export default DicePage;
