import React, { useState } from "react";
import {
  FaChessBoard,
  FaChevronDown,
  FaChevronUp,
  FaCoins,
  FaCrown,
  FaDollarSign,
  FaHeadphones,
  FaMoneyBill,
} from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { casino, sports } from "../../constants";

const BigSideBar = () => {
  const [openCasino, setCasino] = useState(true);
  const [opensports, setSports] = useState(false);

  return (
    <div className="flex flex-col gap-3 py-1 rounded-br-xl rounded-bl-xl overflow-hidden">
      <div
        className={`${
          openCasino ? "" : "rounded-b-xl"
        } w-full pr-2 pl-3 py-1.5 text-xs font-semibold  cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
        onClick={() => {
          setCasino(!openCasino);
          setSports(false);
        }}
      >
        <div className="flex items-center gap-2.5">
          <FaCoins size={16} className="text-white" />
          <h1 className="text-white font-bold text-[0.92rem]">Casino</h1>
        </div>
        <div className="text-white bg-hoverActive p-1.5 bg-[rgba(151, 137, 205, 0.48)] rounded-lg flex items-center justify-center">
          {openCasino ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </div>
      </div>
      <div className="mt-[-0.75rem] bg-inactive overflow-hidden w-full rounded-br-xl rounded-bl-xl">
        {openCasino && (
          <div className="text-gray-300 rounded-b-xl">
            {casino.map((c) => (
              <div
                className="px-2.5 py-1.5 flex items-center text-textColor text-[0.835rem] font-semibold cursor-pointer bg-inactive hover:bg-activeHover gap-2.5"
                key={c.id}
              >
                {React.createElement(c.icon, { size: 16 })}
                <span className="pt-0.5 text-textColor">{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`${
          opensports ? "" : "rounded-b-xl"
        } w-full pr-2 pl-3 py-1.5 text-xs font-semibold  cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
        onClick={() => {
          setSports(!opensports);
          setCasino(false);
        }}
      >
        <div className="flex items-center gap-2">
          <FaChessBoard size={16} className="text-white" />
          <h1 className="text-white font-bold text-[0.92rem]">Sports</h1>
        </div>
        <div className="text-white bg-hoverActive p-1.5 bg-[rgba(151, 137, 205, 0.48)] rounded-lg flex items-center justify-center">
          {opensports ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </div>
      </div>

      <div className="mt-[-0.75rem] bg-inactive overflow-hidden w-full rounded-br-xl rounded-bl-xl">
        {opensports && (
          <div className="text-gray-300 rounded-b-xl">
            {sports.map((c) => (
              <div
                className="px-2.5 py-1.5 flex items-center text-textColor text-[0.835rem] font-semibold cursor-pointer bg-inactive hover:bg-activeHover gap-2.5"
                key={c.id}
              >
                {React.createElement(c.icon, { size: 16 })}
                <span className="pt-0.5 text-textColor">{c.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* three sections */}
      <div className={`w-full bg-inactive flex flex-col rounded-xl`}>
        <div className="px-2.5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <HiSpeakerphone size={18} className="text-purple-300" />
          <h1 className="text-textColor font-bold text-[0.92rem]">
            Promotions
          </h1>
        </div>
        <div className="px-2.5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <FaDollarSign size={18} className="text-purple-300" />
          <h1 className="text-textColor font-bold text-[0.92rem]">
            Refer & Win
          </h1>
        </div>
        <div className="px-2.5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <FaMoneyBill size={18} className="text-purple-300" />
          <h1 className="text-textColor font-bold text-[0.9rem]">Redeem</h1>
        </div>
      </div>

      <div
        className={`w-full px-5 py-2 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
      >
        <FaCrown size={18} className="text-purple-300" />
        <h1 className="text-textColor font-bold text-[0.92rem]">VIP Club</h1>
      </div>
      <div
        className={`w-full px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
      >
        <FaHeadphones size={18} className="text-purple-300" />
        <h1 className="text-textColor font-bold text-[0.92rem]">
          Live Support
        </h1>
      </div>
    </div>
  );
};

export default BigSideBar;
