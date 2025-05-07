import { BettingBoard } from "./comp/BettingBoard";
import Roulette from "./comp/roulettewheel";
import { toast } from "react-toastify";
import {
  disconnectRouletteSocket,
  getRouletteSocket,
} from "../../../socket/games/roulette";
import { useEffect } from "react";

function Game({
  // eslint-disable-next-line
  betStarted,
  // eslint-disable-next-line
  setBettingStarted,
  // eslint-disable-next-line
  nbets,
  // eslint-disable-next-line
  startAutoBet,
  // eslint-disable-next-line
  setStartAutoBet,
  // eslint-disable-next-line
  currentBets,
  // eslint-disable-next-line
  setCurrentBets,
}) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const rouletteSocket = getRouletteSocket();

      if (rouletteSocket) {
        rouletteSocket.on("error", ({ message }) => {
          console.error("Join game error:", message);
          toast.error(`Error joining game: ${message}`);
        });
      }
    }

    return () => {
      const rouletteSocket = getRouletteSocket();
      if (rouletteSocket) {
        rouletteSocket.off("error");
      }
      disconnectRouletteSocket();
    };
  }, []);

  const handlePlaceBet = (number) => {
    console.log("betStarted:", betStarted, "startAutoBet:", startAutoBet);

    if (betStarted || startAutoBet) {
      console.log("Cannot place bet while betting is active.");
      return;
    }

    const betAmount = 10;

    if (number === "clear") {
      setCurrentBets([]);
    }

    setCurrentBets((prev) => ({
      ...prev,
      [number]: (prev[number] || 0) + betAmount,
    }));
  };

  const redNumbers = [
    32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
  ];

  return (
    <div className="text-white w-full py-8 max-h-[600px] relative">
      <div className="w-full mx-auto">
        <div className="flex scale-75 mt-[-50px] mb-[-10px] flex-col items-center">
          <Roulette
            redNumbers={redNumbers}
            nbets={nbets}
            setStartAutoBet={setStartAutoBet}
            startAutoBet={startAutoBet}
            betStarted={betStarted}
            setBettingStarted={setBettingStarted}
          />
        </div>

        <BettingBoard
          red={redNumbers}
          onPlaceBet={handlePlaceBet}
          currentBets={currentBets}
        />
      </div>
    </div>
  );
}

export default Game;
