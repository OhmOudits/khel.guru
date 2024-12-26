import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Constants for card values and suits
const CARD_SUITS = ["♦", "♥", "♠", "♣"];
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

const BlackjackGame = () => {
  // Game state management using more descriptive names
  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([[]]);
  const [dealerHand, setDealerHand] = useState([]);
  const [currentHand, setCurrentHand] = useState(0);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [gameResult, setGameResult] = useState({
    message: "Press Start to begin",
    details: "",
  });
  const [isDealing, setIsDealing] = useState(false);
  const [deckCount, setDeckCount] = useState(52);
  const [showModal, setShowModal] = useState(false);

  // Initialize deck on component mount
  useEffect(() => {
    setDeck(initializeDeck());
  }, []);

  // Modal component with Framer Motion animations
  const ResultModal = ({ result, onClose }) => {
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Game Over
            </h2>
            <div className="text-center mb-6">
              <p className="text-xl text-gray-800 font-semibold mb-2">
                {result.message}
              </p>
              <p className="text-gray-600">{result.details}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        </motion.div>
    );
  };

  // Animated deck pile component
  const DeckPile = () => (
    <div className="absolute top-4 right-32 z-10">
      {[...Array(Math.min(5, Math.ceil(deckCount / 10)))].map((_, i) => (
        <div
          key={i}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: i * -1, opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.1 }}
          className="absolute w-32 h-48 rounded-xl shadow-lg bg-gradient-to-br from-red-600 to-red-700 border-2 border-white"
        />
      ))}
    </div>
  );

  // Animated card component
  const Card = memo(({ card, index, isDealer }) => {
    if (!card) return null;
  
    const isRed = card.suit === "♦" || card.suit === "♥";
    const getCardColor = () => (isRed ? "text-red-600" : "text-black");
    const finalY = isDealer ? 0 : 50;
  
    return (
      <motion.div
        initial={
          index === 0
            ? {}
            : {
                x: window.innerWidth - 160,
                y: 16,
                rotateY: 180,
                scale: 0.5,
                zIndex: 100,
              }
        }
        animate={{
          x: index * 25,
          y: finalY,
          rotateY: 0,
          scale: 1,
          zIndex: index,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.8,
          duration: 1,
          delay: index * 0.3,
        }}
        className={`absolute w-32 h-48 rounded-xl shadow-lg bg-white ${getCardColor()}`}
      >
        <div className="p-3 flex flex-col h-full justify-between">
          <div className="text-xl font-bold">
            {card.value}
            <span className="ml-1">{card.suit}</span>
          </div>
          <div className="text-center text-6xl">{card.suit}</div>
          <div className="text-xl font-bold self-end rotate-180">
            {card.value}
            <span className="ml-1">{card.suit}</span>
          </div>
        </div>
      </motion.div>
    );
  });
  // Game logic functions
  const initializeDeck = () => {
    const newDeck = [];
    for (let suit of CARD_SUITS) {
      for (let value of CARD_VALUES) {
        newDeck.push({ suit, value });
      }
    }
    return shuffle(newDeck);
  };

  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const dealInitialCards = async () => {
    setIsDealing(true);
    const newDeck = [...deck];
    const playerHand = [];
    const newDealerHand = [];

    // Sequential dealing with proper timing
    for (let i = 0; i < 2; i++) {
      playerHand.push(newDeck.pop());
      setDeckCount((prev) => prev - 1);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPlayerHands([playerHand]);

      newDealerHand.push(newDeck.pop());
      setDeckCount((prev) => prev - 1);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setDealerHand([...newDealerHand]);
    }

    setDeck(newDeck);
    setGameStatus("playing");
    setIsDealing(false);
  };

  const startGame = () => {
    const newDeck = initializeDeck();
    setDeck(newDeck);
    setPlayerHands([[]]);
    setDealerHand([]);
    setCurrentHand(0);
    setGameStatus("dealing");
    setGameResult({ message: "", details: "" });
    setDeckCount(52);
    setShowModal(false);
    dealInitialCards();
  };

  const calculateHandValue = (hand) => {
    if (!hand || hand.length === 0) return 0;

    let value = 0;
    let aces = 0;

    for (let card of hand) {
      if (card.value === "A") {
        aces += 1;
      } else if (["K", "Q", "J"].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }

    for (let i = 0; i < aces; i++) {
      value += value + 11 <= 21 ? 11 : 1;
    }

    return value;
  };

  // Player action handlers
  const hit = async () => {
    if (gameStatus !== "playing" || isDealing) return;

    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newHands = [...playerHands];
    newHands[currentHand] = [...newHands[currentHand], newCard];

    setDeck(newDeck);
    setDeckCount((prev) => prev - 1);
    setPlayerHands(newHands);

    const currentValue = calculateHandValue(newHands[currentHand]);
    if (currentValue > 21) {
      if (currentHand < playerHands.length - 1) {
        setCurrentHand(currentHand + 1);
      } else {
        await dealerPlay();
      }
    }
  };

  const stand = () => {
    if (gameStatus !== "playing" || isDealing) return;
    dealerPlay();
  };

  const split = () => {
    if (gameStatus !== "playing" || isDealing) return;
    const currentHandCards = playerHands[currentHand];

    if (
      currentHandCards?.length === 2 &&
      currentHandCards[0].value === currentHandCards[1].value
    ) {
      const newHands = [...playerHands];
      newHands[currentHand] = [currentHandCards[0]];
      newHands.push([currentHandCards[1]]);
      setPlayerHands(newHands);
    }
  };

  const double = () => {
    if (gameStatus !== "playing" || isDealing) return;
    hit();
    setTimeout(() => stand(), 2000);
  };

  const dealerPlay = async () => {
    setGameStatus("dealer");
    const newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(newDeck.pop());
      setDeckCount((prev) => prev - 1);
      setDealerHand([...newDealerHand]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setDeck(newDeck);
    finalizeGame(newDealerHand);
  };

  const finalizeGame = (dealerFinalHand) => {
    const dealerValue = calculateHandValue(dealerFinalHand);
    const playerValues = playerHands.map(calculateHandValue);
    let resultMessage = "";
    let resultDetails = "";

    if (dealerValue > 21) {
      resultMessage = "Dealer busts!";
      resultDetails = "You win!";
    } else {
      const results = playerValues.map((value) => {
        if (value > 21) return "Bust";
        if (value > dealerValue) return "Win";
        if (value === dealerValue) return "Push";
        return "Lose";
      });

      if (results.every((res) => res === "Lose")) {
        resultMessage = "Dealer wins!";
        resultDetails = "Better luck next time.";
      } else {
        resultMessage = "You have winning hands!";
        resultDetails = results.join(", ");
      }
    }

    setGameResult({ message: resultMessage, details: resultDetails });
    setShowModal(true);
    setGameStatus("waiting");
  };

  return (
    <div className="relative w-full h-screen md:h-full text-white font-mono">
      <DeckPile />
      {showModal && <ResultModal result={gameResult} onClose={startGame} />}
      <div className="absolute top-96 botto left-8">
        <button
          onClick={startGame}
          disabled={gameStatus === "dealing"}
          className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-bold"
        >
          Start Game
        </button>
        <button
          onClick={hit}
          disabled={gameStatus !== "playing" || isDealing}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-4 font-bold"
        >
          Hit
        </button>
        <button
          onClick={stand}
          disabled={gameStatus !== "playing" || isDealing}
          className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 ml-4 font-bold"
        >
          Stand
        </button>
        <button
          onClick={split}
          disabled={
            gameStatus !== "playing" ||
            isDealing ||
            playerHands[currentHand].length !== 2
          }
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-4 font-bold"
        >
          Split
        </button>
        <button
          onClick={double}
          disabled={gameStatus !== "playing" || isDealing}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-4 font-bold"
        >
          Double
        </button>
      </div>
      <div className="absolute top-60 left-[30%]"> 
          <div className="mt-20">Player cards</div>
        {playerHands.map((hand, i) => (
          <div key={i} className="relative mb-12">
            {hand.map((card, j) => (
              <Card key={j} card={card} index={j} isDealer={false} />
            ))}
          </div>  
        ))}
      </div>
      <div></div>
      <div className="absolute top-16 left-[50%] transform -translate-x-1/2">
      Dealer cards
        {dealerHand.map((card, i) => (
          <Card key={i} card={card} index={i} isDealer={true} />
        ))}
      </div>
    </div>
  );
};

export default BlackjackGame;
