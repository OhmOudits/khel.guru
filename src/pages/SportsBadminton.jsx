import { IoClose } from "react-icons/io5";
import { FaChevronLeft, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BadmintonHome from "../components/Sports/Badminton/BadmintonHome";

const SportsBadminton = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    setSearch("");
  };

  return (
    <div
      className="mt-1 max-lg:pb-[90px] text-white lg:rounded-lg bg-secondry py-2 px-6 max-md:px-3"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="my-6 flex items-center gap-3">
          <div
            onClick={() => {
              navigate("/sports");
            }}
            className="px-4 cursor-pointer hover:bg-activeHover rounded-sm py-3 bg-primary-1 text-base"
          >
            <FaChevronLeft className="text-base text-gray-400" />
          </div>
          <div>
            <h1 className="font-semibold rounded-sm text-gray-400 bg-primary px-5 py-2">
              Badminton
            </h1>
          </div>
        </div>
        <div className="my-6 relative flex w-full bg-primary outline-none rounded-full">
          <div className="pr-3 pl-5 flex items-center justify-center">
            <FaSearch />
          </div>
          <input
            placeholder="Search your event"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none py-2 bg-transparent"
          />
          {search !== "" && (
            <IoClose
              onClick={handleClear}
              className="text-xl cursor-pointer absolute top-1/4 right-4"
            />
          )}
        </div>

        <BadmintonHome />
      </div>
    </div>
  );
};

export default SportsBadminton;
