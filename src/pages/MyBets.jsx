import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { GiRolledCloth } from "react-icons/gi";
import { IoBalloon } from "react-icons/io5";
import List from "../components/MainFrame/List";

const Mybets = () => {
  const [activeTab, setActiveTab] = useState("Casino");

  const history = [
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
    {
      game: "Pump",
      bet_id: "12345678",
      date: "9:48 PM 2/5/2025 ",
      amount: "0.000002",
      multipler: 1.23,
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto w-full">
      <div className="flex pt-10 text-white ">
        {" "}
        <GiRolledCloth size={35} className="text-gray-400" />
        <span className="text-white my-1 font-semibold text-xl">
          My Bets
        </span>{" "}
      </div>
      <div className="flex justify-between mb-4 w-fit my-5 bg-gray-800 p-2 rounded-full">
        <button
          className={`flex-1 p-2 text-white px-5  rounded-full transition-all ${
            activeTab === "Casino" ? "bg-gray-700" : "bg-transparent"
          }`}
          onClick={() => setActiveTab("Casino")}
        >
          Casino
        </button>
        <button
          className={`flex-1 p-2 text-white px-5 rounded-full transition-all ${
            activeTab === "Sports" ? "bg-gray-700" : "bg-transparent"
          }`}
          onClick={() => setActiveTab("Sports")}
        >
          Sports
        </button>
      </div>
      <div className=" text-white  rounded-lg  space-y-4">
        <div className=" p-3 px-2 rounded-lg">
          <table className="w-full text-center text-white text-md">
            <thead>
              <tr className=" border-gray-900 h-12 text-gray-400 ">
                <th className="py-2 pl-3 text-left">Game</th>
                <th className="py-2">Bet Id</th>
                <th className="py-2">Date</th>
                <th className="py-2">Bet Amount</th>
                <th className="py-2">Multiplier</th>
                <th className="py-2 text-right pr-3">Payout</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr
                  key={index}
                  className={` h-12 ${index % 2 === 0 ? "bg-gray-800" : ""}`}
                >
                  <td className="py-2 pl-3 text-left flex gap-x-2">
                    {" "}
                    <IoBalloon size={20} className="text-white" /> {entry.game}
                  </td>
                  <td className="py-2">{entry.bet_id}</td>
                  <td className="py-2">{entry.date}</td>
                  <td className="py-2">${entry.amount}</td>
                  <td className="py-2">{entry.multipler} x</td>
                  <td className="py-2  text-right pr-3 flex justify-end items-center">
                    {(entry.amount * entry.multipler).toFixed(8)}
                    <FaBitcoin className="ml-1 text-yellow-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
          <List />
        </div>
    </section>
  );
};

export default Mybets;
