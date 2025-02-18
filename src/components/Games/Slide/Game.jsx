import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Game = ({ setTargetNumber, gamestarted, setgamestarted }) => {
  const [timeLeft, setTimeLeft] = useState(15); // Initial countdown timer
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'scrolling', 'result'
  const [bets, setBets] = useState(112); // Example value from image
  const [progress, setProgress] = useState(0);
  const [targetMultiplier, setTargetMultiplier] = useState(10.98); // The multiplier we'll land on
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastScrollPositionRef = useRef(0);
  const stickRef = useRef(null); // Reference for the stick element

  useEffect(() => {
    if (gameState == "scrolling") {
      setgamestarted(true);
    } else {
      setgamestarted(false);
    }
  }, [gameState]);
  // Create cards with multiplier values
  const generateCards = (count) => {
    const generatedCards = [];
    for (let i = 0; i < count; i++) {
      const multiplier = parseFloat((Math.random() * 50 + 1).toFixed(2));
      generatedCards.push({ id: i, multiplier });
    }
    return generatedCards;
  };

  // Generate initial cards
  const [cards, setCards] = useState(() => {
    const initialCards = generateCards(20);
    initialCards[3].multiplier = 10.98; // Set the initial multiplier for index 3
    return initialCards;
  });

  // Function to determine the next winning multiplier
  const determineNextMultiplier = () => {
    // Generate new random multiplier between 1 and 51
    return parseFloat((Math.random() * 50 + 1).toFixed(2));
  };

  // Start scrolling animation
  const startScrollingAnimation = () => {
    if (containerRef.current) {
      let startPosition = lastScrollPositionRef.current;
      let currentPosition = startPosition;
      let scrollSpeed = 15; // Initial scroll speed

      const animate = () => {
        if (containerRef.current && gameState === "scrolling") {
          // Move cards from right to left
          currentPosition += scrollSpeed;
          containerRef.current.style.transform = `translateX(-${currentPosition}px)`;
          lastScrollPositionRef.current = currentPosition;

          // Continue animation
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      // Start animation
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Function to find winning card's DOM position and scroll to it
  const scrollToWinningCard = () => {
    if (containerRef.current && stickRef.current) {
      // Find the card element with the target multiplier
      const cardElements = containerRef.current.querySelectorAll(".card-item");
      let targetIndex = -1;

      for (let i = 0; i < cardElements.length; i++) {
        const value = parseFloat(cardElements[i].getAttribute("data-value"));
        if (value === targetMultiplier) {
          targetIndex = i;
          break;
        }
      }

      if (targetIndex !== -1) {
        // Cancel the continuous scrolling
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        // Get the stick's position relative to the viewport
        const stickRect = stickRef.current.getBoundingClientRect();
        const stickCenter = stickRect.left + stickRect.width / 2;

        // Get the target card's position
        const cardRect = cardElements[targetIndex].getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        // Calculate how much we need to scroll to center the card on the stick
        const offset = cardCenter - stickCenter;
        const currentScroll = lastScrollPositionRef.current;
        const targetScroll = currentScroll + offset;

        // Start deceleration animation to this exact position
        startDecelerationAnimation(targetScroll);
      }
    }
  };

  // Function to handle smooth deceleration
  const startDecelerationAnimation = (targetPosition) => {
    const initialSpeed = 15; // Starting speed (pixels per frame)
    const deceleration = 0.95; // Deceleration factor (slower = smoother stop)

    let currentPosition = lastScrollPositionRef.current;
    let currentSpeed = initialSpeed;

    const animate = () => {
      if (containerRef.current) {
        // Apply current position
        containerRef.current.style.transform = `translateX(-${currentPosition}px)`;

        // Calculate distance to target
        const distanceToTarget = targetPosition - currentPosition;

        // Stop if we're very close or speed is negligible
        if (Math.abs(distanceToTarget) < 1 || currentSpeed < 0.1) {
          containerRef.current.style.transform = `translateX(-${targetPosition}px)`;
          lastScrollPositionRef.current = targetPosition;
          setGameState("result");
          return;
        }

        // Adjust speed based on distance (slower as we approach target)
        if (distanceToTarget > 0) {
          // Approaching from left
          currentSpeed = Math.min(currentSpeed, distanceToTarget * 0.2);
          currentPosition += currentSpeed;
        } else {
          // Overshot, slow down more rapidly
          currentSpeed *= 0.9;
          currentPosition -= currentSpeed;
        }

        // Decelerate
        currentSpeed *= deceleration;
        lastScrollPositionRef.current = currentPosition;

        // Request next frame
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  };

  // Game state management
  useEffect(() => {
    let timer;
    let progressTimer;

    if (gameState === "waiting") {
      // Update countdown
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);

            // Determine the next multiplier before scrolling starts
            const nextMultiplier = determineNextMultiplier();
            setTargetMultiplier(nextMultiplier);
            setTargetNumber(nextMultiplier);

            // Update a random card to have the target multiplier
            const updatedCards = [...cards];
            const targetIndex = Math.floor(Math.random() * cards.length);
            updatedCards[targetIndex].multiplier = nextMultiplier;
            setCards(updatedCards);

            setGameState("scrolling");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Update progress bar
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / 15 / 10; // Smooth progress over 15 seconds
          return newProgress > 100 ? 0 : newProgress;
        });
      }, 100);
    } else if (gameState === "scrolling") {
      // Start scrolling animation immediately
      startScrollingAnimation();

      // Give some time for cards to scroll, then start the deceleration
      timer = setTimeout(() => {
        scrollToWinningCard();
      }, 3000);
    } else if (gameState === "result") {
      // Show result for 3 seconds, then restart
      timer = setTimeout(() => {
        // We arent reset the container position - keep it where it stopped
        setGameState("waiting");
        setTimeLeft(15);
        setProgress(0);
      }, 3000);
    }

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, cards]);

  const displayCards = [
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
    ...cards,
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white overflow-hidden">
      <div className="relative w-full h-64 overflow-hidden">
        {/* Card deck container */}
        <div
          ref={containerRef}
          className="absolute flex items-center h-full transition-none"
          style={{
            transform: `translateX(-${lastScrollPositionRef.current}px)`,
            willChange: "transform",
          }}
        >
          {displayCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              data-value={card.multiplier}
              className={`
                card-item
                w-24 h-40 mx-2 rounded-lg bg-gray-800 flex items-center justify-center
                ${
                  card.multiplier === targetMultiplier && gameState === "result"
                    ? "border-2 border-yellow-500 z-10"
                    : "z-0"
                }
                transition-transform duration-300
              `}
              style={{
                transform:
                  card.multiplier === targetMultiplier && gameState === "result"
                    ? "scale(1.1) translateY(-10px)"
                    : "scale(1) translateY(0)",
              }}
            >
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center">
                <div
                  className={`
                  ${
                    card.multiplier === targetMultiplier &&
                    gameState === "result"
                      ? "text-yellow-500"
                      : "text-white"
                  }
                  text-sm font-bold
                `}
                >
                  {card.multiplier}×
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stick */}
        <div
          ref={stickRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="h-48 w-1 bg-yellow-500 rounded-full" />
          <div className="w-4 h-4 bg-white rounded-full mx-auto -mt-2 -ml-1" />
        </div>
      </div>

      {/* Game controls and info */}
      <div className="absolute bottom-0 w-full">
        <div className="w-full max-w-4xl mt-4 flex justify-between items-center px-4">
          <div className="text-green-500 text-xl">Bets: {bets}</div>
          <div className="text-white text-lg">
            {gameState === "waiting"
              ? `Next round in: ${timeLeft}s`
              : gameState === "scrolling"
              ? "Scrolling..."
              : `Result: ${targetMultiplier}×`}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-4xl mt-4 bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-green-600 h-2.5"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
