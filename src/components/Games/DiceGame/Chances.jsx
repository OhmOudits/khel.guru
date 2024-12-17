import React, { useState, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa"; // Importing rotate icon

const BetCalculator = ({ setEstProfit, bet, rolloveVal, setMultiplier, Rollover }) => {
  const [targetMultiplier, setTargetMultiplier] = useState(5.0); // Default multiplier
  const [winChance, setWinChance] = useState(50.50); // Default win chance when multiplier is 2
  const [rollover, setRollover] = useState(50.50); // Default rollover value for multiplier 2
  const [isRollOver, setIsRollOver] = useState(true); // Track whether it's "roll over" or "roll under"

  // Update win chance and rollover whenever targetMultiplier changes
  useEffect(() => {
    const newRollover = calculateRollover(targetMultiplier);
    setRollover(newRollover);
    Rollover(newRollover);

    const newWinChance = calculateWinChance(targetMultiplier);
    setWinChance(newWinChance);
  }, [targetMultiplier]);

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

  // Handle Multiplier Change
  const handleChange = (e) => {
    const newMultiplier = parseFloat(e.target.value);
    setTargetMultiplier(newMultiplier);
    setMultiplier(newMultiplier);
  };

  // Updating profit calculation whenever bet or multiplier changes
  useEffect(() => {
    setEstProfit(targetMultiplier * bet - bet);
  }, [bet, targetMultiplier, setEstProfit]);

  // Toggle between roll over and roll under values
  const handleRolloverClick = () => {
    setIsRollOver(!isRollOver);
  };

  // Calculate the roll under value
  const rollUnderValue = (100 - rollover).toFixed(2);

  return (
    <div className="flex justify-between p-2 bg-gray-800 rounded-lg w-[98%] mx-auto text-white font-sans">
      {/* Target Multiplier Input */}
      <div className="flex flex-col w-1/3 pr-2">
        <label className="mb-1 text-sm text-gray-400"
         style={{
          fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
        }}
        >Target Multiplier</label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            max="100"
            min="1.01"
            value={targetMultiplier}
            onChange={handleChange}
            onFocus={(e) => e.target.select()} // Select text on focus for easy editing
            onBlur={(e) => {
              if (e.target.value === "") {
                setTargetMultiplier(1.01); // Default value if empty
              }
            }}
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 no-spin-on-hover"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)", // Makes font size responsive based on screen size
              height: "40px", // Reduced height for the input box
            }}
          />
          <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400"
          style={{
            height: "clamp(1rem, 1.5vw, 1.5rem)",
          }}
          >x</span>
        </div>
      </div>

      {/* Roll Over Input with Rotate Icon */}
      <div className="flex flex-col w-1/3 pr-2">
        <label className="mb-1 text-sm text-gray-400"
         style={{
          fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
        }}
        >Roll Over</label>
        <div className="relative">
          <input
            onClick={handleRolloverClick}
            value={isRollOver ? rollover : rollUnderValue}
            readOnly
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)", // Responsive font size
              height: "40px", // Reduced height for roll over/under input
            }}
          />
          <FaSyncAlt className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400"
          style={{
            height: "clamp(1rem, 1.5vw, 1.5rem)",
          }}
          />
        </div>
      </div>

      {/* Win Chance Display */}
      <div className="flex flex-col w-1/3">
        <label className="mb-1 text-sm text-gray-400"
        style={{
          fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
        }}
        >Win Chance</label>
        <div className="relative">
          <input
            type="text"
            value={winChance}
            readOnly
            className="w-full px-3 py-1.5 text-left text-white bg-gray-700 border border-gray-600 rounded focus:outline-none"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.5rem)", // Responsive font size for win chance
              height: "40px", // Reduced height for win chance input
            }}
          />
          <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-400"
          style={{
            height: "clamp(1rem, 1.5vw, 1.5rem)",
          }}
          >%</span>
        </div>
      </div>
    </div>
  );
};

export default BetCalculator;