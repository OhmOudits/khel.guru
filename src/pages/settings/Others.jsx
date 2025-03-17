import { useState } from "react";
import { TransactionType } from "./LeftSection";

const OtherSettings = () => {
  const [welcomeCode, setwelcomeCode] = useState("");
  const [bonusCode, setbonusCode] = useState("");

  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Others"} />
      <section className="max-w-[900px] w-full bg-gray-900  p-4 py-6 rounded-md">
        <div className=" bg-gray-900 flex items-center justify-center  ">
          <div className="w-full ">
            {/* Email Section */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
              <div className=" my-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Welcome offer</h2>
                <p className="text-gray-400 text-sm mb-4 mt-2">
                  To claim your welcome offer, please enter your code within 24
                  hours of signing up.
                </p>
              </div>
              <label className="text-sm text-gray-300" htmlFor="email">
                Code
              </label>{" "}
              <br />
              <input
                type="email"
                value={welcomeCode}
                onChange={(e) => setwelcomeCode(e.target.value)}
                className="mt-1  bg-gray-900 border border-black text-white px-4 py-2 rounded-lg focus:outline-none"
              />
              <div className="flex justify-end w-full">
                <button className="mt-4 bg-ter text-black px-4 py-2 rounded-lg w-fit">
                  Submit
                </button>
              </div>
            </div>

            {/* Phone Number Section */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700">
              <div className=" my-5 border-b border-gray-600">
                <h2 className="text-lg font-semibold">Claim bonus drop</h2>
                <p className="text-gray-400 text-sm mb-4 mt-2">
                  Find bonus drop codes on our social media's such as x.com
                  (Twitter) & Telegram.
                </p>
              </div>
              <label className="text-sm text-gray-300" htmlFor="email">
                Code
              </label>{" "}
              <br />
              <input
                type="email"
                value={welcomeCode}
                onChange={(e) => setwelcomeCode(e.target.value)}
                className="mt-1 w- bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none"
              />
              <div className="flex justify-end w-full">
                <button className="mt-4 bg-ter text-black  border border-black px-4 py-2 rounded-lg w-fit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OtherSettings;
