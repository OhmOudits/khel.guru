import { FaExternalLinkAlt } from "react-icons/fa";
import { TransactionType } from "./LeftSection";

const BetArcheive = () => {

  const transactions = [
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },
    { date: "Feburary 5 , 2025", bets: "2" },

  ];

  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Bet Archeive"} />
      <section className="max-w-[900px] w-full mx-auto bg-gray-900 p-4 py-6 rounded-md">
        <div className=" rounded-lg mt-4">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                index % 2 == 0 ? "bg-gray-800" : ""
              }  p-3 rounded-lg mb-2 `}
            >
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-white">{txn.date}</p>
                  <p className="text-gray-400 text-sm">{txn.bets} bets</p>
                </div>
              </div>
              <div className="flex cursor-pointer items-center space-x-2 text-gray-300">
                <span>Download</span>
s                <FaExternalLinkAlt />
              </div>
            </div>
          ))}
        </div>{" "}
      </section>
    </main>
  );
};

export default BetArcheive;
