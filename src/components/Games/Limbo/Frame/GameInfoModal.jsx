// eslint-disable-next-line
const GameInfoModal = ({ setGameInfo }) => {
  return (
    <div className="px-4 w-full">
      {/* Header */}
      <div className="flex justify-between mb-4 items-center w-full">
        <div className="flex items-center gap-3">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon text-[rgba(177,186,211,1)]"
          >
            {" "}
            <title></title>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.8 8.547h36.774c0 .028.026.054.026.054h-.016a6.75 6.75 0 0 0-6.384 6.586v33.04l-.002-.02a6.8 6.8 0 0 1-6.786 7.246 6.8 6.8 0 0 1-6.786-7.226v-3.094H16V15.347a6.8 6.8 0 0 1 6.8-6.8Zm-.828 27.894h15.494V31.8H21.972v4.64Zm.002-12.4h24.8V19.4h-24.8v4.64Zm38.052-13.574h-.052A3.974 3.974 0 0 0 56 14.44v6.426h8V14.44a3.974 3.974 0 0 0-3.974-3.974ZM36.8 48.256H0a6.8 6.8 0 0 0 6.8 6.8h34.026c-2.694 0-4.026-3.04-4.026-6.8Z"
            ></path>
          </svg>
          <h1>Game Info</h1>
        </div>
        <div
          onClick={() => setGameInfo(false)}
          className="text-[rgba(177,186,211,1)] hover:text-white"
        >
          <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
            {" "}
            <title></title>{" "}
            <path d="m54.827 16.187-7.014-7.014L32 24.987 16.187 9.173l-7.014 7.014L24.987 32 9.173 47.813l7.014 7.014L32 39.013l15.813 15.814 7.014-7.014L39.013 32l15.814-15.813Z"></path>
          </svg>
        </div>
      </div>

      <div className="my-4 text-label">
        <div className="flex gap-2">
          <h1>1.</h1>
          <h1>Only roll outcomes that hit the green area are winners.</h1>
        </div>
        <div className="flex gap-2">
          <h1>2.</h1>
          <h1>Players are prohibited from using their own dice.</h1>
        </div>
        <div className="flex gap-2">
          <h1>3.</h1>
          <h1>Absolutely no hufflepuffs allowed.</h1>
        </div>
      </div>
    </div>
  );
};

export default GameInfoModal;
