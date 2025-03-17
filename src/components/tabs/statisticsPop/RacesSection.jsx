import { FaDollarSign } from "react-icons/fa";

const RaceResults = () => {
  const topResults = [
    { position: "618th", prize: 6.0, date: "6/24/2024" },
    { position: "2326th", prize: 2.0, date: "6/21/2024" },
  ];

  const history = [
    { race: "$100k Race - 24 Hours", date: "6/19/2024", position: "4388th", prize: 1.0 },
    { race: "$100k Race - 24 Hours", date: "6/13/2024", position: "3073rd", prize: 1.5 },
    { race: "$100k Race - 24 Hours", date: "6/5/2024", position: "2460th", prize: 2.0 },
  ];

  return (
    <div className=" text-white  rounded-lg  space-y-4">
      {topResults.map((result, index) => (
        <div key={index} className="bg-gray-900 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{result.position}</span>
            <span className="text-green-400 flex items-center">
              ${result.prize.toFixed(2)} <FaDollarSign className="ml-1" />
            </span>
          </div>
          <p className="text-gray-400">$100k Race - 24 Hours</p>
          <p className="text-gray-500 text-sm">{result.date}</p>
        </div>
      ))}

      <div className="bg-gray-900 p-3 px-2 rounded-lg">
        <table className="w-full text-left text-gray-400 text-md">
          <thead>
            <tr className="border-b pl-10 border-gray-900">
              <th className="py-2 pl-3">Race Name</th>
              <th>Date</th>
              <th>Position</th>
              <th>Prize</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index} className={`border-b ${index%2 ==0 ? "bg-gray-800" :""}  border-gray-900`}>
                <td className="py-2 pl-3">{entry.race}</td>
                <td>{entry.date}</td>
                <td>{entry.position}</td>
                <td className="text-green-400 mt-1 flex items-center">
                  ${entry.prize.toFixed(2)} <FaDollarSign className="ml-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RaceResults;
