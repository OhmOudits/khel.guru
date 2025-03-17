import { SlGraph } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { StatisticsSection } from "./statisticsPop/StaticSection";
import { TrophySection } from "./statisticsPop/TrophySection";
import RaceResults from "./statisticsPop/RacesSection";
import { RaffleSection } from "./statisticsPop/RaffleSection";

const StatisticsPop = () => {
  const navigate = useNavigate();

  // State for switches and selected currency
  const [activeTab, setActiveTab] = useState("Statistics");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const info = {
    username: "Karthik",
    joined: "December 20, 2024",
  }; // iam hard coding here we can have from global state
  const tabs = ["Statistics", "Trophies", "Races", "Raffles"];

  const handleClose = () => {
    navigate(window.location.pathname, { replace: true });
  };
  return (
    <div
      className="bg-[rgba(0,0,0,0.7)] cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[99] overflow-y-auto flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-primary cursor-default text-white rounded flex-col w-[90%] max-w-[540px] px-4 py-5 animate-fadeUp relative"
      >
        {/* Close Button */}
        <div
          onClick={handleClose}
          className="absolute cursor-pointer top-6 right-5"
        >
          <IoMdClose size={20} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <SlGraph size={25} className="text-white mt-0.5" />
          <h1 className="text-lg font-semibold">{activeTab}</h1>
        </div>
        {/** main  */}
        <section className="min-h-[50vh]">
          <div className="py-5">
            <div className="text-2xl font-semibold text-gray-300">
              {info.username}
            </div>
            <div className="mt-1 font-semibold text-gray-300">
              Joined on <span>{info.joined}</span>
            </div>
          </div>
          <div className="flex justify-between mb-4 bg-gray-800 p-2 rounded-full">
            {tabs.map((x, index) => {
              return (
                <button
                  className={`flex-1 p-2 rounded-full text-lg font-medium transition-all ${
                    activeTab === x ? "bg-gray-700" : "bg-transparent"
                  }`}
                  onClick={() => setActiveTab(x)}
                >
                  {x}
                </button>
              );
            })}
          </div>
          <div className="my-4">
            {
              activeTab == "Statistics"? <StatisticsSection/> :activeTab == "Trophies" ? <TrophySection/>: activeTab == "Races" ? <RaceResults/>: activeTab == "Raffles"  ? <RaffleSection/>:""
            }
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatisticsPop;
