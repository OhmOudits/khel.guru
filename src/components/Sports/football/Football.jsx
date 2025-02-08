import LiveFootballEvents from "./LiveFootballEvents";
import UpcomingEventsCard from "../UpcomingEventCard";
import List from "../../MainFrame/List";

const CricketHome = () => {
  return (
    <>
      {/* Live Cards */}
      <div className="text-xl font-semibold mt-5">
        <h1>Live Events</h1>
        <LiveFootballEvents />
      </div>

      {/* Upcoming Cards */}
      <div className="text-xl font-semibold mt-5">
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

      <div className="mt-5">
        <List />
      </div>
    </>
  );
};

export default CricketHome;
