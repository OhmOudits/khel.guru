import React from "react";

const numbers = Array.from({ length: 37 }, (_, i) => i);

const getNumberColor = (num) => {
  if (num === 0) return "bg-green-600 hover:bg-green-700";
  return num % 2 === 0
    ? "bg-red-600 hover:bg-red-700"
    : "bg-zinc-900 hover:bg-zinc-800";
};

export function BettingBoard({ onPlaceBet, currentBets }) {
  return (
    <div className="w-[90%] max-w-3xl mx-auto mt-8">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => onPlaceBet(0)}
          className={`${getNumberColor(0)} text-white font-bold py-12 rounded-lg
            transition-colors relative`}
        >
          0
          {currentBets[0] > 0 && (
            <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
              ${currentBets[0]}
            </span>
          )}
        </button>

        <div className="col-span-2 grid grid-cols-12 gap-1">
          {numbers.slice(1).map((number) => (
            <button
              key={number}
              onClick={() => onPlaceBet(number)}
              className={`${getNumberColor(
                number
              )} text-white font-bold py-0 px-2 max-lg:px-0.5 rounded
                transition-colors relative`}
            >
              <div className="text-sm">{number}</div>
              {currentBets[number] > 0 && (
                <span className="absolute top-0 right-0 bg-white text-black text-xs px-1 rounded">
                  ${currentBets[number]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 text-lg max-lg:text-base">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded transition-colors">
          1 to 18
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded transition-colors">
          Even
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded transition-colors">
          Odd
        </button>
      </div>
    </div>
  );
}
