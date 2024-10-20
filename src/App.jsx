import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
// import Frame from "./components/Frame/Frame";
import Header from "./components/Header/Header";
import Sidebar from "./components/Header/Sidebar";
import MainFrame from "./components/MainFrame/MainFrame";

function App() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="w-full flex min-h-screen bg-primary">
      {/* sidebar */}
      <>
        <Sidebar setSideOpen={setSideOpen} sideOpen={sideOpen} />
      </>

      {/* Header */}
      <div
        className={`bg-primary ${
          sideOpen ? "left-[230px]" : "left-[68px]"
        } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-2 flex items-center justify-between`}
      >
        <Header />
      </div>

      <div
        className={`w-full ${
          sideOpen ? "ml-[230px]" : "ml-[84px]"
        } max-lg:ml-0 z-1`}
      >
        <div className="mt-[72px]"></div>
        <MainFrame />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
