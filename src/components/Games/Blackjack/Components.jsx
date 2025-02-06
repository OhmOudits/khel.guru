import { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

export const CardBack = ({ rand, top = "50%" }) => (
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

export const FlippableCard = ({ card, position, isFlipped = true }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => setFlipped(true), 700);
      return () => clearTimeout(timer);
    } else {
      setFlipped(false);
    }
  }, [isFlipped]);

  return (
    <motion.div
      initial={{ scale: 0.5, top: "-4.5rem", left: "calc(100% - 6rem)" }}
      animate={{
        scale: 1,
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
      transition={{ duration: 0.4 }}
      className="absolute flip-container"
    >
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="card-back">
          <CardBack rand={card.rand} />
        </div>
        <div className="card-front">
          <Card medium={true} value={card.value} suit={card.suit} />
        </div>
      </div>
    </motion.div>
  );
};
