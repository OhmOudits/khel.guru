/* eslint-disable */
import BetAmount from "../../Frame/BetAmount";

const LeftSection = ({
  theatreMode,
  setBetMode,
  betMode,
  bet,
  setBet,
  maxBetEnable,
  nbets,
  setNBets,
  bettingStarted,
  handleBetClick,
  handleAutoBet,
  startAutoBet,
  handlePump,
  handleCheckout,
  risk , 
  setRisk
}) => {
  return (
    <>
      <div
        className={`col-span-12 ${
          theatreMode ? "md:col-span-4 md:order-1" : "lg:col-span-4 lg:order-1"
        } xl:col-span-3 bg-inactive order-2 max-lg:h-[fit-content] lg:h-[600px] overflow-auto`}
      >
        <div className="my-4 px-3 flex flex-col">
          {/* Manual and auto  */}
          <div className="sticky top-0 z-[1] bg-inactive py-0 rounded-md">
            <div className="order-[100] max-lg:mt-2 lg:order-1 switch mb-4 w-full bg-primary rounded-full p-1.5 grid grid-cols-2 gap-1">
              <div
                onClick={() => {
                  if (!startAutoBet) {
                    setBetMode("manual");
                  }
                }}
                className={`${
                  betMode === "manual" ? "bg-inactive scale-95" : ""
                } hover:bg-activeHover cursor-pointer col-span-1 flex items-center justify-center py-2 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
              >
                Manual
              </div>
              <div
                onClick={() => {
                  if (!bettingStarted) {
                    setBetMode("auto");
                  }
                }}
                className={`${
                  betMode === "auto" ? "bg-inactive scale-95" : ""
                } hover:bg-activeHover cursor-pointer col-span-1 flex items-center justify-center py-2 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
              >
                Auto
              </div>
            </div>
          </div>

          {betMode === "manual" &&
            (!bettingStarted ? (
              <>
                {/* Risk Section */}
                <div className="order-10 md:order-2 mb-6 mt-1 w-full">
                  <label
                    htmlFor="risk"
                    className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label"
                  >
                    <h1>Risk</h1>
                  </label>

                  <select
                    className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-3 pr-6   border border-input hover:border-primary-4"
                    value={risk}
                    id="risk"
                    onChange={(e) => setRisk(e.target.value)}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <BetAmount
                  bet={bet}
                  setBet={setBet}
                  maxBetEnable={maxBetEnable}
                />

                {/* Bet button */}
                <div
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold ${
                    bettingStarted
                      ? "bg-primary text-white"
                      : "bg-button-primary text-black cursor-pointer"
                  }`}
                  onClick={() => handleBetClick()}
                >
                  Bet
                </div>
              </>
            ) : (
              <>
                <BetAmount
                  bet={bet}
                  setBet={setBet}
                  maxBetEnable={maxBetEnable}
                />

                {/* Bet button */}
                <div
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold 
                
                      bg-button-primary text-black cursor-pointer`}
                  onClick={() => handlePump()}
                >
                  Pump
                </div>
                <div
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold 
                
                      bg-button-primary text-black cursor-pointer`}
                  onClick={() => handleCheckout()}
                >
                  Checkout
                </div>
              </>
            ))}

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
                  disabled={startAutoBet}
                  onChange={(e) => setNBets(e.target.value)}
                  className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-2 pr-6 py-2 border border-input hover:border-primary-4"
                />
              </div>

              {/* Bet button */}
              <button
                onClick={handleAutoBet}
                disabled={startAutoBet}
                className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform flex items-center justify-center w-full mx-auto py-1.5 mt-4 max-lg:mt-4 rounded text-lg font-semibold text-black cursor-pointer ${
                  startAutoBet
                    ? "bg-primary text-white cursor-text"
                    : "bg-button-primary active:scale-90"
                }`}
              >
                Start Autobet
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftSection;
