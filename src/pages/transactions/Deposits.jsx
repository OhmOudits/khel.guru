import { useState } from "react";
import { FaExternalLinkAlt, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { TransactionType } from "./LeftSection";

const Deposit = () => {
  const [selectedType, setSelectedType] = useState("Crypto");

  const transactions = [
    { date: "3:19 PM 12/1/2024", amount: "0.00001000" },
    { date: "3:17 PM 12/1/2024", amount: "0.00006000" },
    { date: "12:45 PM 11/28/2024", amount: "0.00000100" },
    { date: "12:43 PM 11/28/2024", amount: "0.00000100" },
    { date: "12:42 PM 11/28/2024", amount: "0.00001000" },
    { date: "12:38 PM 11/28/2024", amount: "0.00000100" },
    { date: "12:38 PM 11/28/2024", amount: "0.00001000" },
    { date: "12:35 PM 11/28/2024", amount: "902.31256000" },
  ];

  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
     <TransactionType type={"Deposits"}/>
      <section className="max-w-[900px] w-full mx-auto bg-gray-900 p-4 py-6 rounded-md">
        <div className="flex space-x-4 bg-gra p-2 w-fit bg-gray-800 rounded-full">
          {["Crypto", "Local Currency"].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full ${
                selectedType === type ? "bg-gray-700 text-white" : "text-white"
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>{" "}
        <div className=" rounded-lg mt-4">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                index % 2 == 0 ? "bg-gray-800" : ""
              }  p-3 rounded-lg mb-2 `}
            >
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-400" />
                <div>
                  <p className="text-white">Confirmed</p>
                  <p className="text-gray-400 text-sm">{txn.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <span>{txn.amount}</span>
                <FaInfoCircle />
                <FaExternalLinkAlt />
              </div>
            </div>
          ))}
        </div>{" "}
      </section>
    </main>
  );
};

export default Deposit;
