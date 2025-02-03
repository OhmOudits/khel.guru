import { useState, useEffect } from "react";
import gaspump from "../../../assets/pump/gas.png";

export const pumpMultipler = [
  1.01, 1.23, 1.55, 1.98, 2.56, 3.36, 4.48, 6.08, 12.0, 35.0, 50.0, 73.0, 144.0,
  200.0,
];

const GameComponent = ({ bettingStarted, pumpClicked, setBettingStarted , balloonNumber , setBalloonNumber , balloonSize , setBalloonSize , isPopped , setIsPopped , targetMultiplier , setTargetMultiplier  }) => {


  useEffect(() => {
    setIsPopped(false);
    resetGame();
    const randomMultiplier =
      pumpMultipler[Math.floor(Math.random() * pumpMultipler.length)];
    setTargetMultiplier(randomMultiplier);
  }, []);

  useEffect(() => {
        resetGame();
   
  }, [bettingStarted]);
  useEffect(() => {
    if (balloonNumber >= targetMultiplier) {
      setIsPopped(true);
      setBettingStarted(false);
      setTimeout(() => {
        resetGame();
      }, 1000);
    }
  }, [balloonNumber, targetMultiplier]);

  const pumpBalloon = () => {
    if (!isPopped) {
      setBalloonSize((prevSize) => Math.min(prevSize + 10, 200));
      setBalloonNumber((prevNumber) => {
        const index = pumpMultipler.indexOf(prevNumber);
        return index !== -1 && index + 1 < pumpMultipler.length
          ? pumpMultipler[index + 1]
          : prevNumber;
      });
    }
  };

  useEffect(() => {
    pumpBalloon();
  }, [pumpClicked]);

  const resetGame = () => {
    setIsPopped(false);
    setBalloonSize(50);
    setBalloonNumber(pumpMultipler[0]);
    const randomMultiplier =
      pumpMultipler[Math.floor(Math.random() * pumpMultipler.length)];
    setTargetMultiplier(randomMultiplier);
  };

  return (
    <section className="flex w-full justify-center">
      {targetMultiplier}
      <div className="flex flex-col my-auto w-[80%] pt-20 items-center justify-center bg-gray-900 text-white">
        <div className="relative -ml-[150px]">
          {isPopped ? (
            <div className="text-4xl font-bold">💥</div>
          ) : (
            <div
              className="flex items-center bg-red-600 justify-center transition-all duration-300 ease-in-out"
              style={{
                width: `${balloonSize * 1.2}px`,
                height: `${balloonSize * 1.5}px`,
                borderRadius: "50%",
              }}
            >
              <span className="text-xl font-bold">{balloonNumber} X</span>
            </div>
          )}
        </div>
        <img src={gaspump} alt="" />
      </div>
      {/* Multiplier list */}
      <div className="pt-10 h-[500px] pr-5 my-10 overflow-y-scroll">
        {pumpMultipler.map((x, index) => (
          <div
            key={index}
            className={`px-3 py-2 my-3 rounded-md text-xl ${
              x <= balloonNumber ? "bg-green-500" : "bg-gray-500"
            }`}
          >
            {x} x
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameComponent;
