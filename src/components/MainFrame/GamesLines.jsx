import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// eslint-disable-next-line
const GamesLines = ({ title, link, games }) => {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const moveLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const moveRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    handleScroll();
    scrollRef.current.addEventListener("scroll", handleScroll);
    return () => scrollRef.current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between mt-2 px-1 pb-2">
        <h1 className="text-3xl font-semibold max-md:text-2xl">{title}</h1>
        <div className="flex gap-2">
          <Link to={link}>
            <div className="px-4 py-2.5 max-md:py-1.5 rounded-xl hover:bg-activeHover bg-inactive">
              View All
            </div>
          </Link>
          <div className="flex gap-0.5 max-md:hidden">
            <div
              className={`px-4 cursor-pointer py-2.5 flex items-center justify-center rounded-tl-xl rounded-bl-xl ${
                canScrollLeft
                  ? "hover:bg-activeHover bg-inactive"
                  : "bg-inactive"
              }`}
              onClick={canScrollLeft ? moveLeft : null}
            >
              <FaChevronLeft />
            </div>
            <div
              className={`px-4 cursor-pointer py-2.5 flex items-center justify-center rounded-tr-xl rounded-br-xl ${
                canScrollRight
                  ? "hover:bg-activeHover bg-inactive"
                  : "bg-inactive"
              }`}
              onClick={canScrollRight ? moveRight : null}
            >
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Games Section */}
      <div
        ref={scrollRef}
        className="mb-2 mt-0.5 flex overflow-x-scroll"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {/* eslint-disable-next-line */}
        {games.map((g) => {
          return (
            <Link
              to={g.link}
              key={g.id}
              className="flex-none p-2 max-md:p-1 min-w-[33.33%] sm:min-w-[25%] xl:min-w-[16.66%] 2xl:min-w-[14.28%]"
            >
              <div
                className="bg-primary cursor-pointer border-2 border-transparent hover:border-white rounded-xl aspect-[8/10] relative bg-bottom bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${g.img})` }}
              >
                {g.exclusive && (
                  <div className="absolute text-black text-sm max-md:hidden max-md:text-xs xl:text-xs font-bold top-[8px] left-[8px] px-2.5 py-1.5 rounded-lg bg-yellow-400">
                    Exclusive
                  </div>
                )}

                {g.new && (
                  <div className="absolute text-black text-sm max-md:hidden max-md:text-xs xl:text-xs font-bold top-[8px] left-[8px] px-2.5 py-1.5 rounded-lg bg-green-700">
                    New
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GamesLines;
