import { useState, useEffect } from "react";
import gaspump from "../../../assets/pump/gas.png";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";



const GameComponent = ({
  bettingStarted,
  pumpClicked,
  setBettingStarted,
  balloonNumber,
  setBalloonNumber,
  balloonSize,
  setBalloonSize,
  isPopped,
  setIsPopped,
  targetMultiplier,
  setTargetMultiplier,
  setCurrenthistory , 
  pumpMultipler , 
  risk
}) => {
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
      setCurrenthistory((prev)=>[...prev , {
        result:0.0 , 
        color:"red"
      }])
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

  const [currentIndex, setCurrentIndex] = useState(
    pumpMultipler.indexOf(balloonNumber) || 0
  );

  useEffect(() => {
    setCurrentIndex(pumpMultipler.indexOf(balloonNumber));
  }, [balloonNumber]);
  const handleScrollUp = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScrollDown = () => {
    if (currentIndex < pumpMultipler.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <section className="flex w-full justify-center">
      {targetMultiplier}
      <div className="flex  mt-20 flex-col my-auto w-[40%] pt-48   items-center justify-center bg-gray-900 text-white">
        <div  style={{
          bottom:`${balloonNumber>2 ? balloonNumber * 0.4 : balloonNumber >1.3 ? -30 : -50}px`
        }}className={` absolute   -ml-[150px] h-[70%] `}>
          {isPopped ? (
            <div className="text-4xl font-bold">💥</div>
          ) : (
            <div
              className={`flex items-center ${risk == "Low" ? "bg-green-600" : risk == "Medium" ? "bg-orange-600" :"bg-red-600"} justify-center transition-all duration-300 ease-in-out`}
              style={{
                width: `${balloonSize * 1.2}px`,
                height: `${balloonSize * 1.5}px`,
                borderRadius: "50%",
                marginTop: `-${balloonSize * 0.75}px`, // Moves the balloon upwards
              }}
            >
              <span className="text-sm font-bold">{balloonNumber} X</span>
            </div>
          )}
        </div>
        <img src={gaspump} alt="" />
      </div>
      <div className="relative flex  mt-[20%] flex-col items-center h-[200px] w-32 my-10 overflow-hidden">
        <IoIosArrowUp
          className="text-white cursor-pointer mb-2"
          onClick={handleScrollUp}
        />

        <div className="flex flex-col  items-center">
          {pumpMultipler.map((x, index) => {
            const isCentered = x === balloonNumber;
            return (
              <div
                key={index}
                className={`px-3 py-2 rounded-md text-xl transition-all duration-300 ${
                  isCentered
                    ? "bg-green-500 text-white text-2xl"
                    : "bg-gray-500 text-gray-300 opacity-50 scale-75"
                }`}
                style={{
                  transform: `scale(${isCentered ? 1.2 : 0.8})`,
                  transition: "opacity 0.3s, transform 0.3s",
                  display:
                    Math.abs(index - currentIndex) <= 1 ? "block" : "none",
                }}
              >
                {x} x
              </div>
            );
          })}
        </div>

        <IoIosArrowDown
          className="text-white cursor-pointer mt-2"
          onClick={handleScrollDown}
        />
      </div>
    </section>
  );
};

export default GameComponent;
