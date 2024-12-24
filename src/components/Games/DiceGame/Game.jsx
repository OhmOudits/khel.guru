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
  setMultipler,
  calculateMultiplier,
  winChance,
}) => {
  const draggingRef = useRef(false);

  // Handle dragging the blue box
  const handleMouseDown = () => {
    if (!Start) {
      draggingRef.current = true;
    }
  };

  useEffect(() => {
    setFixedPosition(rollover);
  }, [rollover]);

  const handleMouseMove = (e) => {
    if (draggingRef.current && !Start) {
      const rect = e.target.parentElement.getBoundingClientRect();
      setGameResult("");

      // Calculate new position as percentage
      let newLeft = ((e.clientX - rect.left) / rect.width) * 100;

      // Clamp position between 0 and 100
      newLeft = Math.max(0, Math.min(100, newLeft));

      // Round to the nearest integer
      const roundedLeft = Math.round(newLeft);

      // Update state with rounded position
      setFixedPosition(roundedLeft);
      setRollover(roundedLeft);
      const newMultiplier = calculateMultiplier(winChance);
      setMultipler(parseFloat(newMultiplier).toFixed(4));
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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[48vh] bg-gray-900 text-white">
        {/* Numbers at the Top */}
        <div className="relative w-full max-w-2xl flex justify-between px-2 text-sm mb-1">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>

        {/* Scrollable Line */}
        <div
          className="relative w-full max-w-2xl h-16 bg-gray-700 rounded-lg overflow-x-hidden overflow-y-visible"
          onMouseMove={handleMouseMove}
        >
          {/* Left Red Region */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2 ${
              rollUnder ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${fixedPosition}%` }}
          ></div>

          {/* Right Green Region */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2 ${
              rollUnder ? "bg-red-500" : "bg-green-500"
            }`}
            style={{
              left: `${fixedPosition}%`,
              width: `${100 - fixedPosition}%`,
            }}
          ></div>

          {/* Draggable Blue Box */}
          <div
            className="absolute top-1/2 w-6 h-6 bg-blue-500 rounded-md -translate-y-1/2 -translate-x-1/2 cursor-pointer"
            style={{ left: `${fixedPosition}%` }}
            onMouseDown={handleMouseDown}
          ></div>

          {/* Dice */}
          {Start && (
            <div
              className="absolute top-1/2 w-12 h-12 text-black font-bold flex items-center justify-center rounded-lg -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out"
              style={{ left: `${dicePosition}%`, zIndex: 10 }}
            >
              🎲
            </div>
          )}
        </div>
      </div>
      {gameResult && (
        <div
          className={`absolute top-[20%] left-1/2 w-12 py-0.5 text-black font-bold flex items-center justify-center rounded-sm -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-in-out px-2 text-2xl ${
            rollUnder
              ? dicePosition < rollover
                ? "text-green-500"
                : "text-red-500"
              : dicePosition > rollover
              ? "text-green-500"
              : "text-red-500"
          } `}
        >
          {dicePosition}%
        </div>
      )}
    </>
  );
};

export default Game;
