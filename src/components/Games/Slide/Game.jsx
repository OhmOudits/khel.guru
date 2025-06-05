import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Game = ({
  setTargetNumber,
  gamestarted,
  setgamestarted,
  timeLeft,
  bets,
  targetMultiplier,
}) => {
  const [gameState, setGameState] = useState("waiting");
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastScrollPositionRef = useRef(0);
  const stickRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const generateCards = (count) => {
    const generatedCards = [];
    for (let i = 0; i < count; i++) {
      const multiplier = parseFloat((Math.random() * 4 + 1).toFixed(2));
      generatedCards.push({ id: i, multiplier });
    }
    return generatedCards;
  };

  const [cards, setCards] = useState(() => generateCards(20));

  useEffect(() => {
    if (targetMultiplier) {
      const updatedCards = [...cards];

      const targetIndex = Math.floor(Math.random() * cards.length);
      updatedCards[targetIndex].multiplier = targetMultiplier;
      setCards(updatedCards);
    }
  }, [targetMultiplier]);

  useEffect(() => {
    console.log("Game state changed:", {
      gamestarted,
      timeLeft,
      targetMultiplier,
    });
    if (gamestarted) {
      lastScrollPositionRef.current = 0;
      if (containerRef.current) {
        containerRef.current.style.transform = "translateX(0)";
      }
      setGameState("scrolling");
      startScrollingAnimation();
    } else {
      if (targetMultiplier) {
        setGameState("result");
        scrollTimeoutRef.current = setTimeout(() => {
          scrollToWinningCard();
        }, 500);

        const timer = setTimeout(() => {
          setGameState("waiting");
          setProgress(0);
        }, 3000);
        return () => {
          clearTimeout(timer);
          clearTimeout(scrollTimeoutRef.current);
        };
      } else {
        setGameState("waiting");
        setProgress(0);
      }
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [gamestarted, targetMultiplier]);

  const startScrollingAnimation = () => {
    if (containerRef.current) {
      let startPosition = lastScrollPositionRef.current;
      let currentPosition = startPosition;
      let scrollSpeed = 30;
      let direction = 1;

      const animate = () => {
        if (containerRef.current && gameState === "scrolling") {
          scrollSpeed = 30 + Math.sin(currentPosition * 0.01) * 5;

          if (Math.random() < 0.01) {
            direction *= -1;
          }

          currentPosition += scrollSpeed * direction;

          if (currentPosition < 0) {
            currentPosition = 0;
            direction = 1;
          }

          containerRef.current.style.transform = `translateX(-${currentPosition}px)`;
          lastScrollPositionRef.current = currentPosition;
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const scrollToWinningCard = () => {
    if (containerRef.current && stickRef.current && targetMultiplier) {
      const cardElements = containerRef.current.querySelectorAll(".card-item");
      let targetIndex = -1;

      for (let i = 0; i < cardElements.length; i++) {
        const value = parseFloat(cardElements[i].getAttribute("data-value"));
        if (Math.abs(value - targetMultiplier) < 0.01) {
          targetIndex = i;
          break;
        }
      }

      if (targetIndex !== -1) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        const stickRect = stickRef.current.getBoundingClientRect();
        const stickCenter = stickRect.left + stickRect.width / 2;
        const cardRect = cardElements[targetIndex].getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const offset = cardCenter - stickCenter;
        const currentScroll = lastScrollPositionRef.current;
        const targetScroll = currentScroll + offset;

        startDecelerationAnimation(targetScroll);
      }
    }
  };

  const startDecelerationAnimation = (targetPosition) => {
    const initialSpeed = 30;
    const deceleration = 0.95;
    let currentPosition = lastScrollPositionRef.current;
    let currentSpeed = initialSpeed;

    const animate = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(-${currentPosition}px)`;
        const distanceToTarget = targetPosition - currentPosition;

        if (Math.abs(distanceToTarget) < 1 || currentSpeed < 0.1) {
          containerRef.current.style.transform = `translateX(-${targetPosition}px)`;
          lastScrollPositionRef.current = targetPosition;
          return;
        }

        currentSpeed *= deceleration;
        currentPosition += currentSpeed * (distanceToTarget > 0 ? 1 : -1);
        lastScrollPositionRef.current = currentPosition;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Update progress bar based on timeLeft
  useEffect(() => {
    if (timeLeft !== undefined) {
      // Assuming max time is 15 seconds
      const maxTime = 15;
      const newProgress = ((maxTime - timeLeft) / maxTime) * 100;
      setProgress(newProgress);
    }
  }, [timeLeft]);

  const displayCards = [
    ...cards,
    ...cards,
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
                w-24 h-40 mx-2 text-sm rounded-lg bg-gray-800 flex items-center justify-center
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
              : targetMultiplier
              ? `Result: ${targetMultiplier}×`
              : "Waiting..."}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-4xl mt-4 bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="bg-green-600 h-2.5"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
