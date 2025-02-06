import { useState } from "react";
import { TransactionType } from "./LeftSection";
import { FaFilter } from "react-icons/fa";
const sessions = [
    { id: 1, browser: "Firefox (Unknown)", location: "IN, Guntur", ip: "152.59.204.201", lastUsed: "1 hour ago", status: "inactive" },
    { id: 2, browser: "Firefox (Unknown)", location: "IN, Dowleswaram", ip: "152.59.205.193", lastUsed: "1 hour ago", status: "inactive" },
    { id: 3, browser: "Firefox (Unknown)", location: "IN, Guntur", ip: "152.59.204.70", lastUsed: "2 hours ago", status: "active" },
  ];
const Sessions = () => {
    const [filter, setFilter] = useState("all");

    const filteredSessions = sessions.filter(session => 
      filter === "all" || session.status === filter
    );
  
  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Sessions"} />
      <section className="max-w-[900px] w-full flex justify-center items-center bg-gray-900 p-4  rounded-md">
        <div className=" bg-gray-900 text-white w-full  mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Session Filter</h2>
            <div className="relative">
              <FaFilter className="absolute left-3 top-2 text-gray-600" />
              <select
                className="bg-gray-800 text-white p-2 pl-10 rounded-md outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden ">
            <table className="w-full text-left ">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="p-3">Browser</th>
                  <th className="p-3">Near</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Last Used</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session , index) => (
                  <tr key={session.id} className={`border-t border-gray-700 ${index %2 ==0 ? "bg-gray-800 " :""}`}>
                    <td className="p-3">{session.browser}</td>
                    <td className="p-3">{session.location}</td>
                    <td className="p-3">{session.ip}</td>
                    <td className="p-3">{session.lastUsed}</td>
                    <td className="p-3 font-semibold text-{session.status === 'active' ? 'green-400' : 'red-400'}">
                      {session.status === "active" ? "Current" : "Removed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center gap-x-9 text-gray-400">
            <button className="hover:text-white">Previous</button>
            <button className="hover:text-white">Next</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Sessions;
