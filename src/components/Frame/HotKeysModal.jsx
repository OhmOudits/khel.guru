// eslint-disable-next-line
const HotKeysModal = ({ setHotkeys, hotkeysEnabled, setHotkeysEnabled }) => {
  const hotkeys = [
    { id: 1, name: "Make a bet", key: "space" },
    { id: 2, name: "Double bet amount", key: "s" },
    { id: 3, name: "Halve bet amount", key: "a" },
    { id: 4, name: "Zero bet amount", key: "d" },
    { id: 5, name: "Toggle Condition to win", key: "q" },
    { id: 6, name: "Lower the target", key: "w" },
    { id: 7, name: "Higher the target", key: "e" },
  ];

  const handleCheckboxClick = () => {
    setHotkeysEnabled(!hotkeysEnabled);
  };

  return (
    <>
      <div className="w-full px-4">
        {/* Header */}
        <div className="flex justify-between mb-4 items-center w-full">
          <div className="flex items-center gap-3">
            <svg fill="currentColor" viewBox="0 0 96 96" className="svg-icon">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M56.8 47.08a49.761 49.761 0 0 0-5.6 22.8v5H32.32a55.56 55.56 0 0 1 5-22.76A86.916 86.916 0 0 1 50.8 31h-28V16.36H72v7.76a133.838 133.838 0 0 0-15.2 22.96Zm26.4 16.24a30.56 30.56 0 0 0-6 13.04l-.6 3L60 76.32a38.12 38.12 0 0 1 13.36-22.28l-12-2.36 5.04-10.64L96 46.88l-.92 4.64a85.487 85.487 0 0 0-11.88 11.8Zm-58.52 9.32a30.08 30.08 0 0 1 0-14.36 79.675 79.675 0 0 1 5.8-15.84l-1.12-4.6L0 44.88v11.68l12-2.84a37.88 37.88 0 0 0-2.88 25.92l16.28-4-.72-3Z"
              ></path>
            </svg>
            <h1>Hotkeys</h1>
          </div>
          <div
            onClick={() => setHotkeys(false)}
            className="text-[rgba(177,186,211,1)] hover:text-white"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" className="svg-icon">
              <path d="m54.827 16.187-7.014-7.014L32 24.987 16.187 9.173l-7.014 7.014L24.987 32 9.173 47.813l7.014 7.014L32 39.013l15.813 15.814 7.014-7.014L39.013 32l15.814-15.813Z"></path>
            </svg>
          </div>
        </div>

        {/* Hotkeys List */}
        {hotkeys.map((key) => (
          <div
            className="flex items-center justify-between my-3 text-lg"
            key={key.id}
          >
            <h1 className="text-[#b1bad3]">{key.name}</h1>
            <h2 className="py-1 rounded px-4 shadow-md bg-[#2f4553] text-[#d5dceb]">
              {key.key}
            </h2>
          </div>
        ))}

        {/* Disclaimer */}
        <div className="my-4 w-full rounded border border-dashed border-[#b1bad3] text-[#b1bad3] bg-[#0f212e] p-3 flex gap-3 items-start">
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            className="svg-icon mt-[6px]"
          >
            <path d="M32 0C14.326 0 0 14.326 0 32s14.326 32 32 32 32-14.326 32-32S49.674 0 32 0Zm5.24 51.68H26.76v-21h10.48v21ZM32 24.56a6.12 6.12 0 1 1 6.12-6.12v.04a6.08 6.08 0 0 1-6.08 6.08h-.042H32Z"></path>
          </svg>
          <p>
            When the hotkeys are enabled, they will remain on for all games
            until disabled. Despite some games sharing similar key binds, its
            always advised to confirm what key interactions are set for each
            game.
          </p>
        </div>
      </div>

      {/* Hotkeys Enable/Disable Section */}
      <div className="w-full px-4 py-2 bg-[#0f212e] flex items-center justify-center">
        <div className="flex items-center gap-2 my-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="checkkeys"
              className="absolute left-0 opacity-0 z-[-1]"
              checked={hotkeysEnabled}
              onChange={handleCheckboxClick}
            />
            <span
              className={`bg-[#0f212e] border border-solid border-[#2f4553] outline-0 w-6 h-6 flex-shrink-0 bg-center bg-no-repeat rounded cursor-pointer `}
              style={{
                backgroundImage: `${
                  hotkeysEnabled
                    ? "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=')"
                    : ""
                }`,
              }}
              onClick={handleCheckboxClick}
            ></span>
          </div>
          <h1
            htmlFor="checkkeys"
            className="text-sm text-[#b1bad3] font-semibold cursor-pointer"
            onClick={handleCheckboxClick}
          >
            HotKeys Enabled
          </h1>
        </div>
      </div>
    </>
  );
};

export default HotKeysModal;
