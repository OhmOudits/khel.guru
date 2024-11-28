import { IoIosBasketball, IoIosTennisball } from "react-icons/io";
import GamesLines from "../components/MainFrame/GamesLines";
import { topGames } from "../constants";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CricketHome from "../components/Sports/Cricket/CricketHome";
import { GiSoccerBall } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";

const Sports = () => {
  const events = [
    { id: 1, events: 5, icon: <BiSolidCricketBall />, name: "Cricket" },
    { id: 2, events: 12, icon: <GiSoccerBall />, name: "Football" },
    { id: 3, events: 1, icon: <IoIosTennisball />, name: "Tennis" },
    { id: 4, events: 5, icon: <BiSolidCricketBall />, name: "Badminton" },
    { id: 5, events: 12, icon: <GiSoccerBall />, name: "Golf" },
    { id: 6, events: 1, icon: <IoIosTennisball />, name: "Table Tennis" },
    { id: 7, events: 5, icon: <BiSolidCricketBall />, name: "Boxing" },
    { id: 8, events: 12, icon: <GiSoccerBall />, name: "CS2" },
    { id: 9, events: 1, icon: <IoIosTennisball />, name: "Volley Ball" },
  ];

  const [search, setSearch] = useState("");
  const [event, setEvent] = useState("Cricket");

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div
      className="mt-1 max-lg:pb-[90px] text-white lg:rounded-lg bg-secondry py-2 px-6 max-md:px-3"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="my-6 relative flex w-full bg-primary outline-none rounded-full">
          <div className="pr-3 pl-5 flex items-center justify-center">
            <FaSearch />
          </div>
          <input
            placeholder="Search your event"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none py-2 bg-transparent"
          />
          {search !== "" && (
            <IoClose
              onClick={handleClear}
              className="text-xl cursor-pointer absolute top-1/4 right-4"
            />
          )}
        </div>

        <GamesLines
          icon={<IoIosBasketball />}
          games={topGames}
          title="Sports"
          link="/sports"
          hoverEffect={true}
        />

        {/* Events */}
        <div className="w-full my-8">
          <div className="w-full overflow-y-auto px-8 rounded-md bg-primary flex items-center gap-6">
            {events.map((e) => {
              return (
                <div
                  className={`py-6 text-4xl text-gray-400 cursor-pointer hover:text-white ${
                    event === e.name
                      ? "text-white border-t-4 rounded-sm border-blue-600"
                      : ""
                  } flex items-center gap-1 flex-col`}
                  onClick={() => setEvent(e.name)}
                  key={e.id}
                >
                  <div className="relative">
                    <div className="text-sm absolute top-[-5px] right-[-5px] text-white font-semibold bg-blue-600 px-1.5 rounded-full">
                      {e.events}
                    </div>
                    {e.icon}
                  </div>
                  <p className="text-sm font-semibold">{e.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <CricketHome />
      </div>
    </div>
  );
};

export default Sports;
