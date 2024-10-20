import { FaStopwatch } from "react-icons/fa";
import Credits from "./Credits";
import { FaTicket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import GamesLines from "./GamesLines";
import register from "../../assets/landing/register.jpg";

import { originals } from "../../constants";
import List from "./List";

const MainFrame = () => {
  return (
    <div
      className="mt-1 max-lg:pb-[90px] text-white lg:rounded-lg bg-secondry py-2 px-6 max-md:px-2"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Sign In / Register */}
        <div className="py-3 grid grid-cols-12 w-full bg-secondry rounded-xl ">
          <div
            className="w-full min-h-[320px] max-md:min-h-[240px] rounded-tl-xl rounded-bl-xl col-span-12 md:col-span-7 bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url("${register}")`,
            }}
          ></div>
          <div className="col-span-12 md:col-span-5 px-5 py-8 bg-primary rounded-tr-xl rounded-br-xl flex flex-col justify-center items-center">
            <h1 className="text-center text-4xl max-md:text-2xl font-bold ">
              Welcome To Reboot
            </h1>
            <h2 className="text-gray-300 font-semibold text-xl text-center my-3 ">
              Hop In
            </h2>
            <div className="w-full cursor-pointer mx-3 flex items-center justify-center py-4 bg-button rounded-xl mt-2">
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
          <div className="col-span-2 p-6 cursor-pointer bg-primary rounded-xl xl:col-span-1">
            <Link to="/">
              <div className="mt-20">
                <h1 className="text-4xl max-md:text-3xl font-semibold">
                  Casino
                </h1>
                <h2 className="text-xl max-md:text-lg font-semibold mt-1">
                  Thousands of Games
                </h2>
              </div>
            </Link>
          </div>

          {/* Sports Betting */}
          <div className="col-span-2 cursor-pointer p-6 bg-primary xl:col-span-1 rounded-xl">
            <Link to="/">
              <div className="mt-20">
                <h1 className="text-4xl max-md:text-3xl font-semibold">
                  Sports Betting
                </h1>
                <h2 className="text-xl max-md:text-lg font-semibold mt-1">
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

        <div className="mt-4 px-4">
          <List />
        </div>
      </div>
    </div>
  );
};

export default MainFrame;
