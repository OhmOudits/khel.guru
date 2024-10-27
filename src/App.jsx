import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Header/Sidebar";
import LandingPage from "./components/MainFrame/LandingPage";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import { Routes, Route } from "react-router-dom";
import Frame from "./components/Frame/Frame";
import WheelPage from "./components/WheelGame/WheelPage";

function App() {
  const [sideOpen, setSideOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "login") {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }

    if (params.get("tab") === "register") {
      setShowRegister(true);
    } else {
      setShowRegister(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [location]);

  return (
    <>
      {loading && (
        <div className="text-white font-semibold flex items-center justify-center w-full h-screen">
          <h1>Preloader</h1>
        </div>
      )}

      {!loading && (
        <>
          {showLogin && (
            <>
              <Login />
            </>
          )}

          {showRegister && (
            <>
              <Register />
            </>
          )}

          <div className="w-full flex min-h-screen bg-primary">
            {/* Sidebar */}
            <Sidebar setSideOpen={setSideOpen} sideOpen={sideOpen} />

            {/* Header */}
            <div
              className={`bg-primary ${
                sideOpen ? "lg:pl-[220px]" : "lg:pl-[60px]"
              } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-1 w-full flex items-center justify-center`}
            >
              <div className="w-full max-w-[1200px] relative flex items-center justify-between">
                <Header />
                <div
                  className={`absolute max-lg:hidden ${
                    sideOpen
                      ? "bottom-[-0.40rem] left-[-0.95rem]"
                      : "bottom-[-0.75rem] left-[-0.65rem]"
                  }  rounded-2xl w-6 h-6 bg-primary`}
                ></div>
              </div>
            </div>

            {/* Main Frame */}
            <div
              className={`w-full ${
                sideOpen ? "ml-[210px]" : "ml-[68px]"
              } max-lg:ml-0 z-1 h-screen`}
            >
              <div className="mt-[72px]"></div>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/game" element={<Frame />} />
                <Route path="/game/wheel" element={<WheelPage />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
