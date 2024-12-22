import React, { useEffect, useRef, useState } from "react";
import { CircleNotch } from "phosphor-react";
import BinsRow from "./BinsRow";
import { binColorsByRowCount } from "./constant";

const Game = ({ bet, rows, risk, engine, width, height, canvasRef }) => {
  const [binColors, setBinColors] = useState(binColorsByRowCount(rows)); // State for bin colors based on rows

  // Update bin colors when row count changes
  useEffect(() => {
    setBinColors(binColorsByRowCount(rows));
  }, [rows]);

  return (
    <div className="relative w-full h-full bg-gray-900">
      <div
        className="mx-auto flex h-full flex-col items-center justify-center px-4 pb-4"
        style={{ maxWidth: `${width}px` }}
      >
        {/* Canvas container */}
        <div
          className="relative w-full h-full"
          style={{
            aspectRatio: `${width} / ${height}`,
          }}
        >
          {/* Loader for engine initialization */}
          {engine === null && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <CircleNotch
                className="size-20 animate-spin text-slate-600"
                weight="bold"
              />
            </div>
          )}
          {/* Canvas rendering the Plinko game */}
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        {/* Bin row at the bottom */}
        <BinsRow
          plinkoEngine={engine}
          rowCount={rows}
          riskLevel={risk}
          isAnimationOn={true}
          binColors={binColors}
        />
      </div>
    </div>
  );
};

export default Game;
