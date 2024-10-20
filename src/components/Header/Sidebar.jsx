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
      className={`fixed z-[10] h-full bg-primary max-lg:hidden ${
        sideOpen ? "w-full max-w-[230px]" : "w-[60px]"
      }`}
    >
      <div className="my-5 px-3">
        <div
          className="p-1 w-[50px] rounded-xl bg-secondry"
          onClick={() => setSideOpen(!sideOpen)}
        >
          <div className="py-3 px-3 w-full h-full flex items-center justify-center text-white hover:bg-terHover cursor-pointer rounded-xl bg-ter">
            {!sideOpen ? (
              <FaAngleDoubleRight size={20} />
            ) : (
              <FaAngleDoubleLeft size={20} />
            )}
          </div>
        </div>
      </div>

      {!sideOpen && (
        <div
          className="mt-2 pl-4 pr-0 flex flex-col text-white gap-3"
          style={{ minHeight: "calc(100vh - 100px)" }}
        >
          <div
            className={`relative group p-3 py-3.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center`}
          >
            <FaCoins size={20} className="text-purple-300" />
            <div className="absolute top-1.5 left-full ml-2 text-white bg-inactive rounded-md opacity-0 hidden group-hover:flex z-[-1] group-hover:z-[12] group-hover:opacity-100 group-hover:translate-x-2 transform transition-all duration-300 flex-col">
              {casino.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="flex whitespace-nowrap gap-2 rounded items-center py-2.5 px-5 bg-inactive hover:bg-activeHover"
                  >
                    {React.createElement(c.icon)}
                    {c.name}
                  </div>
                );
              })}
              <span className="absolute left-[-5px] top-[6px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </div>
          </div>

          <div
            className={`relative group p-3 py-3.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center`}
          >
            <FaChessBoard size={20} className="text-purple-300" />
            <div className="absolute top-1.5 left-full ml-2 text-white bg-inactive rounded-md z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all duration-300 hidden group-hover:flex flex-col">
              {sports.map((c) => {
                return (
                  <div
                    key={c.id}
                    className="flex whitespace-nowrap gap-2 rounded items-center py-2.5 px-5 bg-inactive hover:bg-activeHover"
                  >
                    {React.createElement(c.icon)}
                    {c.name}
                  </div>
                );
              })}
              <span className="absolute left-[-5px] top-[6px] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </div>
          </div>

          <div
            className={`flex flex-col rounded-xl bg-inactive items-center justify-center`}
          >
            <div className="group relative hover:bg-activeHover cursor-pointer px-3.5 rounded-tr-xl rounded-tl-xl py-3.5 ">
              <HiSpeakerphone size={20} className="text-purple-300" />
              <span className="absolute top-1.5 left-full ml-2 py-1.5 px-3 text-white bg-inactive rounded-md z-[-1] group-hover:z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Promotions
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>

            <div className="group relative hover:bg-activeHover px-3.5 py-3.5 cursor-pointer">
              <FaDollarSign size={20} className="text-purple-300" />
              <span className="absolute top-1.5 left-full ml-2 py-1.5 px-3 text-white bg-inactive rounded-md z-[-1] group-hover:z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Refer & Earn
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>

            <div className="group relative hover:bg-activeHover px-3.5 py-3.5 rounded-br-xl rounded-bl-xl cursor-pointer">
              <FaMoneyBill size={20} className="text-purple-300" />
              <span className="absolute top-0 left-full ml-2 py-1.5 px-3 text-white bg-inactive rounded-md z-[-1] group-hover:z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
                Redeem
                <span className="absolute left-[-5px] top-[8%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
              </span>
            </div>
          </div>

          <div
            className={`group relative p-3 py-3.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center`}
          >
            <FaCrown size={20} className="text-purple-300" />
            <span className="absolute left-full ml-2 py-1.5 px-3 text-white bg-inactive rounded-md z-[-1] group-hover:z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
              VIP Club
              <span className="absolute left-[-5px] top-[15%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </span>
          </div>

          <div
            className={`group relative p-3 py-3.5 cursor-pointer hover:bg-activeHover rounded-xl bg-inactive flex items-center justify-center `}
          >
            <FaHeadphones size={20} className="text-purple-300" />
            <span className="absolute left-full ml-2 py-1.5 px-3 text-white bg-inactive rounded-md z-[-10] group-hover:z-[12] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transform transition-all whitespace-nowrap duration-300">
              Live Support
              <span className="absolute left-[-5px] top-[15%] transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-r-inactive"></span>
            </span>
          </div>
        </div>
      )}

      {sideOpen && (
        <div
          className="w-full mb-4 overflow-x-hidden cus-scroll overflow-y-auto"
          style={{
            minHeight: "calc(100vh - 100px)",
            maxHeight: "calc(100vh - 100px)",
          }}
        >
          <div className="px-3 overflow-y-auto cus-scroll">
            <div className="flex flex-col gap-4">
              <div
                className={`${
                  openCasino ? "" : "rounded-b-xl"
                } w-full px-5 py-1.5 cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
                onClick={() => setCasino(!openCasino)}
              >
                <div className="flex items-center gap-2">
                  <FaCoins size={20} className="text-purple-300" />
                  <h1 className="text-white font-semibold text-lg">Casino</h1>
                </div>
                <div className="text-white bg-hoverActive p-2 bg-[rgba(151, 137, 205, 0.48)] rounded-lg">
                  {openCasino ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
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
                } w-full px-5 py-1.5 cursor-pointer bg-activeHover hover:bg-hoverActive rounded-t-xl flex items-center justify-between`}
                onClick={() => setSports(!opensports)}
              >
                <div className="flex items-center gap-2">
                  <FaChessBoard size={20} className="text-purple-300" />
                  <h1 className="text-white font-semibold text-lg">Sports</h1>
                </div>
                <div className="text-white bg-hoverActive p-2 bg-[rgba(151, 137, 205, 0.48)] rounded-lg">
                  {opensports ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
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
                <div className="px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
                  <HiSpeakerphone size={20} className="text-purple-300" />
                  <h1 className="text-gray-200 font-semibold text-base">
                    Promotions
                  </h1>
                </div>
                <div className="px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
                  <FaDollarSign size={20} className="text-purple-300" />
                  <h1 className="text-gray-200 font-semibold text-base">
                    Refer & Win
                  </h1>
                </div>
                <div className="px-5 py-2.5 cursor-pointer hover:bg-activeHover rounded-xl flex items-center gap-3 ">
                  <FaMoneyBill size={20} className="text-purple-300" />
                  <h1 className="text-gray-200 font-semibold text-base">
                    Redeem
                  </h1>
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
                <h1 className="text-white font-semibold text-lg">
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
