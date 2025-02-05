import { useState } from "react";
import { BsFillTrophyFill } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";

export const TrophySection = () => {
  const [type, settype] = useState("Luckiest");
  return (
    <section className="mt-7">
      <div className="flex justify-between">
        <div className="flex text-gray-300 ml-3 gap-x-3">
          <BsFillTrophyFill size={25} className="text-white" />
          <span className="text-lg font-semibold">Luckiest Wins</span>
        </div>
        <div className="order-10 md:order-2 w-fit">
          <select
            className="w-full h-full rounded bg-secondry outline-none bg-gray-900 text-white px-3 pr-6 text-lg py-2 "
            value={type}
            id="risk"
            onChange={(e) => settype(e.target.value)}
          >
            <option value="Luckiest">Luckiest</option>
            <option value="Biggest">Biggest</option>
          </select>
        </div>
      </div>
      <div className=" w-full  items-center mx-auto pt-10 ">
       
          <VscGraph className="text-gray-300 mx-auto" size={70} />
          <div className="text-gray-300 text-center mt-2 "> This user has no visible statistics.</div>
      </div>
      
    </section>
  );
};
