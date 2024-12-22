import React, { useRef } from "react";
import { binPayouts } from "./constant";

const BinRow = ({
  plinkoEngine,
  rowCount,
  riskLevel,
  isAnimationOn = true,
  binColors,
}) => {
  const binAnimations = useRef([]);

  const initAnimation = (node, binIndex) => {
    const bounceAnimation = node.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(30%)" },
        { transform: "translateY(0)" },
      ],
      {
        duration: 300,
        easing: "cubic-bezier(0.18, 0.89, 0.32, 1.28)",
      }
    );
    bounceAnimation.pause();
    binAnimations.current[binIndex] = bounceAnimation;
  };

  const playAnimation = (binIndex) => {
    if (!isAnimationOn) return;

    const animation = binAnimations.current[binIndex];
    if (animation) {
      animation.cancel();
      animation.play();
    }
  };

  if (!plinkoEngine) {
    return null;
  }

  return (
    <div className="flex h-[50px] w-full justify-center mt-4">
      <div
        className="flex gap-[1%]"
        // style={{ width: `${binsWidthPercentage}%` }}
      >
        {binPayouts[rowCount][riskLevel].map((payout, binIndex) => (
          <div
            key={binIndex}
            ref={(node) => node && initAnimation(node, binIndex)}
            className="flex flex-1 items-center justify-center rounded-sm text-[clamp(6px,2.784px+0.87vw,8px)] font-bold text-gray-950 shadow-[0_2px_var(--shadow-color)] lg:rounded-md lg:text-[clamp(10px,-16.944px+2.632vw,12px)] lg:shadow-[0_3px_var(--shadow-color)] w-9 h-7"
            style={{
              backgroundColor: `rgb(${binColors.background[binIndex]["r"]},${binColors.background[binIndex]["g"]},${binColors.background[binIndex]["b"]})`,
              "--shadow-color": binColors.shadow[binIndex],
            }}
          >
            {payout}
            {payout < 100 ? "x" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BinRow;
