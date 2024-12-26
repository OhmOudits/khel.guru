import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { FaGreaterThanEqual } from "react-icons/fa";

// Constants for card values and suits
const CARD_SUITS = ["♦", "♥", "♠", "♣", "↑", "↓"];
const CARD_VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const Game = () => {
  return (
    <div className="relative w-full text-white font-mono">
      <section>
        <div className="w-full h-[400px] flex items-center justify-around">
          <div className="flex max-md:hidden flex-col justify-center items-center">
            <Card shrink value={CARD_VALUES[11]} suit={CARD_SUITS[4]} />
            <h1 className="uppercase h-[12px] text-gray-400 mt-[-30px] text-[0.6rem]">
              King Being
            </h1>
            <h1 className="uppercase h-[12px] text-gray-400 text-[0.6rem]">
              the highest
            </h1>
          </div>
          <div className="flex md:hidden flex-col gap-2 items-center justify-center text-gray-600">
            <h1 className="transform scale-y-[3.5] mb-3">↑</h1>
            <h2 className="text-sm">K</h2>
          </div>
          <div>
            <Card value={CARD_VALUES[4]} suit={CARD_SUITS[2]} />
          </div>
          <div className="flex max-md:hidden flex-col justify-center items-center">
            <Card shrink value={CARD_VALUES[12]} suit={CARD_SUITS[5]} />
            <h1 className="uppercase h-[12px] text-gray-400 mt-[-30px] text-[0.6rem]">
              Ace Being
            </h1>
            <h1 className="uppercase h-[12px] text-gray-400 text-[0.6rem]">
              the lowest
            </h1>
          </div>
          <div className="flex md:hidden flex-col gap-2 items-center justify-center  text-gray-600">
            <h1 className="transform scale-y-[3.5] mb-3">↓</h1>
            <h2 className="text-sm">A</h2>
          </div>
        </div>
        <div className="p-2 w-full h-[180px] max-lg:mb-4 overflow-x-scroll">
          <div className="w-full h-[180px] relative rounded-md bg-primary-1 flex overflow-x-scroll">
            <div className="absolute left-0 z-[1] p-1 px-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <Card small value={CARD_VALUES[4]} suit={CARD_SUITS[2]} />
                <h1 className="text-xs py-1 w-full bg-button-primary text-black font-semibold font-sans pt-1 flex items-center justify-center rounded">
                  Start Card
                </h1>
              </div>
            </div>
            <motion.div
              initial={{ left: "120%" }}
              animate={{ left: "5.8rem" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 1,
              }}
              className="absolute left-[5.9rem] z-[2] p-1 px-2"
            >
              <div className="flex  flex-col items-center justify-center gap-1">
                <div className="relative">
                  <div className="absolute flex items-center justify-center z-[40] rounded-md top-1/2 left-[-1rem] -translate-y-1/2 w-8 h-8 bg-white border border-gray-500 shadow-md text-button">
                    <FaGreaterThanEqual size={12} />
                  </div>
                  <Card
                    small
                    value={CARD_VALUES[3]}
                    isRed
                    suit={CARD_SUITS[2]}
                  />
                </div>
                <h1 className="text-xs py-1 w-full bg-button-primary text-black font-semibold font-sans pt-1 flex items-center justify-center rounded">
                  2nd one
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
