import React, { useState, useEffect } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

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

const CardBack = () => (
  <div className="w-24 h-36 rounded-md shadow-lg bg-blue-600 border-2 border-white flex items-center justify-center">
    <h1 className="text-white font-bold">BACK</h1>
  </div>
);

const DeckPile = ({ deckCount = 10 }) => (
  <div className="absolute right-28 z-10">
    {[...Array(Math.min(5, Math.ceil(deckCount / 10)))].map((_, i) => (
      <motion.div
        key={i}
        initial={{ top: "-4.5rem", opacity: 0, scale: 0.5 }}
        animate={{
          top: `calc(-4.5rem - ${i * 4}px)`,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.2, delay: i * 0.1 }}
        className="absolute w-24 h-36 rounded-md shadow-lg bg-gradient-to-br from-red-600 to-red-700 border-2 border-white"
      />
    ))}
  </div>
);

const Game = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const [flipped, setFlipped] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    flipped.forEach((_, index) => {
      setTimeout(() => {
        setFlipped((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * 300);
    });
  }, []);

  const renderCard = (value, suit, index, top, left) => (
    <motion.div
      initial={{ scale: 0.5, top: "-4.5rem", left: "calc(100% - 6rem)" }}
      animate={{
        scale: 1,
        top: isLargeScreen ? `${top}%` : `${top}%`,
        left: `${left}%`,
      }}
      transition={{ duration: 0.3 }}
      className="absolute"
    >
      <motion.div
        className="relative w-24 h-36"
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flipped[index] ? 0 : 180 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front and Back of the Card */}
        <div
          className="absolute backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <Card small={!isLargeScreen} value={value} suit={suit} />
        </div>
        <div
          className="absolute backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <CardBack />
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full h-[600px] max-lg:h-[500px] text-base text-white overflow-hidden">
      <div className="w-full h-[450px] relative">
        <DeckPile />

        {/* Player and Dealer Score */}
        <div className="absolute px-2 py-1.5 rounded bg-gray-800 top-[9%] max-lg:top-[5.5rem] left-[25%] max-lg:left-[10%]">
          Player : 0
        </div>
        <div className="absolute px-2 py-1.5 rounded bg-gray-800 top-[9%] max-lg:top-[5.5rem] left-[55%] max-lg:left-[60%]">
          Dealer : 0
        </div>

        {/* Render Cards */}
        {renderCard(CARD_VALUES[4], CARD_SUITS[2], 0, 20, 22)}
        {renderCard(CARD_VALUES[5], CARD_SUITS[3], 1, 28, 25)}
        {renderCard(CARD_VALUES[6], CARD_SUITS[1], 2, 36, 28)}

        {renderCard(CARD_VALUES[4], CARD_SUITS[2], 3, 20, 57)}
        {renderCard(CARD_VALUES[5], CARD_SUITS[3], 4, 28, 60)}
        {renderCard(CARD_VALUES[6], CARD_SUITS[1], 5, 36, 63)}
      </div>

      {/* Bottom Action Section */}
      <div className="absolute bottom-10 left-0 right-0">
        <div className="w-full px-3 flex items-center justify-center gap-3 max-md:gap-2">
          <div className="relative bg-primary py-6 px-20 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <div className="absolute bg-red-600 w-5 h-5 max-lg:h-2 max-lg:w-2 rounded-full z-10 top-2 right-2"></div>
            <h1 className="text-lg max-md:text-sm font-semibold">Player</h1>
            <h2>0.000</h2>
          </div>
          <div className="relative bg-primary py-6 px-20 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <h1 className="text-lg max-md:text-sm font-semibold">Tie</h1>
            <h2>0.000</h2>
          </div>
          <div className="relative bg-primary py-6 px-20 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <h1 className="text-lg max-md:text-sm font-semibold">Dealer</h1>
            <h2>0.000</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
