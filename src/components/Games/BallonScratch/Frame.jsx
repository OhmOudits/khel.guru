import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import SideBar from "./SideBar";
import Game from "./Game";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getScratchSocket,
  initializeScratchSocket,
} from "../../../socket/games/scratch";
import checkLoggedIn from "../../../utils/isloggedIn";

// constansts
export const balloonTypes = [
  "#F28B82",
  "#FBBC05",
  "#34A853",
  "#4285F4",
  "#9A67EA",
];
export const diamondTypes = ["red", "blue", "green", "yellow", "purple"];

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [bet, setBet] = useState("0.000000");
  const [nbets, setNBets] = useState(0);
  const [betStarted, setBettingStarted] = useState(false);
  const [slotindex, setslotindex] = useState(null);

  // for game
  const [diamondCounts, setDiamondCounts] = useState(
    diamondTypes.reduce(
      (acc, type) => ({ ...acc, [type]: { count: 0, indices: [] } }),
      {}
    )
  );

  const [AutoPick, setAutoPick] = useState(false);
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
  const [startAutoBet, setStartAutoBet] = useState(false);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const initSocket = () => {
    const scratchSocket = getScratchSocket();
    if (!scratchSocket) {
      initializeScratchSocket(token);
    }
  };

  const handleAutoBet = () => {
    if (!checkLoggedIn()) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    initSocket();
    if (!startAutoBet && nbets > 0) {
      setStartAutoBet(true);
    }
  };

  const handleMineBet = () => {
    if (!checkLoggedIn()) {
      navigate(`?tab=${"login"}`, { replace: true });
      return;
    }

    initSocket();
    if (!betStarted) {
      setBettingStarted(true);
    }
  };

  useEffect(() => {
    if (AutoPick) {
      setCheckecdBoxes([]);
      function generateRandomNumbers(count, min, max) {
        const numbers = [];
        while (numbers.length < count) {
          const randomNumber =
            Math.floor(Math.random() * (max - min + 1)) + min;
          if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
          }
        }
        return numbers;
      }

      const randomNumbers = generateRandomNumbers(10, 0, 39);
      setCheckecdBoxes(randomNumbers);
    }
  }, [AutoPick]);
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
            <div className="grid grid-cols-12 lg:min-h-[600px]">
              {/* Left Section */}
              <SideBar
                theatreMode={theatreMode}
                setBet={setBet}
                setBetMode={setBetMode}
                nbets={nbets}
                setNBets={setNBets}
                betMode={betMode}
                bet={bet}
                maxBetEnable={maxBetEnable}
                handleMineBet={handleMineBet}
                bettingStarted={betStarted}
                handleAutoBet={handleAutoBet}
                startAutoBet={startAutoBet}
              />

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1 relative`}
              >
                <div className="w-full text-white h-full justify-center text-3xl">
                  <div className="mb-20 py-6 md:py-0 md:h-auto">
                    <Game
                      betStarted={betStarted}
                      setBettingStarted={setBettingStarted}
                      diamondCounts={diamondCounts}
                      setDiamondCounts={setDiamondCounts}
                      reset={reset}
                      AutoClick={AutoPick}
                      setAutoPick={setAutoPick}
                      setslotindex={setslotindex}
                      slotindex={slotindex}
                      startAutoBet={startAutoBet}
                      setStartAutoBet={setStartAutoBet}
                      nbets={nbets}
                      betAmount={bet}
                    />
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
