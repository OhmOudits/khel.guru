import { useState, useCallback, useEffect } from "react";
import { RouletteWheel } from "./comp/roulettewheel";
import { BettingBoard } from "./comp/BettingBoard";

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

    setCurrentBets((prev) => ({
      ...prev,
      [number]: (prev[number] || 0) + betAmount,
    }));

    // eslint-disable-next-line
  }, []);

  return (
    <div className="text-white p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-5 max-lg:mb-0">
          <p className="text-xl">Number: {currentNumber}</p>
        </div>

        <div className="flex max-lg:scale-[.8] flex-col items-center mb-8">
          <RouletteWheel spinning={spinning} currentNumber={currentNumber} />
        </div>

        <BettingBoard onPlaceBet={handlePlaceBet} currentBets={currentBets} />
      </div>
    </div>
  );
}

export default Game;
