import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SportBet = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpansion = () => setIsExpanded(!isExpanded);
  const [select, setSelect] = useState("");
  const [bet, setBet] = useState("0.00000");

  return (
    <>
      <div className="my-5 grid grid-cols-1 bg-primary rounded-md">
        {/* Header */}
        <div
          className="w-full flex bg-inactive px-3 py-2.5 rounded-md hover:bg-activeHover cursor-pointer"
          onClick={toggleExpansion}
        >
          <div className="flex items-center w-full gap-1.5">Winner</div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <FaChevronUp size={14} />
            ) : (
              <FaChevronDown size={14} />
            )}
          </div>
        </div>

        <div
          className={`overflow-hidden ${isExpanded ? "max-h-fit" : "max-h-0"}`}
        >
          <div className="w-full items-center flex-col max-md:flex-col p-3 gap-5">
            <div className="flex w-full gap-3">
              <div
                onClick={() => setSelect("Draw")}
                className={`w-full h-fit bg-[#071824] cursor-pointer hover:bg-[#082f5a] rounded px-2 py-0.5 ${
                  select === "RCB" && "bg-[#082f5a]"
                }`}
              >
                <h1>RCB</h1>
                <p className="text-[#4391E7]">1.95</p>
              </div>
              <div
                onClick={() => setSelect("Draw")}
                className={`w-full h-fit bg-[#071824] cursor-pointer hover:bg-[#082f5a] rounded px-2 py-0.5 ${
                  select === "Draw" && "bg-[#082f5a]"
                }`}
              >
                <h1>Draw</h1>
                <p className="text-[#4391E7]">1.95</p>
              </div>
              <div
                onClick={() => setSelect("Draw")}
                className={`w-full h-fit bg-[#071824] cursor-pointer hover:bg-[#082f5a] rounded px-2 py-0.5 ${
                  select === "MI" && "bg-[#082f5a]"
                }`}
              >
                <h1>MI</h1>
                <p className="text-[#4391E7]">1.95</p>
              </div>
            </div>
            {select !== "" && (
              <div className="flex flex-col gap-2 px-0 pt-5 pb-2 max-lg:pt-2 col-span-2 w-full">
                <div>
                  <input
                    id="bet"
                    value={bet}
                    onChange={(e) => setBet(e.target.value)}
                    className="bg-secondry h-fit text-[1rem] px-2 py-2 outline-none w-full rounded"
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto text-[1rem] py-1.5 mt-1.5 rounded font-semibold bg-button-primary text-black cursor-pointer`}
                >
                  Bet
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SportBet;
