import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTelegram,
} from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [code, setCode] = useState(false);
  const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [instant, setInstant] = useState(false);
  const [instantLoading, setInstantLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [usernameDetails, setUsernameDetails] = useState("");
  const [passwordDetails, setPasswordDetails] = useState("");
  const [email, setEmail] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(false);

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  const handleClose = () => {
    navigate(window.location.pathname, { replace: true });
  };

  const handleGoogleSuccess = (response) => {
    console.log("Google OAuth success:", response);
  };

  const handleGoogleFailure = (error) => {
    console.log("Google OAuth error:", error);
  };

  const telegramLoginUrl = "https://telegram.me/ohmouditsbot?start=login";
  const discordLoginUrl =
    "https://discord.com/oauth2/authorize?client_id=1298314418748391454&response_type=code&redirect_uri=https%3A%2F%2Flwframe.netlify.app%3Ftab%3Dregister&scope=identify+email";
  // const discordLoginUrl = `https://discord.com/oauth2/authorize?client_id=1298314418748391454&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%3Ftab%3Dlogin&scope=identify+email`;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      const data = {
        client_id: "1298314418748391454",
        client_secret: "CkroBO306p7eMTLn7iwNoJ8R_vEmyjo1",
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:5173?tab=login",
        scope: "identify email",
      };

      fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      })
        .then((response) => response.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;

          fetch("https://discord.com/api/users/@me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              console.log("User Details:", userData);
            })
            .catch((error) =>
              console.error("Error fetching user details:", error)
            );
        })
        .catch((error) =>
          console.error("Error exchanging code for token:", error)
        );
    }
  }, []);

  // const handleInstantRegister = () => {
  //   setInstantLoading(true);
  //   setTimeout(() => {
  //     setInstant(false);
  //     setDetails(true);
  //     setUsernameDetails("Yash210984");
  //     setPasswordDetails("i9uy78k90@12");
  //     setInstantLoading(false);
  //   }, 2000);
  // };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    console.log("register");

    try {
      const response = await axios.post(
        "https://lossers-world-backend.onrender.com/api/users",
        {
          email,
          username: usernameDetails,
          password: passwordDetails,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        alert("registration successful");
        navigate("/?tab=login"); // Redirect to login on success
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      console.log(err);
    }
  };

  const saveToFile = (data) => {
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "credentials.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {instant && !close && (
        <div
          style={{ position: "fixed" }}
          onClick={() => setInstant(false)}
          className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary w-[90%] max-w-[500px] rounded px-4 py-5 animate-fadeUp"
          >
            <h1 className="text-textColor text-xl text-center pt-2">
              Are you sure you want to create a random username and password
              using instant registration?
            </h1>
            <div className="mt-5 mb-2 flex items-center justify-around">
              {instantLoading ? (
                <LoadingComponent />
              ) : (
                <h1
                  onClick={handleInstantRegister}
                  className="px-10 py-1.5 rounded bg-inactive text-white cursor-pointer hover:bg-activeHover"
                >
                  Yes
                </h1>
              )}
              <h1
                onClick={() => setInstant(false)}
                className="px-10 py-1.5 rounded bg-inactive text-white"
              >
                No
              </h1>
            </div>
          </div>
        </div>
      )}

      {details && (
        <div
          style={{ position: "fixed" }}
          className="w-full h-screen absolute rounded top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary rounded flex items-center justify-center flex-col w-[90%] max-w-[400px] px-4 py-5 animate-fadeUp relative"
          >
            <h1 className="mt-1 font-semibold text-xl max-md:text-base text-textColor">
              Username: {usernameDetails}
            </h1>
            <h1 className="mt-1 font-semibold text-xl max-md:text-base text-textColor">
              Password: {passwordDetails}
            </h1>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Username: ${usernameDetails}, Password: ${passwordDetails}`
                  );
                  setIsCopied(true);
                  setClose(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="px-4 py-1 bg-inactive text-white rounded-md cursor-pointer hover:bg-activeHover"
              >
                {isCopied ? "Copied !" : "Copy"}
              </button>
              <button
                onClick={() => {
                  saveToFile(
                    `Username: ${usernameDetails}\nPassword: ${passwordDetails}`
                  );
                  setClose(true);
                }}
                className="px-4 py-1 bg-inactive text-white rounded-md cursor-pointer hover:bg-activeHover"
              >
                Save to File
              </button>
              {close && (
                <button
                  onClick={() => {
                    setDetails(false);
                    setClose(false);
                  }}
                  className="px-4 py-1 bg-inactive text-white rounded-md cursor-pointer hover:bg-activeHover"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-[rgba(0,0,0,0.7)]  cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[99] overflow-y-auto flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="flex absolute top-3 right-1 max-sm:right-0 cursor-pointer py-1 px-3 items-stretch gap-3 text-white"
          onClick={handleClose}
          style={{ position: "fixed" }}
        >
          <IoClose size={30} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="my-3 relative overflow-y-auto max-w-[1200px] max-h-[84vh] rounded-md bg-primary inset-0 z-[1000] w-[95%]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <div
            className="flex absolute top-5 right-4 cursor-pointer py-1 px-3 items-stretch gap-3 text-white"
            onClick={handleClose}
            style={{ position: "fixed" }}
          >
            <IoClose size={30} />
          </div> */}

          <div className="my-3">
            <div className="w-full h-full flex items-center max-lg:flex-col justify-center px-5 text-white">
              <div className="w-full">
                <h1 className="font-bold text-2xl">Create your account</h1>
                <h2 className="pt-1 font-semibold text-base">
                  Already have an account?{" "}
                  <span
                    onClick={() => handleTabNavigation("login")}
                    className="text-textColor hover:text-white hover:underline cursor-pointer"
                  >
                    Login
                  </span>
                </h2>

                <div className="mt-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="username"
                      className="text-textColor w-full font-semibold text-[0.88rem]"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      onChange={(e) => setUsernameDetails(e.target.value)}
                      className="px-3 py-2.5 rounded-lg bg-inactive font-semibold text-[0.9rem] border-[3px] border-activeHover hover:border-active outline-none"
                      placeholder="Username"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label
                      htmlFor="email"
                      className="text-textColor w-full font-semibold text-[0.88rem]"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="px-3 py-2.5 rounded-lg bg-inactive font-semibold text-[0.9rem] border-[3px] border-activeHover hover:border-active outline-none"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <label
                      htmlFor="password"
                      className="text-textColor font-semibold text-[0.88rem]"
                    >
                      Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        onChange={(e) => setPasswordDetails(e.target.value)}
                        className="px-3 w-full py-2.5 rounded-lg bg-inactive font-semibold text-[0.9rem] border-[3px] border-activeHover hover:border-active outline-none"
                        placeholder="Password"
                      />
                      <div
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <FaEyeSlash size={24} />
                        ) : (
                          <FaEye size={24} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 mb-3 text-textColor font-semibold cursor-pointer text-[0.9rem]">
                  Password must be at least 7 characters
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="checkkeys"
                      className="absolute left-0 opacity-0 z-[-1]"
                      checked={code}
                      onChange={() => setCode(!code)}
                    />
                    <span
                      className={`bg-inactive border border-solid border-input outline-0 w-6 h-6 flex-shrink-0 bg-center bg-no-repeat rounded cursor-pointer p-3`}
                      style={{
                        backgroundImage: `${
                          code
                            ? "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=')"
                            : ""
                        }`,
                      }}
                      onClick={() => setCode(!code)}
                    ></span>
                  </div>
                  <label
                    htmlFor="code"
                    onClick={() => setCode(!code)}
                    className="text-textColor font-semibold cursor-pointer bg-transparent"
                  >
                    Refferal Code (Optional)
                  </label>
                </div>

                {code && (
                  <div className="flex flex-col gap-2 mt-4 max-md:text-sm">
                    <input
                      id="code"
                      type="text"
                      className="px-3 py-3 rounded-lg bg-inactive font-semibold text-base border-[3px] border-activeHover hover:border-active outline-none"
                      placeholder="Refferal Code (optional)"
                    />
                  </div>
                )}

                <div className="my-4 h-0.5 bg-inactive w-full"></div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center max-md:text-sm">
                    <input
                      type="checkbox"
                      id="checkkeys"
                      className="absolute left-0 opacity-0 z-[-1]"
                      checked={age}
                      onChange={() => setAge(!age)}
                    />
                    <div
                      className={`bg-inactive border border-solid border-input outline-0 w-6 h-6 flex-shrink-0 bg-center bg-no-repeat rounded cursor-pointer p-3`}
                      style={{
                        backgroundImage: `${
                          age
                            ? "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=')"
                            : ""
                        }`,
                      }}
                      onClick={() => setAge(!age)}
                    >
                      <span></span>
                    </div>
                  </div>
                  <label
                    onClick={() => setAge(!age)}
                    className="text-textColor max-md:text-sm font-semibold cursor-pointer bg-transparent"
                  >
                    I confirm I am 18 years or older, located in a permitted
                    territory, and have no self-exclusions.*
                  </label>
                </div>

                <div className="flex my-1 items-center gap-4 mb-4">
                  <div className="flex items-center max-md:text-sm">
                    <input
                      type="checkbox"
                      id="checkkeys"
                      className="absolute left-0 opacity-0 z-[-1]"
                      checked={terms}
                      onChange={() => setTerms(!terms)}
                    />
                    <span
                      className={`bg-inactive border border-solid border-input outline-0 w-6 h-6 flex-shrink-0 bg-center bg-no-repeat rounded cursor-pointer p-3`}
                      style={{
                        backgroundImage: `${
                          terms
                            ? "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=')"
                            : ""
                        }`,
                      }}
                      onClick={() => setTerms(!terms)}
                    ></span>
                  </div>
                  <label
                    onClick={() => setTerms(!terms)}
                    className="text-textColor max-md:text-sm mt-2 font-semibold cursor-pointer bg-transparent"
                  >
                    I have read and accept the Terms of Service, Privacy Policy,
                    Responsible Gambling Policy, and all associated policies.*
                  </label>
                </div>

                <div
                  type="submit"
                  className="w-full py-2 bg-button rounded-xl flex items-center justify-center text-lg font-semibold cursor-pointer"
                  onClick={handleRegister}
                >
                  Play Now
                </div>
              </div>

              <div className="flex w-[60%] lg:min-h-[500px] max-lg:w-full pl-6 max-lg:pl-0">
                <div className="max-lg:hidden max-lg:mt-[-100px] flex items-center pr-3 gap-8 justify-around flex-col relative w-[10px]">
                  <div className="h-[30%] w-1 bg-inactive mb-2"></div>
                  <h1 className="middleText px-4 text-white font-semibold text-base text-center whitespace-nowrap transform rotate-[270deg] bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent shadow-lg">
                    Or continue with
                  </h1>
                  <div className="h-[30%] w-1 bg-inactive mt-2"></div>
                </div>

                <div className="w-full flex items-center justify-center flex-col pl-3">
                  <div className="mt-5 lg:hidden mb-2 flex items-center">
                    <div className="w-full h-1 mt-1 bg-inactive"></div>
                    <h1 className="middleText px-2 text-white font-semibold text-base text-center whitespace-nowrap">
                      Or continue with
                    </h1>
                    <div className="w-full h-1 mt-1 bg-inactive"></div>
                  </div>

                  <div className="flex items-center w-full justify-between gap-3 mt-6 lg:flex-col max-sm:flex-col ">
                    <div className="flex items-center relative justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer">
                      <div className="w-full absolute top-0 left-0 z-[2] opacity-0">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleFailure}
                          render={(renderProps) => (
                            <div
                              onClick={renderProps.onClick}
                              className="flex items-center gap-2"
                            >
                              <FaGoogle />
                              Google
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <FaGoogle />
                        Google
                      </div>
                    </div>
                    <a
                      href={telegramLoginUrl}
                      target="_blank"
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FaTelegram />
                        Telegram
                      </div>
                    </a>
                    <a
                      href={discordLoginUrl}
                      target="_blank"
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FaDiscord />
                        Discord
                      </div>
                    </a>
                    <div
                      onClick={() => setInstant(!instant)}
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      {instantLoading ? (
                        <LoadingComponent />
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaBoltLightning />
                          Instant
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 max-lg:mt-6 mb-6 text-sm text-textColor w-full text-center">
                    <p>
                      This site is protected by reCAPTCHA and the Google Privacy
                      Policy and Terms of Service apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
