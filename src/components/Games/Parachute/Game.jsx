/* eslint-disable */
import { useEffect, useRef, useState } from "react";
import clouds from "../../../assets/Balloon/clouds.png";
import balloon from "../../../assets/Balloon/balloon.png";
import "../../../styles/Balloon.css";
import Background from "./Background";
import {
  disconnectParachuteSocket,
  getParachuteSocket,
} from "../../../socket/games/parachute";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Game = ({
  setCheckout,
  bettingStarted,
  setBettingStarted,
  value,
  setValue,
  pause,
  setPause,
  difficulty,
  autoMultipyTarget,
  startAutoBet,
  setStartAutoBet,
  nbets,
}) => {
  const [isCrashed, setIsCrashed] = useState(false);
  const [currentBetCount, setCurrentBetCount] = useState(0);
  const gameIntervalRef = useRef(null);
  const speed = 100;
  const cloudCount = 1000;
  const [mult, setMult] = useState(18);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parachuteSocket = getParachuteSocket();

      if (parachuteSocket) {
        parachuteSocket.on("error", ({ message }) => {
          console.error("Join game error:", message);
          toast.error(`Error joining game: ${message}`);
        });
      }
    }

    return () => {
      const parachuteSocket = getParachuteSocket();
      if (parachuteSocket) {
        parachuteSocket.off("error");
      }
      disconnectParachuteSocket();
    };
  }, []);

  useEffect(() => {
    if (bettingStarted) {
      const parachuteSocket = getParachuteSocket();
      if (parachuteSocket) {
        parachuteSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Parachute socket not initialized");
        toast.error("Failed to join game: Socket not connected");
      }
    }
  }, [bettingStarted]);

  useEffect(() => {
    setMult(difficulty === "low" ? 24 : difficulty === "medium" ? 18 : 12);
  }, [difficulty]);

  const stopGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
      gameIntervalRef.current = null;
    }
    setBettingStarted(false);
  };

  const runGame = () => {
    if (pause || isCrashed || !bettingStarted) return;

    let localTime = 0;
    gameIntervalRef.current = setInterval(() => {
      localTime += 0.1;
      const newValue = Math.exp(localTime / mult);
      setValue(newValue);

      if (startAutoBet && newValue >= autoMultipyTarget) {
        stopGame();
        setPause(true);
        setCheckout(true);
        return;
      }

      let rand = Math.random();
      if (rand < 0.01) {
        const parachuteSocket = getParachuteSocket();
        if (parachuteSocket) {
          parachuteSocket.emit("crash", { value: newValue });
          console.log("Emitted crash event");
        } else {
          console.error("Parachute socket not initialized");
          alert("Failed to join game: Socket not connected");
        }

        setIsCrashed(true);
        stopGame();
        setValue(1);
        setCheckout(false);
        setTimeout(() => setIsCrashed(false), 2000);
      }
    }, speed);
  };

  const resetGame = () => {
    stopGame();
    setValue(1);
    setIsCrashed(false);
    setBettingStarted(false);
    setCheckout(false);
    setPause(false);
  };

  useEffect(() => {
    if (pause) {
      setIsCrashed(true);
      stopGame();
      setTimeout(() => resetGame(), 2000);
    }
  }, [pause, value, setIsCrashed]);

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (bettingStarted) {
      toast.error("Game Intterupted");
    }

    if (!user) {
      setBettingStarted(false);
      resetGame();
    }
  }, [user]);

  useEffect(() => {
    if (startAutoBet && nbets > 0) {
      const performAutoBet = () => {
        if (currentBetCount < nbets) {
          setBettingStarted(true);
          setCurrentBetCount((prev) => prev + 1);
        } else {
          setStartAutoBet(false);
          setCurrentBetCount(0);
        }
      };

      if (currentBetCount === 0 && !bettingStarted) {
        performAutoBet();
      }

      const interval = setInterval(() => {
        if (currentBetCount > 0 && !bettingStarted && !pause && !isCrashed) {
          performAutoBet();
        } else if (currentBetCount >= nbets || pause || isCrashed) {
          clearInterval(interval);
        }
      }, 1000 + speed);

      return () => clearInterval(interval);
    }
  }, [
    startAutoBet,
    nbets,
    currentBetCount,
    setStartAutoBet,
    bettingStarted,
    pause,
    isCrashed,
  ]);

  useEffect(() => {
    if (bettingStarted) {
      runGame();
    }
  }, [bettingStarted]);

  return (
    <div className="relative w-full h-full bg-primary overflow-hidden max-lg:min-h-[500px]">
      {/* Background */}
      <div
        className={`absolute bottom-0 left-0 overflow-hidden ${
          bettingStarted || isCrashed || pause ? "moving-up" : ""
        }`}
      >
        <div>
          <div className="w-full bg-blue-600">
            {Array.from({ length: cloudCount }).map((_, index) => (
              <img key={index} src={clouds} className="w-full" alt="clouds" />
            ))}
          </div>
          <div className="w-full relative bg-gradient-to-t from-[#d08e80] to-blue-600">
            {[...Array(3)].map((_, idx) => (
              <img key={idx} src={clouds} className="w-full" alt="clouds" />
            ))}
          </div>
        </div>
        <Background />
      </div>

      {/* Balloon */}
      <div
        className={`absolute flex items-center justify-center w-1/2 h-1/2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isCrashed ? "animate-balloon" : ""
        }`}
      >
        <img src={balloon} className="h-full" alt="balloon" />
      </div>

      {/* Game Value Display */}
      <h1
        className={`absolute px-10 aspect-square flex items-center justify-center rounded-full font-bold top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isCrashed ? "zoom-text" : ""
        }`}
      >
        {isCrashed
          ? pause
            ? `${value.toFixed(2)}x`
            : "Crashed"
          : `${value.toFixed(2)}x`}
      </h1>
    </div>
  );
};

export default Game;
