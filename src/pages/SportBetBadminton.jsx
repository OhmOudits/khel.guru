import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SportBet from "../components/Sports/SportBet";

const SportsBetBadminton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mt-1 max-lg:pb-[90px] text-white lg:rounded-lg bg-secondry py-2 px-6 max-md:px-3"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="my-6 overflow-x-auto flex items-center gap-3">
          <div
            onClick={() => {
              navigate("/sports");
            }}
            className="px-4 cursor-pointer hover:bg-activeHover rounded-sm py-3 bg-primary-1 text-base"
          >
            <FaChevronLeft className="text-base text-gray-400" />
          </div>
          <div className="cursor-pointer hover:bg-activeHover rounded-sm bg-primary-1 text-base">
            <h1
              className="font-semibold rounded-sm text-gray-400 px-5 py-2"
              onClick={() => {
                navigate("/sports/badminton");
              }}
            >
              Badminton
            </h1>
          </div>
          <div>
            <h1 className="font-semibold rounded-sm text-gray-400 bg-primary px-5 py-2">
              Fifa
            </h1>
          </div>
        </div>

        <SportBet />
        <SportBet />
        <SportBet />
        <SportBet />
        <SportBet />
        <SportBet />
        <SportBet />
        <SportBet />
      </div>
    </div>
  );
};

export default SportsBetBadminton;
