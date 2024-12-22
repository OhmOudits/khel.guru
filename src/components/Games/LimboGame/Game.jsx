import React, { useState, useEffect } from "react";

const GameComponent = ({ number, finalNumber, Multipler, defaultColor }) => {
  const parsedMultiper = parseFloat(Multipler).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center max-h-[500px] h-[80vh] bg-gray-900 text-white">
      <div
        className={`font-bold py-4 px-8 mb-6 rounded-md ${
          defaultColor
            ? "text-gray-400"
            : finalNumber !== null
            ? Number(finalNumber) > Number(parsedMultiper)
              ? "text-green-500"
              : "text-red-500"
            : "text-gray-400"
        }`}
        // Responsive font sizes
        style={{
          fontSize: "clamp(4rem, 8vw, 8rem)",
        }}
      >
        {number !== null ? number : "1.00"}x
      </div>
    </div>
  );
};

export default GameComponent;
