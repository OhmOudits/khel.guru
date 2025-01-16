import { useState, useCallback, useEffect, useRef } from "react";
import { BettingBoard } from "./comp/BettingBoard";
import Roulette from "./comp/roulettewheel";

// eslint-disable-next-line
function Game({ betStarted, setBettingStarted, mode, nbets, startAutoBet }) {
  const [spinning, setSpinning] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentBets, setCurrentBets] = useState({});
  const [autoMode, setAutoMode] = useState(false);
  const autoBetCount = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (betStarted) {
      handleSpin();
    }
  }, [betStarted]);

  useEffect(() => {
    if (mode === "auto" && startAutoBet) {
      setAutoMode(true);
      autoBetCount.current = 0;

      if (nbets === 0) {
        intervalRef.current = setInterval(() => {
          handleSpin();
        }, 100);
      } else {
        const autoPlay = async () => {
          while (autoBetCount.current < nbets) {
            await new Promise((resolve) => {
              handleSpin();
              setTimeout(resolve, 1000);
            });
            autoBetCount.current += 1;
          }
          setAutoMode(false);
        };
        autoPlay();
      }
    } else {
      setAutoMode(false);
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [mode, nbets, startAutoBet]);

  const handleSpin = useCallback(() => {
    if (spinning) return;

    setBettingStarted(true);
    setSpinning(true);

    const randomNumber = Math.floor(Math.random() * 37);
    setCurrentNumber(randomNumber);

    setTimeout(() => {
      setSpinning(false);
      setBettingStarted(false);
      setCurrentBets({});
      setCurrentNumber(-1);

      if (autoMode && nbets !== 0) {
        autoBetCount.current += 1;
      }
    }, 5000);

    // eslint-disable-next-line
  }, [spinning, autoMode, nbets]);

  const handlePlaceBet = useCallback((number) => {
    if (spinning) return;
    const betAmount = 10;

    if (number === "clear") {
      setCurrentBets([]);
      return;
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
