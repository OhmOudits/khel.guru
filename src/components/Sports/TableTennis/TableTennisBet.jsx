import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line
const CricketBet = ({ teams, score }) => {
  const [bet, setBet] = useState("0.000000");
  const [select, setSelect] = useState("Draw");
  const navigate = useNavigate();

  //   eslint-disable-next-line
  const options = [
    {
      id: 1,
      name: teams ? teams[0] : "",
    },
    {
      id: 2,
      name: teams ? teams[1] : "",
    },
    {
      id: 3,
      name: teams ? teams[1] : "",
    },
  ];

  if (!teams) {
    return (
      <div className="bg-primary-1 border-t mx-3 mt-3 border-gray-600 flex items-center justify-center min-h-[140px]">
        <p className="text-base text-gray-400">No Teams</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid px-2 grid-cols-8 max-lg:grid-cols-1 gap-2 place-items-center bg-primary-1">
        <div
          onClick={() => {
            navigate("/sports/cricket/bet");
          }}
          className="flex flex-col gap-2 max-lg:gap-0 px-3.5 py-1.5 max-lg:pb-2 col-span-3 w-full hover:bg-activeHover rounded-sm cursor-pointer"
        >
          <div className="flex items-center gap-3.5 mb-1 text-sm">
            <h1 className="px-1.5 rounded font-semibold bg-red-600">Live</h1>
            <h1 className="text-gray-400 w-[200px]"> 2nd Set</h1>
            <div className="w-full h-[1px] bg-gray-700"></div>
          </div>
          <div className="flex flex-col text-[1rem]">
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-2.5">
                {teams[0]}
              </h1>
              <h3>{score[0]}</h3>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-2.5">{teams[1]}</h1>
              <h3>{score[1]}</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3.5 py-5 max-lg:py-0 col-span-3 w-full">
          <h1 className="w-full text-center text-sm text-gray-400 max-lg:hidden">
            Winner
          </h1>
          <div className="grid grid-cols-2 text-[1rem] gap-2.5">
            <div
              onClick={() => setSelect(teams[0])}
              className={`bg-[#071824] cursor-pointer hover:bg-[#082f5a] rounded px-2 py-0.5 ${
                select === teams[0] && "bg-[#082f5a]"
              }`}
            >
              <h1>
                {/* eslint-disable-next-line */}
                {teams[0].length <= 9 ? teams[0] : `${teams[0].slice(0, 7)}...`}
              </h1>
              <p className="text-[#4391E7]">1.45</p>
            </div>
            
            <div
              onClick={() => setSelect(teams[1])}
              className={`bg-[#071824] cursor-pointer hover:bg-[#082f5a] rounded px-2 py-0.5 ${
                select === teams[1] && "bg-[#082f5a]"
              }`}
            >
              <h1>
                {/* eslint-disable-next-line */}
                {teams[1].length <= 9 ? teams[1] : `${teams[1].slice(0, 7)}...`}
              </h1>
              <p className="text-[#4391E7]">2.45</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3.5 py-5 max-lg:pt-2 col-span-2 w-full">
          <div>
            <input
              id="bet"
              value={bet}
              onChange={(e) => setBet(e.target.value)}
              className="bg-secondry text-[0.9rem] px-2 py-1 outline-none w-full rounded"
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-0.5 rounded text-sm font-semibold bg-button-primary text-black cursor-pointer`}
          >
            Bet
          </div>
        </div>
      </div>
    </>
  );
};

export default CricketBet;
