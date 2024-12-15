import React, { useState, useEffect } from "react";

const GameComponent = ({Start , setStart , Multipler}) => {
  const [number, setNumber] = useState(null);
  const [finalNumber, setFinalNumber] = useState(null);
  const parsedMultiper = parseFloat(Multipler).toFixed(2)

  console.log(parsedMultiper , finalNumber)
  useEffect(() => {
    let interval;

    if (Start) {
      // Generate random placeholder numbers continuously
      interval = setInterval(() => {
        const placeholder = (Math.random() * 100).toFixed(2);
        setNumber(placeholder);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        const result = (Math.random() * 100).toFixed(2);
        setFinalNumber(result);
        setNumber(result);
        setStart(false);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [Start]);

  const startGame = () => {
    setStart(true);
    setFinalNumber(null);
    setNumber(null);
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-[500px] h-[80vh] bg-gray-900 text-white">

      <div
        className={`text-8xl font-bold py-4 px-8 mb-6 rounded-md ${
          finalNumber !== null
            ? Number(finalNumber) > Number(parsedMultiper) 
              ? "text-green-500"
              : "text-red-500"
            : "text-gray-400"
        }`}
        
      >
        {number !== null ? number : "1.00 "} X
      </div>

   
    </div>
  );
};

export default GameComponent;
