import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  FaBell,
  FaChevronDown,
  FaSearch,
  FaSignOutAlt,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { TbAffiliate } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { useSelector } from "react-redux";
import { GiRolledCloth } from "react-icons/gi";
import React, { useEffect, useState, useRef } from "react";
import Bitcoin from "../../assets/Coins-svg/Bitcoin.jsx";
import { currencies } from "../../constants";
import { IoMdClose } from "react-icons/io";
import { FaVault } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const userList = [
  { id: 1, name: "Wallet", icon: FaWallet },
  { id: 2, name: "Vault", icon: FaVault },
  { id: 3, name: "Affiliate", icon: TbAffiliate },
  { id: 4, name: "Statistics", icon: SlGraph },
  { id: 5, name: "Transactions", icon: GrTransaction },
  { id: 6, name: "My Bets", icon: GiRolledCloth },
  { id: 7, name: "Settings", icon: IoSettings },
];

const Header = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dropdownRef2 = useRef(null);
  const dropdownRef3 = useRef(null);

  const user = useSelector((state) => state.auth?.user);
  const [search, setSearch] = useState("");
  const [sortedCurrencies, setSortedCurrencies] = useState(currencies);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfDropDownOpen, setIsProfDropDownOpen] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  useEffect(() => {});

  // Handle search filtering
  useEffect(() => {
    if (search === "") {
      setSortedCurrencies(currencies);
    } else {
      const sorted = currencies.filter((c) =>
        c.name.includes(search.toUpperCase())
      );
      setSortedCurrencies(sorted);
    }
  }, [search]);

  // Close dropdown on outside click, excluding the search division
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("#searchbox")
      ) {
        setIsDropdownOpen(false);
      }

      if (dropdownRef2.current && !dropdownRef2.current.contains(e.target)) {
        setIsProfDropDownOpen(false); // Close the profile dropdown when clicking outside
      }

      if (dropdownRef3.current && !dropdownRef3.current.contains(e.target)) {
        setIsNotifications(false);
      }
    };

    if (isDropdownOpen || isProfDropDownOpen || isNotifications) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen, isProfDropDownOpen, isNotifications]);

  return (
    <>
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-[100px] max-md:w-[60px] h-[60px] lg:ml-3"
        />
        <h1 className="text-lg max-lg:hidden ml-[-20px] text-white font-semibold">
          Khel Guru
        </h1>
      </Link>

      {user ? (
        <>
          <div className="flex">
            <div
              className="flex relative px-3 py-1.5 bg-[#2a2a2a] rounded-tl rounded-bl cursor-pointer font-semibold items-center gap-2"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              ref={dropdownRef}
            >
              <div className="flex w-[120px] items-center justify-between text-lg gap-1.5">
                0.000 <Bitcoin />
              </div>
              <FaChevronDown />

              {isDropdownOpen && (
                <>
                  <div className="absolute top-[120%] left-1/2 bg-dropdown w-5 h-5 rotate-45"></div>
                  <div className="absolute top-[125%] w-[260px] rounded -left-[12.5%] px-2 py-2 bg-dropdown z-20">
                    <div
                      id="searchbox"
                      onClick={(e) => e.stopPropagation()}
                      className="py-1.5 mx-1.5 px-2 flex items-center gap-2 my-1.5 border-2 border-gray-500 rounded-md text-black"
                      htmlFor="search"
                    >
                      <FaSearch className="text-gray-200" />
                      <input
                        type="text"
                        autoComplete="off"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        id="search"
                        className="w-full text-white bg-transparent outline-none border-none"
                        placeholder="Search"
                      />
                    </div>

                    <div className="flex gap-0 pt-0 pb-3 flex-col w-full max-h-[400px] overflow-y-auto">
                      {sortedCurrencies.length > 0 ? (
                        sortedCurrencies.map((c) => (
                          <div
                            key={c.id}
                            className="flex hover:bg-zinc-900 rounded py-1.5 px-3 w-full items-center justify-between text-zinc-200 font-semibold text-lg"
                          >
                            <h1>{c.value}</h1>
                            <h1>{c.name}</h1>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center justify-center h-[200px] text-gray-200 font-semibold">
                          No wallets found
                        </div>
                      )}
                    </div>

                    <div className="py-0.5 pt-2.5 mt-2 border-t border-zinc-400 w-full">
                      <div
                        onClick={() => handleTabNavigation("walletSettings")}
                        className="py-2 hover:bg-zinc-800 flex gap-2 items-center justify-center w-full"
                      >
                        <FaWallet />
                        <h1>Wallet Settings</h1>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div
              onClick={() => handleTabNavigation("wallet")}
              className="px-3 py-1.5 rounded-tr rounded-br transition active:scale-[0.92] bg-ter cursor-pointer"
            >
              <FaWallet className="mt-1" />
            </div>
          </div>
          <div className="flex max-md:gap-1 items-center">
            <div
              onClick={() => handleTabNavigation("search")}
              className="flex gap-2.5 max-md:hidden hover:bg-black px-4 py-2 cursor-pointer rounded items-center"
            >
              <FaSearch size={18} className="mt-0.5" />
              <span className="font-semibold">Search</span>
            </div>
            <div
              ref={dropdownRef2}
              onClick={() => setIsProfDropDownOpen((prev) => !prev)}
              className="px-2.5 py-2.5 relative hover:bg-black cursor-pointer rounded"
            >
              <FaUser size={20} className="mt-0.5 max-md:text-lg" />

              {isProfDropDownOpen && (
                <>
                  <div className="absolute top-[120%] left-0 bg-dropdown w-5 h-5 rotate-45"></div>
                  <div className="absolute top-[125%] w-[160px] rounded right-0 py-1 flex flex-col gap-0 bg-dropdown text-black z-20">
                    {userList.map((l) => {
                      return (
                        <div
                          className="flex text-zinc-300 hover:bg-zinc-800 text-[1.1rem] font-semibold items-center px-3 gap-2 py-2"
                          key={l.id}
                          onClick={() => {
                            if (l.name == "Transactions") {
                              navigate("/transactions/deposits");
                            } else if (l.name == "My Bets") {
                              navigate("/casino/my-bets");
                            } else if (l.name == "Settings") {
                              navigate("/settings/general");
                            } else {
                              handleTabNavigation(l.name.toLowerCase());
                            }
                          }}
                        >
                          {React.createElement(l.icon)}
                          {l.name}
                        </div>
                      );
                    })}
                    <div
                      onClick={() => handleTabNavigation("signout")}
                      className="flex text-zinc-300 hover:bg-zinc-800 text-[1.1rem] font-semibold items-center px-3 gap-2 py-2"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              ref={dropdownRef3}
              onClick={() => setIsNotifications((prev) => !prev)}
              className="px-2.5 relative py-2.5 max-md:hidden hover:bg-black cursor-pointer rounded"
            >
              <FaBell size={20} className="mt-0.5 max-md:text-lg" />
              {isNotifications && (
                <>
                  <div className="absolute top-[120%] bg-dropdown w-5 h-5 rotate-45"></div>
                  <div className="absolute top-[125%] w-[450px] max-md:w-[200px] rounded right-0 px-3 py-2 flex flex-col gap-0 bg-dropdown z-20">
                    <>
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 text-[1.2rem] font-semibold text-zinc-200">
                          <FaBell className="mt-0.5" />
                          Notifications
                        </div>
                        <IoMdClose className="text-xl font-semibold" />
                      </div>

                      <div className="h-fit max-h-[320px] overflow-y-auto">
                        <div className="h-[300px] flex items-center justify-center flex-col">
                          <h1 className="text-lg font-semibold">
                            No Notifications Available
                          </h1>
                          <h2 className="text-base mt-[-3px] font-semibold text-zinc-200">
                            Your interactions will be visible here
                          </h2>
                        </div>
                      </div>
                    </>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-stretch gap-1.5">
          <div className="max-md:hidden p-1 rounded-xl">
            <div
              onClick={() => handleTabNavigation("search")}
              className="py-2 px-3 w-full h-full flex items-center justify-center text-black cursor-pointer rounded-md bg-ter"
            >
              <FaSearch size={12} />
            </div>
          </div>
          <div className="p-1 text-[0.8rem] rounded-xl flex gap-1 text-white">
            <div
              className="cursor-pointer text-[0.88rem] login py-2 px-4 bg-ter flex text-black items-center justify-center rounded-md font-semibold"
              onClick={() => handleTabNavigation("login")}
            >
              Login
            </div>
            <div
              className="cursor-pointer text-[0.88rem] register py-2 px-4 rounded-md bg-ter text-black font-bold"
              onClick={() => handleTabNavigation("register")}
            >
              Register
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
