import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./styles.css";
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

const DeckPile = ({ deckCount = 10 }) => (
  <div className="absolute right-28 top-[-55px] z-10">
    {[...Array(Math.min(10, Math.ceil(deckCount / 2)))].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: `-${i * 2}px`, opacity: 0, scale: 0.9 }}
        animate={{
          y: `${-i * 4}px`,
          opacity: 1,
          scale: 1 - i * 0.02,
        }}
        transition={{ duration: 0.2, delay: i * 0.1 }}
        className="absolute"
        style={{
          zIndex: 10 - i,
          transform: `rotate(${i % 2 === 0 ? i : -i}deg)`,
        }}
      >
        <CardBack />
      </motion.div>
    ))}
  </div>
);

const CardBack = () => (
  <div className="w-24 h-36 rounded-md shadow-lg bg-blue-600 border-2 border-white flex items-center justify-center">
    <h1 className="text-white font-bold">
      Khel <br /> <span className="pl-2">Guru</span>
    </h1>
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
          <Card
            medium={isLargeScreen}
            small={!isLargeScreen}
            value={value}
            suit={suit}
          />
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
    <div className="relative w-full h-[600px] max-lg:h-[580px] text-base text-white overflow-hidden">
      <DeckPile />

      <div className="w-full h-[600px] relative">
        {/* Player cards */}
        {renderCard(CARD_VALUES[4], CARD_SUITS[2], 0, 8, 38)}
        {renderCard(CARD_VALUES[5], CARD_SUITS[3], 1, 12, 43)}
        {renderCard(CARD_VALUES[6], CARD_SUITS[1], 2, 16, 48)}

        {/* Player Marks */}
        <div className="absolute top-[6%] left-[25%] max-lg:left-[16%]">
          <h1 className="font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10">
            27
          </h1>
        </div>

        {/* Results */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col font-semibold text-zinc-400 text-[0.9rem]">
          <h1>Baccarat Pays 3 to 1</h1>
          <h1 className="mt-[-5px]">Insurance Pays 3 to 1</h1>
        </div>

        {/* Dealer cards */}
        {renderCard(CARD_VALUES[4], CARD_SUITS[2], 3, 60, 38)}
        {renderCard(CARD_VALUES[5], CARD_SUITS[3], 4, 64, 43)}
        {renderCard(CARD_VALUES[6], CARD_SUITS[1], 5, 68, 48)}

        {/* Dealer Marks */}
        <div className="absolute top-[58%] left-[25%] max-lg:left-[16%]">
          <h1 className="font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10">
            27
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Game;
