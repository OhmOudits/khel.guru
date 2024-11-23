// eslint-disable-next-line
const UpcomingEventsCard = ({ date, time, teams }) => {
  return (
    <div className="col-span-1 w-full bg-primary px-4 py-2.5">
      <div className="text-sm mb-2.5 flex items-center w-full text-gray-400">
        <h1 className="w-[230px]">{`${date}, ${time}`}</h1>
        <div className="w-full h-[1px] bg-gray-700"></div>
      </div>
      {/* eslint-disable-next-line */}
      {teams.map((team, index) => (
        <div
          key={index}
          className="flex justify-between items-center text-base"
        >
          <h1 className="capitalize">{team.name}</h1>
          <h1>{team.percentage}%</h1>
        </div>
      ))}
    </div>
  );
};
export default UpcomingEventsCard;
