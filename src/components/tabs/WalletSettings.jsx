import { FaWallet } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { currencies } from "../../constants";

const WalletSettings = () => {
  const navigate = useNavigate();

  // State for switches and selected currency
  const [hideZeroBalances, setHideZeroBalances] = useState(true);
  const [displayCrypto, setDisplayCrypto] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

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
          <FaWallet className="text-zinc-400 mt-0.5" />
          <h1 className="text-lg font-semibold">Wallet Settings</h1>
        </div>

        {/* Hide Zero Balances */}
        <div className="flex justify-between items-center my-4">
          <div>
            <h2 className="font-medium text-lg">Hide zero balances</h2>
            <p className="text-sm text-zinc-400">
              Your zero balances wont appear in your wallet
            </p>
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideZeroBalances}
              onChange={() => setHideZeroBalances(!hideZeroBalances)}
              className="hidden"
            />
            <div
              className={`w-11 h-6 rounded-full p-1 cursor-pointer transition ${
                hideZeroBalances ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform ${
                  hideZeroBalances ? "translate-x-5" : "translate-x-0"
                } transition`}
              ></div>
            </div>
          </label>
        </div>

        {/* Display Crypto in Fiat */}
        <div className="flex justify-between items-center my-4">
          <div>
            <h2 className="font-medium text-lg">Display crypto in fiat</h2>
            <p className="text-sm text-zinc-400">
              All bets & transactions will be settled in the crypto equivalent
            </p>
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={displayCrypto}
              onChange={() => setDisplayCrypto(!displayCrypto)}
              className="hidden"
            />
            <div
              className={`w-11 h-6 rounded-full p-1 cursor-pointer transition ${
                displayCrypto ? "bg-green-500" : "bg-gray-600"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform ${
                  displayCrypto ? "translate-x-5" : "translate-x-0"
                } transition`}
              ></div>
            </div>
          </label>
        </div>

        {/* Currencies */}
        <div className="my-4 mt-6 grid grid-cols-3 gap-2">
          {currencies.map((currency) => (
            <label
              key={currency.id}
              className="flex items-center font-semibold cursor-pointer gap-2"
            >
              <input
                type="radio"
                name="currency"
                value={currency.name}
                checked={selectedCurrency === currency.name}
                onChange={() => setSelectedCurrency(currency.name)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                  selectedCurrency === currency.name
                    ? "bg-green-500 border-green-500"
                    : "border-zinc-400"
                }`}
              >
                {selectedCurrency === currency.name && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
              <span>{currency.name}</span>
              {/* <span className="text-sm">{currency.symbol}</span> */}
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="flex mt-5 items-center gap-2 max-md:flex-col">
          <p className="w-full text-zinc-400 text-left text-sm">
            Please note that these are currency approximations.
          </p>
          <button className="md:max-w-[100px] w-full py-1.5 rounded text-black font-semibold bg-button hover:bg-button-primary active:scale-[0.9] transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletSettings;
