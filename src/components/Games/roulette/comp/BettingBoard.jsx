import { useState } from "react";

const numbers = [
  0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23,
  26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34,
];

const getNumberColor = (num, redNumbers) => {
  if (num === 0) return "bg-green-600 hover:bg-green-700";
  return redNumbers.includes(num)
    ? "bg-red-600 hover:bg-red-700"
    : "bg-black hover:bg-gray-800";
};

export function BettingBoard({
  onPlaceBet,
  currentBets,
  red,
  isProcessing,
  isAutoBetting,
}) {
  const [hoverRange, setHoverRange] = useState(null);

  const handleHover = (range) => {
    setHoverRange(range);
  };

  const handleMouseLeave = () => {
    setHoverRange(null);
  };

  const isHighlighted = (number, row) => {
    if (!hoverRange) return false;

    if (hoverRange === row) {
      return true;
    }

    const groupHighlights = {
      red: (n) => red.includes(n),
      black: (n) => !red.includes(n) && n !== 0,
      even: (n) => n % 2 === 0,
      odd: (n) => n % 2 !== 0,
      "1-18": (n) => n >= 1 && n <= 18,
      "19-36": (n) => n >= 19 && n <= 36,
      row1: (n) => n % 3 === 0,
      row2: (n) => n % 3 === 2,
      row3: (n) => n % 3 === 1,
    };

    if (hoverRange in groupHighlights) {
      return groupHighlights[hoverRange](number);
    }

    if (typeof hoverRange === "string" && hoverRange.includes("-")) {
      const [start, end] = hoverRange.split("-").map(Number);
      return number >= start && number <= end;
    }

    return false;
  };

  return (
    <div className="w-[98%] lg:w-[90%] max-w-4xl mx-auto mt-4">
      {/* Clear button only */}
      <div className="absolute top-2.5 right-6 flex gap-2">
        {Object.values(currentBets).some((bet) => bet > 0) && (
          <div
            className={`cursor-pointer text-medium text-[1.05rem] font-medium px-5 rounded-sm ${
              isProcessing
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            onClick={() => !isProcessing && onPlaceBet("clear")}
          >
            Clear
          </div>
        )}
      </div>

      {/* Top row for 0 */}
      <div className="grid grid-cols-12 gap-1">
        <button
          onClick={() => !isProcessing && onPlaceBet(0)}
          className={`${getNumberColor(0, red)} ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          } col-span-1 text-white font-bold py-8 rounded transition-colors relative`}
        >
          0
          {currentBets[0] > 0 && (
            <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
              ${currentBets[0]}
            </span>
          )}
        </button>

        {/* Numbers 1 to 36 */}
        <div className="col-span-10 grid grid-cols-12 gap-1">
          {numbers.slice(1).map((number) => (
            <button
              key={number}
              onClick={() => !isProcessing && onPlaceBet(number)}
              onMouseEnter={() => handleHover(number)}
              onMouseLeave={handleMouseLeave}
              className={`${getNumberColor(number, red)} ${
                isHighlighted(number) ? "bg-gray-800" : ""
              } ${
                getNumberColor(number, red) === "bg-red-600 hover:bg-red-700" &&
                isHighlighted(number) &&
                "bg-red-800"
              } ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              } text-white font-bold rounded transition-colors relative`}
            >
              <div className="text-[0.8rem]">{number}</div>
              {currentBets[number] > 0 && (
                <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                  ${currentBets[number]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="col-span-1 grid grid-cols-1 gap-1">
          <button
            className={`bg-zinc-800 hover:bg-zinc-700 relative text-base p-2.5 text-white rounded transition-colors ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => handleHover(`row1`)}
            onMouseLeave={handleMouseLeave}
            onClick={() => !isProcessing && onPlaceBet(`row1`)}
          >
            2:1
            {currentBets["row1"] > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                ${currentBets["row1"]}
              </span>
            )}
          </button>
          <button
            className={`bg-zinc-800 hover:bg-zinc-700 relative text-base p-2.5 text-white rounded transition-colors ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => handleHover(`row2`)}
            onMouseLeave={handleMouseLeave}
            onClick={() => !isProcessing && onPlaceBet(`row2`)}
          >
            2:1
            {currentBets["row2"] > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                ${currentBets["row2"]}
              </span>
            )}
          </button>
          <button
            className={`bg-zinc-800 hover:bg-zinc-700 relative text-base p-2.5 text-white rounded transition-colors ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => handleHover(`row3`)}
            onMouseLeave={handleMouseLeave}
            onClick={() => !isProcessing && onPlaceBet(`row3`)}
          >
            2:1
            {currentBets["row3"] > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                ${currentBets["row3"]}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Row for group bets */}
      <div className="grid grid-cols-8 gap-2 mt-2.5 text-[0.8rem]">
        <div className="col-span-1"></div>
        {["1-12", "13-24", "25-36"].map((group) => (
          <button
            key={group}
            className={`bg-zinc-800 col-span-2 hover:bg-zinc-700 text-white py-0 rounded transition-colors relative ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => handleHover(group)}
            onMouseLeave={handleMouseLeave}
            onClick={() => !isProcessing && onPlaceBet(group)}
          >
            {group === "red" || group === "black" ? group.toUpperCase() : group}
            {currentBets[group] > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                ${currentBets[group]}
              </span>
            )}
          </button>
        ))}
        <div className="col-span-1"></div>
      </div>

      {/* Bottom row for additional bets */}
      <div className="grid grid-cols-4 gap-2 mt-1.5 text-[0.8rem]">
        {["1-18", "even", "odd", "19-36"].map((group) => (
          <button
            key={group}
            className={`bg-zinc-800 hover:bg-zinc-700 relative text-white py-0 rounded transition-colors ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onMouseEnter={() => handleHover(group)}
            onMouseLeave={handleMouseLeave}
            onClick={() => !isProcessing && onPlaceBet(group)}
          >
            {group === "even" || group === "odd"
              ? group.charAt(0).toUpperCase() + group.slice(1)
              : group}
            {currentBets[group] > 0 && (
              <span className="absolute top-1 right-1 bg-white text-black text-xs px-1 rounded">
                ${currentBets[group]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
