import { useState, useCallback, useEffect } from "react";
import { BettingBoard } from "./comp/BettingBoard";
import Roulette from "./comp/roulettewheel";

// eslint-disable-next-line
function Game({ betStarted, setBettingStarted }) {
  const [spinning, setSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentBets, setCurrentBets] = useState({});

  console.log(betStarted);
  useEffect(() => {
    if (betStarted) {
      handleSpin();
    }

    // eslint-disable-next-line
  }, [betStarted]);

  const handleSpin = useCallback(() => {
    console.log("triggering", betStarted);
    if (spinning) return;
    setBettingStarted(true);
    setSpinning(true);

    const randomNumber = Math.floor(Math.random() * 37);
    setCurrentNumber(randomNumber);

    setTimeout(() => {
      setSpinning(false);
      setBettingStarted(false);
      setCurrentBets({});
    }, 4000);

    // eslint-disable-next-line
  }, [spinning, betStarted]);

  const handlePlaceBet = useCallback((number) => {
    if (spinning) return;
    const betAmount = 10;

    if (number === "clear") {
      setCurrentBets([]);
    }

    setCurrentBets((prev) => ({
      ...prev,
      [number]: (prev[number] || 0) + betAmount,
    }));

    // eslint-disable-next-line
  }, []);

  const redNumbers = [
    32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
  ];

  return (
    <div className="text-white w-full py-8 max-h-[600px] relative">
      <div className="w-full mx-auto">
        <div className="flex scale-75 mt-[-50px] mb-[-10px] flex-col items-center">
          <Roulette
            redNumbers={redNumbers}
            spinning={spinning}
            currentNumber={currentNumber}
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
