import { useState } from "react";
import "../../styles/Frame.css";
import FairnessModal from "./FairnessModal";
import BetAmount from "./BetAmount";
import FrameFooter from "./FrameFooter";
import HotKeysModal from "./HotKeysModal";
import GameInfoModal from "./GameInfoModal";
import MaxBetModal from "./MaxBetModal";

const Frame = () => {
  const [isFav, setIsFav] = useState(false);
  const [betMode, setBetMode] = useState("manual");
  const [nbets, setNBets] = useState("");
  const [onWin, setOnWin] = useState(0);
  const [onLoss, setOnLoss] = useState(0);
  const [onWinReset, setOnWinReset] = useState(false);
  const [onLossReset, setOnLossReset] = useState(false);
  const [bet, setBet] = useState("0.000000");
  const [loss, setLoss] = useState("0.000000");
  const [profit, setProfit] = useState("0.000000");

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

  return (
    <>
      <div className="w-full">
        <div
          className={`my-12 rounded mx-auto bg-primary-3 w-[96%] max-w-[1400px] max-md:max-w-[450px] ${
            theatreMode ? "max-w-[100%] max-h-screen" : "max-lg:max-w-[450px]"
          }`}
        >
          <div className="flex flex-col gap-[0.15rem] relative">
            <div className="grid grid-cols-12 lg:min-h-[600px]">
              {/* Left Section */}
              <div
                className={`col-span-12 ${
                  theatreMode
                    ? "md:col-span-4 md:order-1"
                    : "lg:col-span-4 lg:order-1"
                } xl:col-span-3 order-2 max-lg:h-[fit-content]`}
              >
                <div className="my-4 px-3 flex flex-col">
                  {/* Manual and auto  */}
                  <div className="order-[100] max-lg:mt-5 lg:order-1 switch mb-4 w-full bg-primary-1 rounded-full p-1.5 pb-[0.45rem] grid grid-cols-2 gap-1">
                    <div
                      onClick={() => setBetMode("manual")}
                      className={`${
                        betMode === "manual" ? "bg-primary-3 scale-95" : ""
                      } hover:bg-primary-3 cursor-pointer col-span-1 flex items-center justify-center py-3 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
                    >
                      Manual
                    </div>
                    <div
                      onClick={() => setBetMode("auto")}
                      className={`${
                        betMode === "auto" ? "bg-primary-3 scale-95" : ""
                      } hover:bg-primary-3 cursor-pointer col-span-1 flex items-center justify-center py-3 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
                    >
                      Auto
                    </div>
                  </div>

                  {betMode === "manual" && (
                    <>
                      <BetAmount
                        bet={bet}
                        setBet={setBet}
                        maxBetEnable={maxBetEnable}
                      />

                      {/* Profit on win */}
                      <div className="order-10 md:order-2 mt-4 w-full">
                        <div className="flex items-center justify-between w-full font-semibold text-label">
                          <h1>Profit on Win</h1>
                          <h1 className="text-sm">$0.00</h1>
                        </div>

                        <div className="relative w-full">
                          <input
                            className="w-full mt-2 h-full rounded bg-input outline-none text-white px-2 pr-6 py-2 border border-input hover:border-primary-4"
                            value={"0.00000000"}
                            disabled
                          />
                          <div className="absolute top-[14px] right-3">
                            <svg
                              fill="none"
                              viewBox="0 0 96 96"
                              className="svg-icon"
                            >
                              {" "}
                              <title></title>{" "}
                              <path
                                d="M95.895 48.105C95.895 74.557 74.451 96 48 96 21.548 96 .105 74.556.105 48.105.105 21.653 21.548.21 48 .21c26.451 0 47.895 21.443 47.895 47.895Z"
                                fill="#F7931A"
                              ></path>
                              <path
                                d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bet button */}
                      <div className="order-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 text-black bg-button-primary flex items-center justify-center w-full py-3 mt-5 max-lg:mt-4 rounded cursor-pointer text-lg font-semibold">
                        Bet
                      </div>
                    </>
                  )}

                  {betMode === "auto" && (
                    <>
                      <BetAmount
                        bet={bet}
                        setBet={setBet}
                        maxBetEnable={maxBetEnable}
                      />

                      {/* Number of bets */}
                      <div className="w-full mb-1 order-10 md:order-2">
                        <h1 className="font-semibold mt-1 text-label">
                          Number of Bets
                        </h1>
                        <input
                          type="number"
                          value={nbets}
                          onChange={(e) => setNBets(e.target.value)}
                          className="w-full mt-2 h-full rounded bg-primary-1 outline-none text-white px-2 pr-6 py-2 border border-input hover:border-primary-4"
                        />
                      </div>

                      {/* On Win */}
                      <div className="order-10 md:order-2 py-3 w-full">
                        <h1 className="font-semibold text-label">On Win</h1>
                        <div className="flex mt-2 bg-input rounded p-0.5 pb-[0.20rem]">
                          <div
                            onClick={() => {
                              setOnWin(0);
                              setOnWinReset(true);
                            }}
                            className={`text-sm ${
                              onWinReset ? "bg-primary-1" : "hover:bg-primary-4"
                            } font-semibold w-[50px] rounded cursor-pointer p-2 flex items-center justify-center text-white transition-all duration-300 ease-in-out transform active:scale-90`}
                          >
                            Reset
                          </div>
                          <div
                            onClick={() => setOnWinReset(false)}
                            className={`text-sm cursor-pointer font-semibold w-[190px] mr-1 ${
                              onWinReset ? "hover:bg-primary-4" : "bg-primary-1"
                            } rounded p-2 flex  items-center justify-center text-white transition-all duration-300 ease-in-out transform active:scale-90`}
                          >
                            Increase by :
                          </div>
                          <div className="w-full relative">
                            <input
                              type="number"
                              value={onWin}
                              disabled={onWinReset}
                              onChange={(e) => setOnWin(e.target.value)}
                              className={`w-full rounded ${
                                onWinReset
                                  ? "bg-input border-primary-4"
                                  : "bg-primary-1 border-input"
                              } outline-none text-white px-2 pr-6 py-2 border hover:border-primary-4`}
                            />
                            <div className="absolute top-1.5 right-2 text-gray-500">
                              <svg
                                fill="currentColor"
                                viewBox="0 0 64 64"
                                className="svg-icon "
                              >
                                {" "}
                                <title></title>{" "}
                                <path d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* On Loss */}
                      <div className="order-10 md:order-2 py-3 w-full">
                        <h1 className="font-semibold text-label">On Loss</h1>
                        <div className="flex mt-2 bg-input rounded p-0.5 pb-[0.20rem]">
                          <div
                            onClick={() => {
                              setOnLoss(0);
                              setOnLossReset(true);
                            }}
                            className={`text-sm ${
                              onLossReset
                                ? "bg-primary-1"
                                : "hover:bg-primary-4"
                            } font-semibold w-[50px] rounded cursor-pointer p-2 flex items-center justify-center text-white transition-all duration-300 ease-in-out transform active:scale-90`}
                          >
                            Reset
                          </div>
                          <div
                            onClick={() => setOnLossReset(false)}
                            className={`text-sm cursor-pointer font-semibold w-[190px] mr-1 ${
                              onLossReset
                                ? "hover:bg-primary-4"
                                : "bg-primary-1"
                            } rounded p-2 flex  items-center justify-center text-white transition-all duration-300 ease-in-out transform active:scale-90`}
                          >
                            Increase by :
                          </div>
                          <div className="w-full relative">
                            <input
                              type="number"
                              value={onLoss}
                              disabled={onLossReset}
                              onChange={(e) => setOnLoss(e.target.value)}
                              className={`w-full rounded ${
                                onLossReset
                                  ? "bg-input border-primary-4"
                                  : "bg-primary-1 border-input"
                              } outline-none text-white px-2 pr-6 py-2 border hover:border-primary-4`}
                            />
                            <div className="absolute top-1.5 right-2 text-gray-500">
                              <svg
                                fill="currentColor"
                                viewBox="0 0 64 64"
                                className="svg-icon "
                              >
                                {" "}
                                <title></title>{" "}
                                <path d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stop on Profit */}
                      <div className="order-10 md:order-2 mt-2 w-full">
                        <div className="flex items-center justify-between w-full font-semibold text-label">
                          <label htmlFor="profit">Stop on Profit</label>
                          <h1 className="text-sm">$0.00</h1>
                        </div>

                        <div className="relative w-full">
                          <input
                            id="profit"
                            type="text"
                            className="w-full mt-2 h-full rounded bg-primary-1 outline-none text-white px-2 pr-6 py-2 border border-input hover:border-primary-4"
                            value={profit}
                            onChange={(e) => setProfit(e.target.value)}
                          />
                          <div className="absolute top-[14px] right-3">
                            <svg
                              fill="none"
                              viewBox="0 0 96 96"
                              className="svg-icon"
                            >
                              {" "}
                              <title></title>{" "}
                              <path
                                d="M95.895 48.105C95.895 74.557 74.451 96 48 96 21.548 96 .105 74.556.105 48.105.105 21.653 21.548.21 48 .21c26.451 0 47.895 21.443 47.895 47.895Z"
                                fill="#F7931A"
                              ></path>
                              <path
                                d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Stop on Loss */}
                      <div className="order-10 md:order-2 mt-2 w-full">
                        <div className="flex items-center justify-between w-full font-semibold text-label">
                          <label htmlFor="loss">Stop on Loss</label>
                          <h1 className="text-sm">$0.00</h1>
                        </div>

                        <div className="relative w-full">
                          <input
                            id="loss"
                            type="text"
                            value={loss}
                            onChange={(e) => setLoss(e.target.value)}
                            className="w-full mt-2 h-full rounded bg-primary-1 outline-none text-white px-2 pr-6 py-2 border border-input hover:border-primary-4"
                          />
                          <div className="absolute top-[14px] right-3">
                            <svg
                              fill="none"
                              viewBox="0 0 96 96"
                              className="svg-icon"
                            >
                              {" "}
                              <title></title>{" "}
                              <path
                                d="M95.895 48.105C95.895 74.557 74.451 96 48 96 21.548 96 .105 74.556.105 48.105.105 21.653 21.548.21 48 .21c26.451 0 47.895 21.443 47.895 47.895Z"
                                fill="#F7931A"
                              ></path>
                              <path
                                d="M69.525 42.18c.93-6.27-3.84-9.645-10.38-11.895l2.115-8.505-5.16-1.29-2.1 8.28c-1.365-.345-2.76-.66-4.14-.975l2.1-8.295-5.175-1.29-2.115 8.49c-1.125-.255-2.235-.51-3.3-.78l-7.14-1.785-1.365 5.52s3.84.885 3.75.93a2.763 2.763 0 0 1 2.414 3.011l.001-.01-2.415 9.69c.213.049.394.106.568.174l-.028-.01-.54-.135-3.39 13.5a1.879 1.879 0 0 1-2.383 1.226l.013.004-3.765-.93L24.525 63l6.735 1.665 3.69.96-2.145 8.595 5.175 1.29 2.115-8.505c1.41.375 2.775.735 4.125 1.065l-2.115 8.475 5.175 1.29 2.13-8.58c8.835 1.665 15.465.99 18.255-6.99 2.25-6.42-.105-10.125-4.755-12.54 3.39-.72 5.925-2.955 6.615-7.545ZM57.69 58.755c-1.59 6.435-12.405 3-15.915 2.085L44.61 49.5c3.51.825 14.76 2.565 13.08 9.255Zm1.605-16.665c-1.5 5.85-10.5 2.865-13.38 2.145l2.58-10.32c2.91.72 12.315 2.085 10.8 8.175Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bet button */}
                      <div className="order-2 my-4 mt-6 md:my-0 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 text-black bg-button-primary flex items-center justify-center w-full py-3 max-lg:mt-1 rounded cursor-pointer text-lg font-semibold">
                        Start Autobet
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Section */}
              <div
                className={`col-span-12 rounded-tr ${
                  theatreMode
                    ? "md:col-span-8 md:order-2"
                    : "lg:col-span-8 lg:order-2"
                } xl:col-span-9 bg-primary-1 order-1 max-lg:min-h-[400px]`}
              >
                <div className="w-full text-white h-full flex items-center justify-center text-3xl">
                  Game
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
                      className="max-h-[90%] custom-scrollbar overflow-y-auto w-[95%] pt-3 rounded max-w-[500px] bg-primary-2"
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
