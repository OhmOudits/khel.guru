import { useState, useEffect } from "react";
import "../../../../styles/Roulette.css";
import {
  getRouletteSocket,
  onGameResult,
} from "../../../../socket/games/roulette";
import { toast } from "react-toastify";

const Roulette = ({
  redNumbers,
  betStarted,
  setBettingStarted,
  gameResult,
  onAnimationComplete,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinNumber, setSpinNumber] = useState(-1);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const numbers = [
    32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
    16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0,
  ];

  useEffect(() => {
    const socket = getRouletteSocket();
    if (!socket) return;

    onGameResult((data) => {
      console.log("[Roulette Wheel] Received game result:", data);
      const resultNumber = parseInt(data.result);
      if (!isNaN(resultNumber)) {
        setIsAnimationComplete(false);
        setSpinNumber(resultNumber);

        // After 9 seconds, show the result
        setTimeout(() => {
          setResult({
            number: resultNumber,
            color:
              resultNumber === 0
                ? "green"
                : redNumbers.includes(resultNumber)
                ? "red"
                : "black",
          });
          setIsSpinning(false);
        }, 9000);

        // After 10 seconds (when result is fully shown), notify animation is complete
        setTimeout(() => {
          setSpinNumber(-1);
          setResult(null);
          setIsAnimationComplete(true);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 10000);
      }
    });

    return () => {};
  }, [redNumbers, onAnimationComplete]);

  const spinRoulette = () => {
    if (isSpinning) return;

    const rouletteSocket = getRouletteSocket();
    if (rouletteSocket) {
      rouletteSocket.emit("add_game", {});
      console.log("Emitted add_game event");
      setIsSpinning(true);
    } else {
      console.error("Roulette socket not initialized");
      toast.error("Failed to join game: Socket not connected");
      return;
    }
  };

  useEffect(() => {
    if (betStarted) {
      setIsAnimationComplete(false);
      spinRoulette();
      setTimeout(() => {
        setBettingStarted(false);
      }, 10000);
    }
  }, [betStarted, setBettingStarted]);

  return (
    <div className="roulette-container">
      <div className={`plate `} data-spinto={spinNumber}>
        {numbers.map((num, index) => (
          <div
            key={index}
            className="number"
            style={{ transform: `rotateZ(${(index * 360) / 37}deg)` }}
          >
            <div className="pit">{num}</div>
          </div>
        ))}
        <div
          className={`inner ${spinNumber === -1 && "inner-hide"}`}
          data-spinto={spinNumber}
        ></div>
      </div>

      <div>
        <div className="result absolute top-[50%] text-lg left-1/2 -translate-x-1/2 -translate-y-1/2">
          {result ? (
            <div>
              <span
                className={`result-color p-4 px-6 rounded text-lg color-${result.color}`}
              >
                {result.number}
              </span>
            </div>
          ) : betStarted ? (
            <span className="text-gray-500">Spinning...</span>
          ) : (
            <span className="text-gray-500">Place Your Bet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roulette;
