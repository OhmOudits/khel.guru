import { FaBolt, FaFire, FaKeyboard } from "react-icons/fa";
import { MdAnimation } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { FaMessage } from "react-icons/fa6";

const FrameFooter = ({
  // eslint-disable-next-line
  isGameSettings,
  //   eslint-disable-next-line
  setIsGamings,
  //   eslint-disable-next-line
  isFav,
  //   eslint-disable-next-line
  setIsFav,
  //   eslint-disable-next-line
  setIsFairness,
  // eslint-disable-next-line
  volume,
  // eslint-disable-next-line
  setVolume,
  // eslint-disable-next-line
  instantBet,
  // eslint-disable-next-line
  setInstantBet,
  // eslint-disable-next-line
  animations,
  // eslint-disable-next-line
  setAnimations,
  // eslint-disable-next-line
  maxBet,
  // eslint-disable-next-line
  setMaxBet,
  // eslint-disable-next-line
  gameInfo,
  // eslint-disable-next-line
  setGameInfo,
  // eslint-disable-next-line
  hotkeys,
  // eslint-disable-next-line
  setHotkeys,
  // eslint-disable-next-line
  maxBetEnable,
  // eslint-disable-next-line
  setMaxBetEnable,
  // eslint-disable-next-line
  theatreMode,
  // eslint-disable-next-line
  setTheatreMode,
}) => {
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <>
      {/* Footer */}
      <div className="relative px-4 py-5 bg-inactive rounded-b flex justify-between items-center">
        {isGameSettings && (
          <div
            className={`absolute z-[4] font-semibold pt-1 bottom-[80%] left-2 transform text-sm text-black bg-white rounded shadow-lg transition-opacity duration-300`}
          >
            <div className="py-2 text-lg gap-2 text-[#1475e1] rounded-tr rounded-tl cursor-pointer px-5 flex items-center ">
              <GiSpeaker />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-[100px] h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1475e1 ${volume}%, #cbd5e1 ${volume}%)`,
                }}
              />
            </div>
            <div
              className={`py-2 text-lg gap-2 cursor-pointer hover:bg-gray-300 px-5 flex items-center ${
                instantBet ? "text-[#1475e1]" : "text-input"
              }`}
              onClick={() => setInstantBet(!instantBet)}
            >
              <FaBolt />
              Instant Bet
            </div>
            <div
              className={`py-2 text-lg gap-2 cursor-pointer hover:bg-gray-300 px-5 flex items-center ${
                animations ? "text-[#1475e1]" : "text-input"
              }`}
              onClick={() => setAnimations(!animations)}
            >
              <MdAnimation />
              Animations
            </div>
            <div
              className={`py-2 text-lg gap-2 cursor-pointer hover:bg-gray-300 px-5 flex items-center ${
                maxBetEnable ? "text-[#1475e1]" : "text-input"
              }`}
              onClick={() => {
                if (!maxBetEnable) {
                  setMaxBet(true);
                  setIsGamings(false);
                } else {
                  setMaxBetEnable(false);
                }
              }}
            >
              <FaFire />
              Max Bet
            </div>
            <div
              className={`py-2 text-lg gap-2 cursor-pointer hover:bg-gray-300 px-5 flex items-center ${
                gameInfo ? "text-[#1475e1]" : "text-input"
              }`}
              onClick={() => {
                setGameInfo(true);
                setIsGamings(false);
              }}
            >
              <FaMessage />
              Game Info
            </div>
            <div
              className={`py-2 text-lg gap-2 rounded-bl rounded-br cursor-pointer hover:bg-gray-300 px-5 flex items-center ${
                hotkeys ? "text-[#1475e1]" : "text-input"
              }`}
              onClick={() => {
                setHotkeys(true);
                setIsGamings(false);
              }}
            >
              <FaKeyboard />
              Hotkeys
            </div>
            <span className="absolute left-4 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
          </div>
        )}

        <div className="icons flex items-center gap-6 ">
          {/* Game Settings */}
          <div
            onClick={() => setIsGamings(true)}
            className="relative group flex items-center justify-center text-gray-300 cursor-pointer hover:text-white"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
              <path d="M55.441 32a26.082 26.082 0 0 0-.34-3.99l.02.15 8.16-6-7.12-12.32-9.254 4.054a23.83 23.83 0 0 0-6.502-3.784l-.164-.056L39.121 0h-14.24l-1.12 10.054c-2.554.98-4.76 2.276-6.71 3.874l.042-.034L7.84 9.84.72 22.16l8.16 6a25.007 25.007 0 0 0-.32 3.828V32c.012 1.366.128 2.694.34 3.99l-.02-.15-8.16 6 7.12 12.32 9.254-4.054a23.83 23.83 0 0 0 6.502 3.784l.164.056L24.88 64h14.24l1.12-10.054c2.554-.98 4.76-2.276 6.71-3.874l-.042.034 9.254 4.054 7.12-12.32-8.16-6c.192-1.146.308-2.474.32-3.828V32Zm-23.44 8.666A8.666 8.666 0 1 1 40.667 32c-.016 4.78-3.886 8.652-8.666 8.666H32h.002Z"></path>
            </svg>
            {!isGameSettings && (
              <span className="absolute font-semibold bottom-[150%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Game Settings
                <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
              </span>
            )}
          </div>

          {/* Theatre Mode */}
          <div
            className={`relative group flex items-center justify-center max-lg:hidden cursor-pointer hover:text-white ${
              theatreMode ? "text-white" : "text-gray-300"
            }`}
            onClick={() => setTheatreMode(!theatreMode)}
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
              {" "}
              <title></title>{" "}
              <path d="M64 58.5H0v-53h64v53Zm-56-8h48v-37H8v37Z"></path>
            </svg>
            {!isGameSettings && (
              <span className="absolute font-semibold bottom-[150%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {theatreMode ? "Disable" : "Enable"} Theatre Mode
                <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
              </span>
            )}
          </div>

          {/* Live stats */}
          {/* <div className="relative group flex items-center justify-center text-gray-300 cursor-pointer hover:text-white">
            <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
              {" "}
              <title></title>{" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.013 19.707 64 0v12.64L30.987 33.627 18.133 18.853 0 30.693V17.947L20.107 4.853l12.906 14.854ZM16 64H5.333V35.173L16 28.213V64Zm13.707-21.653-3.04-3.52V64h10.666V37.493l-2.773 1.76-4.853 3.094ZM58.667 64H48V30.72l10.667-6.8V64Z"
              ></path>
            </svg>
            {!isGameSettings && (
              <span className="absolute font-semibold bottom-[150%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Open Live Stats
                <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
              </span>
            )}
          </div> */}

          {/* Fav Game */}
          <div
            onClick={() => setIsFav((p) => !p)}
            className="relative group flex items-center justify-center text-gray-300 cursor-pointer hover:text-white"
          >
            {!isFav ? (
              <svg
                fill="currentColor"
                viewBox="0 0 64 64"
                className="svg-icon "
              >
                {" "}
                <title></title>{" "}
                <path d="m32.001 16 3.094 5.76c1.742 3.217 4.813 5.525 8.457 6.201l.074.012 6.425 1.146-4.505 4.72a12.013 12.013 0 0 0-3.396 8.385c0 .588.042 1.166.124 1.732l-.008-.064.88 6.453L37.6 47.68c-1.635-.808-3.563-1.282-5.599-1.282s-3.964.472-5.675 1.314l.075-.034-5.545 2.666.88-6.453c.074-.5.116-1.08.116-1.668a12.01 12.01 0 0 0-3.398-8.39l.004.005-4.505-4.854 6.425-1.146a12.152 12.152 0 0 0 8.501-6.15l.032-.063 3.094-5.626-.004.002Zm0-14.612h-.006c-1.32 0-2.466.736-3.052 1.822l-.01.018-7.599 14.292a3.532 3.532 0 0 1-2.432 1.784l-.022.004-15.998 2.88A3.474 3.474 0 0 0 0 25.603c0 .93.366 1.774.962 2.398L.96 28l11.225 11.705a3.371 3.371 0 0 1 .93 2.982l.004-.02-2.186 15.998a3.466 3.466 0 0 0 3.432 3.946h.008a3.248 3.248 0 0 0 1.644-.382l-.018.008 14.264-6.88a4.191 4.191 0 0 1 3.704.01l-.024-.01 14.053 6.88a3.15 3.15 0 0 0 1.5.374h.021-.002c.034.002.074.002.114.002a3.466 3.466 0 0 0 3.43-3.966l.002.018-2.186-15.998a3.37 3.37 0 0 1 .934-2.88l11.225-11.705a3.468 3.468 0 0 0-1.872-5.81l-.022-.003-15.998-2.88a3.534 3.534 0 0 1-2.47-1.846l-.01-.02-7.6-14.292a3.469 3.469 0 0 0-3.061-1.84h-.006l.006-.002Z"></path>
              </svg>
            ) : (
              <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
                {" "}
                <title></title>{" "}
                <path d="m30.157 55.327-14.181 6.89a3.472 3.472 0 0 1-5.046-3.543l-.002.018 2.19-16.024a3.381 3.381 0 0 0-.91-2.858l.002.002L.967 27.98a3.474 3.474 0 0 1 1.875-5.819l.022-.004 16.024-2.884a3.405 3.405 0 0 0 2.422-1.745l.008-.018 7.691-14.287a3.453 3.453 0 0 1 3.045-1.833c1.312 0 2.454.735 3.035 1.815l.01.018 7.585 14.287a3.405 3.405 0 0 0 2.41 1.761l.02.002 16.024 2.884A3.477 3.477 0 0 1 64 25.574a3.47 3.47 0 0 1-.967 2.406l.002-.002-11.243 11.724a3.381 3.381 0 0 0-.906 2.984l-.004-.02 2.19 16.024a3.472 3.472 0 0 1-5.066 3.515l-14.243-6.88a4.174 4.174 0 0 0-1.803-.403c-.655 0-1.274.149-1.829.413l.026-.012v.004Z"></path>
              </svg>
            )}
            {!isGameSettings && (
              <span className="absolute font-semibold bottom-[150%] mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 text-sm text-black bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isFav ? "UnFavorite Game" : "Favorite Game"}
                <span className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-[6px] border-transparent border-t-white"></span>
              </span>
            )}
          </div>
        </div>
        <h1
          onClick={() => setIsFairness(true)}
          className="text-gray-300 cursor-pointer hover:text-white font-semibold  text-sm md:text-lg"
        >
          Fairness
        </h1>
      </div>
    </>
  );
};

export default FrameFooter;
