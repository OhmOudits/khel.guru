// eslint-disable-next-line
const MaxBetModal = ({ setMaxBet, setMaxBetEnable }) => {
  return (
    <div className="w-full px-3">
      {/* Header */}
      <div className="flex justify-between mb-4 items-center w-full">
        <div className="flex items-center gap-3">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon mt-1 text-[rgba(177,186,211,1)]"
          >
            {" "}
            <title></title>{" "}
            <path d="M57.89 0H6.11A6.12 6.12 0 0 0 0 6.11v51.78A6.12 6.12 0 0 0 6.11 64h51.78A6.12 6.12 0 0 0 64 57.89V6.11A6.12 6.12 0 0 0 57.89 0ZM25 50.09H11.13a2.79 2.79 0 0 1-.008-5.568H25a2.791 2.791 0 1 1 .166 5.574c-.058 0-.118-.002-.174-.006H25ZM23.65 25a8.346 8.346 0 0 1-7.842-5.502l-.018-.058h-4.66a2.791 2.791 0 0 1-.008-5.57h4.668c1.182-3.262 4.254-5.55 7.86-5.55a8.34 8.34 0 0 1 0 16.68Zm29.22 25.09h-4.66c-1.182 3.27-4.258 5.564-7.872 5.564a8.35 8.35 0 0 1-8.35-8.35 8.35 8.35 0 0 1 8.35-8.35 8.356 8.356 0 0 1 7.854 5.506l.018.058h4.66a2.79 2.79 0 0 1 .008 5.568h-.008v.004Zm0-30.61H39c-.05.004-.108.004-.166.004a2.791 2.791 0 0 1 0-5.58c.058 0 .118.002.174.006H39h13.87a2.79 2.79 0 0 1 .008 5.568h-.008v.002Z"></path>
          </svg>
          <h1>Max Bet</h1>
        </div>
        <div
          onClick={() => setMaxBet(false)}
          className="text-[rgba(177,186,211,1)] hover:text-white"
        >
          <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
            {" "}
            <title></title>{" "}
            <path d="m54.827 16.187-7.014-7.014L32 24.987 16.187 9.173l-7.014 7.014L24.987 32 9.173 47.813l7.014 7.014L32 39.013l15.813 15.814 7.014-7.014L39.013 32l15.814-15.813Z"></path>
          </svg>
        </div>
      </div>

      <h1 className="mt-6 mb-4 text-[#b1bad3] text-center">
        Are you sure you want to enable the max bet button?
      </h1>
      <div className="w-full flex items-center justify-center mb-6">
        <div
          onClick={() => {
            setMaxBetEnable(true);
            setMaxBet(false);
          }}
          className="transition-all duration-300 ease-in-out transform active:scale-90 text-black bg-[#00e701] flex items-center justify-center px-4 py-2 rounded cursor-pointer text-lg font-semibold"
        >
          Enable
        </div>
      </div>
    </div>
  );
};

export default MaxBetModal;
