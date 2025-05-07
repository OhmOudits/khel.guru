import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bomb from "../../../assets/boom.png";
import diamond from "../../../assets/diamond.png";
import {
  disconnectMinesSocket,
  getMinesSocket,
} from "../../../socket/games/mines";
import { toast } from "react-toastify";

const Game = ({
  mines,
  betStarted,
  setBetStarted,
  setGems,
  setRandomSelect,
  randomSelect,
  gameCheckout,
  setGameCheckout,
  selectBoxes,
  startAutoBet,
  setStartAutoBet,
  selectedBoxes,
  setSelectedBoxes,
  mode,
  nbets,
  setSelectBoxes,
}) => {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const autoGrid = Array.from({ length: 25 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const minesSocket = getMinesSocket();

      if (minesSocket) {
        minesSocket.on("error", ({ message }) => {
          console.error("Join game error:", message);
          toast.error(`Error joining game: ${message}`);
        });
      }
    }

    return () => {
      const minesSocket = getMinesSocket();
      if (minesSocket) {
        minesSocket.off("error");
      }
      disconnectMinesSocket();
    };
  }, []);

  useEffect(() => {
    if (betStarted) {
      const minesSocket = getMinesSocket();
      if (minesSocket) {
        minesSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Parachute socket not initialized");
        alert("Failed to join game: Socket not connected");
      }
    }
  }, [betStarted]);

  const handleAutoGridClick = (index) => {
    if (selectedBoxes.includes(index)) {
      setSelectedBoxes((prev) => prev.filter((i) => i !== index));
    } else {
      if (selectedBoxes.length >= 25 - mines) return;
      setSelectedBoxes((prev) => [...prev, index]);
    }
  };

  // Helper function to create the grid
  const createGrid = () => {
    const initialGrid = Array.from({ length: 25 }, () => ({
      type: "diamond",
      revealed: false,
    }));

    let bombCount = 0;
    while (bombCount < mines) {
      const bombIndex = Math.floor(Math.random() * 25);
      if (initialGrid[bombIndex].type !== "bomb") {
        initialGrid[bombIndex] = { type: "bomb", revealed: false };
        bombCount++;
      }
    }
    return initialGrid;
  };

  // Initialize the grid whenever mines change
  useEffect(() => {
    setGrid(createGrid());
    setSelectedBoxes([]);
  }, [mines]);

  const resetGame = () => {
    setGrid(createGrid());
    setGameOver(false);
    setGameWon(false);
    setBetStarted(false);
    setGems(25 - mines);
    setRandomSelect(false);
    setGameCheckout(false);
  };

  const handleBoxClick = (index) => {
    if (gameOver || gameWon || grid[index]?.revealed) return;
    if (!betStarted && !startAutoBet) return;

    console.log(index);

    setGrid((prevGrid) =>
      prevGrid.map((box, idx) => {
        if (idx === index) {
          if (box.type === "bomb") {
            if (!startAutoBet) {
              setGameOver(true);
            }
            return { ...box, revealed: true };
          } else if (box.type === "diamond") {
            setGems((prev) => prev - 1);
            const diamondsLeft = prevGrid.filter(
              (b) => b.type === "diamond" && !b.revealed
            ).length;
            if (diamondsLeft === 1) setGameWon(true);
            return { ...box, revealed: true };
          }
        }
        return box;
      })
    );
  };

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
  }, [randomSelect, gameOver, gameWon, grid, setRandomSelect]);

  useEffect(() => {
    if (
      mode === "auto" &&
      selectBoxes &&
      startAutoBet &&
      selectedBoxes.length > 0
    ) {
      autoBet(nbets);
    }
  }, [mode, selectBoxes, startAutoBet, selectedBoxes, nbets]);

  const autoBet = async (count) => {
    if (count <= 0) {
      setSelectBoxes(false);
      setStartAutoBet(false);
      resetGame();
      return;
    }

    const minesSocket = getMinesSocket();
    if (minesSocket) {
      minesSocket.emit("add_game", {});
      console.log("Emitted add_game event");
    } else {
      console.error("Mines socket not initialized");
      toast.error("Failed to join game: Socket not connected");
      return;
    }

    // run game here
    setGrid(createGrid());
    for (let i = 0; i < selectedBoxes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      handleBoxClick(selectedBoxes[i]);
    }

    setTimeout(() => autoBet(count - 1), 2000);
  };

  useEffect(() => {
    if (gameOver || gameWon || gameCheckout) {
      setGameCheckout(true);
      const timeoutId = setTimeout(resetGame, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [gameWon, gameOver, gameCheckout]);

  // Reusable Modal Component
  const Modal = ({ title, image, children }) => (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
      <motion.div
        className="p-6 w-full max-w-md flex items-center flex-col rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img src={image} alt={title} className="w-32 sm:w-40 md:w-48" />
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {title}
        </h2>
        {children}
      </motion.div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-10 w-full relative">
      <div className="grid grid-cols-5 gap-2">
        {mode === "auto" &&
          (!selectBoxes ? (
            <>
              {autoGrid.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-24 h-24 max-lg:w-16 max-lg:h-16 ${
                    selectedBoxes.includes(index)
                      ? "bg-green-500"
                      : `${
                          selectedBoxes.length === 25 - mines
                            ? "bg-gray-950"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`
                  } rounded-lg flex items-center justify-center cursor-pointer`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAutoGridClick(index)}
                ></motion.div>
              ))}
            </>
          ) : (
            <>
              {grid.map((box, index) => (
                <motion.div
                  key={index}
                  className={`w-24 h-24 max-lg:w-16 max-lg:h-16 ${
                    box.revealed
                      ? "bg-gray-950"
                      : selectedBoxes.includes(index)
                      ? "bg-gray-800"
                      : "bg-gray-700"
                  } rounded-lg flex items-center justify-center cursor-pointer`}
                  whileHover={!box.revealed ? { y: -5 } : {}}
                  whileTap={{ scale: 0.9 }}
                >
                  {box.revealed && (
                    <img
                      src={box.type === "diamond" ? diamond : bomb}
                      alt={box.type}
                      className="w-10 h-10"
                    />
                  )}
                </motion.div>
              ))}
            </>
          ))}

        {mode === "manual" && (
          <>
            {grid.map((box, index) => (
              <motion.div
                key={index}
                className={`w-24 h-24 max-lg:w-16 max-lg:h-16 ${
                  box.revealed ? "bg-gray-950" : "bg-gray-700 hover:bg-gray-600"
                } rounded-lg flex items-center justify-center cursor-pointer`}
                whileHover={!box.revealed ? { y: -5 } : {}}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBoxClick(index)}
              >
                {box.revealed && (
                  <img
                    src={box.type === "diamond" ? diamond : bomb}
                    alt={box.type}
                    className="w-10 h-10"
                  />
                )}
              </motion.div>
            ))}
          </>
        )}
      </div>

      {gameOver && <Modal title="Game Over" image={bomb} />}
      {gameWon && <Modal title="You Won!" image={diamond} />}
    </div>
  );
};

export default Game;
