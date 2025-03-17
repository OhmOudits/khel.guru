/* eslint-disable */
import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import "../../../styles/Wheel.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import Sidebar from "./Sidebar";
import GameComponent from "./Game";
import History from "../../Frame/History";
import BetCalculator from "./Chances";
import { toast } from "react-toastify";

const DiceFrame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [nbets, setNBets] = useState(0);
  const [bet, setBet] = useState("0.000000");
  const [loss, setLoss] = useState("0.000000");
  const [profit, setProfit] = useState("0.000000");

  const [isFairness, setIsFairness] = useState(false);
  const [isGameSettings, setIsGameSettings] = useState(false);
  const [maxBetEnable, setMaxBetEnable] = useState(false);
  const [theatreMode, setTheatreMode] = useState(false);

  const [volume, setVolume] = useState(50);
  const [instantBet, setInstantBet] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [maxBet, setMaxBet] = useState(false);
  const [gameInfo, setGameInfo] = useState(false);
  const [hotkeys, setHotkeys] = useState(false);
  const [hotkeysEnabled, setHotkeysEnabled] = useState(false);

  const [rollUnder, setRollUnder] = useState(false);
  const [bettingStarted, setBettingStarted] = useState(false);
  const [start, setStart] = useState(false);

  const [roll, setRoll] = useState("50.5");

  const [fixedPosition, setFixedPosition] = useState(roll);
  const [gameResult, setGameResult] = useState("");
  const [targetPosition, setTargetPosition] = useState(fixedPosition);
  const [dicePosition, setDicePosition] = useState(fixedPosition);
  // for slide game only
  const [TargetNumber, setTargetNumber] = useState(0);
  const [enteredMultipler, setenteredMultipler] = useState(0);
  const [gamestarted, setgamestarted] = useState(false);

  const [currentHistory, setCurrentHistory] = useState([]);
  const [winChance, setWinChance] = useState("50");
  const [startAutoBet, setStartAutoBet] = useState(false);

  console.log(gamestarted, bettingStarted, TargetNumber);
  useEffect(() => {
    if (gamestarted == false && bettingStarted == true) {
      setBettingStarted(false);
    }
  }, [gamestarted]);
  const handleBetClick = () => {
    if (enteredMultipler > 1 && enteredMultipler < 9990) {
      setBettingStarted(true);
      setStart(true);
      setGameResult("");
      setDicePosition(fixedPosition);
      setTargetPosition(null);
    } else {
      toast.error("Enter a Valid Multiplier", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleAutoBet = () => {
    if (!startAutoBet && nbets > 0) {
      setStartAutoBet(true);
      autoBet(nbets);
    }
  };

  const autoBet = (remainingBets) => {
    if (remainingBets > 0) {
      console.log("clicked");
      handleBetClick();
      const gameDuration = 3500 + 500;

      setTimeout(() => {
        resetGame();
        autoBet(remainingBets - 1);
      }, gameDuration);
    } else {
      setStartAutoBet(false);
    }
  };

  const resetGame = () => {
    setStart(false);
    setBettingStarted(false);
  };

  useEffect(() => {
    setWinChance(parseFloat(calculateWinChance(roll, rollUnder)).toFixed(2));
  }, [roll, rollUnder]);

  const calculateWinChance = (roll, rollUnder) => {
    return rollUnder ? roll : 100 - roll;
  };

  const calculateMultiplier = (winChance) => {
    const houseEdge = 1;
    return (100 - houseEdge) / winChance;
  };

  return (
    <div
      className="w-full bg-secondry pt-[1px] pb-[12px] max-lg:pb-[36px]"
      style={{ minHeight: "calc(100vh - 70px)" }}
    >
      <div
        className={`my-12 rounded mx-auto bg-primary w-[96%] max-w-[1400px] max-md:max-w-[450px] ${
          theatreMode ? "max-w-[100%]" : "max-lg:max-w-[450px]"
        }`}
      >
        <div className="flex flex-col gap-[0.15rem] relative">
          <div className="grid grid-cols-12 lg:min-h-[600px]">
            <Sidebar
              {...{
                theatreMode,
                setTheatreMode,
                setBet,
                setBetMode,
                profit,
                setProfit,
                setLoss,
                nbets,
                setNBets,
                betMode,
                bet,
                maxBetEnable,
                bettingStarted,
                handleBetClick,
                startAutoBet,
                handleAutoBet,
                enteredMultipler,
                setenteredMultipler,
                gamestarted,
              }}
            />

            <div
              className={`col-span-12 rounded-tr ${
                theatreMode
                  ? "md:col-span-8 md:order-2"
                  : "lg:col-span-8 lg:order-2"
              } xl:col-span-9 bg-gray-900 order-1 max-lg:min-h-[450px]`}
            >
              <div className="w-full px-5 relative text-white h-full items-center justify-center text-3xl">
                <History list={currentHistory} />
                <GameComponent
                  {...{
                    setTargetNumber,
                    gamestarted,
                    setgamestarted,
                  }}
                />
              </div>
            </div>
          </div>

          <FrameFooter
            {...{
              isFav,
              isGameSettings,
              setIsFav,
              setIsFairness,
              setIsGameSettings,
              volume,
              setVolume,
              instantBet,
              setInstantBet,
              animations,
              setAnimations,
              maxBet,
              setMaxBet,
              gameInfo,
              setGameInfo,
              hotkeys,
              setHotkeys,
              maxBetEnable,
              setMaxBetEnable,
              theatreMode,
              setTheatreMode,
            }}
          />

          {isGameSettings && (
            <div
              className="absolute bg-transparent top-0 left-0 w-full h-full z-[2] cursor-pointer"
              onClick={() => setIsGameSettings(false)}
            ></div>
          )}

          {isFairness && (
            <div
              className="absolute top-0 left-0 w-full h-full z-[2] bg-[rgba(0,0,0,0.4)] cursor-pointer flex items-center justify-center"
              onClick={() => setIsFairness(false)}
            >
              <div
                className="text-white w-full flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary">
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
              <div
                className="text-white w-full flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2">
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
              <div
                className="text-white w-full flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2">
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
              <div
                className="text-white w-full flex items-center justify-center h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2">
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
  );
};

export default DiceFrame;
