import { useEffect, useState } from "react";

// eslint-disable-next-line
const FairnessModal = ({ setIsFairness }) => {
  const [field, setField] = useState("seeds");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipVisible2, setTooltipVisible2] = useState(false);
  const [tooltipVisible3, setTooltipVisible3] = useState(false);
  const [seeds, setSeeds] = useState("d446e7cd361065de");
  const [seedHashed, setSeedHashed] = useState(
    "d7f1d6a53fee9c6bf85dda8b7220206a892feeac9a70f73ddedbd57a102505de"
  );
  const [totalBets, setTotalBets] = useState(0);
  const [seedServer, setSeedServer] = useState(
    "2c9ff80273373a0110fa3c883d22c99a66e4d55e8ed8deb9db75ad88b70b73d2"
  );
  const [clientSeed, setClientSeed] = useState("");

  const [vcseed, setVCSeed] = useState("");
  const [vsseed, setVSSeed] = useState("");
  const [nonce, setNonce] = useState(0);
  const [game, setGame] = useState("Dice");

  useEffect(() => {
    generateRandomString();
  }, []);

  const handleCopyClick = (state, tip) => {
    navigator.clipboard.writeText(state).then(() => {
      tip(true);
      setTimeout(() => {
        tip(false);
      }, 2000);
    });
  };

  const generateRandomString = () => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-+!@#";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setClientSeed(result);
  };

  const handleNonceInc = () => {
    if (isNaN(nonce)) {
      return;
    }

    setNonce((p) => p + 1);
  };

  const handleNonceDec = () => {
    if (isNaN(nonce)) {
      return;
    }

    if (nonce === 0) {
      return;
    }

    setNonce((p) => p - 1);
  };

  return (
    <>
      <div className="px-4">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              className="svg-icon text-[rgba(177,186,211,1)]"
            >
              {" "}
              <title></title>{" "}
              <path d="M54.727 15.006h3.12V8.37H34.654V2.61H27.99v5.758H4.746v6.637h4.505L0 37.452c0 7.037 5.704 12.741 12.741 12.741 7.038 0 12.741-5.704 12.741-12.741l-9.25-22.446h11.73v39.745h-9.303v6.638h25.165V54.75h-9.171V15.006h13.115l-9.25 22.446c0 7.037 5.703 12.741 12.74 12.741C58.297 50.193 64 44.489 64 37.452l-9.273-22.446ZM5.334 37.452l7.411-17.887 7.357 17.887H5.334Zm38.492 0 7.357-17.887 7.463 17.887h-14.82Z"></path>
            </svg>
            <h1>Fairness</h1>
          </div>
          <div
            onClick={() => setIsFairness(false)}
            className="text-[rgba(177,186,211,1)] hover:text-white"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
              {" "}
              <title></title>{" "}
              <path d="m54.827 16.187-7.014-7.014L32 24.987 16.187 9.173l-7.014 7.014L24.987 32 9.173 47.813l7.014 7.014L32 39.013l15.813 15.814 7.014-7.014L39.013 32l15.814-15.813Z"></path>
            </svg>
          </div>
        </div>

        {/* Switching */}
        <div className="w-full flex items-center justify-center">
          <div className="switch mt-6 w-full max-w-[200px]  bg-[#0f212e] rounded-full p-1.5 pb-[0.45rem] grid grid-cols-2 gap-1">
            <div
              onClick={() => setField("seeds")}
              className={`${
                field === "seeds" ? "bg-[#213743] scale-95" : ""
              } hover:bg-[#213743] cursor-pointer col-span-1 flex items-center justify-center py-3 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
            >
              Seeds
            </div>
            <div
              onClick={() => setField("verify")}
              className={`${
                field === "verify" ? "bg-[#213743] scale-95" : ""
              } hover:bg-[#213743] cursor-pointer col-span-1 flex items-center justify-center py-3 text-white font-semibold rounded-full transition-all duration-300 ease-in-out transform active:scale-90`}
            >
              Verify
            </div>
          </div>
        </div>
      </div>

      {field === "seeds" && (
        <>
          <div className="px-4">
            {/* Client Seed */}
            <h1 className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4">
              Active Client Seed
            </h1>
            <div className="flex w-full">
              <input
                className="w-full p-2 rounded-bl rounded-tl bg-[#2f4553] border border-[#2f4553] hover:border-[#557086]"
                disabled
                value={seeds}
                onChange={(e) => setSeeds(e.target.value)}
              />
              <div
                onClick={() => handleCopyClick(seeds, setTooltipVisible)}
                className="w-[50px] lineBefore relative group rounded-tr rounded-br flex items-center justify-center bg-[#2f4553] hover:bg-[#557086]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 64 64"
                  className="svg-icon"
                >
                  {" "}
                  <title></title>{" "}
                  <path d="M61.334 64H16V12.986h45.334V64ZM2.666 0v45.466H9.28V6.506h38.96V0H2.666Z"></path>
                </svg>
                {tooltipVisible && (
                  <span className="absolute font-semibold bottom-[100%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Copied!!!
                    <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
                  </span>
                )}
              </div>
            </div>

            {/* Client Seed Hashed */}
            <h1 className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4">
              Active Server Seed (Hashed)
            </h1>
            <div className="flex w-full">
              <input
                className="w-full p-2 rounded-bl rounded-tl bg-[#2f4553] border border-[#2f4553] hover:border-[#557086]"
                disabled
                value={seedHashed}
                onChange={(e) => setSeedHashed(e.target.value)}
              />
              <div
                onClick={() => handleCopyClick(seedHashed, setTooltipVisible2)}
                className="w-[50px] lineBefore relative group rounded-tr rounded-br flex items-center justify-center bg-[#2f4553] hover:bg-[#557086]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 64 64"
                  className="svg-icon"
                >
                  {" "}
                  <title></title>{" "}
                  <path d="M61.334 64H16V12.986h45.334V64ZM2.666 0v45.466H9.28V6.506h38.96V0H2.666Z"></path>
                </svg>
                {tooltipVisible2 && (
                  <span className="absolute font-semibold bottom-[100%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Copied!!!
                    <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
                  </span>
                )}
              </div>
            </div>

            {/* Total bets made with pair */}
            <label
              htmlFor="tbets"
              className="font-semibold text-sm mb-2 text-[#b1bad3] mt-4"
            >
              Total bets made with pair
            </label>
            <input
              id="tbets"
              className="w-full p-2 rounded-bl rounded-tl bg-[#2f4553] border border-[#2f4553] hover:border-[#557086]"
              value={totalBets}
              type="number"
              onChange={(e) => setTotalBets(e.target.value)}
            />
          </div>

          <div className="mt-4 p-4 bg-[#0f212e]">
            {/* Rotate Seed Pair */}
            <h1 className="font-semibold text-center text-white">
              Rotate Seed Pair
            </h1>

            {/* New Client Seed */}
            <h1 className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4">
              Next Client Seed
            </h1>
            <div className="flex w-full">
              <input
                className="w-full p-2 rounded-bl rounded-tl bg-[#0f212e] border border-[#2f4553] hover:border-[#557086]"
                disabled
                readOnly
                value={clientSeed}
              />
              <div
                onClick={generateRandomString}
                className="w-[150px] lineBefore relative group rounded-tr rounded-br flex items-center justify-center text-black bg-[#00e701] transition-all duration-300 ease-in-out transform active:scale-95 font-semibold"
              >
                Change
              </div>
            </div>

            {/* Client Seed Server Hashed */}
            <h1 className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4">
              Next Server Seed (Hashed)
            </h1>
            <div className="flex w-full">
              <input
                className="w-full p-2 rounded-bl rounded-tl bg-[#2f4553] border border-[#2f4553] hover:border-[#557086]"
                disabled
                value={seedServer}
                onChange={(e) => setSeedServer(e.target.value)}
              />
              <div
                onClick={() => handleCopyClick(seedServer, setTooltipVisible3)}
                className="w-[50px] lineBefore relative group rounded-tr rounded-br flex items-center justify-center bg-[#2f4553] hover:bg-[#557086]"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 64 64"
                  className="svg-icon"
                >
                  {" "}
                  <title></title>{" "}
                  <path d="M61.334 64H16V12.986h45.334V64ZM2.666 0v45.466H9.28V6.506h38.96V0H2.666Z"></path>
                </svg>
                {tooltipVisible3 && (
                  <span className="absolute font-semibold bottom-[100%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Copied!!!
                    <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
                  </span>
                )}
              </div>
            </div>

            {/* End */}
          </div>
        </>
      )}

      {field === "verify" && (
        <>
          <div className="px-4 py-4 mt-4 w-full bg-[#0f212e]">
            {/* Game */}
            <label
              htmlFor="game"
              className="font-semibold text-sm text-[#b1bad3] mt-4"
            >
              Game
            </label>
            <div className="flex w-full">
              <select
                className="w-full p-2 mt-1 rounded-bl rounded-tl bg-[#0f212e] border border-[#2f4553] hover:border-[#557086]"
                value={game}
                id="game"
                onChange={(e) => setGame(e.target.value)}
              >
                <option value="dice">Dice</option>
                <option value="hilo">Hilo</option>
                <option value="slide">Slide</option>
              </select>
            </div>

            {/* Client Seed */}
            <div className="mt-4">
              <label
                htmlFor="vcseed"
                className="font-semibold text-sm mb-1 text-[#b1bad3]"
              >
                Client Seed
              </label>
              <div className="flex mt-1 w-full">
                <input
                  className="w-full p-2 rounded-bl rounded-tl bg-[#0f212e] border border-[#2f4553] hover:border-[#557086]"
                  type="text"
                  id="vcseed"
                  value={vcseed}
                  onChange={(e) => setVCSeed(e.target.value)}
                />
              </div>
            </div>

            {/* Server Seed */}
            <div className="mt-4">
              <label
                htmlFor="vsseed"
                className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4"
              >
                Server Seed
              </label>
              <div className="flex w-full mt-1">
                <input
                  className="w-full p-2 rounded-bl rounded-tl bg-[#0f212e] border border-[#2f4553] hover:border-[#557086]"
                  type="text"
                  id="vsseed"
                  value={vsseed}
                  onChange={(e) => setVSSeed(e.target.value)}
                />
              </div>
            </div>

            {/* Nonce */}
            <div className="mt-4">
              <label
                htmlFor="nonce"
                className="font-semibold text-sm mb-1 text-[#b1bad3] mt-4"
              >
                Nonce
              </label>
              <div className="flex w-full">
                <input
                  className="w-full p-2 rounded-bl rounded-tl bg-[#0f212e] border border-[#2f4553] hover:border-[#557086]"
                  type="text"
                  id="nonce"
                  value={nonce}
                  onChange={(e) => setNonce(e.target.value)}
                />
                <div
                  onClick={handleNonceDec}
                  className="w-[70px] relative group flex items-center justify-center bg-[#2f4553] hover:bg-[#557086]"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 64 64"
                    className="svg-icon"
                  >
                    {" "}
                    <title></title>{" "}
                    <path d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07h-.005Z"></path>
                  </svg>
                </div>
                <div
                  onClick={handleNonceInc}
                  className="w-[70px] lineBefore relative group rounded-tr rounded-br flex items-center justify-center bg-[#2f4553] hover:bg-[#557086]"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 64 64"
                    className="svg-icon"
                  >
                    {" "}
                    <title></title>{" "}
                    <path d="M32.271 17 9.201 40.071 16.128 47l16.145-16.145L48.418 47l6.93-6.929L32.275 17h-.005Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FairnessModal;
