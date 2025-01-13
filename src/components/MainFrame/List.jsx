import { useState, useEffect } from "react";
import { wins } from "../../constants";
import { motion } from "framer-motion";

const List = () => {
  const [category, setCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState(wins.slice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(10);

  const getCategoryPosition = () => {
    switch (category) {
      case "all":
        return "left-0";
      case "hwins":
        return "left-1/3";
      case "lwins":
        return "left-2/3";
      default:
        return "left-0";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < wins.length) {
        // Prepend new items to the beginning of the array
        setVisibleItems((prevItems) => [
          wins[currentIndex],
          ...prevItems.slice(0, 9),
        ]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      {/* Tabs Section */}
      <div className="relative mt-8 flex w-full max-w-[500px] ">
        <div
          className={`max-md:text-sm w-1/3 text-center px-2 py-3 cursor-pointer text-textColor font-semibold hover:text-white ${
            category === "all" ? "text-white" : ""
          }`}
          onClick={() => setCategory("all")}
        >
          All
        </div>
        <div
          className={`max-md:text-sm w-1/3 text-center px-2 py-3 cursor-pointer text-textColor font-semibold hover:text-white ${
            category === "hwins" ? "text-white" : ""
          }`}
          onClick={() => setCategory("hwins")}
        >
          High Wins
        </div>
        <div
          className={`max-md:text-sm w-1/3 text-center px-2 py-3 cursor-pointer text-textColor font-semibold hover:text-white ${
            category === "lwins" ? "text-white" : ""
          }`}
          onClick={() => setCategory("lwins")}
        >
          Lucky Wins
        </div>

        {/* Sliding Border */}
        <div
          className={`absolute bottom-0 h-1 w-1/3 bg-activeHover transition-all duration-300 ease-in-out ${getCategoryPosition()}`}
        ></div>
      </div>

      {/* Table Header */}
      <div className="mb-8 w-full">
        <div className="w-full py-3 bg-[#2a2a2a] grid grid-cols-12 gap-2 px-4 text-left font-semibold xl:grid-cols-[14]">
          <div className="col-span-6 md:col-span-5 xl:col-span-2">Game</div>
          <div className="hidden md:block md:col-span-5 xl:col-span-2">
            Username
          </div>
          <div className="hidden xl:block xl:col-span-2">Time</div>
          <div className="hidden xl:block xl:col-span-2">Wager</div>
          <div className="hidden xl:block xl:col-span-2">Multiplexer</div>
          <div className="col-span-6 md:col-span-2 text-right">Payout</div>
        </div>

        {/* Render Visible Items with Animation */}
        <div className="relative w-full py-3 bg-inactive ">
          {visibleItems.map((w) => (
            <motion.div
              key={w.id}
              className="w-full py-1.5 bg-inactive grid grid-cols-12 gap-2 px-4 text-left font-semibold xl:grid-cols-[14]"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-md:text-sm col-span-6 md:col-span-5 xl:col-span-2 flex items-center gap-2">
                <img src={w.gameImg} className="w-8 h-8 rounded" alt={w.game} />
                {w.game}
              </div>
              <div className="hidden md:block md:col-span-5 xl:col-span-2">
                {w.username}
              </div>
              <div className="hidden xl:block xl:col-span-2">{w.time}</div>
              <div className="hidden xl:block xl:col-span-2">{w.wager}</div>
              <div className="hidden xl:block xl:col-span-2">
                {w.multiplier}
              </div>
              <div className="col-span-6 max-md:text-sm md:col-span-2 text-right">
                {w.payout}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
