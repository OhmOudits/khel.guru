import React, { useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Import rotate icon

const BetCalculator = ({
  rollUnder,
  setRollUnder,
  roll,
  setRoll,
  targetMultiplier,
  setTargetMultiplier,
  winChance,
}) => {
  const calculateRollFromMultiplier = (multiplier) => {
    const houseEdge = 1;
    const winChance = (1 / multiplier) * (100 - houseEdge);
    return rollUnder ? winChance : 100 - winChance;
  };

  useEffect(() => {
    if (targetMultiplier) {
      const newRoll = calculateRollFromMultiplier(targetMultiplier);
      setRoll(newRoll.toFixed(2));
    }
  }, [targetMultiplier, rollUnder]);

  return (
    <div className="flex justify-between p-2 bg-gray-800 rounded-lg w-[98%] mx-auto text-white font-sans">
      {/* Target Multiplier Input */}
      <div className="flex flex-col w-1/3 pr-2">
        <label
          className="mb-1 text-sm text-gray-400"
          style={{
            fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
          }}
        >
          Target Multiplier
        </label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            max="100"
            min="1.01"
            value={targetMultiplier}
            onChange={(e) => {
              if (e.target.value > 9990 || e.target.value < 1) {
                return;
              } else {
                setTargetMultiplier(e.target.value);
              }
            }}
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 no-spin-on-hover"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
              height: "40px",
            }}
          />
          <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400 text-xl">
            x
          </span>
        </div>
      </div>

      {/* Roll Over/Under Input with Rotate Icon */}
      <div
        className="flex flex-col cursor-pointer w-1/3 pr-2"
        onClick={() => setRollUnder((prev) => !prev)}
      >
        <label
          className="mb-1 text-sm text-gray-400"
          style={{
            fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
          }}
        >
          {rollUnder ? "Roll Under" : "Roll Over"}
        </label>
        <div className="relative">
          <input
            value={parseFloat(roll).toFixed(2)}
            readOnly
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
              height: "40px",
            }}
          />
          <FaSyncAlt className="absolute cursor-pointer right-3 top-[50%] transform -translate-y-1/2 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Win Chance Display */}
      <div className="flex flex-col w-1/3">
        <label
          className="mb-1 text-sm text-gray-400"
          style={{
            fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
          }}
        >
          Win Chance
        </label>
        <div className="relative">
          <input
            type="text"
            value={winChance}
            readOnly
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)", // Responsive font size
              height: "40px", // Reduced height for win chance input
            }}
          />
          <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400 text-lg">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetCalculator;
