import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FootballBet from "./FootballBet";
import { IoMdFootball } from "react-icons/io";

const LiveFootballEvents = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const footballEvents = [
    { teams: ["India", "Australia"], score: [1, 2] },
    { teams: ["England", "New Zealand"], score: [2, 3] },
  ];

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  return (
    <>
      <div className="my-5 grid grid-cols-1 bg-primary rounded-md">
        {/* Header */}
        <div
          className="flex items-center justify-between bg-inactive px-3 py-2.5 rounded-md hover:bg-activeHover cursor-pointer"
          onClick={toggleExpansion}
        >
          <div className="flex items-center gap-1.5">
            <IoMdFootball />
            Football
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded && (
              <span className="text-xs text-black font-semibold w-[18px] h-[18px] bg-gray-400 rounded-full flex items-center justify-center">
                {footballEvents.length}
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
          {footballEvents.map((teams, index) => (
            <FootballBet
              key={index}
              teams={footballEvents[index].teams}
              score={footballEvents[index].score}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LiveFootballEvents;
