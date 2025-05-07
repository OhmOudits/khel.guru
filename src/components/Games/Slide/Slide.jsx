import { useSelector } from "react-redux";
import SlideFrame from "./Frame";
import { getSocket } from "../../../socket/socket";
import { useEffect } from "react";
import { initializeSlideSocket } from "../../../socket/games/slide";

const SlidePage = () => {
  const token = useSelector((state) => state.auth?.token);
  const socket = getSocket();

  useEffect(() => {
    if (token && socket) {
      initializeSlideSocket(token);
    }
  }, [socket, token]);

  return (
    <div className="w-full bg-secondry">
      <div className="max-w-[1200px] mx-auto">
        <SlideFrame />
      </div>
    </div>
  );
};

export default SlidePage;
