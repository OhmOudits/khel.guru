import { useState, useEffect, useRef } from "react";
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

const DisconnectModal = ({ isDisconnected, onReconnect, isReconnecting }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isDisconnected
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        top: "70px",
        bottom: "0",
        left: "0",
        right: "0",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-md w-full mx-4 transform transition-transform duration-300">
        <h2 className="text-xl font-bold text-white mb-4">Connection Lost</h2>
        <p className="text-gray-300 mb-6">
          {isReconnecting
            ? "Attempting to reconnect to the game server..."
            : "Your connection to the game server has been lost. Please try to reconnect or refresh the page."}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onReconnect}
            disabled={isReconnecting}
            className={`w-full font-bold py-2 px-4 rounded transition-colors ${
              isReconnecting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isReconnecting ? "Reconnecting..." : "Reconnect"}
          </button>
          <button
            onClick={() => window.location.reload()}
            disabled={isReconnecting}
            className={`w-full font-bold py-2 px-4 rounded transition-colors ${
              isReconnecting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700 text-white"
            }`}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [nbets, setNBets] = useState(0);
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
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
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

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    console.log("[Roulette Frame] Updating bet amount:", bet);
    localStorage.setItem("betAmount", bet);
  }, [bet]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const setupSocket = async () => {
      try {
        setIsInitializing(true);
        setLoading(true);
        setIsSocketReady(false);
        setIsGameJoined(false);
        setIsDisconnected(false);
        setIsReconnecting(false);
        reconnectAttempts.current = 0;

        initializeRouletteSocket(token);
        const socket = getRouletteSocket();
        socketRef.current = socket;

        socket.on("connect_error", (error) => {
          console.error("[Roulette Frame] Connection error:", error);
          if (!isInitializing) {
            setIsDisconnected(true);
          }
          setIsSocketReady(false);
          setIsGameJoined(false);
          setLoading(false);
        });

        socket.on("disconnect", (reason) => {
          console.log("[Roulette Frame] Disconnected:", reason);
          if (!isInitializing) {
            setIsDisconnected(true);
          }
          setIsSocketReady(false);
          setIsGameJoined(false);
          setLoading(false);

          if (
            reason !== "io client disconnect" &&
            reason !== "io server disconnect"
          ) {
            handleReconnect();
          }
        });

        socket.on("connect", () => {
          console.log("[Roulette Frame] Connected to server");
          setIsDisconnected(false);
          setIsSocketReady(true);
          setLoading(false);
          reconnectAttempts.current = 0;

          namespaceTimeoutRef.current = setTimeout(() => {
            if (!isGameJoined) {
              console.error("[Roulette Frame] Namespace connection timeout");
              setIsDisconnected(true);
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
              setIsDisconnected(true);
              setIsInitializing(false);
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
            setIsDisconnected(false);
            setIsReconnecting(false);
            setIsInitializing(false);
            reconnectAttempts.current = 0;
          } else {
            console.error(
              "[Roulette Frame] Failed to join game:",
              data.message
            );
            toast.error("Failed to join game. Please refresh the page.");
            setLoading(false);
            setIsDisconnected(true);
            setIsInitializing(false);
          }
        });

        onError((error) => {
          console.error("[Roulette Frame] Socket error:", error);
          toast.error(error);
          setLoading(false);
          setIsSocketReady(false);
          setIsGameJoined(false);
          if (!isInitializing) {
            setIsDisconnected(true);
          }
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
        toast.error("Failed to connect to game server");
        setIsDisconnected(true);
        setIsSocketReady(false);
        setIsGameJoined(false);
        setLoading(false);
        setIsInitializing(false);
      }
    };

    setupSocket();
  }, [token, navigate]);

  const handleReconnect = async () => {
    if (isReconnecting || reconnectAttempts.current >= maxReconnectAttempts) {
      return;
    }

    try {
      setIsReconnecting(true);
      reconnectAttempts.current += 1;

      // Clean up existing socket
      if (socketRef.current) {
        socketRef.current.disconnect();
        removeAllListeners();
      }
      clearTimeout(namespaceTimeoutRef.current);

      // Reset game state
      setBettingStarted(false);
      setStartAutoBet(false);
      setCurrentBets({});

      // Initialize new socket
      initializeRouletteSocket(token);
      const socket = getRouletteSocket();
      socketRef.current = socket;

      // Set up connection handlers before attempting to connect
      socket.on("connect", () => {
        console.log("[Roulette Frame] Socket reconnected");
        setIsDisconnected(false);
        setIsSocketReady(true);
        setLoading(false);
        reconnectAttempts.current = 0;

        // Join game after successful connection
        joinGame((result) => {
          console.log(
            "[Roulette Frame] Join game result after reconnect:",
            result
          );
          if (result.success) {
            setIsGameJoined(true);
            setIsInitializing(false);
            setIsReconnecting(false);
            clearTimeout(namespaceTimeoutRef.current);
          } else {
            console.error(
              "[Roulette Frame] Failed to join game after reconnect:",
              result.message
            );
            setIsDisconnected(true);
            setIsInitializing(false);
            setIsReconnecting(false);
            toast.error(
              result.message || "Failed to join game. Please refresh the page."
            );
          }
        });
      });

      socket.on("connect_error", (error) => {
        console.error("[Roulette Frame] Reconnection error:", error);
        setIsDisconnected(true);
        setIsSocketReady(false);
        setIsGameJoined(false);
        setLoading(false);
        setIsReconnecting(false);
        toast.error("Failed to reconnect to game server");
      });

      // Set up namespace connection timeout
      namespaceTimeoutRef.current = setTimeout(() => {
        if (!isGameJoined) {
          console.error("[Roulette Frame] Namespace reconnection timeout");
          setIsDisconnected(true);
          setIsSocketReady(false);
          setIsGameJoined(false);
          setLoading(false);
          setIsReconnecting(false);
          toast.error(
            "Failed to reconnect to game namespace. Please refresh the page."
          );
        }
      }, 5000);

      // Set up game joined handler
      onGameJoined((data) => {
        console.log("[Roulette Frame] Game rejoined:", data);
        if (data.success) {
          clearTimeout(namespaceTimeoutRef.current);
          setIsGameJoined(true);
          setLoading(false);
          setIsDisconnected(false);
          setIsReconnecting(false);
          reconnectAttempts.current = 0;
        }
      });

      onError((error) => {
        console.error("[Roulette Frame] Reconnection error:", error);
        toast.error(error);
        setLoading(false);
        setIsReconnecting(false);
      });

      // If socket is already connected, trigger the connect handler
      if (socket.connected) {
        socket.emit("connect");
      }
    } catch (error) {
      console.error("[Roulette Frame] Reconnection error:", error);
      toast.error("Failed to reconnect to game server");
      setIsDisconnected(true);
      setLoading(false);
      setIsReconnecting(false);

      if (reconnectAttempts.current >= maxReconnectAttempts) {
        toast.error(
          "Maximum reconnection attempts reached. Please refresh the page."
        );
      }
    }
  };

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

    if (!betStarted && Object.keys(currentBets).length !== 0) {
      console.log("[Roulette Frame] Starting bet with:", {
        currentBets,
        betAmount,
        socketId: socketRef.current?.id,
      });
      setBettingStarted(true);
    } else if (Object.keys(currentBets).length === 0) {
      toast.error("Please place a bet first");
    }
  };

  const handleCheckout = () => {
    setGameCheckout(true);
    setBettingStarted(false);
  };

  const handleAutoBet = () => {
    if (!token) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    if (!startAutoBet && nbets !== 0 && Object.keys(currentBets).length !== 0) {
      setStartAutoBet(true);
    }
  };

  return (
    <>
      <DisconnectModal
        isDisconnected={isDisconnected && !isInitializing}
        onReconnect={handleReconnect}
        isReconnecting={isReconnecting}
      />
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
            <div className="grid grid-cols-12 lg:min-h-[600px]">
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
                setNBets={setNBets}
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
              />

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1`}
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
                        nbets={nbets}
                        setBettingStarted={setBettingStarted}
                        startAutoBet={startAutoBet}
                        setStartAutoBet={setStartAutoBet}
                        currentBets={currentBets}
                        setCurrentBets={setCurrentBets}
                        isSocketReady={isSocketReady}
                        isGameJoined={isGameJoined}
                      />
                    </center>
                  )}
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

            {/* Modals */}
            {isGameSettings && (
              <div
                className="absolute bg-transparent top-0 left-0 w-full h-full z-[2] cursor-pointer"
                onClick={() => setIsGamings(false)}
              ></div>
            )}

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
      </div>
    </>
  );
};

export default Frame;
