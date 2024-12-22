import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// eslint-disable-next-line
const GamesLines = ({ title, link, icon, games, hoverEffect = false }) => {
  const scrollRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true,
  });

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft + clientWidth < scrollWidth,
      });
    }
  };

  const scrollByOffset = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    updateScrollState();

    const currentScrollRef = scrollRef.current;
    currentScrollRef.addEventListener("scroll", updateScrollState);

    return () =>
      currentScrollRef.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <div className="w-full flex flex-col mt-2">
      {/* Header Section */}
      <div className="flex items-center justify-between px-2 pb-2">
        <h1 className="text-2xl font-semibold flex items-center gap-1.5">
          {icon && <span className="text-2xl pt-0.5">{icon}</span>}
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {/* View All Link */}
          <Link to={link}>
            <div className="px-4 py-1.5 rounded-xl bg-inactive hover:bg-activeHover">
              View All
            </div>
          </Link>

          {/* Scroll Controls */}
          <div className="hidden md:flex gap-0.5">
            <button
              className={`px-3 py-2.5 rounded-tl-xl rounded-bl-xl flex items-center justify-center ${
                scrollState.canScrollLeft
                  ? "hover:bg-activeHover bg-inactive"
                  : "bg-inactive opacity-50 cursor-not-allowed"
              }`}
              onClick={() => scrollByOffset(-scrollRef.current.offsetWidth)}
              disabled={!scrollState.canScrollLeft}
            >
              <FaChevronLeft />
            </button>
            <button
              className={`px-3 py-1.5 rounded-tr-xl rounded-br-xl flex items-center justify-center ${
                scrollState.canScrollRight
                  ? "hover:bg-activeHover bg-inactive"
                  : "bg-inactive opacity-50 cursor-not-allowed"
              }`}
              onClick={() => scrollByOffset(scrollRef.current.offsetWidth)}
              disabled={!scrollState.canScrollRight}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Games Section */}
      <div
        ref={scrollRef}
        className="relative flex overflow-x-scroll mb-2 mt-0.5"
      >
        {/* Right Side Gradient Overlay */}
        {/* {scrollState.canScrollRight && (
          <div className="absolute z-10 top-0 right-0 h-full w-[15%] bg-gradient-to-l from-black/75 to-transparent pointer-events-none"></div>
        )} */}

        {/* Game Cards */}
        {/* eslint-disable-next-line */}
        {games.map((game) => (
          <Link
            to={game.link}
            key={game.id}
            className="flex-none p-2 min-w-[40%] sm:min-w-[25%] lg:min-w-[20%] xl:min-w-[15%] 2xl:min-w-[15%]"
          >
            <div
              className={`relative cursor-pointer border-2 border-transparent rounded-xl aspect-[8/10] bg-center bg-cover transition-transform duration-500 ${
                hoverEffect ? "hover:-translate-y-2" : ""
              }`}
              style={{
                backgroundImage: `url(${game.img})`,
                backgroundPosition: "fixed",
              }}
            >
              {/* Exclusive Badge */}
              {game.exclusive && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  Exclusive
                </span>
              )}

              {/* New Badge */}
              {game.new && (
                <span className="absolute top-2 left-2 bg-green-700 text-black text-xs font-bold px-2 py-1 rounded-lg">
                  New
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GamesLines;
