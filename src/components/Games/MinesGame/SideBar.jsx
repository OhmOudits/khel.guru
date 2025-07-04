const SideBar = ({
  theatreMode,
  setBetMode,
  betMode,
  bet,
  setBet,
  maxBetEnable,
  nbets,
  setNBets,
  bettingStarted,
  mines,
  setMines,
  handleMineBet,
  gems,
  totalprofit,
  handleCheckout,
  handleRandomSelect,
  startAutoBet,
  handleAutoBet,
  gameCheckout,
  selectBoxes,
  setSelectBoxes,
  handleSelectBoxes,
  setback,
  disabled,
  loading,
  setGrid,
  connectionStatus,
}) => {
  const getButtonText = () => {
    if (connectionStatus === "Connecting") return "Connecting...";
    if (connectionStatus === "Disconnected") return "Disconnected";
    if (connectionStatus === "Not Logged In") return "Please Login";
    return bettingStarted ? `Cashout (${totalprofit.toFixed(2)})` : "Bet";
  };

  return (
    <>
      <div
        className={`col-span-12 ${
          theatreMode ? "md:col-span-4 md:order-1" : "lg:col-span-4 lg:order-1"
        } xl:col-span-3 bg-inactive order-2 max-lg:h-[fit-content] lg:h-[600px] overflow-auto ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="my-4 px-3 flex flex-col">
          {/* Manual and auto  */}
          <div className="sticky top-0 z-[1] bg-inactive py-0 rounded-md">
            <div className="order-[100] max-lg:mt-2 lg:order-1 switch mb-4 w-full bg-primary rounded-full p-1.5 grid grid-cols-2 gap-1">
              <div
                onClick={() => {
                  if (!startAutoBet && !disabled) {
                    setSelectBoxes(false);
                    setBetMode("manual");
                    setGrid(
                      Array(25)
                        .fill()
                        .map(() => ({ type: "diamond", revealed: false }))
                    );
                  }
                }}
                className={`${
                  betMode === "manual" ? "bg-inactive scale-95" : ""
                } hover:bg-activeHover cursor-pointer col-span-1 flex items-center justify-center py-2 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90 ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
              >
                Manual
              </div>
              <div
                onClick={() => {
                  if (!bettingStarted && !disabled) {
                    setBetMode("auto");
                    setGrid(
                      Array(25)
                        .fill()
                        .map(() => ({ type: "diamond", revealed: false }))
                    );
                  }
                }}
                className={`${
                  betMode === "auto" ? "bg-inactive scale-95" : ""
                } hover:bg-activeHover cursor-pointer col-span-1 flex items-center justify-center py-2 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90 ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
              >
                Auto
              </div>
            </div>
          </div>

          {betMode === "manual" && (
            <>
              <div className="order-1 md:order-2 my-2 w-full">
                <div className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label">
                  <label htmlFor="betAmount">Bet Amount</label>
                  <h1 className="text-sm">$0.00</h1>
                </div>
                <div className="w-full mt-1 bg-inactive shadow-md flex rounded">
                  <div className="w-full relative">
                    <input
                      type="text"
                      value={bet}
                      disabled={bettingStarted}
                      id="betAmount"
                      onChange={(e) => setBet(e.target.value)}
                      className="w-full h-full rounded bg-secondry outline-none text-white px-2 pr-6 border border-inactive hover:border-primary-4"
                    />
                    <div className="absolute top-1.5 right-2">
                      <svg fill="none" viewBox="0 0 96 96" className="svg-icon">
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
                  <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                    1/2
                  </div>
                  <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                    2x
                  </div>
                  {maxBetEnable && (
                    <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                      Max
                    </div>
                  )}
                </div>
              </div>

              {/* Mines and diamonds */}
              <div className="order-10 md:order-2 mb-2 mt-1 w-full flex items-center gap-3">
                <div className="w-full">
                  <label
                    htmlFor="mines"
                    className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label"
                  >
                    <h1>Mines</h1>
                  </label>
                  <select
                    className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-3 pr-6 py-2 border border-input hover:border-primary-4"
                    value={mines}
                    id="mines"
                    disabled={bettingStarted}
                    onChange={(e) => setMines(e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {bettingStarted && (
                  <div className="w-full">
                    <label
                      htmlFor="gems"
                      className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label"
                    >
                      <h1>Gems</h1>
                    </label>
                    <input
                      type="text"
                      value={gems || 25 - mines}
                      id="gems"
                      disabled
                      className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-3 pr-6 py-2 border border-input hover:border-primary-4"
                    />
                  </div>
                )}
              </div>

              {bettingStarted && (
                <div className="order-10 md:order-2 mb-2 mt-1 w-full">
                  <label
                    htmlFor="totalProfit"
                    className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label"
                  >
                    <h1>Total Profit</h1>
                  </label>
                  <input
                    type="text"
                    value={totalprofit}
                    id="totalprofit"
                    disabled
                    className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-3 pr-6 py-2 border border-input hover:border-primary-4"
                  />
                </div>
              )}

              {bettingStarted && (
                <div
                  className={`order-2 text-white md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold bg-inactive hover:bg-activeHover cursor-pointer`}
                  onClick={() => {
                    if (!gameCheckout) {
                      handleRandomSelect();
                    }
                  }}
                >
                  Pick random title
                </div>
              )}

              {bettingStarted && (
                <div
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold text-black cursor-pointer ${
                    gameCheckout
                      ? "bg-primary text-white cursor-text"
                      : "bg-button-primary active:scale-90"
                  }`}
                  onClick={handleCheckout}
                >
                  Checkout
                </div>
              )}

              {/* Bet button */}
              {!bettingStarted && (
                <div
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform active:scale-90 flex items-center justify-center w-full mx-auto py-1.5 mt-3 max-lg:mt-4 rounded text-lg font-semibold bg-button-primary text-black cursor-pointer ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={disabled ? undefined : handleMineBet}
                >
                  {getButtonText()}
                </div>
              )}
            </>
          )}

          {betMode === "auto" && (
            <>
              <div className="order-1 md:order-2 my-2 w-full">
                <div className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label">
                  <label htmlFor="betAmount">Bet Amount</label>
                  <h1 className="text-sm">$0.00</h1>
                </div>
                <div className="w-full mt-1 bg-inactive shadow-md flex rounded">
                  <div className="w-full relative">
                    <input
                      type="text"
                      value={bet}
                      id="betAmount"
                      disabled={bettingStarted}
                      onChange={(e) => setBet(e.target.value)}
                      className="w-full h-full rounded bg-secondry outline-none text-white px-2 pr-6 border border-inactive hover:border-primary-4"
                    />
                    <div className="absolute top-1.5 right-2">
                      <svg fill="none" viewBox="0 0 96 96" className="svg-icon">
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
                  <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                    1/2
                  </div>
                  <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                    2x
                  </div>
                  {maxBetEnable && (
                    <div className="cursor-pointer hover:bg-activeHover inline-flex relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-grey-400 text-white hover:bg-grey-300 hover:text-white focus-visible:outline-white text-sm leading-none py-[0.8125rem] px-[1rem] shadow-none">
                      Max
                    </div>
                  )}
                </div>
              </div>

              {/* Number of bets */}
              {selectBoxes && (
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
              )}

              {/* Mines and diamonds */}
              <div className="order-10 md:order-2 mb-2 mt-1 w-full flex items-center gap-3">
                <div className="w-full">
                  <label
                    htmlFor="mines"
                    className="flex items-center mb-[-4px] pl-[2px] justify-between w-full font-semibold text-label"
                  >
                    <h1>Mines</h1>
                  </label>
                  <select
                    className="w-full mt-2 h-full rounded bg-secondry outline-none text-white px-3 pr-6 py-2 border border-input hover:border-primary-4"
                    value={mines}
                    id="mines"
                    disabled={startAutoBet}
                    onChange={(e) => setMines(e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectBoxes ? (
                <>
                  <button
                    onClick={disabled ? undefined : setback}
                    className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform flex items-center justify-center w-full mx-auto py-1.5 mt-4 max-lg:mt-4 rounded text-lg font-semibold text-black cursor-pointer ${
                      startAutoBet
                        ? "bg-primary text-white cursor-text"
                        : "bg-button-primary active:scale-90"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Change The Boxes
                  </button>
                  <button
                    onClick={disabled ? undefined : handleAutoBet}
                    disabled={startAutoBet || disabled}
                    className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform flex items-center justify-center w-full mx-auto py-1.5 mt-4 max-lg:mt-4 rounded text-lg font-semibold text-black cursor-pointer ${
                      startAutoBet
                        ? "bg-primary text-white cursor-text"
                        : "bg-button-primary active:scale-90"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Start Autobet
                  </button>
                </>
              ) : (
                <button
                  onClick={disabled ? undefined : handleSelectBoxes}
                  className={`order-2 max-md:mb-2 md:order-20 transition-all duration-300 ease-in-out transform flex items-center justify-center w-full mx-auto py-1.5 mt-4 max-lg:mt-4 rounded text-lg font-semibold text-black cursor-pointer ${
                    startAutoBet
                      ? "bg-primary text-white cursor-text"
                      : "bg-button-primary active:scale-90"
                  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Select These Boxes
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
