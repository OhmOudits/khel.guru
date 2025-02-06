import { useState } from "react";
import { TransactionType } from "./LeftSection";
import { FaCopy } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Security = () => {
  const [code] = useState("MU4SG6JKNZ3VUUBDISY47JENB4E6ILDOUXUI5ZBPB");

  const [twoFactorCode, setTwoFactorCode] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };
  return (
    <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
      <TransactionType type={"Security"} />
      <section className="max-w-[900px] w-full bg-gray-900 p-4 py-6 rounded-md">
        <div className="bg-gray-900 border rounded-md border-gray-700  flex items-center justify-center m-2">
          <div className="w-full  bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <div className="mb-3 border-b border-gray-500">
              <h2 className="text-lg font-semibold">Two Factor</h2>
              <p className="text-gray-400 text-sm mb-4 my-2 ">
                To keep your account extra secure, leave two-factor
                authentication enabled.
              </p>
            </div>

            {/* Secret Code */}
            <label className="text-sm text-gray-300">
              Copy this code to your authenticator app
            </label>
            <div className="flex items-center gap-2 mt-2 w-fit bg-gray-700 px-4 py-2 rounded-lg">
              <input
                type="text"
                value={code}
                readOnly
                className="bg-transparent text-white flex-1  outline-none"
              />
              <button
                onClick={handleCopy}
                className="text-gray-300 hover:text-white"
              >
                <FaCopy />
              </button>
            </div>

            <p className="text-sm mt-2 ml-2 ">Don't let anyone see this!</p>
            <div className="mt-4 w-fit p-1 rounded-lg ml-2 bg-white">
              <img
                src="data:image/png;base64,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"
                alt="QR Code"
                className="w-24 h-24 rounded-lg"
              />
            </div>

            {/* Two Factor Input */}
            <label className="block mt-4 text-sm">Two Factor Code *</label>
            <input
              type="text"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              placeholder="Enter your code"
              className=" bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none mt-2"
            />

            {/* Verify Button */}
            <div className="flex justify-end w-full pt-4 border-t border-gray-700 mt-5">
              <button className="mt-4 bg-ter w-fit  text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                <FcGoogle /> Re-verify with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Security;
