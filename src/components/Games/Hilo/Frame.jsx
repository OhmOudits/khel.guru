import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import SideBar from "./SideBar";
import Game from "./Game";
import { CARD_SUITS, CARD_VALUES } from "./constant";

import { useSelector } from "react-redux";
import {
  disconnectHiloSocket,
  getHiloSocket,
  initializeHiloSocket,
} from "../../../socket/games/hilo";
import checkLoggedIn from "../../../utils/isloggedIn";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [bet, setBet] = useState("0.000000");
  const [betStarted, setBettingStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [reset, setReset] = useState(false);

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
  const [hotkeysEnableddiamondCounts, setHotkeysEnabled] = useState(false);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);

  const initSocket = () => {
    const hiloSocket = getHiloSocket();
    if (!hiloSocket) {
      initializeHiloSocket(token);
    }
  };

  useEffect(() => {
    const hiloSocket = getHiloSocket();

    if (hiloSocket) {
      hiloSocket.on("error", ({ message }) => {
        console.error("Join game error:", message);
        toast.error(`Error joining game: ${message}`);
      });
    }

    return () => {
      const hiloSocket = getHiloSocket();
      if (hiloSocket) {
        hiloSocket.off("error");
      }
      disconnectHiloSocket();
    };
  }, []);

  const [currentCard, setCurrentCard] = useState({
    value: CARD_VALUES[4],
    suit: CARD_SUITS[2],
    color: false,
  });
  const [historyCards, setHistoryCards] = useState([
    { ...currentCard, result: null },
  ]);

  const getValueIndex = (value) => CARD_VALUES.indexOf(value);

  const getRandomCard = () => {
    const randomValue =
      CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)];
    const randomSuit =
      CARD_SUITS[Math.floor(Math.random() * CARD_SUITS.length)];
    const color = Math.random() < 0.5;

    return { value: randomValue, suit: randomSuit, color };
  };

  const handleBet = () => {
    if (!checkLoggedIn()) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    initSocket();

    if (!betStarted) {
      const hiloSocket = getHiloSocket();
      if (hiloSocket) {
        hiloSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Hilo socket not initialized");
        toast.error("Failed to join game: Check Your Internet Connection");
        return;
      }

      setBettingStarted(true);
      const newCard = getRandomCard();

      setCurrentCard(newCard);
      setHistoryCards([{ ...newCard, result: null }]);
    }
  };

  const handleHigh = () => {
    if (betStarted) {
      const newCard = getRandomCard();
      const isHigher =
        getValueIndex(newCard.value) >= getValueIndex(currentCard.value);

      setCurrentCard(newCard);
      setHistoryCards((prev) => [
        ...prev,
        { ...newCard, result: isHigher ? "high-true" : "high-false" },
      ]);

      if (!isHigher) {
        setBettingStarted(false);
      }
    }
  };

  const handleLow = () => {
    if (betStarted) {
      const newCard = getRandomCard();
      const isLower =
        getValueIndex(newCard.value) <= getValueIndex(currentCard.value);

      setCurrentCard(newCard);
      setHistoryCards((prev) => [
        ...prev,
        { ...newCard, result: isLower ? "low-true" : "low-false" },
      ]);

      if (!isLower) {
        setBettingStarted(false);
      }
    }
  };

  const handleSkip = () => {
    if (betStarted) {
      const newCard = getRandomCard();

      setCurrentCard(newCard);
      setHistoryCards((prev) => [...prev, { ...newCard, result: null }]);
    }
  };

  const handleCheckout = () => {
    if (betStarted) {
      setBettingStarted(false);
    }
  };

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
            theatreMode ? "max-w-[100%] max-h-screen" : "max-lg:max-w-[450px]"
          }`}
        >
          <div className="flex flex-col gap-[0.15rem] relative">
            <div className="grid grid-cols-12 lg:h-[600px]">
              {/* Left Section */}
              <SideBar
                theatreMode={theatreMode}
                setBetMode={setBetMode}
                bet={bet}
                setBet={setBet}
                maxBetEnable={maxBetEnable}
                setBettingStarted={setBettingStarted}
                handleBet={handleBet}
                bettingStarted={betStarted}
                setReset={setReset}
                handleHigh={handleHigh}
                handleLow={handleLow}
                handleSkip={handleSkip}
                handleCheckout={handleCheckout}
              />

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1`}
              >
                <div className="w-full  text-white rounded-tr h-full justify-center text-3xl">
                  {loading ? (
                    <>
                      <h1 className="text-xl font-semibold">Loading...</h1>
                    </>
                  ) : (
                    <>
                      <Game
                        historyCards={historyCards}
                        setHistoryCards={setHistoryCards}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                      />
                    </>
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

            {isGameSettings && (
              <div
                className="absolute bg-transparent top-0 left-0 w-full h-full z-[2] cursor-pointer"
                onClick={() => setIsGamings(false)}
              ></div>
            )}

            {/* Fairness Modal */}
            {isFairness && (
              <>
                <div
                  className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
                  onClick={() => setIsFairness(false)}
                >
                  <div className="text-white w-full flex items-center justify-center h-full ">
                    <div
                      className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FairnessModal setIsFairness={setIsFairness} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {hotkeys && (
              <>
                <div
                  className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
                  onClick={() => setHotkeys(false)}
                >
                  <div className="text-white w-full flex items-center justify-center h-full ">
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
              </>
            )}

            {gameInfo && (
              <div
                className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
                onClick={() => setGameInfo(false)}
              >
                <div className="text-white w-full flex items-center justify-center h-full ">
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
                <div className="text-white w-full flex items-center justify-center h-full ">
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
