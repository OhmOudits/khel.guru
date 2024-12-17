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
import DiamondPage from "./components/Games/DiamondGame/Diamond";
import BalloonPage from "./components/Games/BalloonPage/Balloon";
import CrashPage from "./components/Games/CrashGame/Crash";
import PlinkoPage from "./components/Games/PlinkoGame/Plinko";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SportsBet, Sports, SportsCricket, SportsFootball } from "./pages";
import Wallet from "./components/tabs/Wallet";
import Search from "./components/tabs/Search";
import WalletSettings from "./components/tabs/WalletSettings";
const socket = io("http://localhost:3000");

function App() {
  const user = useSelector((state) => state.auth?.user?.user);
  const [sideOpen, setSideOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showWalletSettings, setShowWalletSettings] = useState(false);
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
    setShowWalletSettings(params.get("tab") === "walletSettings");

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
    window.scrollTo(0, 0);
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

  return (
    <>
      {loading && (
        <div className="text-white font-semibold flex items-center justify-center w-full h-screen">
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

          <div className="w-full flex min-h-screen bg-primary">
            <Sidebar setSideOpen={setSideOpen} sideOpen={sideOpen} />

            <div
              className={`bg-primary ${
                sideOpen ? "lg:pl-[220px]" : "lg:pl-[60px]"
              } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-1 w-full flex items-center justify-center`}
            >
              <div className="w-full text-white max-w-[1200px] relative flex items-center justify-between">
                <Header />
                <div
                  className={`absolute max-lg:hidden ${
                    sideOpen
                      ? "bottom-[-0.40rem] left-[-0.95rem]"
                      : "bottom-[-0.75rem] left-[-0.65rem]"
                  } rounded-2xl w-6 h-6 bg-primary`}
                ></div>
              </div>
            </div>

            <div
              className={`w-full ${
                sideOpen ? "ml-[210px]" : "ml-[68px]"
              } max-lg:ml-0 z-1 h-screen`}
            >
              <div className="mt-[72px]"></div>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/game" element={<Frame />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/sports/cricket" element={<SportsCricket />} />
                <Route path="/sports/cricket/bet" element={<SportsBet />} />
                <Route path="/sports/football" element={<SportsFootball />} />
                <Route path="/game/wheel" element={<WheelPage />} />
                <Route path="/game/diamond" element={<DiamondPage />} />
                <Route path="/game/balloon" element={<BalloonPage />} />
                <Route path="/game/crash" element={<CrashPage />} />
                <Route path="/game/plinko" element={<PlinkoPage />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
