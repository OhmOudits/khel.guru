import { TransactionType } from "./LeftSection";
const Data = [
  {
    id: 1,
    userid: "Thing",
    date: "12/2/2025",
  },
  {
    id: 1,
    userid: "Thing",
    date: "12/2/2025",
  },
  {
    id: 1,
    userid: "Thing",
    date: "12/2/2025",
  },
  {
    id: 1,
    userid: "Thing",
    date: "12/2/2025",
  },
];
const IgnoredUsers = () => {
  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Ignored Users"} />
      <section className="max-w-[900px] w-full flex justify-center items-center bg-gray-900 p-4  rounded-md">
        <div className=" bg-gray-900 min-h-[50vh] text-white w-full  mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Ignored Users</h2>
          </div>

          <div className="overflow-hidden ">
            <table className="w-full text-left ">
              <thead className="">
                <tr className="text-gray-500">
                  <th className="p-3 text-center">User Id </th>
                  <th className="p-3 text-center">Date</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Data.map((session, index) => (
                  <tr
                    key={session.id}
                    className={`border-t border-gray-700 ${
                      index % 2 == 0 ? "bg-gray-800 " : ""
                    }`}
                  >
                    <td className="p-3 text-center">{session.userid}</td>
                    <td className="p-3 text-center ">{session.date}</td>
                    <td className="p-3 text-center">Acknoweldge</td>
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

export default IgnoredUsers;
