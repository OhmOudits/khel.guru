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

const createDeck = () =>
  [...Array(10)].map((_, i) => ({
    suit: CARD_SUITS[i % (CARD_SUITS.length - 2)],
    value: CARD_VALUES[i % CARD_VALUES.length],
    id: i,
    rand: Math.floor(Math.random() * 20) + 1,
  }));

// eslint-disable-next-line
const CardBack = ({ rand, top = "50%" }) => (
  <div
    className={`w-24 h-36 card card${rand} rounded-md shadow-lg bg-blue-600 border-2 border-white flex items-center justify-center`}
  >
    <h1
      className={`text-white font-bold absolute top-[${top}] left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      Khel
      <br />
      Guru
    </h1>
  </div>
);

// eslint-disable-next-line
const FlippableCard = ({ card, position }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFlipped(true), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.5, top: "-4.5rem", left: "calc(100% - 6rem)" }}
      animate={{
        scale: 1,
        // eslint-disable-next-line
        top: `${position.top}%`,
        // eslint-disable-next-line
        left: `${position.left}%`,
      }}
      transition={{ duration: 0.4 }}
      className="absolute flip-container"
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="card-back">
          {/* eslint-disable-next-line */}
          <CardBack rand={card.rand} />
        </div>
        <div className="card-front">
          {/* eslint-disable-next-line */}
          <Card medium value={card.value} suit={card.suit} />
        </div>
      </div>
    </motion.div>
  );
};

// eslint-disable-next-line
const Game = ({ cardsNumber = 6 }) => {
  // eslint-disable-next-line
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const [deck, setDeck] = useState(createDeck());
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const dealCards = () => {
      if (deck.length > 0 && !isAnimating) {
        const totalDealtCards = userCards.length + dealerCards.length;

        if (totalDealtCards >= cardsNumber) return;

        setIsAnimating(true);
        const newCard = deck[0];
        setDeck((prevDeck) => prevDeck.slice(1));

        if (userCards.length <= dealerCards.length) {
          setUserCards((prev) => [...prev, newCard]);
        } else {
          setDealerCards((prev) => [...prev, newCard]);
        }

        // Simulate animation delay
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }
    };

    if (deck.length > 0) {
      const interval = setInterval(dealCards, 1000);
      return () => clearInterval(interval);
    }
  }, [deck, userCards, dealerCards, isAnimating, cardsNumber]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[600px] max-lg:h-[500px] text-base text-white overflow-hidden">
      <div className="w-full h-[450px] relative">
        {/* DeckPile */}
        <div className="absolute right-28 top-[-85px] z-10">
          {deck.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ y: `-${i * 2}px`, opacity: 0, scale: 0.9 }}
              animate={{
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
              <CardBack rand={card.rand} />
            </motion.div>
          ))}
        </div>

        {/* Player and Dealer Score */}
        <div className="absolute px-2 py-1.5 rounded bg-gray-800 top-[9%] max-lg:top-[5.5rem] left-[25%] max-lg:left-[10%]">
          Player : 0
        </div>
        <div className="absolute px-2 py-1.5 rounded bg-gray-800 top-[9%] max-lg:top-[5.5rem] left-[55%] max-lg:left-[60%]">
          Dealer : 0
        </div>

        {/* Render Cards */}
        {userCards.map((card, index) => (
          <FlippableCard
            key={card.id}
            card={card}
            position={{ top: 35 + index * 6, left: 20 + index * 4 }}
          />
        ))}

        {/* Dealer Cards */}
        {dealerCards.map((card, index) => (
          <FlippableCard
            key={card.id}
            card={card}
            position={{ top: 35 + index * 6, left: 57 + index * 4 }}
          />
        ))}
      </div>

      {/* Bottom Action Section */}
      <div className="absolute bottom-10 left-0 right-0">
        <div className="w-full px-3 flex items-center justify-center gap-3 max-md:gap-2">
          <div className="relative bg-primary py-3 px-12 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <div className="absolute bg-red-600 w-3 h-3 max-lg:h-2 max-lg:w-2 rounded-full z-10 top-2 right-2"></div>
            <h1 className="text-lg max-md:text-sm font-semibold">Player</h1>
            <h2>0.000</h2>
          </div>
          <div className="relative bg-primary py-3 px-12 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <h1 className="text-lg max-md:text-sm font-semibold">Tie</h1>
            <h2>0.000</h2>
          </div>
          <div className="relative bg-primary py-3 px-12 max-lg:px-8 max-lg:py-3 max-md:text-xs flex flex-col items-center justify-center border border-gray-500 cursor-pointer rounded hover:bg-primary/10 transition duration-300 ease-in-out">
            <h1 className="text-lg max-md:text-sm font-semibold">Dealer</h1>
            <h2>0.000</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
