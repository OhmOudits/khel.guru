import { FaSignOutAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Vault = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(window.location.pathname, { replace: true });
  };

  return (
    <div
      className="bg-[rgba(0,0,0,0.7)] cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[99] overflow-y-auto flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-primary cursor-default text-white rounded flex-col w-[90%] max-w-[540px] px-4 py-5 animate-fadeUp relative"
      >
        {/* Close Button */}
        <div
          onClick={handleClose}
          className="absolute cursor-pointer top-6 right-5"
        >
          <IoMdClose size={20} />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          {/* Dynamically rendering the icon */}
          <FaSignOutAlt />
          Sign Out
        </div>
        {/** main  */}
        <div className="py-3 mx-auto   text-white rounded-lg ">
          <div className="text-gray-300">Are you sure you want to end your session and log out?</div>
          <button className="w-full py-3 text-center bg-red-500 font-semibold text-white mt-5 " type="button">
            Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vault;
