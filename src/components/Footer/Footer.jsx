import { FaCoins, FaSearch, FaBasketballBall } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import BigSideBar from "../Header/BigSideBar";
import { useState } from "react";
import { MdContactSupport } from "react-icons/md";

const Footer = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {openMenu && (
        <div className="w-full lg:hidden py-[100px] h-screen fixed top-0 left-0 bg-primary">
          <div className="px-6 h-full overflow-y-auto cus-scroll">
            <BigSideBar />
          </div>
        </div>
      )}

      <div
        className="absolute text-white z-40 bottom-0 left-0 right-0 lg:hidden w-full bg-inactive py-3 flex items-center justify-around"
        style={{ position: "fixed" }}
      >
        {/* item 1 */}
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex flex-col items-center cursor-pointer justify-center gap-2"
        >
          <GiHamburgerMenu
            size={20}
            className={openMenu ? "text-yellow-400" : "text-purple-300"}
          />
          <h1 className="text-xs font-semibold uppercase">Menu</h1>
        </div>

        {/* item 2 */}
        <Link
          to="/casino"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <div className="flex flex-col items-center cursor-pointer justify-center gap-2">
            <FaCoins
              size={20}
              className={
                location.pathname === "/casino"
                  ? "text-yellow-400"
                  : "text-purple-300"
              }
            />
            <h1 className="text-xs font-semibold uppercase">Casino</h1>
          </div>
        </Link>

        {/* item 3 */}
        <Link
          to="/search"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <div className="flex flex-col items-center cursor-pointer justify-center gap-2">
            <FaSearch
              className={
                location.pathname === "/search"
                  ? "text-yellow-400"
                  : "text-purple-300"
              }
              size={20}
            />
            <h1 className="text-xs font-semibold uppercase">Search</h1>
          </div>
        </Link>

        {/* item 4 */}
        <Link
          to="/sports"
          onClick={() => {
            setOpenMenu(false);
          }}
        >
          <div className="flex flex-col items-center cursor-pointer justify-center gap-2">
            <FaBasketballBall
              size={20}
              className={
                location.pathname === "/sports"
                  ? "text-yellow-400"
                  : "text-purple-300"
              }
            />
            <h1 className="text-xs font-semibold uppercase">Sports</h1>
          </div>
        </Link>

        {/* item 5 */}
        <Link
          to="/chat"
          onClick={() => {
            setOpenMenu(false);
          }}
          className="flex flex-col items-center cursor-pointer justify-center gap-2"
        >
          <MdContactSupport
            size={20}
            className={
              location.pathname === "/chat"
                ? "text-yellow-400"
                : "text-purple-300"
            }
          />
          <h1 className="text-xs font-semibold uppercase">Support</h1>
        </Link>
      </div>
    </>
  );
};

export default Footer;
