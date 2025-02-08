import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import TableTennisBet from "./TableTennisBet";

const LiveTableTennisEvents = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const Wta = [
    { teams: ["Sawangkaew, Mananchaya", "Marino, Rebecca"], score: ["1", "0"] },
  ];

  const Qatar = [
    { teams: ["Bucsa, Cristina", "Siegemund, Laura"], score: ["2", "3"] },
    { teams: ["Bucsa, Cristina", "Siegemund, Laura"], score: ["2", "3"] },
    { teams: ["Bucsa, Cristina", "Siegemund, Laura"], score: ["2", "3"] },
    { teams: ["Bucsa, Cristina", "Siegemund, Laura"], score: ["2", "3"] },
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
            WTA 125K / WTA 125K Mumbai, India Women Singles{" "}
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded && (
              <span className="text-xs text-black font-semibold w-[18px] h-[18px] bg-gray-400 rounded-full flex items-center justify-center">
                {Wta.length}
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
          {Wta.map((bets, index) => (
            <TableTennisBet key={index} teams={bets.teams} score={bets.score} />
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
            WTA / WTA Doha, Qatar Women Singles
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded2 && (
              <span className="text-xs text-black font-semibold w-[18px] h-[18px] bg-gray-400 rounded-full flex items-center justify-center">
                {Qatar.length}
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
          {Qatar.map((bets, index) => (
            <TableTennisBet key={index} teams={bets.teams} score={bets.score} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveTableTennisEvents;
