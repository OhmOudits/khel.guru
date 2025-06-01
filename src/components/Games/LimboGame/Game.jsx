import React, { useEffect, useState } from "react";

const GameComponent = ({
  number,
  finalNumber,
  targetMultiplier,
  defaultColor,
  isAnimating,
}) => {
  const parsedTargetMultiplier = parseFloat(targetMultiplier).toFixed(2);

  const getNumberColor = () => {
    if (defaultColor) return "text-gray-400";
    if (finalNumber === null) return "text-gray-400";
    return Number(finalNumber) >= Number(parsedTargetMultiplier)
      ? "text-green-500"
      : "text-red-500";
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-[500px] h-[80vh] bg-gray-900 text-white">
      <div
        className={`font-bold py-4 px-8 mb-6 rounded-md transition-colors duration-300 ${getNumberColor()} ${
          isAnimating ? "animate-pulse" : ""
        }`}
        style={{
          fontSize: "clamp(4rem, 8vw, 8rem)",
          transition: isAnimating ? "none" : "all 0.3s ease-in-out",
        }}
      >
        {number !== null ? number : "1.00"}x
      </div>
    </div>
  );
};

export default GameComponent;
