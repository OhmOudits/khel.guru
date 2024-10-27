import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCrown,
  FaDollarSign,
  FaHeadphones,
  FaMoneyBill,
} from "react-icons/fa";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCoins,
  FaChessBoard,
} from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { casino, sports } from "../../constants";

// eslint-disable-next-line
const Sidebar = ({ sideOpen, setSideOpen }) => {
  const [openCasino, setCasino] = useState(true);
  const [opensports, setSports] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1580) {
        setSideOpen(true);
      } else {
        setSideOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`fixed z-[13] h-full bg-primary max-lg:hidden ${
        sideOpen ? "w-full max-w-[215px]" : "w-[60px]"
      }`}
    >
      <div className="my-3 px-3">
        <div
          className="p-1 w-fit rounded-xl bg-secondry"
          onClick={() => setSideOpen(!sideOpen)}
        >
          <div className="p-2.5 w-fit h-full flex items-center justify-center text-white hover:bg-terHover cursor-pointer rounded-xl bg-ter">
            {!sideOpen ? (
              <FaAngleDoubleRight size={16} />
            ) : (
              <FaAngleDoubleLeft size={16} />
            )}
          </div>
        </div>
      </div>

      {!sideOpen && (
        <div
          className="mt-2 pt-1 pl-4 pr-0 flex flex-col text-white gap-2.5"
          style={{ minHeight: "calc(100vh)" }}
        >
          <div
            className={`relative w-fit bg-inactive group p-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center justify-center`}
          >
            <FaCoins size={18} className="text-purple-300" />
            <div className="absolute rounded-xl top-1.5 left-full ml-2 text-white bg-inactive opacity-0 hidden group-hover:flex z-[-1] group-hover:z-[12] group-hover:opacity-100 group-hover:translate-x-2 transform transition-all duration-300 flex-col">
              {casino.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="flex text-sm whitespace-nowrap gap-2 rounded items-center py-1.5 px-3 w-full min-w-[180px] bg-inactive text-textColor hover:bg-activeHover"
                  >
                    {React.createElement(c.icon)}
                    <span className="pt-0.5 text-purple-300">{c.name}</span>
                  </div>
                );
              })}
              <span className="absolute left-[-5px] top-[3px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              <span className="absolute w-14 z-[-1] opacity-0 h-10 bg-primary top-[-45px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </div>
          </div>

          <div
            className={`relative w-fit group p-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center`}
          >
            <FaChessBoard size={18} className="text-purple-300" />
            <div className="absolute rounded-xl top-1.5 left-full ml-2 text-white bg-inactive opacity-0 hidden group-hover:flex z-[-1] group-hover:z-[12] group-hover:opacity-100 group-hover:translate-x-2 transform transition-all duration-300 flex-col">
              {sports.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="flex text-sm whitespace-nowrap gap-2 rounded items-center py-1.5 px-3 w-full min-w-[180px] bg-inactive text-textColor hover:bg-activeHover"
                  >
                    {React.createElement(c.icon)}
                    <span className="pt-0.5 text-purple-300">{c.name}</span>
                  </div>
                );
              })}
              <span className="absolute left-[-5px] top-[3px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              <span className="absolute w-14 z-[-1] opacity-0 h-10 bg-primary top-[-45px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </div>
          </div>

          <div
            className={`flex flex-col w-fit rounded-xl bg-inactive items-center justify-center`}
          >
            <div className="w-fit group p-2.5 relative hover:bg-activeHover cursor-pointer rounded-tr-xl rounded-tl-xl py-3.5 ">
              <HiSpeakerphone size={18} className="text-purple-300" />
              <span className="absolute text-sm font-semibold text-textColor top-1.5 left-full ml-2 py-1.5 px-3 bg-inactive rounded-md hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Promotions
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>

            <div className="w-fit group p-2.5 relative hover:bg-activeHover cursor-pointer">
              <FaDollarSign size={18} className="text-purple-300" />
              <span className="absolute text-sm font-semibold text-textColor top-1.5 left-full ml-2 py-1.5 px-3 bg-inactive rounded-md hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Refer & Earn
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>

            <div className="w-fit group p-2.5 relative hover:bg-activeHover rounded-br-xl rounded-bl-xl cursor-pointer">
              <FaMoneyBill size={18} className="text-purple-300" />
              <span className="absolute top-0 left-full ml-2 py-1.5 px-3 text-sm font-semibold text-textColor bg-inactive rounded-md hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Redeem
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>
          </div>

          <div
            className={`relative w-fit group p-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center`}
          >
            <FaCrown size={18} className="text-purple-300" />
            <span className="absolute left-full ml-2 py-1.5 px-3 text-sm font-semibold text-textColor bg-inactive rounded-md hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
              VIP Club
              <span className="absolute left-[-5px] top-[15%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </span>
          </div>

          <div
            className={`relative w-fit group p-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center `}
          >
            <FaHeadphones size={18} className="text-purple-300" />
            <span className="absolute left-full ml-2 py-1.5 px-3 text-sm font-semibold text-textColor bg-inactive rounded-md hidden group-hover:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
              Live Support
              <span className="absolute left-[-5px] top-[15%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </span>
          </div>
        </div>
      )}

      {sideOpen && (
        <div
          className="w-full text-[0.9rem]"
          style={{
            minHeight: "calc(100vh)",
            maxHeight: "calc(100vh)",
          }}
        >
          <div className="px-3 overflow-y-auto cus-scroll">
            <div className="flex flex-col gap-3 py-1 rounded-br-xl rounded-bl-xl overflow-hidden">
              <div
                className={`${
                  openCasino ? "bg-hoverActive" : "rounded-b-xl bg-activeHover"
                } w-full pr-2 pl-3 py-1.5 text-xs font-semibold  cursor-pointer hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
                onClick={() => {
                  setCasino(!openCasino);
                  setSports(false);
                }}
              >
                <div className="flex items-center gap-2.5">
                  <FaCoins size={16} className="text-white" />
                  <h1 className="text-white font-bold text-[0.89rem]">
                    Casino
                  </h1>
                </div>
                <div className="text-white bg-hoverActive p-1.5 bg-[rgba(151, 137, 205, 0.48)] rounded-lg flex items-center justify-center">
                  {openCasino ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
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
                  opensports ? "bg-hoverActive" : "rounded-b-xl bg-activeHover"
                } w-full pr-2 pl-3 py-1.5 text-xs font-semibold  cursor-pointer hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
                onClick={() => {
                  setSports(!opensports);
                  setCasino(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <FaChessBoard size={16} className="text-white" />
                  <h1 className="text-white font-bold text-[0.89rem]">
                    Sports
                  </h1>
                </div>
                <div className="text-white bg-hoverActive p-1.5 bg-[rgba(151, 137, 205, 0.48)] rounded-lg flex items-center justify-center">
                  {opensports ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
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
                  <h1 className="text-textColor font-bold text-[0.89rem]">
                    Promotions
                  </h1>
                </div>
                <div className="px-2.5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
                  <FaDollarSign size={18} className="text-purple-300" />
                  <h1 className="text-textColor font-bold text-[0.89rem]">
                    Refer & Win
                  </h1>
                </div>
                <div className="px-2.5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
                  <FaMoneyBill size={18} className="text-purple-300" />
                  <h1 className="text-textColor font-bold text-[0.9rem]">
                    Redeem
                  </h1>
                </div>
              </div>

              <div
                className={`w-full px-5 py-2 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
              >
                <FaCrown size={18} className="text-purple-300" />
                <h1 className="text-textColor font-bold text-[0.89rem]">
                  VIP Club
                </h1>
              </div>
              <div
                className={`w-full px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center gap-3`}
              >
                <FaHeadphones size={18} className="text-purple-300" />
                <h1 className="text-textColor font-bold text-[0.89rem]">
                  Live Support
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
