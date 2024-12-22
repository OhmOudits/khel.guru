import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import "../../../styles/Wheel.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import LeftSection from "../../Frame/LeftSection";
import GameComponent from "./Game";
import History from "../../Frame/History";
import BetCalculator from "./Chances";

const DiceFrame = () => {
  // main states
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [nbets, setNBets] = useState(0);
  const [onWin, setOnWin] = useState(0);
  const [onLoss, setOnLoss] = useState(0);
  const [onWinReset, setOnWinReset] = useState(false);
  const [onLossReset, setOnLossReset] = useState(false);
  const [bet, setBet] = useState("0.000000");
  const [loss, setLoss] = useState("0.000000");
  const [profit, setProfit] = useState("0.000000");

  const [EstProfit, setEstProfit] = useState("0.000000");

  // options
  const [isFairness, setIsFairness] = useState(false);
  const [isGameSettings, setIsGamings] = useState(false);
  const [maxBetEnable, setMaxBetEnable] = useState(false);
  const [theatreMode, setTheatreMode] = useState(false);

  // left back side
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

  const [Multipler, setMultipler] = useState(2.0);
  const [roll, setRoll] = useState("50.5");

  const [fixedPosition, setFixedPosition] = useState(roll);
  const [gameResult, setGameResult] = useState("");
  const [targetPosition, setTargetPosition] = useState(fixedPosition);
  const [dicePosition, setDicePosition] = useState(fixedPosition);

  const [currentHistory, setCurrentHistory] = useState([]);
  const [winChance, setWinChance] = useState("50");

  const handleBetClick = () => {
    setBettingStarted(true);
    setStart(true);
    setGameResult("");
    setDicePosition(fixedPosition);
    setTargetPosition(null);
  };

  useEffect(() => {
    if (start) {
      const randomPosition = Math.floor(Math.random() * 100) + 1;
      setTargetPosition(randomPosition);
      setStart(true);

      setTimeout(() => {
        setDicePosition(randomPosition);

        setTimeout(() => {
          checkResult(randomPosition);

          const newHistoryItem = {
            id: currentHistory.length + 1,
            value: `${randomPosition}%`,
            color: rollUnder
              ? randomPosition < roll
                ? "#15803D"
                : "#B91C1C"
              : randomPosition > roll
              ? "#15803D"
              : "#B91C1C",
          };

          setCurrentHistory([...currentHistory, newHistoryItem]);
        }, 1000);
      }, 500);
    }
  }, [start]);

  const checkResult = (position) => {
    if (rollUnder) {
      if (position < roll) {
        setGameResult("Winner! 🎉");
      } else {
        setGameResult("You Lost! 😔");
      }
    } else {
      if (position > roll) {
        setGameResult("Winner! 🎉");
      } else {
        setGameResult("You Lost! 😔");
      }
    }

    setTimeout(() => resetGame(), 2000);
  };

  const resetGame = () => {
    setStart(false);
    setBettingStarted(false);
  };

  useEffect(() => {
    const newWinChance = calculateWinChance(roll, rollUnder);
    setWinChance(parseFloat(newWinChance).toFixed(2));
  }, [roll, rollUnder]);

  // Logic for Win Chance Calculation
  const calculateWinChance = (roll, rollUnder) => {
    return rollUnder ? roll : 100 - roll;
  };

  const calculateMultiplier = (winChance) => {
    const houseEdge = 1;
    return (100 - houseEdge) / winChance;
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
            theatreMode ? "max-w-[100%] " : "max-lg:max-w-[450px]"
          }`}
        >
          <div className="flex flex-col gap-[0.15rem] relative">
            <div className="grid grid-cols-12 lg:min-h-[600px]">
              {/* Left Section */}
              <LeftSection
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
                EstProfit={EstProfit}
                bettingStarted={!bettingStarted}
                handleBetClick={handleBetClick}
                onWinReset={onWinReset}
                onLossReset={onLossReset}
                setOnLossReset={setOnLossReset}
                setOnWinReset={setOnWinReset}
              />

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-gray-900 order-1 max-lg:min-h-[450px]`}
              >
                <div className="w-full px-5 relative text-white h-full  items-center justify-center text-3xl">
                  <History list={currentHistory} />
                  <GameComponent
                    setRollover={setRoll}
                    rollover={roll}
                    fixedPosition={fixedPosition}
                    setFixedPosition={setFixedPosition}
                    gameResult={gameResult}
                    setGameResult={setGameResult}
                    dicePosition={dicePosition}
                    setDicePosition={setDicePosition}
                    Start={start}
                    rollUnder={rollUnder}
                    setMultipler={setMultipler}
                    calculateMultiplier={calculateMultiplier}
                    winChance={winChance}
                  />
                  <div className="mb-5">
                    <BetCalculator
                      rollUnder={rollUnder}
                      setRollUnder={setRollUnder}
                      targetMultiplier={Multipler}
                      setTargetMultiplier={setMultipler}
                      roll={roll}
                      setRoll={setRoll}
                      winChance={winChance}
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

export default DiceFrame;
