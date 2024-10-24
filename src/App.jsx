import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Header/Sidebar";
import MainFrame from "./components/MainFrame/MainFrame";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

function App() {
  const [sideOpen, setSideOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log(params.get("tab"));
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
  }, [location]);

  return (
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
          } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-1 w-full flex items-center justify-center `}
        >
          <div
            className="w-full max-w-[1200px] flex items-center justify-between"
            style={{}}
          >
            <Header />
          </div>
        </div>

        {/* Main Frame */}
        <div
          className={`w-full ${
            sideOpen ? "ml-[210px]" : "ml-[68px]"
          } max-lg:ml-0 z-1`}
        >
          <div className="mt-[72px]"></div>
          <MainFrame />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
