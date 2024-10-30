import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bomb from "../../assets/boom.png";
import diamond from "../../assets/diamond.png";

const Game = ({
  // eslint-disable-next-line
  mines,
  // eslint-disable-next-line
  betStarted,
  // eslint-disable-next-line
  setBetStarted,
  // eslint-disable-next-line
  setGems,
  // eslint-disable-next-line
  setRandomSelect,
  // eslint-disable-next-line
  randomSelect,
  // eslint-disable-next-line
  gameCheckout,
  // eslint-disable-next-line
  setGameCheckout,
}) => {
  const [grid, setGrid] = useState(createGrid());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  function createGrid() {
    const grid = Array.from({ length: 25 }, () => ({
      type: "diamond",
      revealed: false,
    }));

    let bombCount = 0;
    while (bombCount < mines) {
      const bombIndex = Math.floor(Math.random() * 25);
      if (grid[bombIndex].type !== "bomb") {
        grid[bombIndex] = { type: "bomb", revealed: false };
        bombCount++;
      }
    }

    return grid;
  }

  useEffect(() => {
    if (betStarted) {
      setGrid(createGrid());
      setGameOver(false);
      setGameWon(false);
    }
  }, [betStarted]);

  useEffect(() => {
    if (randomSelect && !gameOver && !gameWon) {
      const unrevealedTiles = grid
        .map((box, index) => ({ ...box, index }))
        .filter((box) => !box.revealed);

      if (unrevealedTiles.length > 0) {
        const randomBox =
          unrevealedTiles[Math.floor(Math.random() * unrevealedTiles.length)];
        handleBoxClick(randomBox.index);
      }
      setRandomSelect(false);
    }
  }, [randomSelect, grid, gameOver, gameWon, setRandomSelect]);

  const handleBoxClick = (index) => {
    if (gameOver || gameWon || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], revealed: true };

    if (newGrid[index].type === "bomb") {
      setGameOver(true);
      setBetStarted(false);
    } else if (newGrid[index].type === "diamond") {
      setGems((p) => p - 1);
      const diamondsLeft = newGrid.filter(
        (box) => box.type === "diamond" && !box.revealed
      ).length;

      if (diamondsLeft === 0) {
        setGameWon(true);
        setBetStarted(false);
      }
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    if (gameOver) {
      const timeoutId = setTimeout(() => {
        setGameOver(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }

    if (gameWon) {
      const timeoutId = setTimeout(() => {
        setGameWon(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }

    if (gameCheckout) {
      const timeoutId = setTimeout(() => {
        setGameCheckout(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [gameWon, gameOver, gameCheckout, setGameCheckout]);

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full relative">
      <div className="grid grid-cols-5 gap-2 sm:gap-2">
        {grid.map((box, index) => (
          <motion.div
            key={index}
            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 ${
              box.revealed ? "bg-gray-950" : "bg-gray-700"
            }  ${
              box.revealed ? "" : "hover:bg-gray-600 "
            }  duration-150 rounded-lg flex items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-shadow`}
            whileHover={{ y: box.revealed ? "" : "-5px" }}
            whileTap={{ scale: 0.9 }}
            style={{
              boxShadow: box.revealed ? "" : "0 5px 1px #2d2b27",
            }}
            onClick={() => {
              if (betStarted) {
                handleBoxClick(index);
              }
            }}
          >
            {box.revealed && (
              <span className="text-base sm:text-lg md:text-xl">
                {box.type === "diamond" ? (
                  <motion.img
                    src={diamond}
                    alt="Diamond"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                ) : box.type === "bomb" ? (
                  <img
                    src={bomb}
                    alt="Bomb"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                  />
                ) : (
                  ""
                )}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <motion.div
            className="text-black p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center flex-col rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setGameOver(false)}
          >
            <img src={bomb} alt="Bomb" className="w-32 sm:w-40 md:w-48" />
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
              Oops! Game Over..
            </h2>
          </motion.div>
        </div>
      )}

      {/* Win Modal */}
      {gameWon && (
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-75 flex items-center justify-center">
          <motion.div
            className="text-black p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center flex-col rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setGameWon(false)}
          >
            <img src={diamond} alt="Diamond" className="w-16 mb-2" />
            <h2 className="text-xl text-center md:text-2xl font-bold text-white mb-4">
              Congratulations!
              <br /> You Won!
            </h2>
          </motion.div>
        </div>
      )}

      {/* Game Checkout Modal */}
      {gameCheckout && (
        <div className="absolute top-0 left-0 w-full h-full inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-75 flex items-center justify-center">
          <motion.div
            className="text-black p-4 sm:p-6 w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center flex-col rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setGameCheckout(false)}
          >
            <h2 className="text-xl text-center md:text-2xl font-bold text-white mb-4">
              Game Checked Out
            </h2>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Game;
