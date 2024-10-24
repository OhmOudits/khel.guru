import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  return (
    <>
      <Link to="/" className="flex items-center">
        <img src={logo} alt="logo" className="w-[100px] lg:ml-3" />
        <h1 className="text-lg max-lg:hidden ml-[-20px] text-white font-semibold">
          Logo Name
        </h1>
      </Link>

      <div className="flex items-strech gap-1.5">
        <div className="max-md:hidden p-1 rounded-xl bg-secondry">
          <div className="py-2 px-3 w-full h-full flex items-center justify-center text-white hover:bg-terHover cursor-pointer rounded-xl bg-ter">
            <FaSearch size={12} />
          </div>
        </div>
        <div className="p-1 text-[0.85rem] rounded-xl bg-secondry flex gap-1 text-white">
          <div
            className="cursor-pointer login py-2 px-4 bg-ter flex items-center justify-center hover:bg-terHover rounded-xl font-semibold"
            onClick={() => handleTabNavigation("login")}
          >
            Login
          </div>
          <div
            className="cursor-pointer register py-2 px-4 rounded-xl bg-button font-semibold"
            onClick={() => handleTabNavigation("register")}
          >
            Register
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
