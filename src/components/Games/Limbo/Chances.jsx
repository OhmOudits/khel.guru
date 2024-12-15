import React, { useState, useEffect } from "react";

const BetCalculator = ({ setEstProfit, bet, setMultiplier }) => {
  const [targetMultiplier, setTargetMultiplier] = useState(2.0);
  const [winChance, setWinChance] = useState(49.5);
  const initial = "initial";
  // Update Win Chance whenever Target Multiplier changes
  useEffect(() => {
    const newWinChance = calculateWinChance(targetMultiplier);
    setWinChance(newWinChance);
  }, [targetMultiplier]);

  // Logic for Win Chance Calculation

  const calculateWinChance = (multiplier) => {
    // Formula: Win Chance decreases exponentially as multiplier increases
    const houseEdge = 0.01; // Adjust as needed, e.g., 1% edge
    const winChance = Math.max(100 / multiplier - houseEdge, 0); // Ensures it doesn't drop below 0
    return winChance.toFixed(8);
  };

  const handleChange = (e) => {
    setTargetMultiplier(e.target.value);
    setMultiplier(e.target.value);
  };
  useEffect(() => {
    // suppose if bet amoutn is 1 and winchance is
    setEstProfit(targetMultiplier * bet - bet);
  }, [bet, targetMultiplier]);

  return (
    <div className="flex justify-between items-center p-6 bg-gray-800 rounded-lg w-full max-w-2xl mx-10 text-white font-sans">
      {/* Target Multiplier Input */}
      <div className="flex flex-col mr-4">
        <label className="mb-2 text-sm text-gray-400">Target Multiplier</label>
        <div className="relative">
          <input
            type="number"
            max={"100"}
            min={1.01}
            value={targetMultiplier}
            onChange={handleChange}
            className="w-full px-3 py-2 text-center text-white bg-gray-700   border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Win Chance Display */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm text-gray-400">Win Chance</label>
        <div className="relative">
          <input
            type="text"
            value={winChance}
            readOnly
            className="w-full px-3 py-2 text-center text-white bg-gray-700 border border-gray-600 rounded focus:outline-none"
          />
          <span className="absolute right-2 mt-3 top-2 text-gray-400 text-sm">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetCalculator;
