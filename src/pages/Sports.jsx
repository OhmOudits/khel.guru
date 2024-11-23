import { IoIosBasketball } from "react-icons/io";
import GamesLines from "../components/MainFrame/GamesLines";
import { originals } from "../constants";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import UpcomingEventsCard from "../components/Sports/UpcomingEventCard";
import LiveCricketEvents from "../components/Sports/LiveCricketEvents";
import LiveFootballEvents from "../components/Sports/LiveFootballEvents";

const Sports = () => {
  const [search, setSearch] = useState("");

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
          games={originals}
          title="Sports"
          link="/sports"
          hoverEffect={true}
        />

        {/* Live Cards */}
        <div className="px-4 text-xl font-semibold mt-5">
          <h1>Live Events</h1>
          <LiveCricketEvents />
          <LiveFootballEvents />
        </div>

        {/* Upcoming Cards */}
        <div className="px-4 text-xl font-semibold mt-5">
          <h1>Upcoming Events</h1>
          <div className="mt-5 mb-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <UpcomingEventsCard
              date="Sat, Nov 22"
              time="8:30 AM"
              teams={[
                { name: "Sacramento Kings", percentage: 50 },
                { name: "Minnesota Timberwolves", percentage: 50 },
              ]}
            />

            <UpcomingEventsCard
              date="Sat, Nov 22"
              time="8:30 AM"
              teams={[
                { name: "Sacramento Kings", percentage: 50 },
                { name: "Minnesota Timberwolves", percentage: 50 },
              ]}
            />

            <UpcomingEventsCard
              date="Sat, Nov 22"
              time="8:30 AM"
              teams={[
                { name: "Sacramento Kings", percentage: 50 },
                { name: "Minnesota Timberwolves", percentage: 50 },
              ]}
            />

            <UpcomingEventsCard
              date="Sat, Nov 22"
              time="8:30 AM"
              teams={[
                { name: "Sacramento Kings", percentage: 50 },
                { name: "Minnesota Timberwolves", percentage: 50 },
              ]}
            />

            <UpcomingEventsCard
              date="Sat, Nov 22"
              time="8:30 AM"
              teams={[
                { name: "Sacramento Kings", percentage: 50 },
                { name: "Minnesota Timberwolves", percentage: 50 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports;
