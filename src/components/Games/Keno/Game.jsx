import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import gift from "../../../assets/gift.svg";

const socket = io("http://localhost:3000");

const Game = ({
  mines,
  betStarted,
  gameOver,
  userEmail,
  checkedBoxes,
  setCheckecdBoxes,
  gifts,
  winnedGifts,
  things,
  arrayLength,
}) => {
  const [grid, setGrid] = useState([]);

  // Helper function to create grid
  useEffect(() => {
    const createGrid = () => {
      const initialGrid = Array.from({ length: 40 }, () => ({
        type: "diamond",
        revealed: false,
      }));
      return initialGrid;
    };
    setGrid(createGrid());
  }, [mines]);

  useEffect(() => {
    if (betStarted && userEmail) {
      socket.emit("startMinesGame", userEmail); // Start game on backend
    }

    // Handle game started event from backend
    socket.on("minesGameStarted", ({ bombPosition }) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        if (newGrid[bombPosition]) {
          newGrid[bombPosition].type = "bomb"; // Place bomb according to backend
        }
        return newGrid;
      });
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off("minesGameStarted");
      socket.off("minesGameOver");
      socket.off("minesBoxSafe");
    };
  }, [betStarted, userEmail]);

  const handleBoxClick = (index) => {
    if (betStarted) return;

    // Prevent clicking new boxes when 10 are checked
    if (checkedBoxes.length >= 10 && !checkedBoxes.includes(index)) return;

    setCheckecdBoxes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((element) => element !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const isLimitReached = checkedBoxes.length >= 10;

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full relative">
      {/* Render the grid */}
      <div className="grid grid-cols-8 gap-2 sm:gap-2">
        {grid.map((box, index) => (
          <motion.div
            key={index}
            className={`w-[2.6rem] h-[2.6rem] lg:w-[4.25rem] lg:h-[4.25rem] xl:
              ${
                checkedBoxes.includes(index)
                  ? "bg-violet-600 cursor-pointer"
                  : gifts.includes(index)
                  ? "bg-red-500"
                  : isLimitReached
                  ? "bg-[rgba(255,255,255,0.1)]"
                  : "bg-gray-700 hover:bg-gray-600"
              }
              duration-${isLimitReached ? "0" : "150"}
              rounded-lg flex items-center justify-center font-medium text-opacity-80 
              ${
                isLimitReached ? "cursor-default" : "cursor-pointer"
              } text-white shadow-lg hover:shadow-2xl`}
            whileHover={!isLimitReached && !box.revealed ? { y: "-2px" } : {}}
            whileTap={!isLimitReached ? { scale: 0.9 } : {}}
            style={{
              boxShadow: isLimitReached ? "none" : "0 5px 1px #2d2b27",
            }}
            onClick={() => handleBoxClick(index)}
          >
            {gifts.includes(index) ? (
              <img src={gift} alt="gift" className="m-2" />
            ) : (
              <div className={`text-xl max-lg:text-base`}>
                {JSON.stringify(index + 1)}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Game over, win, and checkout modals */}
      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="text-black p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center flex-col rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-bold text-gray-200 text-xl">
              {winnedGifts} Matches
            </p>
            <h2 className="font-bold text-2xl text-gray-300 mt-2">
              <span className="text-3xl">
                {things[arrayLength - 1]?.values[0]?.[winnedGifts] || 0}
              </span>
              x
            </h2>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Game;
