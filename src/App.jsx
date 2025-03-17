import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Header/Sidebar";
import LandingPage from "./components/MainFrame/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { Routes, Route } from "react-router-dom";
import Frame from "./components/Frame/Frame";

import WheelPage from "./components/Games/WheelGame/WheelPage";
import MinesPage from "./components/Games/MinesGame/Diamond";
import BalloonPage from "./components/Games/Parachute/Balloon";
import CrashPage from "./components/Games/CrashGame/Crash";
import PlinkoPage from "./components/Games/PlinkoGame/Plinko";
import LimboPage from "./components/Games/LimboGame/Limbo";
import KenoPage from "./components/Games/Keno/Keno";
import HiloPage from "./components/Games/Hilo/Hilo";
import BaccaratPage from "./components/Games/Baccarat/Baccarat";
import ScratchPage from "./components/Games/BallonScratch/BallonScratch";
import TowerPage from "./components/Games/tower/tower";
import TwistPage from "./components/Games/twist/Twist";
import RoulettePage from "./components/Games/roulette/roulette";
import PumpPage from "./components/Games/pump/pump";

import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SportsBet, Sports, SportsCricket, SportsFootball } from "./pages";
import Wallet from "./components/tabs/Wallet";
import Search from "./components/tabs/Search";
import WalletSettings from "./components/tabs/WalletSettings";
import Vault from "./components/tabs/Vault";
import DicePage from "./components/Games/DiceGame/Dice";
const socket = io("http://localhost:3000");

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlackjackGame from "./components/Games/Blackjack/Blackjack";
import StatisticsPop from "./components/tabs/Statistics";
import Deposits from "./pages/transactions/Deposits";
import BetArcheive from "./pages/transactions/BetArcheive";
import Others from "./pages/transactions/Others";
import Withdrawls from "./pages/transactions/Withdrawal";
import Mybets from "./pages/MyBets";
import General from "./pages/settings/General";
import Security from "./pages/settings/Security";
import Preferences from "./pages/settings/Prefernces";
import Api from "./pages/settings/Api";
import Sessions from "./pages/settings/Sessions";
import IgnoredUsers from "./pages/settings/IgnoredUsers";
import OtherSettings from "./pages/settings/Others";
import Verify from "./pages/settings/Verify";
import Signout from "./components/tabs/Signout";
import SlidePage from "./components/Games/Slide/Slide";
import SportsBetFootball from "./pages/SportBetFootball";
import SportsTennis from "./pages/SportsTennis";
import SportsBetTennis from "./pages/SportBetTennis";
import SportsBadminton from "./pages/SportsBadminton";
import SportsBetBadminton from "./pages/SportBetBadminton";

function App() {
  const user = useSelector((state) => state.auth?.user?.user);
  const [sideOpen, setSideOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showWalletSettings, setShowWalletSettings] = useState(false);
  const [ShowValut, setShowValut] = useState(false);
  const [Statistics, setStatistics] = useState(false);
  const [signout, setsignout] = useState(false);

  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setShowLogin(params.get("tab") === "login");
    setShowRegister(params.get("tab") === "register");
    setShowWallet(params.get("tab") === "wallet");
    setShowSearch(params.get("tab") === "search");
    setShowValut(params.get("tab") === "vault");
    setShowWalletSettings(params.get("tab") === "walletSettings");
    setStatistics(params.get("tab") === "statistics");
    setsignout(params.get("tab") == "signout");

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPage = params.get("redirect");

    if (redirectPage) {
      navigate(`/${redirectPage}`);
    }
  }, [location, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const storedEmail = user?.email;
    const storedToken = localStorage.getItem("jwtToken");

    if (storedEmail && storedToken) {
      socket.emit("userLoggedIn", { email: storedEmail, socketId: socket.id });
    }

    socket.on("userUpdate", (users) => {
      setLoggedInUsers(users);
    });

    socket.on("connect", () => {
      if (storedEmail && storedToken) {
        socket.emit("userLoggedIn", {
          email: storedEmail,
          socketId: socket.id,
        });
      }
    });

    return () => {
      socket.off("userUpdate");
      socket.off("connect");
    };
  }, [user?.email]);

  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    scrollToTop();
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="text-white font-semibold flex items-center justify-center w-full h-screen bg-primary">
          <h1>Preloader</h1>
        </div>
      )}

      {!loading && (
        <>
          {showLogin && <Login />}
          {showRegister && <Register />}
          {showWallet && <Wallet />}
          {showSearch && <Search />}
          {showWalletSettings && <WalletSettings />}
          {ShowValut && <Vault />}
          {Statistics && <StatisticsPop />}
          {signout && <Signout />}

          <div className="w-full flex min-h-screen bg-primary">
            <Sidebar setSideOpen={setSideOpen} sideOpen={sideOpen} />

            <div
              className={`bg-inactive ${
                sideOpen ? "lg:pl-[220px]" : "lg:pl-[60px]"
              } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-1 w-full flex items-center justify-center`}
            >
              <div className="w-full text-white max-w-[1200px] relative flex items-center justify-between">
                <Header />
                <div
                  className={`absolute max-lg:hidden ${
                    sideOpen
                      ? "bottom-[-0.40rem] left-[-0.95rem]"
                      : "bottom-[-0.75rem] left-[-0.95rem]"
                  } rounded-2xl w-6 h-6 bg-inactive`}
                ></div>
              </div>
            </div>

            <div
              className={`w-full ${
                sideOpen ? "ml-[210px]" : "ml-[68px]"
              } max-lg:ml-0 z-1 h-screen overflow-x-hidden`}
            >
              <div className="mt-[72px]"></div>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/game" element={<Frame />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/sports/cricket" element={<SportsCricket />} />
                <Route path="/sports/cricket/bet" element={<SportsBet />} />
                <Route path="/sports/football" element={<SportsFootball />} />
                <Route
                  path="/sports/football/bet"
                  element={<SportsBetFootball />}
                />
                <Route path="/sports/tennis" element={<SportsTennis />} />
                <Route
                  path="/sports/tennis/bet"
                  element={<SportsBetTennis />}
                />
                <Route path="/sports/badminton" element={<SportsBadminton />} />
                <Route
                  path="/sports/badminton/bet"
                  element={<SportsBetBadminton />}
                />
                <Route path="/game/wheel" element={<WheelPage />} />
                <Route path="/game/mines" element={<MinesPage />} />
                <Route path="/game/parachute" element={<BalloonPage />} />
                <Route path="/game/crash" element={<CrashPage />} />
                <Route path="/game/plinko" element={<PlinkoPage />} />
                <Route path="/game/limbo" element={<LimboPage />} />
                <Route path="/game/dice" element={<DicePage />} />
                <Route path="/game/keno" element={<KenoPage />} />
                <Route path="/game/hilo" element={<HiloPage />} />
                <Route path="/game/baccarat" element={<BaccaratPage />} />
                <Route path="/game/blackjack" element={<BlackjackGame />} />
                <Route path="/game/scratch" element={<ScratchPage />} />
                <Route path="/game/tower" element={<TowerPage />} />
                <Route path="/game/twist" element={<TwistPage />} />
                <Route path="/game/roulette" element={<RoulettePage />} />
                <Route path="/game/pump" element={<PumpPage />} />
                <Route path="/game/slide" element={<SlidePage />} />
                <Route path="/transactions/deposits" element={<Deposits />} />
                <Route
                  path="/transactions/withdrawls"
                  element={<Withdrawls />}
                />
                <Route
                  path="/transactions/bet-archeive"
                  element={<BetArcheive />}
                />
                <Route path="/transactions/other" element={<Others />} />
                <Route path="/casino/my-bets" element={<Mybets />} />
                <Route path="/settings/general" element={<General />} />
                <Route path="/settings/security" element={<Security />} />
                <Route path="/settings/preferences" element={<Preferences />} />
                <Route path="/settings/api" element={<Api />} />
                <Route path="/settings/sessions" element={<Sessions />} />
                <Route
                  path="/settings/ignored-users"
                  element={<IgnoredUsers />}
                />
                <Route path="/settings/verify" element={<Verify />} />
                <Route path="/settings/others" element={<OtherSettings />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </div>

            <Footer />
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
