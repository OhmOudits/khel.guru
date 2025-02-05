import { useState } from "react";
import { FaExternalLinkAlt, FaCheckCircle, FaInfoCircle, FaBitcoin } from "react-icons/fa";
import { TransactionType } from "./LeftSection";

const Others = () => {
  const [selectedType, setSelectedType] = useState("All");

  const types = [
    "All",
    "Bonus",
    "Drop",
    "Campaign Withdrawl",
    "Reload Claim",
    "Race Payout",
    "Rains Received",
    "Rains Sent",
    "Rakeback Received",
    "Sportsbook Promotion Payout",
    "Tips Received",
    "Vault Deposit",
    "Vault Withdrawl",
  ];
  const transactions = [
    { type: "Bonus", date: "3:19 PM 12/1/2024", amount: "0.00001000" },
    { type: "Bonus", date: "3:17 PM 12/1/2024", amount: "0.00006000" },
    { type: "Bonus", date: "12:45 PM 11/28/2024", amount: "0.00000100" },
    { type: "Bonus", date: "12:43 PM 11/28/2024", amount: "0.00000100" },
    { type: "Bonus", date: "12:42 PM 11/28/2024", amount: "0.00001000" },
    { type: "Bonus", date: "12:38 PM 11/28/2024", amount: "0.00000100" },
    { type: "Bonus", date: "12:38 PM 11/28/2024", amount: "0.00001000" },
    { type: "Bonus", date: "12:35 PM 11/28/2024", amount: "902.31256000" },
  ];

  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Other"} />
      <section className="max-w-[900px] w-full mx-auto bg-gray-900 p-4 py-6 rounded-md">
        <div className="flex space-x-4 bg-gray-800 p-2 w-full max-w-[90vw] overflow-x-auto rounded-full scrollbar-hide">
          {types.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold ${
                selectedType === type ? "bg-gray-700 text-white" : "text-white"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>
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
                  <p className="text-white">{txn.type}</p>
                  <p className="text-gray-400 text-sm">{txn.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <span>{txn.amount}</span>
                <FaBitcoin color="gold"/>
              </div>
            </div>
          ))}
        </div>{" "}
      </section>
    </main>
  );
};

export default Others;
