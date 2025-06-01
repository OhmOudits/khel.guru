import { BettingBoard } from "./comp/BettingBoard";
import Roulette from "./comp/roulettewheel";
import { toast } from "react-toastify";
import {
  getRouletteSocket,
  placeBet,
  placeAutoBet,
  onBetResult,
  onGameResult,
  onError,
  removeAllListeners,
} from "../../../socket/games/roulette";
import { useEffect, useState, useCallback } from "react";

function Game({
  betStarted,
  setBettingStarted,
  nbets,
  startAutoBet,
  setStartAutoBet,
  currentBets,
  setCurrentBets,
  isSocketReady,
  isGameJoined,
}) {
  const [gameResult, setGameResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Socket event handlers setup
  useEffect(() => {
    if (!isSocketReady || !isGameJoined) {
      console.log(
        "[Roulette Game] Waiting for socket to be ready and game to be joined"
      );
      return;
    }

    console.log("[Roulette Game] Setting up socket event handlers");
    const socket = getRouletteSocket();
    if (!socket) {
      console.error("[Roulette Game] Socket not available");
      return;
    }

    console.log("[Roulette Game] Socket connection status:", {
      connected: socket.connected,
      id: socket.id,
      isSocketReady,
      isGameJoined,
    });

    onBetResult((result) => {
      console.log("[Roulette Game] Received bet result:", {
        success: result.success,
        totalWin: result.totalWin,
        totalLoss: result.totalLoss,
        newBalance: result.newBalance,
        socketId: socket.id,
      });

      if (result.success) {
        setGameResult(result);
        setBettingStarted(false);
        setStartAutoBet(false);
        setIsProcessing(false);
        setCurrentBets({});

        if (result.totalWin > 0) {
          toast.success(`You won ${result.totalWin}!`);
        } else {
          toast.error("Better luck next time!");
        }
      } else {
        console.error("[Roulette Game] Bet result indicated failure:", result);
        toast.error(result.message || "Bet failed");
        setBettingStarted(false);
        setStartAutoBet(false);
        setIsProcessing(false);
      }
    });

    onGameResult((result) => {
      console.log("[Roulette Game] Received game result broadcast:", {
        result: result.result,
        timestamp: result.timestamp,
        socketId: socket.id,
      });
    });

    onError((error) => {
      console.error("[Roulette Game] Socket error:", {
        error,
        socketId: socket.id,
        connected: socket.connected,
      });
      toast.error(error);
      setBettingStarted(false);
      setStartAutoBet(false);
      setIsProcessing(false);
    });

    return () => {
      console.log("[Roulette Game] Cleaning up socket event handlers");
      removeAllListeners();
    };
  }, [
    isSocketReady,
    isGameJoined,
    setBettingStarted,
    setStartAutoBet,
    setCurrentBets,
  ]);

  // Manual bet handling
  useEffect(() => {
    if (!isSocketReady || !isGameJoined) {
      console.log(
        "[Roulette Game] Cannot place bet: Socket not ready or game not joined"
      );
      return;
    }

    if (betStarted && !isProcessing) {
      console.log("[Roulette Game] Processing manual bet:", {
        currentBets,
        isProcessing,
        isSocketReady,
        isGameJoined,
        socketId: getRouletteSocket()?.id,
      });

      const totalAmount = Object.values(currentBets).reduce(
        (sum, amount) => sum + amount,
        0
      );

      if (totalAmount > 0) {
        console.log("[Roulette Game] Placing manual bet:", {
          totalAmount,
          betTypes: Object.keys(currentBets),
          socketId: getRouletteSocket()?.id,
        });

        setIsProcessing(true);
        placeBet(currentBets, totalAmount, (result) => {
          console.log("[Roulette Game] Bet placement callback:", {
            success: result.success,
            message: result.message,
            socketId: getRouletteSocket()?.id,
          });

          if (!result.success) {
            console.error(
              "[Roulette Game] Failed to place bet:",
              result.message
            );
            setIsProcessing(false);
            setBettingStarted(false);
            toast.error(
              result.message || "Failed to place bet. Please try again."
            );
          }
        });
      } else {
        console.warn("[Roulette Game] No bets placed");
        toast.error("Please place a bet first");
        setBettingStarted(false);
      }
    }
  }, [
    betStarted,
    currentBets,
    setBettingStarted,
    isProcessing,
    isSocketReady,
    isGameJoined,
  ]);

  // Auto bet handling
  useEffect(() => {
    if (!isSocketReady || !isGameJoined) {
      console.log(
        "[Roulette Game] Cannot place auto bet: Socket not ready or game not joined"
      );
      return;
    }

    if (startAutoBet && !isProcessing) {
      console.log("[Roulette Game] Processing auto bet:", {
        currentBets,
        nbets,
        isProcessing,
        isSocketReady,
        isGameJoined,
        socketId: getRouletteSocket()?.id,
      });

      const totalAmount = Object.values(currentBets).reduce(
        (sum, amount) => sum + amount,
        0
      );

      if (totalAmount > 0 && nbets > 0) {
        console.log("[Roulette Game] Placing auto bet:", {
          totalAmount,
          nbets,
          betTypes: Object.keys(currentBets),
          socketId: getRouletteSocket()?.id,
        });

        setIsProcessing(true);
        placeAutoBet(currentBets, totalAmount, nbets, (result) => {
          console.log("[Roulette Game] Auto bet placement callback:", {
            success: result.success,
            message: result.message,
            socketId: getRouletteSocket()?.id,
          });

          if (!result.success) {
            console.error(
              "[Roulette Game] Failed to place auto bet:",
              result.message
            );
            setIsProcessing(false);
            setStartAutoBet(false);
            toast.error(
              result.message || "Failed to start auto bet. Please try again."
            );
          }
        });
      } else {
        console.warn("[Roulette Game] Invalid auto bet parameters:", {
          totalAmount,
          nbets,
        });
        toast.error("Please place a bet and set number of bets");
        setStartAutoBet(false);
      }
    }
  }, [
    startAutoBet,
    currentBets,
    nbets,
    setStartAutoBet,
    isProcessing,
    isSocketReady,
    isGameJoined,
  ]);

  const handlePlaceBet = useCallback(
    (number) => {
      if (!isSocketReady || !isGameJoined) {
        console.error(
          "[Roulette Game] Cannot place bet: Socket not ready or game not joined"
        );
        toast.error("Not connected to game. Please refresh the page.");
        return;
      }

      if (betStarted || startAutoBet || isProcessing) {
        console.warn("[Roulette Game] Cannot place bet:", {
          reason: betStarted
            ? "bet in progress"
            : startAutoBet
            ? "auto bet active"
            : "processing result",
          number,
          socketId: getRouletteSocket()?.id,
        });
        return;
      }

      // Get bet amount from localStorage (set by Frame component)
      const betAmount = parseFloat(localStorage.getItem("betAmount") || "0");
      if (betAmount <= 0) {
        console.warn("[Roulette Game] Invalid bet amount:", betAmount);
        toast.error("Please set a valid bet amount");
        return;
      }

      console.log("[Roulette Game] Placing bet:", {
        number,
        betAmount,
        currentBets,
        socketId: getRouletteSocket()?.id,
      });

      if (number === "clear") {
        console.log("[Roulette Game] Clearing all bets");
        setCurrentBets({});
        return;
      }

      setCurrentBets((prev) => {
        const newBets = {
          ...prev,
          [number]: (prev[number] || 0) + betAmount,
        };
        console.log("[Roulette Game] Updated bets:", {
          newBets,
          socketId: getRouletteSocket()?.id,
        });
        return newBets;
      });
    },
    [
      betStarted,
      startAutoBet,
      isProcessing,
      isSocketReady,
      isGameJoined,
      setCurrentBets,
    ]
  );

  const redNumbers = [
    32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
  ];

  return (
    <div className="text-white w-full py-8 max-h-[600px] relative">
      <div className="w-full mx-auto">
        <div className="flex scale-75 mt-[-50px] mb-[-10px] flex-col items-center">
          <Roulette
            redNumbers={redNumbers}
            nbets={nbets}
            setStartAutoBet={setStartAutoBet}
            startAutoBet={startAutoBet}
            betStarted={betStarted}
            setBettingStarted={setBettingStarted}
            gameResult={gameResult}
          />
        </div>

        <BettingBoard
          red={redNumbers}
          onPlaceBet={handlePlaceBet}
          currentBets={currentBets}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}

export default Game;
