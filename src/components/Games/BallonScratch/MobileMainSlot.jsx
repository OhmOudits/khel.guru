import { useEffect, useState } from "react";
const slotsData = [
  { multiplier: "100.00×", chance: "0.5%" },
  { multiplier: "10.00×", chance: "1.0%" },
  { multiplier: "7.00×", chance: "5.0%" },
  { multiplier: "5.00×", chance: "10.0%" },
  { multiplier: "3.50×", chance: "15.0%" },
  { multiplier: "2.35×", chance: "20.0%" },
  { multiplier: "1.45×", chance: "35.0%" },
  { multiplier: "0.85×", chance: "35.0%" },
  { multiplier: "0.45×", chance: "45.0%" },
  { multiplier: "0.15×", chance: "35.0%" },
  { multiplier: "0.00×", chance: "35.0%" },
  { multiplier: "0.00×", chance: "35.0%" },
];

const MobileSlot = ({ diamondCounts  , slotindex }) => {
  const colors = ["red", "yellow", "green", "purple", "blue"];
  const [highest, setHighest] = useState({
    main: {
      color: "",
      count: 0,
    },
    second: {
      color: "",
      count: 0,
    },
  });

  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    default: "bg-black",
  };

  const freeClasses = [
    "bg-gray-500 relative",
    "bg-black border-2 border-red-400",
  ];

  const displaySlots = [
    { diamonds: 8, different: 0, free: 0 },
    { diamonds: 7, different: 0, free: 1 },
    { diamonds: 6, different: 0, free: 2 },
    { diamonds: 5, different: 3, free: 0 },
    { diamonds: 5, different: 0, free: 3 },
    { diamonds: 4, different: 4, free: 0 },
    { diamonds: 4, different: 3, free: 1 },
    { diamonds: 4, different: 0, free: 4 },
    { diamonds: 3, different: 3, free: 2 },
    { diamonds: 3, different: 2, free: 3 },
    { diamonds: 2, different: 2, free: 4 },
    { diamonds: 2, different: 0, free: 6 },
  ];

  useEffect(() => {
    if (!diamondCounts || Object.keys(diamondCounts).length === 0) {
      setHighest({
        main: {
          color: "",
          count: 0,
        },
        second: {
          color: "",
          count: 0,
        },
      });
      return;
    }

    let newHighest = {
      main: {
        color: "",
        count: 0,
      },
      second: {
        color: "",
        count: 0,
      },
    };

    displaySlots.forEach(({ diamonds, different, free }) => {
      Object.entries(diamondCounts).forEach(([color, data]) => {
        if (data.count > newHighest.main.count) {
          if (newHighest.main.count > newHighest.second.count) {
            newHighest.second.color = newHighest.main.color;
            newHighest.second.count = newHighest.main.count;
          }
          newHighest.main.color = color;
          newHighest.main.count = data.count;
        } else if (
          data.count > newHighest.second.count &&
          color !== newHighest.main.color
        ) {
          newHighest.second.color = color;
          newHighest.second.count = data.count;
        }
      });
    });

    setHighest(newHighest);
  }, [diamondCounts]);

  useEffect(() => {
    const main = highest.main.count;
    const second = highest.second.count;
    if (main == 0) {
    }

    displaySlots.map((i, idx) => {
      if (i.diamonds == main && i.different == second) {
      }
    });
  }, [highest]);


  console.log("h", highest.second.color);

  
  console.log("h", highest.second.color);

  return (
    <div className="flex flex-col gap-1 px-4 w-[100%] sm:py-0 md:py-6 text-gray-500 rounded-lg">
      {/* <div className="flex items-center justify-between p-3 rounded py-0.5 bg-gray-800">
        <h2 className="justify-center text-2xl font-bold text-yellow-200">
          😛 💰 Jackpot 💰 😛
        </h2>
        <span className="text-[14px] font-semibold">1000.00×</span>
      </div> */}
    {
      slotindex === null && (
        <div
          key={slotindex}
          className="flex items-center justify-between p-3 rounded py-0.5 bg-gray-800"
        >
          <div className="flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`free-${i}`}
                className={`w-4 h-4 mx-2 rounded-md transform rotate-45 ${freeClasses[0]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[2px] h-[12px] bg-gray-300 rotate-0"></div>
                  <div className="w-[2px] h-[12px] bg-gray-300 -rotate-90 absolute"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right flex pl-5 my-5transition-opacity duration-300">
            <div className="text-[14px] font-semibold">
              {slotsData[slotindex]?.multiplier || "0.00×"}
            </div>
          </div>
        </div>
      )
    }


      {slotindex !== null && (
        <div
          key={slotindex}
          className="flex items-center justify-between p-3 rounded py-0.5 bg-gray-800"
        >
          <div className="flex">
            {[...Array(displaySlots[slotindex].diamonds)].map((_, i) => (
              <div
                key={`diamond-${i}`}
                className={`w-4 h-4 mx-2 rounded-l-sm rounded-r-sm rounded-ss-xl transform rotate-45 ${
                  highest.main.color
                }`}
              ></div>
            ))}
            {[...Array(displaySlots[slotindex].different)].map((_, i) => (
              <div
                key={`different-${i}`}
                className={`w-4 h-4 mx-2 rounded-l-sm rounded-r-sm rounded-ss-xl transform rotate-45 ${
                  highest.second.color
                }`}
              ></div>
            ))}
            {[...Array(displaySlots[slotindex].free)].map((_, i) => (
              <div
                key={`free-${i}`}
                className={`w-4 h-4 mx-2 rounded-md transform rotate-45 ${freeClasses[0]}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[2px] h-[12px] bg-gray-300 rotate-0"></div>
                  <div className="w-[2px] h-[12px] bg-gray-300 -rotate-90 absolute"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right flex pl-5 my-5transition-opacity duration-300">
            <div className="text-[14px] font-semibold">
              {slotsData[slotindex]?.multiplier || "0.00×"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default MobileSlot;
