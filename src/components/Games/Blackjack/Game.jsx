import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";
import "./styles.css";

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
    <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
    <h1
      className={`text-white font-medium absolute top-[${top}] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-[0.9rem]`}
    >
      Khel <br />
      <span className="pl-2 pt-[-10px]"> Guru</span>
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
          <Card medium={true} value={card.value} suit={card.suit} />
        </div>
      </div>
    </motion.div>
  );
};

// eslint-disable-next-line
const Game = ({ cardsNumber = 6 }) => {
  const [deck, setDeck] = useState(createDeck());
  const [userCards, setUserCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const dealCards = () => {
      if (deck.length > 0 && !isAnimating) {
        const totalDealtCards = userCards.length + dealerCards.length;

        if (totalDealtCards >= cardsNumber) return;

        setIsAnimating(true);
        const newCard = deck[0]; // Take the first card from the deck
        setDeck((prevDeck) => prevDeck.slice(1)); // Remove the first card

        // Alternating card distribution: Player first, then Dealer
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
    <div className="relative w-full h-[600px] max-lg:h-[600px] text-base text-white overflow-hidden">
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
            <CardBack top={"75%"} rand={card.rand} />
          </motion.div>
        ))}
      </div>

      <div className="w-full h-[600px] relative">
        {/* User Cards */}
        {userCards.map((card, index) => (
          <FlippableCard
            key={card.id}
            card={card}
            position={{
              top: 12 + index * 4,
              left: isLargeScreen ? 40 + index * 5 : 30 + index * 5,
            }}
          />
        ))}

        {/* Dealer Cards */}
        {dealerCards.map((card, index) => (
          <FlippableCard
            key={card.id}
            card={card}
            position={{
              top: 64 + index * 4,
              left: isLargeScreen ? 40 + index * 5 : 30 + index * 5,
            }}
          />
        ))}

        {/* Player Score */}
        <div className="absolute top-[4%] left-[20%] max-lg:left-[16%]">
          <h1 className="font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10">
            Player: 27
          </h1>
        </div>

        {/* Baccarat Wins */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col font-semibold text-zinc-400 text-[0.9rem]">
          <h1>Baccarat Pays 3 to 1</h1>
          <h1 className="mt-[-5px]">Insurance Pays 3 to 1</h1>
        </div>

        {/* Dealer Score */}
        <div className="absolute top-[56%] left-[20%] max-lg:left-[16%]">
          <h1 className="font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10">
            Dealer: 27
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Game;
