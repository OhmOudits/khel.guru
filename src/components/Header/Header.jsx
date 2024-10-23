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
        <img src={logo} alt="logo" />
        <h1 className="text-lg max-lg:hidden ml-[-20px] text-white font-semibold">
          Logo Name
        </h1>
      </Link>

      <div className="flex items-strech gap-3">
        <div className="max-md:hidden p-1 rounded-xl bg-secondry">
          <div className="py-2 px-3 w-full h-full flex items-center justify-center text-white hover:bg-terHover cursor-pointer rounded-xl bg-ter">
            <FaSearch />
          </div>
        </div>
        <div className="p-1 rounded-xl bg-secondry flex gap-2 text-white">
          <div
            className="cursor-pointer login p-2 px-5 bg-ter flex items-center justify-center hover:bg-terHover rounded-xl font-semibold"
            onClick={() => handleTabNavigation("login")} // Navigate to ?tab=login
          >
            Login
          </div>
          <div
            className="cursor-pointer register p-2 px-6 rounded-xl bg-button"
            onClick={() => handleTabNavigation("register")} // Navigate to ?tab=register
          >
            Register
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
