import { useEffect, useState } from "react";
import { balloonTypes, diamondTypes } from "./Frame";
import DiamondSlots from "./Slots";
import MobileSlot from "./MobileMainSlot";
import "../../../styles/Scratch.css";

const Game = ({
  betStarted,
  diamondCounts,
  setDiamondCounts,
  reset,
  AutoClick,
  setAutoPick,
  slotindex,
  setslotindex,
}) => {
  const [grid, setGrid] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
      return <div className="gemWrapper">
        <div className="gemBox ruby">
          <div className="shine"></div>
        </div>
        <div className="glint"></div>
      </div>
    }
    else if (color == "yellow") {
      return <div className="gemWrapper">
        <div className="gemBox topaz">
          <div className="shine"></div>
        </div>
        <div className="glint"></div>
      </div>
    }
    else if (color == "blue") {
      return <div className="gemWrapper">
        <div className="gemBox sapphire">
          <div className="shine"></div>
        </div>
        <div className="glint"></div>
      </div>
    }
    else if (color == "purple") {
      return <div className="gemWrapper">
        <div className="gemBox alexandrite">
          <div className="shine"></div>
        </div>
        <div className="glint"></div>
      </div>
    }
    else return <div className="gemWrapper">
      <div className="gemBox diamond">
        <div className="shine"></div>
      </div>
      <div className="glint"></div>
    </div>;
  };
  const handleAutoClick = () => {
    setGrid((prevGrid) =>
      prevGrid.map((box) =>
        !box.revealed && !box.animating ? { ...box, animating: true } : box
      )
    );

    setGrid((prevGrid) =>
      prevGrid.map((box) =>
        !box.revealed ? { ...box, animating: false, revealed: true } : box
      )
    );

    prevGrid.forEach((box, index) => {
      if (box.diamondColor && !box.revealed) {
        setDiamondCounts((prevCounts) => ({
          ...prevCounts,
          [box.diamondColor]: {
            count: prevCounts[box.diamondColor].count + 1,
            indices: [...prevCounts[box.diamondColor].indices, index],
          },
        }));
      }
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
    // Reset the game
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
    if (reset) {
      handleReset();
    }
  }, [reset]);

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
                    className={`absolute balloon ${box.animating ? "animate-float" : ""
                      }`}
                    style={{ backgroundColor: box.balloonColor }}
                    onAnimationEnd={() => handleAnimationComplete(index)}
                  ></div>
                )}
                {box.revealed && (
                  <div
                    className="absolute empty justify-between">
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
