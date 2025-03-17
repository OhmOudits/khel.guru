import { useState } from "react";
import { TransactionType } from "./LeftSection";
import { IoMdArrowForward } from "react-icons/io";
const Preferences = () => {
  const [switches, setSwitches] = useState({
    onlineStatus: false,
    hideStats: false,
    emailOffers: false,
  });

  const toggleSwitch = (key) => {
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Preferences"} />
      <section className="max-w-[900px] w-full bg-gray-900 p-4 py-6 rounded-md">
        <div className="rounded-md  text-gray-300 ">
          <div className=" mx-auto space-y-8 font-semibold ">
            {/* Privacy */}
            <section className="space-y-4 bg-gray-800 p-4  rounded-md border border-gray-700">
              <div className="pb-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Privacy</h2>
                <p className="text-sm mt-2 text-gray-400">
                  User privacy is one of the core values of Stake. These
                  settings allow you to be completely anonymous from the rest of
                  the players.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.Ghost}
                    onToggle={() => toggleSwitch("Ghost")}
                  />
                  <div className="">
                    <span>Enable Ghost Mode</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Your username will not appear in public bet feed and bet
                      preview
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.hideStats}
                    onToggle={() => toggleSwitch("hideStats")}
                  />
                  <div className="">
                    <span>Hide all your statistics</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Other users won't be able to view your wins, losses and
                      wagered statistics
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.race}
                    onToggle={() => toggleSwitch("race")}
                  />
                  <div className="">
                    <span>Hide all your race statistics</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Other users won't be able to view your race statistics
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-5 border-t border-gray-600">
                <div className="text-gray-500 text-sm">
                  Please allow up to 30 seconds for update to take effect.
                </div>
                <button className="bg-ter  text-black px-4 py-2 rounded-md text-sm">
                  Save
                </button>
              </div>
            </section>
            {/* Communitiy */}
            <section className="space-y-4 bg-gray-800 p-4  rounded-md border border-gray-700">
              <div className="pb-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Community</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.Ghost}
                    onToggle={() => toggleSwitch("Ghost")}
                  />
                  <div className="">
                    <span>Exclude from rain</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Prevents you from receiving a rain in chat
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-5 border-t border-gray-600">
                <div className="text-gray-500 text-sm">
                  Please allow up to 30 seconds for update to take effect.
                </div>
                <button className="bg-ter  text-black px-4 py-2 rounded-md text-sm">
                  Save
                </button>
              </div>
            </section>
            {/* Marketing */}
            <section className="space-y-4 bg-gray-800 p-4  rounded-md border border-gray-700">
              <div className="pb-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Marketing</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.email}
                    onToggle={() => toggleSwitch("email")}
                  />
                  <div className="">
                    <span>Receive email offers from us</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose if you wish to hear from us via email
                    </p>
                  </div>
                </div>
                <div className="flex items-center w-fit gap-x-5  justify-between">
                  <CustomSwitch
                    isOn={switches.SMS}
                    onToggle={() => toggleSwitch("SMS")}
                  />
                  <div className="">
                    <span>Receive SMS offers from us</span>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose if you wish to hear from us via SMS
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-5 border-t border-gray-600">
                <div className="text-gray-500 text-sm">
                  Please allow up to 30 seconds for update to take effect.
                </div>
                <button className="bg-ter  text-black px-4 py-2 rounded-md text-sm">
                  Save
                </button>
              </div>
            </section>
            {/* Fiat Number Formatting */}
            <section className="space-y-4 bg-gray-800 p-4  rounded-md border border-gray-700">
              <div className="pb-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">
                  Fiat Number Formatting
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-x-3">
                  <input
                    type="radio"
                    id="option1"
                    value="option1"
                    className="border scale-110rounded-full p-1 "
                  />
                  <label htmlFor="option1">123,456.78 </label>
                </div>
                <div className="flex gap-x-3">
                  <input
                    type="radio"
                    id="option1"
                    value="option1"
                    className="border scale-110rounded-full p-1 "
                  />
                  <label htmlFor="option1">١٢٣٤٥٦٫٧٨ </label>
                </div>
                <div className="flex gap-x-3">
                  <input
                    type="radio"
                    id="option1"
                    value="option1"
                    className="border scale-110rounded-full p-1 "
                  />
                  <label htmlFor="option1">123.456,78 </label>
                </div>
              </div>

              <div className="flex justify-between pt-5 border-t border-gray-600">
                <div className="text-gray-500 text-sm">
                </div>
                <button className="bg-ter  text-black px-4 py-2 rounded-md text-sm">
                  Save
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Preferences;

const CustomSwitch = ({ isOn, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
        isOn ? "bg-ter " : "bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
