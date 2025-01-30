import React, { useEffect, useRef } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import { FaGreaterThanEqual, FaLessThanEqual } from "react-icons/fa";
import { FiChevronsRight } from "react-icons/fi";
import { CARD_SUITS, CARD_VALUES } from "./constant";

const Game = ({ historyCards, currentCard }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: historyCards.length > 9 && containerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [historyCards]);

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
            <Card
              isRed={currentCard.color}
              value={currentCard.value}
              suit={currentCard.suit}
            />
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

        <div className="p-2 w-full h-[200px] max-lg:mb-4 overflow-hidden">
          <div
            ref={containerRef}
            className="w-full h-[180px] relative rounded-md bg-primary-1 flex overflow-x-scroll"
          >
            <div className="absolute left-0 z-[1] p-1 px-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <Card
                  small
                  isRed={historyCards[0].color}
                  value={historyCards[0].value}
                  suit={historyCards[0].suit}
                />
                <h1 className="text-xs py-1 w-full bg-button-primary text-black font-semibold font-sans pt-1 flex items-center justify-center rounded">
                  Start Card
                </h1>
              </div>
            </div>

            {historyCards.slice(1).map((card, index) => (
              <motion.div
                initial={{
                  left: `${containerRef.current.scrollWidth}px`,
                }}
                animate={{ left: `${5.8 * (index + 1)}rem` }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  duration: 1,
                }}
                key={index}
                className={`absolute z-[2] p-1 px-2`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="relative">
                    <div className="absolute flex items-center justify-center z-[40] rounded-md top-1/2 left-[-1rem] -translate-y-1/2 w-8 h-8 bg-white border border-gray-500 shadow-md text-button">
                      {card.result ? (
                        <>
                          {card.result === "high-true" && (
                            <FaGreaterThanEqual
                              className="text-green-500"
                              size={12}
                            />
                          )}
                          {card.result === "high-false" && (
                            <FaGreaterThanEqual
                              className="text-red-500"
                              size={12}
                            />
                          )}

                          {card.result === "low-true" && (
                            <FaLessThanEqual
                              className="text-green-500"
                              size={12}
                            />
                          )}
                          {card.result === "low-false" && (
                            <FaLessThanEqual
                              className="text-red-500"
                              size={12}
                            />
                          )}
                        </>
                      ) : (
                        <FiChevronsRight
                          className="text-orange-500"
                          size={18}
                        />
                      )}
                    </div>
                    <Card
                      isRed={card.color}
                      small
                      value={card.value}
                      suit={card.suit}
                    />
                  </div>
                  <h1 className="text-xs py-1 w-full bg-button-primary text-black font-semibold font-sans pt-1 flex items-center justify-center rounded">
                    {`Card ${index + 2}`}
                  </h1>
                </div>
              </motion.div>
            ))}

            {/* // some space */}
            <div
              className={`w-[7.6rem] h-full bg-transparent absolute z-[2] p-1 px-2 left-[${
                5.8 * (historyCards.length + 1)
              }rem]`}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Game;
