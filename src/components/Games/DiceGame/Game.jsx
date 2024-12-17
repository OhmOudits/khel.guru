import React, { useState, useEffect, useRef } from "react";

const Game = ({Start , setStart , rollover , setRollover}) => {
  const [fixedPosition, setFixedPosition] = useState(rollover); // Blue Box Position
  const [gameResult, setGameResult] = useState("");
  const [targetPosition, setTargetPosition] = useState(fixedPosition);
  const [dicePosition, setDicePosition] = useState(fixedPosition);
  const draggingRef = useRef(false);

  // Start Game Logic
  const handleStart = () => {

    const randomPosition = Math.floor(Math.random() * 100) + 1; // Dice rolls randomly
    setTargetPosition(randomPosition);
    setStart(true);

    // Animate dice movement
    setTimeout(() => {
      setTimeout(() => {
        checkResult(randomPosition);
      }, 1000); // Delay for showing the result
      setDicePosition(randomPosition);
    }, 500);
  };

  // Check Win/Loss based on dice position
  const checkResult = (position) => {
    if (position > rollover) {
      setGameResult("Winner! 🎉");
    } else {
      setGameResult("You Lost! 😔");
    }

    setTimeout(() => resetGame(), 2000);
  };

  // Reset the game
  const resetGame = () => {
    setStart(false);
    setGameResult("");
    setDicePosition(fixedPosition);
    setTargetPosition(null);
  };

  // Handle dragging the blue box
  const handleMouseDown = () => {
    if (!Start) {
      draggingRef.current = true;
    }
  };
  useEffect(()=>{
    setFixedPosition(rollover)

    
  }, [rollover])
  useEffect(()=>{
    if(Start){

      handleStart()
    }
  } , [Start])

  const handleMouseMove = (e) => {
    if (draggingRef.current && !Start) {
      const rect = e.target.parentElement.getBoundingClientRect();
      let newLeft = ((e.clientX - rect.left) / rect.width) * 100;

      // Clamp position between 0 and 100
      newLeft = Math.max(0, Math.min(100, newLeft));
      setFixedPosition(newLeft);
      setRollover(newLeft)
      setDicePosition(newLeft);
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
        className="relative w-full max-w-2xl h-16 bg-gray-700 rounded-full overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Left Red Region */}
        <div  
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-red-500"
          style={{ width: `${fixedPosition}%` }}
        ></div>

        {/* Right Green Region */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-green-500"
          style={{ left: `${fixedPosition}%`, width: `${100 - fixedPosition}%` }}
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
            className="absolute top-1/2 w-12 h-12 bg-white text-black font-bold flex items-center justify-center rounded-lg -translate-y-1/2 transition-all duration-1000 ease-in-out"
            style={{ left: `${dicePosition}%`, zIndex: 10 }}
          >
            🎲
          </div>
        )}
      </div>

      

      {/* Result */}
      {gameResult && (
        <div className="mt-4 text-xl font-semibold text-yellow-300">
          {gameResult}
        </div>
      )}
    </div>
  );
};

export default Game;
