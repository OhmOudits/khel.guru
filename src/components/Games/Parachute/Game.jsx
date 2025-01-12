import { useEffect, useState } from "react";
import clouds from "../../../assets/Balloon/clouds.png";
// import mountain from "../../assets/Balloon/mountain.png";
import balloon from "../../../assets/Balloon/balloon.png";
import "../../../styles/Balloon.css";
import Background from "./Background";

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
  // eslint-disable-next-line
  difficulty,
  // eslint-disable-next-line
  setDifficulty,
}) => {
  const [balloonFlew, setBalloonFlew] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [time, setTime] = useState(0);
  const speed = 100;
  const [targetMultiplier, setTargetMultiplier] = useState(2.5);
  const [mult, setMult] = useState(18);
  const cloudCount = 1000;

  useEffect(() => {
    if (difficulty === "low") {
      setMult(24);
    } else if (difficulty === "medium") {
      setMult(18);
    } else {
      setMult(12);
    }
  }, [difficulty]);

  useEffect(() => {
    if (bettingStarted) {
      setTargetMultiplier(Math.random() * 2 + 1.5);
    }
  }, [bettingStarted]);

  useEffect(() => {
    if (pause) {
      return;
    }

    if (isCrashed || !bettingStarted) {
      setValue(1);
      setTime(0);
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);

      setValue(Math.exp(time / mult));

      if (Math.exp(time / mult) >= targetMultiplier) {
        setIsCrashed(true);
        setCheckout(false);
        setBettingStarted(false);
        clearInterval(interval);

        setTimeout(() => {
          setIsCrashed(false);
        }, 2000);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [
    isCrashed,
    bettingStarted,
    speed,
    targetMultiplier,
    setValue,
    setCheckout,
    setBettingStarted,
    pause,
    time,
    mult,
  ]);

  useEffect(() => {
    if (pause) {
      setTimeout(() => {
        setPause(false);
        setBettingStarted(false);
        setBalloonFlew(false);
      }, 3000);
      setBalloonFlew(true);
    }

    if (isCrashed) {
      setTimeout(() => {
        setPause(false);
        setBettingStarted(false);
        setBalloonFlew(false);
      }, 3000);
      setBalloonFlew(true);
    }
  }, [pause, isCrashed, setPause, setBettingStarted]);

  return (
    <div className="relative w-full h-full bg-primary overflow-hidden max-lg:min-h-[500px]">
      <div
        className={`absolute bottom-0 left-0 overflow-hidden ${
          bettingStarted || isCrashed || pause ? "moving-up" : ""
        } ${balloonFlew ? "pause" : ""}`}
      >
        <div>
          <div className="w-full bg-blue-600">
            {Array.from({ length: cloudCount }).map((_, index) => (
              <img key={index} src={clouds} className="w-full" alt="clouds" />
            ))}
          </div>
          <div className="w-full relative bg-gradient-to-t from-[#d08e80] to-blue-600">
            <img src={clouds} className="w-full" alt="clouds" />
            <img src={clouds} className="w-full" alt="clouds" />
            <img src={clouds} className="w-full" alt="clouds" />
          </div>
        </div>

        {/* <img src={mountain} className="w-full" alt="mountain" /> */}
        <Background />
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
