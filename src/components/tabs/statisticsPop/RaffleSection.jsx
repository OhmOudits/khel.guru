import { FaDollarSign } from "react-icons/fa6";
const history = [
  { name: "1 raffle", date: "6/19/2024", tickets: 30 },
  { name: "Raffle", date: "6/13/2024", tickets: 3 },
  { name: "biggest raffle", date: "6/5/2024", tickets: 0 },
  { name: "1 raffle", date: "6/19/2024", tickets: 30 },
  { name: "Raffle", date: "6/13/2024", tickets: 3 },
];
export const RaffleSection = () => {
  return (
    <>
      <div className="bg-gray-900 p-3 px-2 rounded-lg">
        <table className="w-full text-left text-gray-400 text-md">
          <thead>
            <tr className="border-b  border-gray-900">
              <th className="py-2 pl-3">Raffle Name</th>
              <th>Date</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 == 0 ? "bg-gray-800" : ""
                }  border-gray-900`}
              >
                <td className="py-2 pl-3">{entry.name}</td>
                <td>{entry.date}</td>
                <td>{entry.tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-gray-500 flex gap-x-3 justify-center my-3 text ">
        <div className="font-semibold" >Previous</div>
        <div className="font-semibold text-gray-300" >Next</div>
      </div>
    </>
  );
};
