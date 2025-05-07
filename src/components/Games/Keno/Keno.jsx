import { useSelector } from "react-redux";
import { getSocket } from "../../../socket/socket";
import Frame from "./Frame";
import { initializeKenoSocket } from "../../../socket/games/keno";
import { useEffect } from "react";

const Keno = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeKenoSocket(token);
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

export default Keno;
