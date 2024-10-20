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
    <div className="flex flex-col gap-4">
      <div
        className={`${
          openCasino ? "" : "rounded-b-xl"
        } w-full px-5 py-2.5 cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
        onClick={() => setCasino(!openCasino)}
      >
        <div className="flex items-center gap-2">
          <FaCoins size={20} className="text-purple-300" />
          <h1 className="text-white font-semibold text-lg">Casino</h1>
        </div>
        <div className="text-white bg-hoverActive p-2 bg-[rgba(151, 137, 205, 0.48)] rounded-lg">
          {openCasino ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </div>
      </div>
      {openCasino && (
        <div className="mt-[-1rem] text-gray-300 rounded-b-xl">
          {casino.map((c) => (
            <div
              className="px-5 py-2.5 cursor-pointer bg-inactive hover:bg-activeHover flex items-center gap-3"
              key={c.id}
            >
              {React.createElement(c.icon)}
              {c.name}
            </div>
          ))}
        </div>
      )}

      <div
        className={`${
          opensports ? "" : "rounded-b-xl"
        } w-full px-5 py-2.5 cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
        onClick={() => setSports(!opensports)}
      >
        <div className="flex items-center gap-2">
          <FaChessBoard size={20} className="text-purple-300" />
          <h1 className="text-white font-semibold text-lg">Sports</h1>
        </div>
        <div className="text-white bg-hoverActive p-2 bg-[rgba(151, 137, 205, 0.48)] rounded-lg">
          {opensports ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </div>
      </div>
      {opensports && (
        <div className="mt-[-1rem] text-gray-300 rounded-b-xl">
          {sports.map((c) => (
            <div
              className="px-5 py-2.5 cursor-pointer bg-inactive hover:bg-activeHover flex items-center gap-3"
              key={c.id}
            >
              {React.createElement(c.icon)}
              {c.name}
            </div>
          ))}
        </div>
      )}

      {/* three sections */}
      <div className={`w-full bg-inactive flex flex-col rounded-xl`}>
        <div className="px-5 py-2.5 text-lg cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <HiSpeakerphone size={20} className="text-purple-300" />
          <h1 className="text-gray-200 font-semibold text-base">Promotions</h1>
        </div>
        <div className="px-5 py-2.5 text-lg cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <FaDollarSign size={20} className="text-purple-300" />
          <h1 className="text-gray-200 font-semibold text-base">Refer & Win</h1>
        </div>
        <div className="px-5 py-2.5 text-lg cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
          <FaMoneyBill size={20} className="text-purple-300" />
          <h1 className="text-gray-200 font-semibold text-base">Redeem</h1>
        </div>
      </div>
      <div
        className={`w-full px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
      >
        <FaCrown size={20} className="text-purple-300" />
        <h1 className="text-white font-semibold text-lg">VIP Club</h1>
      </div>
      <div
        className={`w-full px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
      >
        <FaHeadphones size={20} className="text-purple-300" />
        <h1 className="text-white font-semibold text-lg">Live Support</h1>
      </div>
    </div>
  );
};

export default BigSideBar;
