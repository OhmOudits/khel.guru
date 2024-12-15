import React, { useState, useEffect } from "react";

const BetCalculator = ({ setEstProfit,  bet, rolloveVal , setMultiplier , Rollover }) => {
  const [targetMultiplier, setTargetMultiplier] = useState(5.0); // Default multiplier
  const [winChance, setWinChance] = useState(50.50); // Default win chance when multiplier is 2
  const [rollover, setRollover] = useState(50.50); // Default rollover value for multiplier 2

  // Update win chance and rollover whenever targetMultiplier changes
  useEffect(() => {
    // Update the rollover based on the multiplier
    const newRollover = calculateRollover(targetMultiplier);
    setRollover(newRollover);
    Rollover(newRollover)

    // Update the win chance based on the multiplier
    const newWinChance = calculateWinChance(targetMultiplier);
    setWinChance(newWinChance);
  }, [  targetMultiplier]);

  // Logic for Win Chance Calculation
  const calculateWinChance = (multiplier) => {
    const houseEdge = 1; 
    const winChance = Math.max(100 / multiplier - houseEdge, 0); // Ensures it doesn't drop below 0
    return winChance.toFixed(2); // Fixed to 2 decimal places
  };

  // Dynamic Rollover Calculation based on the multiplier
  const calculateRollover = (multiplier) => {
    const baseRollover = 100;
    const minRollover = 0;
    const maxMultiplier = 10;
    
    let newRollover = (baseRollover - minRollover) * (multiplier / maxMultiplier);
    newRollover = Math.max(minRollover, Math.min(baseRollover - 0.01, newRollover));
    
    return newRollover.toFixed(2);
  };

  // Handle Roll Over Logic
  const handleRollover = () => {
    const value = 100 - Targetvalue;
  };

  // Handle Multiplier Change
  const handleChange = (e) => {
    const newMultiplier = parseFloat(e.target.value);
    setTargetMultiplier(newMultiplier);
    setMultiplier(newMultiplier);
  };

  useEffect(() => {
    // Suppose if bet amount is 1 and win chance is updated
    setEstProfit(targetMultiplier * bet - bet);
  }, [bet, targetMultiplier, setEstProfit]);

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
            className="w-full px-3 py-2 text-center text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Roll Over Input */}
      <div className="flex flex-col mr-4">
        <label className="mb-2 text-sm text-gray-400">Roll Over</label>
        <div className="relative">
          <input
            max={100}
            min={1}
            disabled={true}
            value={rolloveVal}
            onClick={handleRollover}
            className="w-full px-3 py-2 text-center text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
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
