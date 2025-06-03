import { useState, useEffect, useRef, useCallback } from "react";
import "../../../styles/Frame.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import SideBar from "./SideBar";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import {
  getRouletteSocket,
  initializeRouletteSocket,
  disconnectRouletteSocket,
  onGameJoined,
  onError,
  removeAllListeners,
  joinGame,
} from "../../../socket/games/roulette";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [nbets, setNbets] = useState(0);
  const [onWin, setOnWin] = useState(0);
  const [onLoss, setOnLoss] = useState(0);
  const [onWinReset, setOnWinReset] = useState(false);
  const [onLossReset, setOnLossReset] = useState(false);
  const [bet, setBet] = useState(() => {
    const savedBet = localStorage.getItem("betAmount") || "0.000000";
    return savedBet;
  });
  const [loss, setLoss] = useState("0.000000");
  const [profit, setProfit] = useState("0.000000");
  const [Difficulty, setDifficulty] = useState("Easy");
  const [betStarted, setBettingStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalProfit, setTotalProfit] = useState("0.000000");
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBettingEnabled, setIsBettingEnabled] = useState(true);
  const [isSpinComplete, setIsSpinComplete] = useState(true);
  const [isAutoBetting, setIsAutoBetting] = useState(false);
  const [isWheelAnimationComplete, setIsWheelAnimationComplete] =
    useState(true);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;

  const [isFairness, setIsFairness] = useState(false);
  const [isGameSettings, setIsGamings] = useState(false);
  const [maxBetEnable, setMaxBetEnable] = useState(false);
  const [theatreMode, setTheatreMode] = useState(false);

  const [volume, setVolume] = useState(50);
  const [instantBet, setInstantBet] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [maxBet, setMaxBet] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);
  const [hotkeys, setHotkeys] = useState(false);
  const [hotkeysEnabled, setHotkeysEnabled] = useState(false);
  const [gameCheckout, setGameCheckout] = useState(false);
  const [startAutoBet, setStartAutoBet] = useState(false);

  const [currentBets, setCurrentBets] = useState({});

  const [isSocketReady, setIsSocketReady] = useState(false);
  const [isGameJoined, setIsGameJoined] = useState(false);
  const socketRef = useRef(null);
  const namespaceTimeoutRef = useRef(null);
  const autoBetTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  const [totalBetAmount, setTotalBetAmount] = useState(0);

  useEffect(() => {
    console.log("[Roulette Frame] Updating bet amount:", bet);
    localStorage.setItem("betAmount", bet);
  }, [bet]);

  useEffect(() => {
    const setupSocket = async () => {
      try {
        setIsInitializing(true);
        setLoading(true);
        setIsSocketReady(false);
        setIsGameJoined(false);
        setIsAuthError(false);
        reconnectAttempts.current = 0;

        initializeRouletteSocket(token);
        const socket = getRouletteSocket();
        socketRef.current = socket;

        socket.on("connect_error", (error) => {
          console.error("[Roulette Frame] Connection error:", error);
          if (
            error.message === "Authentication failed" ||
            error.message === "Invalid token"
          ) {
            setIsAuthError(true);
            // setShowLoginModal(true);
          }
          setIsSocketReady(false);
          setIsGameJoined(false);
          setLoading(false);
        });

        socket.on("disconnect", (reason) => {
          console.log("[Roulette Frame] Disconnected:", reason);
          if (
            reason === "io server disconnect" ||
            reason === "transport close"
          ) {
            setIsAuthError(true);
            setShowLoginModal(true);
          }
          setIsSocketReady(false);
          setIsGameJoined(false);
          setLoading(false);
        });

        socket.on("connect", () => {
          console.log("[Roulette Frame] Connected to server");
          setIsSocketReady(true);
          setLoading(false);
          reconnectAttempts.current = 0;

          namespaceTimeoutRef.current = setTimeout(() => {
            if (!isGameJoined) {
              console.error("[Roulette Frame] Namespace connection timeout");
              setIsSocketReady(false);
              setIsGameJoined(false);
              setLoading(false);
              toast.error(
                "Failed to connect to game namespace. Please refresh the page."
              );
            }
          }, 10000);

          console.log("[Roulette Frame] Socket connected, joining game");
          joinGame((result) => {
            console.log("[Roulette Frame] Join game result:", result);
            if (result.success) {
              setIsGameJoined(true);
              setIsInitializing(false);
              clearTimeout(namespaceTimeoutRef.current);
            } else {
              console.error(
                "[Roulette Frame] Failed to join game:",
                result.message
              );
              toast.error(
                result.message ||
                  "Failed to join game. Please refresh the page."
              );
            }
          });
        });

        onGameJoined((data) => {
          console.log("[Roulette Frame] Game joined:", data);
          if (data.success) {
            clearTimeout(namespaceTimeoutRef.current);
            setIsGameJoined(true);
            setLoading(false);
            setIsInitializing(false);
            reconnectAttempts.current = 0;
          } else {
            console.error(
              "[Roulette Frame] Failed to join game:",
              data.message
            );
            toast.error("Failed to join game. Please refresh the page.");
            setLoading(false);
            setIsInitializing(false);
          }
        });

        onError((error) => {
          console.error("[Roulette Frame] Socket error:", error);
          if (error.includes("Authentication") || error.includes("token")) {
            setIsAuthError(true);
            // setShowLoginModal(true);
          } else {
            toast.error(error);
          }
          setLoading(false);
          setIsSocketReady(false);
          setIsGameJoined(false);
        });

        if (!socket.connected) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error("Socket connection timeout"));
            }, 10000);

            socket.once("connect", () => {
              clearTimeout(timeout);
              console.log("[Roulette Frame] Socket connected");
              resolve();
            });

            socket.once("connect_error", (error) => {
              clearTimeout(timeout);
              reject(error);
            });
          });
        }

        return () => {
          console.log("[Roulette Frame] Cleaning up socket");
          clearTimeout(namespaceTimeoutRef.current);
          removeAllListeners();
          disconnectRouletteSocket();
        };
      } catch (error) {
        console.error("[Roulette Frame] Error setting up socket:", error);
        if (
          error.message?.includes("Authentication") ||
          error.message?.includes("token")
        ) {
          setIsAuthError(true);
          // setShowLoginModal(true);
        } else {
          toast.error("Failed to connect to game server");
        }
        setIsSocketReady(false);
        setIsGameJoined(false);
        setLoading(false);
        setIsInitializing(false);
      }
    };

    setupSocket();
  }, [token, navigate]);

  const handleBetstarted = () => {
    if (!token) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    const betAmount = parseFloat(bet);
    if (betAmount <= 0) {
      toast.error("Please set a valid bet amount");
      return;
    }

    if (Object.keys(currentBets).length === 0) {
      toast.error("Please place a bet first");
      return;
    }

    if (!betStarted && !isProcessing && isBettingEnabled && isSpinComplete) {
      console.log("[Roulette Frame] Starting bet with:", {
        currentBets,
        betAmount,
        socketId: socketRef.current?.id,
      });
      setBettingStarted(true);
    }
  };

  const handleCheckout = () => {
    setGameCheckout(true);
    setBettingStarted(false);
  };

  const handleAnimationComplete = useCallback(() => {
    console.log("[Roulette Frame] Wheel animation complete");
    setIsWheelAnimationComplete(true);
  }, []);

  const handleAutoBet = () => {
    if (!token) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    const betAmount = parseFloat(bet);
    if (betAmount <= 0) {
      toast.error("Please set a valid bet amount");
      return;
    }

    if (nbets <= 0) {
      toast.error("Please set a valid number of bets");
      return;
    }

    if (Object.keys(currentBets).length === 0) {
      toast.error("Please place a bet first");
      return;
    }

    // Calculate total bet amount
    const totalAmount =
      Object.values(currentBets).reduce(
        (sum, amount) => sum + parseFloat(amount),
        0
      ) * nbets;
    setTotalBetAmount(totalAmount);

    if (
      !startAutoBet &&
      !isProcessing &&
      isBettingEnabled &&
      isSpinComplete &&
      isWheelAnimationComplete
    ) {
      console.log("[Roulette Frame] Starting auto bet with:", {
        currentBets,
        betAmount,
        nbets,
        totalBetAmount: totalAmount,
        socketId: socketRef.current?.id,
      });

      // Reset states before starting new auto-bet
      setStartAutoBet(false);
      setIsAutoBetting(false);
      setIsWheelAnimationComplete(true);

      // Start auto bet sequence
      setStartAutoBet(true);
      setIsAutoBetting(true);

      // Function to place bets with proper sequencing
      const placeAutoBets = async (count = 0) => {
        // Clear any existing timeout
        if (autoBetTimeoutRef.current) {
          clearTimeout(autoBetTimeoutRef.current);
        }

        // Only check count against nbets
        if (count >= nbets) {
          console.log("[Roulette Frame] Auto bet sequence complete");
          setStartAutoBet(false);
          setIsAutoBetting(false);
          setIsWheelAnimationComplete(true);
          // Only clear bets after all bets are complete
          setCurrentBets({});
          setTotalBetAmount(0);
          return;
        }

        // Wait for any ongoing processing to complete
        if (
          isProcessing ||
          !isBettingEnabled ||
          !isSpinComplete ||
          !isWheelAnimationComplete
        ) {
          console.log("[Roulette Frame] Waiting for game to be ready...");
          autoBetTimeoutRef.current = setTimeout(
            () => placeAutoBets(count),
            1000
          );
          return;
        }

        console.log(`[Roulette Frame] Placing bet ${count + 1} of ${nbets}`);

        // Reset wheel animation state before placing bet
        setIsWheelAnimationComplete(false);

        // Place the bet by triggering betStarted
        setBettingStarted(true);

        // Wait for the wheel animation to complete
        const waitForWheelAnimation = () => {
          return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
              if (isWheelAnimationComplete) {
                clearInterval(checkInterval);
                resolve();
              }
            }, 100);
          });
        };

        try {
          // Wait for the wheel animation to complete
          await waitForWheelAnimation();

          // Add delay before next bet
          console.log("[Roulette Frame] Waiting before next bet...");
          await new Promise((resolve) => setTimeout(resolve, 10500));

          // Proceed to next bet without clearing current bets
          placeAutoBets(count + 1);
        } catch (error) {
          console.error("[Roulette Frame] Error in auto bet sequence:", error);
          setStartAutoBet(false);
          setIsAutoBetting(false);
          // Only clear bets if there's an error
          setCurrentBets({});
        }
      };

      // Start the auto bet sequence
      placeAutoBets();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoBetTimeoutRef.current) {
        clearTimeout(autoBetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className="w-full bg-secondry pt-[1px] pb-[12px] max-lg:pb-[36px]"
        style={{
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <div
          className={`my-12 rounded mx-auto bg-primary w-[96%] max-w-[1400px] max-md:max-w-[450px] ${
            theatreMode ? "max-w-[100%]" : "max-lg:max-w-[450px]"
          }`}
        >
          <div className="flex flex-col gap-[0.15rem] relative">
            <div className="grid grid-cols-12 lg:min-h-[600px] relative">
              {/* Left Section */}
              <SideBar
                handleAutoBet={handleAutoBet}
                startAutoBet={startAutoBet}
                theatreMode={theatreMode}
                setTheatreMode={setTheatreMode}
                setBet={setBet}
                setBetMode={setBetMode}
                profit={profit}
                setProfit={setProfit}
                setLoss={setLoss}
                nbets={nbets}
                setNbets={setNbets}
                betMode={betMode}
                bet={bet}
                maxBetEnable={maxBetEnable}
                loss={loss}
                setOnLoss={setOnLoss}
                setOnWin={setOnWin}
                onLoss={onLoss}
                onWin={onWin}
                onWinReset={onWinReset}
                onLossReset={onLossReset}
                setOnLossReset={setOnLossReset}
                setOnWinReset={setOnWinReset}
                Difficulty={Difficulty}
                setDifficulty={setDifficulty}
                bettingStarted={betStarted}
                handleBetstarted={handleBetstarted}
                totalprofit={totalProfit}
                handleCheckout={handleCheckout}
                isSocketReady={isSocketReady}
                isGameJoined={isGameJoined}
                isDisabled={isProcessing || !isBettingEnabled}
                isAutoBetting={isAutoBetting}
                isProcessing={
                  isProcessing || !isBettingEnabled || !isSpinComplete
                }
                totalBetAmount={totalBetAmount}
                currentBets={currentBets}
              />

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1 relative`}
              >
                <div className="w-full relative text-white h-full flex items-center justify-center text-3xl">
                  {loading ? (
                    <>
                      <h1 className="text-xl font-semibold">Loading...</h1>
                    </>
                  ) : (
                    <center className="w-full flex items-center justify-center">
                      <Game
                        betStarted={betStarted}
                        setBettingStarted={setBettingStarted}
                        currentBets={currentBets}
                        setCurrentBets={setCurrentBets}
                        isSocketReady={isSocketReady}
                        isGameJoined={isGameJoined}
                        nbets={nbets}
                        onAutoBetComplete={handleAutoBet}
                        setIsProcessing={setIsProcessing}
                        isProcessing={isProcessing}
                        isBettingEnabled={isBettingEnabled}
                        setIsBettingEnabled={setIsBettingEnabled}
                        setIsAutoBetting={setIsAutoBetting}
                        isSpinComplete={isSpinComplete}
                        setIsSpinComplete={setIsSpinComplete}
                        onAnimationComplete={handleAnimationComplete}
                      />
                    </center>
                  )}
                </div>
              </div>
            </div>
          </div>

          <FrameFooter
            isFav={isFav}
            isGameSettings={isGameSettings}
            setIsFav={setIsFav}
            setIsFairness={setIsFairness}
            setIsGamings={setIsGamings}
            volume={volume}
            setVolume={setVolume}
            instantBet={instantBet}
            setInstantBet={setInstantBet}
            animations={animations}
            setAnimations={setAnimations}
            maxBet={maxBet}
            setMaxBet={setMaxBet}
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
            hotkeys={hotkeys}
            setHotkeys={setHotkeys}
            maxBetEnable={maxBetEnable}
            setMaxBetEnable={setMaxBetEnable}
            theatreMode={theatreMode}
            setTheatreMode={setTheatreMode}
          />

          {/* Other modals */}
          {isFairness && (
            <div
              className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
              onClick={() => setIsFairness(false)}
            >
              <div className="text-white w-full flex items-center justify-center h-full">
                <div
                  className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FairnessModal setIsFairness={setIsFairness} />
                </div>
              </div>
            </div>
          )}

          {hotkeys && (
            <div
              className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
              onClick={() => setHotkeys(false)}
            >
              <div className="text-white w-full flex items-center justify-center h-full">
                <div
                  className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <HotKeysModal
                    setHotkeys={setHotkeys}
                    hotkeysEnabled={hotkeysEnabled}
                    setHotkeysEnabled={setHotkeysEnabled}
                  />
                </div>
              </div>
            </div>
          )}

          {gameInfo && (
            <div
              className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
              onClick={() => setGameInfo(false)}
            >
              <div className="text-white w-full flex items-center justify-center h-full">
                <div
                  className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GameInfoModal setGameInfo={setGameInfo} />
                </div>
              </div>
            </div>
          )}

          {maxBet && !maxBetEnable && (
            <div
              className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
              onClick={() => setMaxBet(false)}
            >
              <div className="text-white w-full flex items-center justify-center h-full">
                <div
                  className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MaxBetModal
                    setMaxBet={setMaxBet}
                    setMaxBetEnable={setMaxBetEnable}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Frame;
