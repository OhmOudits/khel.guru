import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import { CardBack, FlippableCard } from "./Components";

const Game = ({
  deck,
  userCards,
  dealerCards,
  userValue,
  dealerValue,
  userResult,
  dealerResult,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

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
            initial={{ opacity: 0, scale: 0.9 }}
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
            isFlipped={card.flipped}
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
            isFlipped={card.flipped}
          />
        ))}

        {/* Player Score */}
        <div className="absolute top-[4%] left-[20%] max-lg:left-[16%]">
          <h1
            className={`font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10 ${
              userResult &&
              (userResult === "win"
                ? "bg-green-500 text-black"
                : userResult === "lose"
                ? "bg-red-500"
                : "bg-orange-500")
            }`}
          >
            Player: {userValue}
          </h1>
        </div>

        {/* Baccarat Wins */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col font-semibold text-zinc-400 text-[0.9rem]">
          <h1>Baccarat Pays 3 to 1</h1>
          <h1 className="mt-[-5px]">Insurance Pays 3 to 1</h1>
        </div>

        {/* Dealer Score */}
        <div className="absolute top-[56%] left-[20%] max-lg:left-[16%]">
          <h1
            className={`font-semibold text-[0.9rem] px-5 py-0.5 rounded bg-gray-50/10 ${
              dealerResult &&
              (dealerResult === "win"
                ? "bg-green-500 text-black "
                : dealerResult === "lose"
                ? "bg-red-500"
                : "bg-orange-500")
            }`}
          >
            Dealer: {dealerValue}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Game;
