import React, { useState, useEffect, useRef } from "react";

const Game = ({
  rollover,
  setRollover,
  fixedPosition,
  setFixedPosition,
  gameResult,
  setGameResult,
  dicePosition,
  setDicePosition,
  Start,
  rollUnder,
  setMultiplier,
  calculateMultiplier,
  winChance,
  targetPosition,
}) => {
  const draggingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [resultValue, setResultValue] = useState(null);

  const handleMouseDown = () => {
    if (!Start && !isAnimating) {
      draggingRef.current = true;
    }
  };

  useEffect(() => {
    setFixedPosition(rollover);
  }, [rollover]);

  const handleMouseMove = (e) => {
    if (draggingRef.current && !Start && !isAnimating) {
      const rect = e.target.parentElement.getBoundingClientRect();
      setGameResult("");
      setResultValue(null);

      let newLeft = ((e.clientX - rect.left) / rect.width) * 100;
      newLeft = Math.max(0, Math.min(100, newLeft));
      const roundedLeft = Math.round(newLeft * 10) / 10;

      setFixedPosition(roundedLeft);
      setRollover(roundedLeft);
      const newMultiplier = calculateMultiplier(winChance);
      setMultiplier(parseFloat(newMultiplier).toFixed(2));
      setDicePosition(roundedLeft);
    }
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    if (Start && targetPosition !== null) {
      setDicePosition(targetPosition);
      setResultValue({
        percentage: targetPosition.toFixed(1),
        multiplier: parseFloat(calculateMultiplier(winChance)).toFixed(2),
      });
    }
  }, [Start, targetPosition, winChance]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[450px] bg-gray-900 text-white">
        <div className="relative w-full max-w-2xl flex justify-between px-2 text-sm mb-1">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>

        <div
          className="relative w-full max-w-2xl h-16 bg-gray-700 rounded-lg overflow-x-hidden overflow-y-visible"
          onMouseMove={handleMouseMove}
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2 ${
              rollUnder ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${fixedPosition}%` }}
          ></div>

          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2 ${
              rollUnder ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              left: `${fixedPosition}%`,
              width: `${100 - fixedPosition}%`,
            }}
          ></div>

          <div
            className={`absolute top-1/2 w-6 h-6 bg-blue-500 rounded-md -translate-y-1/2 -translate-x-1/2 ${
              !Start && !isAnimating ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            style={{ left: `${fixedPosition}%` }}
            onMouseDown={handleMouseDown}
          ></div>

          {Start && (
            <div
              className={`absolute top-1/2 w-12 h-12 text-black font-bold flex items-center justify-center rounded-lg -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out`}
              style={{
                left: `${dicePosition}%`,
                zIndex: 10,
                transform: `translate(-50%, -50%) scale(1.2)`,
              }}
            >
              🎲
            </div>
          )}
        </div>

        {resultValue && (
          <div className="absolute top-[20%] left-1/2 py-2 px-4 text-white font-bold flex items-center justify-center rounded-lg -translate-y-1/2 -translate-x-1/2 transition-all duration-300 bg-gray-800/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <span className="text-lg">{resultValue.percentage}</span>
              <span className="text-sm text-gray-400">
                {resultValue.multiplier}x
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Game;
