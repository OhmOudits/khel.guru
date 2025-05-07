import { useEffect, useState } from "react";
import { balloonTypes, diamondTypes } from "./Frame";
import DiamondSlots from "./Slots";
import MobileSlot from "./MobileMainSlot";
import "../../../styles/Scratch.css";
import {
  disconnectScratchSocket,
  getScratchSocket,
} from "../../../socket/games/scratch";
import { toast } from "react-toastify";

const Game = ({
  betStarted,
  setBettingStarted,
  diamondCounts,
  setDiamondCounts,
  AutoClick,
  setAutoPick,
  slotindex,
  setslotindex,
  startAutoBet,
  setStartAutoBet,
  nbets,
}) => {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const scratchSocket = getScratchSocket();

      if (scratchSocket) {
        scratchSocket.on("error", ({ message }) => {
          console.error("Join game error:", message);
          toast.error(`Error joining game: ${message}`);
        });
      }
    }

    return () => {
      const scratchSocket = getScratchSocket();
      if (scratchSocket) {
        scratchSocket.off("error");
      }
      disconnectScratchSocket();
    };
  }, []);

  useEffect(() => {
    if (betStarted) {
      const scratchSocket = getScratchSocket();
      if (scratchSocket) {
        scratchSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Scratch socket not initialized");
        alert("Failed to join game: Socket not connected");
        return;
      }
    }
  }, [betStarted]);

  const handleBoxClick = (index) => {
    if (!betStarted) return;

    const clickedBox = grid[index];
    if (clickedBox.revealed || clickedBox.diamondColor === null) return;

    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((box, i) =>
        i === index && !box.revealed && !box.animating
          ? { ...box, animating: true }
          : box
      );

      if (clickedBox && clickedBox.diamondColor && !clickedBox.revealed) {
        setDiamondCounts((prevCounts) => ({
          ...prevCounts,
          [clickedBox.diamondColor]: {
            count: prevCounts[clickedBox.diamondColor].count + 1,
            indices: [...prevCounts[clickedBox.diamondColor].indices, index],
          },
        }));
      }

      return updatedGrid;
    });
  };

  const getimage = (color) => {
    if (color == "red") {
      return (
        <div className="gemWrapper">
          <div className="gemBox ruby">
            <div className="shine"></div>
          </div>
          <div className="glint"></div>
        </div>
      );
    } else if (color == "yellow") {
      return (
        <div className="gemWrapper">
          <div className="gemBox topaz">
            <div className="shine"></div>
          </div>
          <div className="glint"></div>
        </div>
      );
    } else if (color == "blue") {
      return (
        <div className="gemWrapper">
          <div className="gemBox sapphire">
            <div className="shine"></div>
          </div>
          <div className="glint"></div>
        </div>
      );
    } else if (color == "purple") {
      return (
        <div className="gemWrapper">
          <div className="gemBox alexandrite">
            <div className="shine"></div>
          </div>
          <div className="glint"></div>
        </div>
      );
    } else
      return (
        <div className="gemWrapper">
          <div className="gemBox diamond">
            <div className="shine"></div>
          </div>
          <div className="glint"></div>
        </div>
      );
  };

  const handleAutoClick = () => {
    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((box, index) => {
        if (!box.revealed && !box.animating) {
          if (box.diamondColor) {
            setDiamondCounts((prevCounts) => ({
              ...prevCounts,
              [box.diamondColor]: {
                count: prevCounts[box.diamondColor].count + 1,
                indices: [...prevCounts[box.diamondColor].indices, index],
              },
            }));
          }
          return { ...box, animating: false, revealed: true };
        }
        return box;
      });
      return updatedGrid;
    });
  };

  const handleAnimationComplete = (index) => {
    setGrid((prevGrid) =>
      prevGrid.map((box, i) =>
        i === index ? { ...box, animating: false, revealed: true } : box
      )
    );

    const clickedBox = grid[index];
    if (clickedBox && clickedBox.diamond) {
      setDiamondCounts((prevCounts) => ({
        ...prevCounts,
        [clickedBox.diamond]: {
          count: prevCounts[clickedBox.diamond].count + 1,
          indices: [...prevCounts[clickedBox.diamond].indices, index],
        },
      }));
    }
  };

  const handleReset = () => {
    const createGrid = () => {
      return Array.from({ length: 9 }, () => {
        const balloonColor =
          balloonTypes[Math.floor(Math.random() * balloonTypes.length)];
        const diamondColor =
          diamondTypes[Math.floor(Math.random() * diamondTypes.length)];
        return {
          revealed: false,
          animating: false,
          balloonColor,
          diamondColor,
        };
      });
    };

    setGrid(createGrid());
    setDiamondCounts(
      diamondTypes.reduce(
        (acc, type) => ({ ...acc, [type]: { count: 0, indices: [] } }),
        {}
      )
    );
  };

  useEffect(() => {
    if (AutoClick) {
      handleAutoClick();
      setTimeout(() => {
        setAutoPick(false);
      }, 4000);
    }
  }, [AutoClick]);

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    if (startAutoBet) {
      return;
    }

    if (grid.length === 9 && grid.every((box) => box.revealed)) {
      setTimeout(() => {
        setBettingStarted(false);
        handleReset();
      }, 1500);
    }
  }, [grid]);

  useEffect(() => {
    if (startAutoBet) {
      runAutoBetRecursive(nbets);
    }
  }, [startAutoBet]);

  const runAutoBetRecursive = async (remainingBets) => {
    if (remainingBets === 0) {
      setStartAutoBet(false);
      return;
    }

    const scratchSocket = getScratchSocket();
    if (scratchSocket) {
      scratchSocket.emit("add_game", {});
      console.log("Emitted add_game event");
    } else {
      console.error("Scratch socket not initialized");
      alert("Failed to join game: Socket not connected");
      return;
    }
    console.log("Running Auto Bet:", nbets - remainingBets + 1);
    await new Promise((resolve) => setTimeout(resolve, 500));
    handleAutoClick();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleReset();
    await new Promise((resolve) => setTimeout(resolve, 500));
    runAutoBetRecursive(remainingBets - 1);
  };

  return (
    <div className="w-full h-full p-1 grid lg:flex">
      <div className="block lg:hidden">
        <MobileSlot diamondCounts={diamondCounts} slotindex={slotindex} />
      </div>
      <div className="hidden lg:block lg:w-4/7 items-center h-[400px] justify-center">
        <DiamondSlots
          diamondCounts={diamondCounts}
          setslotindex={setslotindex}
          slotindex={slotindex}
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center sm:py-10">
        <div className="flex flex-col items-bottom space-y-4">
          <div className="grid grid-cols-3 lg:w-30 lg:h-20 gap-14 lg:gap-5 py-[50px] lg:py-[1px] md:py[1px] sm:py-[10px]">
            {grid.map((box, index) => (
              <div
                key={index}
                className="relative scale-150 lg:scale-100 lg:w-20 lg:h-20 bg-gray-700 rounded-lg flex justify-center shadow-lg"
                onClick={() => handleBoxClick(index)}
              >
                {!box.revealed && (
                  <div
                    className={`absolute balloon ${
                      box.animating ? "animate-float" : ""
                    }`}
                    style={{ backgroundColor: box.balloonColor }}
                    onAnimationEnd={() => handleAnimationComplete(index)}
                  ></div>
                )}
                {box.revealed && (
                  <div className="absolute empty justify-between">
                    {getimage(box.diamondColor)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
