import { useEffect, useState } from "react";
export default function Game({
  bettingStarted,
  Difficulty,
  setBettingStarted,
  startAutoBet,
  setStartAutoBet,
  autoSelectedBoxes,
  setSelectBoxes,
  setAutoSelectedBoxes,
  mode,
  nbets,
  autoArray,
  setAutoArray,
  rows,
  cols,
  setRows,
  setCols,
}) {
  const [right, setRight] = useState(3);
  const [currentRow, setCurrentRow] = useState(null);
  const [rightIndices, setRightIndices] = useState([]);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [emoji, setEmoji] = useState("/egg/easy.svg");
  const [bwEmoji, setBwEmoji] = useState("🍎");

  useEffect(() => {
    setAutoArray(Array.from({ length: rows }, () => Array(cols).fill(0)));
    setAutoSelectedBoxes([]);
  }, [rows, cols]);

  const generateRightIndices = (rows, cols, right) => {
    const indices = [];
    for (let i = 0; i < rows; i++) {
      const rowIndices = new Set();
      while (rowIndices.size < right) {
        rowIndices.add(Math.floor(Math.random() * cols));
      }
      indices.push([...rowIndices]);
    }
    return indices;
  };

  const getBoxes = () => {
    if (Difficulty === "Easy") {
      setRows(9);
      setCols(4);
      setRight(3);
      setEmoji("/egg/easy.svg");
      setBwEmoji(" ");
    } else if (Difficulty === "Medium") {
      setRows(9);
      setCols(4);
      setRight(2);
      setEmoji("/egg/medium.svg");
      setBwEmoji("");
    } else if (Difficulty === "Hard") {
      setRows(9);
      setCols(2);
      setRight(1);
      setEmoji("/egg/hard.svg");
      setBwEmoji("");
    } else if (Difficulty === "Extreme") {
      setRows(9);
      setCols(3);
      setRight(1);
      setEmoji("/egg/extreme.svg");
      setBwEmoji("");
    } else if (Difficulty === "Nightmare") {
      setRows(9);
      setCols(4);
      setRight(1);
      setEmoji("/egg/nightmare.svg");
      setBwEmoji("");
    }
  };

  useEffect(() => {
    setSelectedBoxes([]);
    setRightIndices([]);
    getBoxes();
  }, [Difficulty]);

  useEffect(() => {
    if (bettingStarted) {
      setGameOver(false);
      setGameWon(false);
      setSelectedBoxes([]);
      setRightIndices([]);
      setCurrentRow(rows - 1);
      const indices = generateRightIndices(rows, cols, right);
      setRightIndices(indices);
      setShowResult(false);
    } else {
      if (gameOver || gameWon) {
        setShowResult(true);
      }
      setCurrentRow(null);
    }
  }, [bettingStarted, rows, cols, right, gameOver, gameWon]);

  const handleBoxClick = (rowIndex, colIndex, indices) => {
    if (!startAutoBet) {
      if (
        !bettingStarted ||
        gameOver ||
        gameWon ||
        rowIndex !== currentRow ||
        selectedBoxes.some(
          (box) => box.row === rowIndex && box.col === colIndex
        )
      ) {
        return;
      }
    }

    let isCorrect = false;

    if (!startAutoBet) {
      isCorrect = rightIndices[rowIndex].includes(colIndex);
      setSelectedBoxes([
        ...selectedBoxes,
        { row: rowIndex, col: colIndex, correct: isCorrect },
      ]);
    } else {
      isCorrect = indices[rowIndex].includes(colIndex);
      setSelectedBoxes([
        ...selectedBoxes,
        { row: rowIndex, col: colIndex, correct: isCorrect },
      ]);
    }

    if (!startAutoBet) {
      if (!isCorrect) {
        setGameOver(true);
        setBettingStarted(false);
      } else if (currentRow === 0) {
        setSelectedBoxes([]);
        setGameOver(false);
        setGameWon(true);
        setBettingStarted(false);
      } else {
        setCurrentRow(currentRow - 1);
      }
    } else {
      if (!isCorrect) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getBoxContent = (rowIndex, colIndex) => {
    const selectedBox = selectedBoxes.find(
      (box) => box.row === rowIndex && box.col === colIndex
    );

    if (selectedBox) {
      return selectedBox.correct ? <img className="h-10" src={emoji} /> : "";
    }

    if (showResult && rightIndices[rowIndex]?.includes(colIndex)) {
      return <img className="h-10" src={emoji} />;
    }

    return bwEmoji;
  };

  const getBoxColor = (rowIndex, colIndex) => {
    if (showResult) {
      const isRightBox = rightIndices[rowIndex]?.includes(colIndex);
      const selectedBox = selectedBoxes.find(
        (box) => box.row === rowIndex && box.col === colIndex
      );

      if (selectedBox) {
        return selectedBox.correct
          ? "bg-[#1a2c38] border-2 bg-opacity-1 border-[#56687A]"
          : "!bg-red-500 bg-opacity-75";
      }
      return isRightBox
        ? "bg-[#1a2c28] border-2 bg-opacity-1 border-[#56687A]"
        : "bg-[#213743] border-1";
    }

    const selected = selectedBoxes.find(
      (box) => box.row === rowIndex && box.col === colIndex
    );

    if (selected) {
      return selected.correct
        ? "bg-[#1a2c38] border-2  bg-opacity-1 border-[#56687A]"
        : "bg-red-500  border-red-500 border-1";
    }

    if (rowIndex === currentRow && bettingStarted) {
      return "bg-yellow-400 bg-opacity-25";
    }

    return "bg-[#213743]";
  };

  const getbg = (rowIndex, colIndex) => {
    const selected = selectedBoxes.find(
      (box) => box.row === rowIndex && box.col === colIndex
    );

    return selected
      ? ""
      : "after:bg-[linear-gradient(25deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%),linear-gradient(-45deg,transparent_48%,rgba(255,255,255,0.1)_50%,transparent_52%)]";
  };

  const getAutoBoxColor = (rowIndex) => {
    const firstZeroRow = autoArray.findLastIndex((row) =>
      row.every((cell) => cell === 0)
    );

    if (rowIndex === firstZeroRow) {
      return "bg-yellow-500";
    }

    return "";
  };

  const getAutobg = (rowIndex, colIndex) => {
    const selected = autoSelectedBoxes.find(
      (box) => box.row === rowIndex && box.col === colIndex
    );

    return selected
      ? "bg-black border-2 border-[#56687A] bg-opacity-10"
      : "bg-[#213743] border-1";
  };

  const getIsTrue = (rowIndex, colIndex) => {
    const selected = selectedBoxes.find(
      (box) => box.row === rowIndex && box.col === colIndex
    );

    return selected ? "bg-green-500" : "";
  };

  const handleAutoClick = (rowIndex, colIndex) => {
    const lastZeroRow = autoArray.findLastIndex((row) =>
      row.every((cell) => cell === 0)
    );

    if (rowIndex !== lastZeroRow) {
      return;
    }

    setAutoSelectedBoxes((prev) => [...prev, { row: rowIndex, col: colIndex }]);
    setAutoArray((prev) =>
      prev.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((cell, cIndex) => (cIndex === colIndex ? 1 : cell))
          : row
      )
    );
  };

  useEffect(() => {
    if (startAutoBet && nbets > 0) {
      autoBet(nbets);
    }
  }, [startAutoBet]);

  const autoBet = async (remaining) => {
    if (remaining <= 0) {
      setStartAutoBet(false);
      return;
    }

    setCurrentRow(rows - 1);
    const indices = generateRightIndices(rows, cols, right);
    setRightIndices(indices);
    setShowResult(false);
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let i = 0; i < autoSelectedBoxes.length; i++) {
      const { row, col } = autoSelectedBoxes[i];
      console.log(row, col);
      const end = handleBoxClick(row, col, indices);

      if (end) {
        setShowResult(true);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setShowResult(true);
    setTimeout(() => {
      setGameOver(false);
      setGameWon(false);
      setSelectedBoxes([]);
      setRightIndices([]);
      autoBet(remaining - 1);
    }, 2000);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-full gap-1">
        <img src="/tower.gif" className="-mb-14" alt="Tower Animation" />{" "}
        <div className="bg-[#56687A] rounded-2xl lg:w-[60%] w-[90%] mb-5 p-2">
          <div className="bg-[#1a2c38] w-[100%] h-full p-1 rounded grid place-items-center">
            <div className="w-[98%]">
              <>
                {mode === "auto" ? (
                  <>
                    {startAutoBet ? (
                      <>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                          <div
                            key={`row-${rowIndex}`}
                            className="flex justify-between "
                          >
                            {Array.from({ length: cols }).map((_, colIndex) => (
                              <div
                                key={`col-${colIndex}`}
                                className={`w-full h-11 cursor-pointer ${getBoxColor(
                                  rowIndex,
                                  colIndex
                                )} m-1 rounded-lg transition-colors duration-300 flex items-center justify-center relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:opacity-10 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%),linear-gradient(-45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] before:bg-[size:10px_10px,20px_20px,20px_20px] before:animate-[shimmer_3s_linear_infinite] before:pointer-events-none after:absolute after:content-[''] after:inset-0  ${getbg(
                                  rowIndex,
                                  colIndex
                                )} ${getAutobg(rowIndex, colIndex)} ${
                                  startAutoBet && getIsTrue(rowIndex, colIndex)
                                } after:bg-[size:30px_30px]`}
                              >
                                {getBoxContent(rowIndex, colIndex)}
                              </div>
                            ))}
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {autoArray.map((colArray, rowIndex) => (
                          <div
                            key={`row-${rowIndex}`}
                            className="flex justify-between"
                          >
                            {colArray.map((_, colIndex) => (
                              <div
                                key={`col-${colIndex}`}
                                onClick={() =>
                                  handleAutoClick(rowIndex, colIndex)
                                }
                                className={`w-full h-11 cursor-pointer ${getAutoBoxColor(
                                  rowIndex,
                                  colIndex
                                )} m-1 rounded-lg transition-colors duration-300 flex items-center justify-center relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:opacity-10 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%),linear-gradient(-45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] before:bg-[size:10px_10px,20px_20px,20px_20px] before:animate-[shimmer_3s_linear_infinite] before:pointer-events-none after:absolute after:content-[''] after:inset-0  ${getAutobg(
                                  rowIndex,
                                  colIndex
                                )} after:bg-[size:30px_30px]`}
                              ></div>
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                      <div
                        key={`row-${rowIndex}`}
                        className="flex justify-between "
                      >
                        {Array.from({ length: cols }).map((_, colIndex) => (
                          <div
                            key={`col-${colIndex}`}
                            onClick={() => handleBoxClick(rowIndex, colIndex)}
                            className={`w-full h-11 cursor-pointer ${getBoxColor(
                              rowIndex,
                              colIndex
                            )} m-1 rounded-lg transition-colors duration-300 flex items-center justify-center relative overflow-hidden before:absolute before:content-[''] before:inset-0 before:opacity-10 before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%),linear-gradient(-45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] before:bg-[size:10px_10px,20px_20px,20px_20px] before:animate-[shimmer_3s_linear_infinite] before:pointer-events-none after:absolute after:content-[''] after:inset-0  ${getbg(
                              rowIndex,
                              colIndex
                            )} after:bg-[size:30px_30px]`}
                          >
                            {getBoxContent(rowIndex, colIndex)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
