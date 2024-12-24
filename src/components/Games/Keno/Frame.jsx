import { useEffect, useState } from "react";
import "../../../styles/Frame.css";
import FairnessModal from "../../Frame/FairnessModal";
import FrameFooter from "../../Frame/FrameFooter";
import HotKeysModal from "../../Frame/HotKeysModal";
import GameInfoModal from "../../Frame/GameInfoModal";
import MaxBetModal from "../../Frame/MaxBetModal";
import SideBar from "./SideBar";
import Game from "./Game";
import { useSelector } from "react-redux";
import { chances } from "./constants";
import Chances from "./Chances";

const Frame = () => {
  const user = useSelector((state) => state?.auth?.user?.user);
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
  const [Risk, setRisk] = useState("Low");
  const [checkedBoxes, setCheckecdBoxes] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [betStarted, setBettingStarted] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [totalProfit, setTotalProfit] = useState("0.000000");

  const [AutoPick, setAutoPick] = useState(false);
  const [clearTable, setClearTable] = useState(false);
  const [winnedGifts, setWinnedGifts] = useState(-1);

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
  const [randomSelect, setRandomSelect] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [valid, setValid] = useState(false);
  const [things, setThings] = useState([]);

  useEffect(() => {
    setThings(chances(Risk));
  }, [Risk]);

  const handleMineBet = () => {
    if (!betStarted && valid) {
      setBettingStarted(true);
      setWinnedGifts(-1);
      setGameOver(false);
      setGifts([]);
    }
  };

  const handleRandomSelect = () => {
    setRandomSelect(true);
  };

  useEffect(() => {
    if (clearTable) {
      setCheckecdBoxes([]);
    }
    setClearTable(false);
    setGifts([]);
    setGameOver(false);
  }, [clearTable]);

  useEffect(() => {
    if (betStarted) {
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
      if (betStarted && checkedBoxes.length > 0) {
        setGifts(randomNumbers);

        const commonNumbers = randomNumbers.filter((num) =>
          checkedBoxes.includes(num)
        );

        setWinnedGifts(commonNumbers.length);
        console.log(winnedGifts);
      }

      setGameOver(true);

      setTimeout(() => {
        setBettingStarted(false);
        // setGameOver(false);
      }, 2500);
    }
  }, [betStarted, checkedBoxes]);

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

  useEffect(() => {
    if (checkedBoxes.length >= 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [checkedBoxes]);

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
                Risk={Risk}
                valid={valid}
                setRisk={setRisk}
                handleMineBet={handleMineBet}
                bettingStarted={betStarted}
                totalprofit={totalProfit}
                handleRandomSelect={handleRandomSelect}
                AutoPick={AutoPick}
                setAutoPick={setAutoPick}
                setClearTable={setClearTable}
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
                    <div className="mb-20">
                      <Game
                        mines={Risk}
                        randomSelect={randomSelect}
                        setRandomSelect={setRandomSelect}
                        betStarted={betStarted}
                        setBetStarted={setBettingStarted}
                        userEmail={user?.email}
                        checkedBoxes={checkedBoxes}
                        setCheckecdBoxes={setCheckecdBoxes}
                        gifts={gifts}
                        gameOver={gameOver}
                        winnedGifts={winnedGifts}
                        things={things}
                        arrayLength={checkedBoxes.length || 0}
                      />
                    </div>
                  )}
                  <div className="h-[100px] mt-10"></div>
                  <Chances
                    things={things}
                    arrayLength={checkedBoxes.length || 0}
                    winlength={winnedGifts}
                  />
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
