import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  FaBell,
  FaChevronDown,
  FaSearch,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import Bitcoin from "../../assets/Coins-svg/Bitcoin.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggediIn] = useState(true);
  const user = useSelector((state) => state.auth?.user?.user);

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  // eslint-disable-next-line
  const handleLogin = () => {
    setLoggediIn(true);
  };

  return (
    <>
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[100px] max-md:w-[60px] h-[60px] lg:ml-3"
        />
        <h1 className="text-lg max-lg:hidden ml-[-20px] text-white font-semibold">
          Logo Name
        </h1>
      </Link>

      {loggedIn && (
        <>
          <div className="flex">
            <div className="flex relative px-3 py-2 bg-inactive rounded-tl rounded-bl cursor-pointer hover:bg-secondry font-semibold items-center gap-2">
              <div className="flex items-center gap-1.5">
                0.00000000 <Bitcoin />
              </div>
              <FaChevronDown />

              <div className="absolute top-full"></div>
            </div>

            <div
              onClick={() => handleTabNavigation("wallet")}
              className="px-3 py-2 rounded-tr rounded-br transition  active:scale-[0.92] bg-button cursor-pointer hover:bg-button-primary"
            >
              <span className="max-md:hidden">Wallet</span>
              <FaWallet className="md:hidden mt-1" />
            </div>
          </div>
          <div className="flex max-md:gap-1 items-center">
            <div
              onClick={() => handleTabNavigation("search")}
              className="flex gap-2 max-md:hidden hover:bg-secondry px-4 py-2 cursor-pointer rounded items-center"
            >
              <FaSearch size={14} className="mt-0.5" />
              <span className="font-semibold">Search</span>
            </div>
            <div className="px-2.5 py-2.5 hover:bg-secondry cursor-pointer rounded">
              <FaUser className="mt-0.5 max-md:text-lg" />
            </div>
            <div className="px-2.5 py-2.5 hover:bg-secondry cursor-pointer rounded">
              <FaBell className="mt-0.5 max-md:text-lg" />
            </div>
          </div>
        </>
      )}

      {!loggedIn && (
        <div className="flex items-strech gap-1.5">
          <div className="max-md:hidden p-1 rounded-xl bg-secondry">
            <div className="py-2 px-3 w-full h-full flex items-center justify-center text-white hover:bg-terHover cursor-pointer rounded-xl bg-ter">
              <FaSearch size={12} />
            </div>
          </div>
          <div className="p-1 text-[0.8rem] rounded-xl bg-secondry flex gap-1 text-white">
            {user && (
              <div className="font-semibold px-2 py-1 text-2xl text-purple-600">
                {user.username}
              </div>
            )}
            {!user && (
              <>
                <div
                  className="cursor-pointer login py-2 px-4 bg-ter flex items-center justify-center hover:bg-terHover rounded-xl font-bold"
                  onClick={() => handleTabNavigation("login")}
                >
                  Login
                </div>
                <div
                  className="cursor-pointer register py-2 px-4 rounded-xl bg-button font-bold"
                  onClick={() => handleTabNavigation("register")}
                >
                  Register
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
