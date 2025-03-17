import { VscGraph } from "react-icons/vsc";
import { TransactionType } from "./LeftSection";

const Api = () => {
  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Api"} />
      <section className="max-w-[900px] w-full flex justify-center items-center bg-gray-900 p-4 py-6 rounded-md">
        <div className="">
          <VscGraph className="text-gray-300 mx-auto" size={70} />
          <div className="text-gray-300 text-center mt-2 ">
            {" "}
            Coming soon 
          </div>
        </div>
      </section>
    </main>
  );
};

export default Api;
