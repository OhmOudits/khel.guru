import { useState } from "react";
import { TransactionType } from "./LeftSection";
import { IoSettings } from "react-icons/io5";

const General = () => {
  const [email, setEmail] = useState("karthikjdagam81@gmail.com");
  const [phone, setPhone] = useState("");
  const countryCodes = [
    "+1 Virgin Islands (U.S.), Canada, United States of America",
  ];
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryCodes[0]
  );

  return (
    <>
      <main className="m p-6 max-w-[1200px] flex justify-between mx-auto text-white">
        <TransactionType type={"General"} />
        <section className="max-w-[900px] w-full bg-gray-900  p-4 py-6 rounded-md">
          <div className=" bg-gray-900 flex items-center justify-center  ">
            <div className="w-full ">
              {/* Email Section */}
              <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 border border-gray-700">
                <h2 className="text-lg font-semibold flex items-center gap-2 pb-5 border-b  border-gray-700 my-5 ">
                  Email{" "}
                  <span className="bg-green-600 text-sm p-2 rounded-full text-white flex items-center">
                    Verified
                  </span>
                </h2>
                <label className="text-sm text-gray-300" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="mt-2 w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                />
                <div className="flex justify-end w-full">
                  <button className="mt-4 bg-ter text-black px-4 py-2 rounded-lg w-fit">
                    Confirm Email
                  </button>
                </div>
              </div>

              {/* Phone Number Section */}
              <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-gray-700">
                <div className=" my-5 border-b border-gray-600">
                  <h2 className="text-lg font-semibold">Phone Number</h2>
                  <p className="text-gray-400 text-sm mb-4 mt-2">
                    We only service areas that are listed in the available
                    country code list.
                  </p>
                </div>
                <select
                  value={selectedCountryCode}
                  onChange={(e) => setSelectedCountryCode(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none mb-4"
                >
                  {countryCodes.map((code, index) => (
                    <option key={index} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                />
                <div className="flex justify-end w-full">
                  <button className="mt-4 bg-ter text-black px-4 py-2 rounded-lg w-fit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default General;
