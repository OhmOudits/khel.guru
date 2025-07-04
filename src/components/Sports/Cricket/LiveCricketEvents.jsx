import { useState } from "react";
import { BiSolidCricketBall } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CricketBet from "./CricketBet";

const LiveCricketEvents = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const cricketBets = [
    { teams: ["India", "Australia"], score: ["150/2", "Yet To Bat"] },
    { teams: ["Pakistan", "South Africa"], score: ["120/3", "Yet To Bat"] },
    { teams: ["England", "New Zealand"], score: ["120/3", "Yet To Bat"] },
  ];

  const iplBets = [
    { teams: ["RCB", "CSK"], score: ["150/2", "Yet To Bat"] },
    { teams: ["MI", "DC"], score: ["120/3", "Yet To Bat"] },
  ];

  const toggleExpansion = () => setIsExpanded(!isExpanded);
  const toggleExpansion2 = () => setIsExpanded2(!isExpanded2);

  return (
    <>
      <div className="my-5 grid grid-cols-1 bg-primary rounded-md">
        {/* Header */}
        <div
          className="flex items-center justify-between bg-inactive px-3 py-2.5 rounded-md hover:bg-activeHover cursor-pointer"
          onClick={toggleExpansion}
        >
          <div className="flex items-center gap-1.5">
            <BiSolidCricketBall />
            International ODIs
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded && (
              <span className="text-xs text-black font-semibold w-[18px] h-[18px] bg-gray-400 rounded-full flex items-center justify-center">
                {cricketBets.length}
              </span>
            )}
            {isExpanded ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </div>
        </div>

        {/* transition-all duration-[800ms] ease-in-out */}
        <div
          className={`overflow-hidden ${isExpanded ? "max-h-fit" : "max-h-0"}`}
        >
          {cricketBets.map((bets, index) => (
            <CricketBet key={index} teams={bets.teams} score={bets.score} />
          ))}
        </div>
      </div>

      <div className="my-5 grid grid-cols-1 bg-primary rounded-md">
        {/* Header */}
        <div
          className="flex items-center justify-between bg-inactive px-3 py-2.5 rounded-md hover:bg-activeHover cursor-pointer"
          onClick={toggleExpansion2}
        >
          <div className="flex items-center gap-1.5">
            <BiSolidCricketBall />
            IPL
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded2 && (
              <span className="text-xs text-black font-semibold w-[18px] h-[18px] bg-gray-400 rounded-full flex items-center justify-center">
                {iplBets.length}
              </span>
            )}
            {isExpanded2 ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </div>
        </div>

        {/* transition-all duration-[800ms] ease-in-out */}
        <div
          className={`overflow-hidden ${isExpanded2 ? "max-h-fit" : "max-h-0"}`}
        >
          {iplBets.map((bets, index) => (
            <CricketBet key={index} teams={bets.teams} score={bets.score} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveCricketEvents;
