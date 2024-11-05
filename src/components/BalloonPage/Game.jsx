import { useEffect, useState } from "react";
import clouds from "../../assets/Balloon/clouds.png";
import mountain from "../../assets/Balloon/mountain.png";
import balloon from "../../assets/Balloon/balloon.png";
import "../../styles/Balloon.css";

const Game = ({
  // eslint-disable-next-line
  checkout,
  // eslint-disable-next-line
  setCheckout,
  // eslint-disable-next-line
  bettingStarted,
  // eslint-disable-next-line
  setBettingStarted,
  // eslint-disable-next-line
  value,
  // eslint-disable-next-line
  setValue,
  // eslint-disable-next-line
  setBetStarts,
  // eslint-disable-next-line
  pause,
  // eslint-disable-next-line
  setPause,
}) => {
  const [balloonFlew, setBalloonFlew] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const treshold = 3;
  const min = 0.2;
  const speed = 100;
  const increment = 0.05;
  const [multipliers, setMultipliers] = useState([]);

  // Initialize multiplier values
  useEffect(() => {
    const multiplier = [];
    for (
      let i = min;
      i <= treshold;
      i = parseFloat((i + increment).toFixed(2))
    ) {
      multiplier.push(i);
    }
    setMultipliers(multiplier);
  }, [treshold]);

  useEffect(() => {
    if (pause) {
      return;
    }

    if (isCrashed || !bettingStarted) {
      setValue(0);
      return;
    }

    const targetValue =
      multipliers[Math.floor(Math.random() * multipliers.length)];

    const interval = setInterval(() => {
      setValue((prevValue) => {
        const newValue = prevValue + increment;

        if (newValue >= targetValue) {
          setIsCrashed(true);
          setCheckout(false);
          setBettingStarted(false);
          clearInterval(interval);

          setTimeout(() => {
            setIsCrashed(false);
          }, 2000);

          return targetValue;
        }

        return newValue;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [
    isCrashed,
    bettingStarted,
    increment,
    speed,
    multipliers,
    setValue,
    setCheckout,
    setBettingStarted,
    pause,
  ]);

  useEffect(() => {
    if (pause) {
      setTimeout(() => {
        setPause(false);
        setBettingStarted(false);
        setBalloonFlew(false);
      }, 2000);
      setBalloonFlew(true);
    }
  }, [pause, setPause, setBettingStarted]);

  return (
    <div className="relative w-full h-full bg-primary overflow-hidden max-lg:min-h-[500px]">
      <div
        className={`absolute bottom-0 left-0 overflow-hidden ${
          bettingStarted ? "moving-up" : ""
        } ${pause ? "moving-up" : ""} ${balloonFlew ? "pause" : ""}`}
      >
        <div className="w-full bg-blue-600">
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
        </div>

        <div className="w-full relative bg-gradient-to-t from-[#f5d693] to-blue-600">
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
          <img src={clouds} className="w-full" alt="clouds" />
        </div>

        <img src={mountain} className="w-full" alt="mountain" />
      </div>

      <div
        className={`absolute flex items-center justify-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isCrashed || pause ? "animate-balloon" : ""
        }`}
      >
        <img src={balloon} className="h-full" alt="balloon" />
      </div>

      <h1
        className={`absolute px-10 aspect-square flex items-center justify-center rounded-full font-bold top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isCrashed || pause ? "zoom-text" : ""
        }`}
      >
        {/* eslint-disable-next-line */}
        {isCrashed ? "Crashed" : `${value.toFixed(2)}x`}
      </h1>
    </div>
  );
};

export default Game;
