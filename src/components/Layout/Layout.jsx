import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Header/Sidebar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="w-full flex min-h-screen bg-background-primary">
      {/* Sidebar */}
      <Sidebar setSideOpen={setSideOpen} sideOpen={sideOpen} />

      {/* Header */}
      <div
        className={`bg-background-surface ${
          sideOpen ? "lg:pl-[220px]" : "lg:pl-[60px]"
        } z-[12] fixed max-lg:left-0 right-0 px-6 max-md:px-2 py-1 w-full flex items-center justify-center`}
      >
        <div className="w-full text-text-primary max-w-[1200px] relative flex items-center justify-between">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full ${
          sideOpen ? "ml-[210px]" : "ml-[68px]"
        } max-lg:ml-0 z-1 h-screen overflow-x-hidden`}
      >
        <div className="mt-[72px]"></div>
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
