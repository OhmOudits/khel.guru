import { FaStopwatch } from "react-icons/fa";
import Credits from "./Credits";
import { FaTicket } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import GamesLines from "./GamesLines";
import register from "../../assets/landing/register.jpg";

import casinobg from "../../assets/casinobg.png";
import sportsbg from "../../assets/sportsbg.png";

import { casino, originals } from "../../constants";
import List from "./List";

const MainFrame = () => {
  const navigate = useNavigate();

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  return (
    <div
      className="mt-1 max-lg:pb-[90px] text-white lg:rounded-lg bg-secondry py-2 px-6 max-md:px-3"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Sign In / Register */}
        <div className="py-3 max-md:mb-2 grid grid-cols-12 mb-[-10px] w-full bg-secondry rounded-xl">
          <div
            className="w-full max-md:min-h-[180px] min-h-[260px] rounded-tl-xl rounded-tr-xl md:rounded-tr-none md:rounded-bl-xl col-span-12 md:col-span-7 xl:col-span-8 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${register}")`,
            }}
          ></div>
          <div className="col-span-12 md:col-span-5 xl:col-span-4 px-5 py-3 bg-primary rounded-bl-xl rounded-br-xl md:rounded-bl-none md:rounded-tr-xl flex flex-col justify-center items-center">
            <h1 className="text-center text-4xl max-md:text-3xl xl:text-3xl font-bold ">
              Welcome To Reboot
            </h1>
            <h2 className="text-gray-300 font-semibold max-md:text-lg text-xl xl:text-lg text-center my-1 ">
              Hop In
            </h2>
            <div
              onClick={() => handleTabNavigation("register")}
              className="w-full cursor-pointer mx-3 flex items-center justify-center py-4 xl:py-2.5 max-md:py-2.5 mb-1 bg-button rounded-xl mt-2"
            >
              Register Now
            </div>
          </div>
        </div>

        <Link to="/">
          <Credits
            c={0}
            n={"Your Tickets"}
            titleSpan={`$100,000`}
            title={`Weekly Raffle`}
            t1={"Learn More"}
            t2Icon={FaStopwatch}
            icon={FaTicket}
            t2="4d 2h 45min"
          />
        </Link>

        {/* grids */}
        <div className="w-full grid grid-cols-2 gap-5">
          <div
            className="col-span-2 p-6 cursor-pointer bg-primary rounded-xl xl:col-span-1 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url('${casinobg}')`,
            }}
          >
            <Link to="/">
              <div className="mt-8 lg:mt-24 xl:mt-16">
                <h1 className="text-4xl max-md:text-2xl xl:text-2xl font-semibold">
                  Casino
                </h1>
                <h2 className="text-xl max-md:text-base xl:text-base font-semibold mt-1 max-md:mt-0">
                  Thousands of Games
                </h2>
              </div>
            </Link>
          </div>

          {/* Sports Betting */}
          <div
            className="col-span-2 cursor-pointer p-6 bg-primary xl:col-span-1 rounded-xl bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url('${sportsbg}')`,
            }}
          >
            <Link to="/">
              <div className="mt-8 lg:mt-24 xl:mt-16">
                <h1 className="text-4xl max-md:text-2xl xl:text-2xl font-semibold">
                  Sports Betting
                </h1>
                <h2 className="text-xl max-md:text-base xl:text-base font-semibold mt-1 max-md:mt-0">
                  Support Your Team
                </h2>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-4"></div>
        {/* Games */}
        <GamesLines games={originals} title="Originals" link="/" />
        <GamesLines games={originals} title="Originals" link="/" />

        <div className="mt-4">
          <List />
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
