import { FaVault } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export const coins = [
  { name: "Bitcoin", symbol: "BTC", icon: <FaBitcoin className="text-yellow-500 text-xl" />, balance: "0.00000000", usd: "$0.00" },
  { name: "Ethereum", symbol: "ETH", icon: "Ξ", balance: "2.34567890", usd: "$4,800.00" },
  { name: "Litecoin", symbol: "LTC", icon: "Ł", balance: "1.23456789", usd: "$250.00" },
  { name: "Ripple", symbol: "XRP", icon: "✕", balance: "500.67890000", usd: "$300.00" },
  { name: "Cardano", symbol: "ADA", icon: "A", balance: "1000.456789", usd: "$500.00" },
  { name: "Polkadot", symbol: "DOT", icon: "•", balance: "20.67890000", usd: "$150.00" },
  { name: "Binance Coin", symbol: "BNB", icon: "B", balance: "3.56789000", usd: "$1,200.00" },
  { name: "Dogecoin", symbol: "DOGE", icon: "Ð", balance: "20000.123456", usd: "$180.00" },
  { name: "Solana", symbol: "SOL", icon: "S", balance: "5.67890000", usd: "$700.00" },
  { name: "Chainlink", symbol: "LINK", icon: "🔗", balance: "10.23456789", usd: "$140.00" },
];


const Vault = () => {
  const navigate = useNavigate();

  // State for switches and selected currency
  const [activeTab, setActiveTab] = useState("deposit");
  const [selectedCoin, setSelectedCoin] = useState(coins[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

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
          <FaVault size={25} className="text-white mt-0.5" />
          <h1 className="text-lg font-semibold">Vault</h1>
        </div>
        {/** main  */}
        <div className="py-3 mx-auto   text-white rounded-lg shadow-lg">
          <div className="flex justify-between mb-4 bg-gray-800 p-2 rounded-full">
            <button
              className={`flex-1 p-2 rounded-full transition-all ${
                activeTab === "deposit" ? "bg-gray-700" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("deposit")}
            >
              Deposit
            </button>
            <button
              className={`flex-1 p-2 rounded-full transition-all ${
                activeTab === "withdraw" ? "bg-gray-700" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("withdraw")}
            >
              Withdraw
            </button>
          </div>

          <div className=" p-4 rounded-lg">
            <p className="mb-2 text-gray-400">Available Wallet Balance</p>
            <div className=" bg-gray-800 text-white rounded-lg relative">
              {/* Selected Coin (Click to Open Dropdown) */}
              <div
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center gap-2">
                  {selectedCoin.icon}
                  <span>
                    {selectedCoin.name} ({selectedCoin.symbol})
                  </span>
                </div>
                <div className="text-right">
                  <div>{selectedCoin.balance}</div>
                  <div className="text-gray-400">{selectedCoin.usd} USD</div>
                </div>
                <IoIosArrowDown className="text-xl text-gray-400 ml-2" />
              </div>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-full left-0 w-full bg-gray-900 rounded-lg mt-2 p-2 shadow-lg z-10">
                  {/* Search Bar */}
                  <input
                    type="text"
                    placeholder="Search Currencies"
                    className="w-full p-2 bg-gray-700 rounded-lg text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  {/* Coin List */}
                  <div className="max-h-60 overflow-y-auto mt-2">
                    {filteredCoins.length > 0 ? (
                      filteredCoins.map((coin) => (
                        <div
                          key={coin.symbol}
                          className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
                          onClick={() => {
                            setSelectedCoin(coin);
                            setIsOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {coin.icon}
                            <span>
                              {coin.name} ({coin.symbol})
                            </span>
                          </div>
                          <div className="text-right">
                            <div>{coin.balance}</div>
                            <div className="text-gray-400">{coin.usd} USD</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 p-2">
                        No results found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p className="mb-2 text-gray-400">Amount</p>
            <div className="flex items-center bg-gray-700 p-3 rounded-lg mb-4">
              <input
                type="text"
                className="bg-transparent flex-1 outline-none text-lg"
                placeholder="0.00000000"
              />
              {selectedCoin.icon}
            </div>

            <button className="w-full text-black font-semibold bg-button hover:bg-button-primary active:scale-[0.9]  p-3 rounded-lg   transition-all">
              {activeTab === "deposit"
                ? "Deposit from Wallet"
                : "Withdraw to Wallet"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex mt-5 items-center gap-2 max-md:flex-col">
          <p className="w-full text-zinc-400 text-center text-sm">
            Improve your account security with Two-Factor Authentication{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vault;
