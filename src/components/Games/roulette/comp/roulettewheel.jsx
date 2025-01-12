import { useState, useEffect } from "react";
import "../../../../styles/Roulette.css";

// eslint-disable-next-line
const Roulette = ({ redNumbers, defaultNumber = 23 }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinNumber, setSpinNumber] = useState(-1);

  const numbers = [
    32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
    16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26, 0,
  ];

  const spinRoulette = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const targetNumber = numbers[randomIndex];
    console.log(targetNumber);
    setSpinNumber(targetNumber);

    setTimeout(() => {
      setResult({
        number: targetNumber,
        color:
          targetNumber === 0
            ? "green"
            : // eslint-disable-next-line
            redNumbers.includes(targetNumber)
            ? "red"
            : "black",
      });
      setIsSpinning(false);
    }, 9000);
  };

  useEffect(() => {
    spinRoulette();
    // eslint-disable-next-line
  }, []);

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
          ) : (
            <span className="text-gray-500">Spinning...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roulette;
