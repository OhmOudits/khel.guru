import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTelegram,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { FaBoltLightning } from "react-icons/fa6";

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
  const [isCopied, setIsCopied] = useState(false);

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

  const discordLoginUrl = `https://discord.com/oauth2/authorize?client_id=1298314418748391454&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%3Ftab%3Dlogin&scope=identify+email`;

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

  const handleInstantRegister = () => {
    setInstantLoading(true);
    setTimeout(() => {
      setInstant(false);
      setDetails(true);
      setUsernameDetails("Yash210984");
      setPasswordDetails("i9uy78k90@12");
      setInstantLoading(false);
    }, 2000);
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
      {instant && (
        <div
          onClick={() => setInstant(false)}
          className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary w-[90%] max-w-[500px] rounded px-4 py-5 transform transition-transform duration-300 ease-in-out translate-y-0"
          >
            <h1 className="text-textColor text-xl text-center pt-2">
              Are you sure you want to create a random username and password
              using instant registration?
            </h1>
            <div className="mt-5 mb-2 flex items-center justify-around">
              {instantLoading ? (
                <div
                  role="status"
                  className="px-10 py-1.5 rounded bg-inactive hover:bg-activeHover cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
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
          onClick={() => setDetails(false)}
          className="w-full h-screen absolute rounded top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary rounded flex items-center justify-center flex-col w-[90%] max-w-[400px] px-4 py-5 transform transition-transform duration-300 ease-in-out translate-y-0 relative"
          >
            <h1 className="mt-1 font-semibold text-xl max-md:text-lg text-textColor">
              Username: {usernameDetails}
            </h1>
            <h1 className="mt-1 font-semibold text-xl max-md:text-lg text-textColor">
              Password: {passwordDetails}
            </h1>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Username: ${usernameDetails}, Password: ${passwordDetails}`
                  );
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="px-4 py-1 bg-inactive text-white rounded-md cursor-pointer hover:bg-activeHover"
              >
                {isCopied ? "Copied !" : "Copy"}
              </button>
              <button
                onClick={() =>
                  saveToFile(
                    `Username: ${usernameDetails}\nPassword: ${passwordDetails}`
                  )
                }
                className="px-4 py-1 bg-inactive text-white rounded-md cursor-pointer hover:bg-activeHover"
              >
                Save to File
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-primary w-full h-screen absolute top-0 left-0 z-[120] overflow-y-auto cus-scroll"
        style={{ position: "fixed" }}
      >
        <div className="flex bg-primary fixed top-0 left-0 right-0 items-center justify-between px-5 py-2.5">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-28" />
            <h1 className="text-lg max-lg:hidden ml-[-30px] text-white font-semibold">
              Logo Name
            </h1>
          </Link>

          <div
            className="flex cursor-pointer items-strech gap-3 text-white"
            onClick={handleClose}
          >
            <IoClose size={30} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div className="pt-[120px] col-span-1 xl:col-span-2 w-full flex items-center justify-center px-3 text-white">
            <div className="w-full lg:w-[75%]">
              <h1 className="font-bold text-3xl">Create your account</h1>
              <h2 className="pt-1 font-semibold text-lg">
                Already have an account?{" "}
                <span
                  onClick={() => handleTabNavigation("login")}
                  className="text-textColor hover:text-white hover:underline cursor-pointer"
                >
                  Login
                </span>
              </h2>

              <div className="mt-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="username"
                    className="text-textColor w-full font-semibold text-lg"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    className="px-3 py-3 rounded-lg bg-inactive font-semibold text-xl border-[3px] border-activeHover hover:border-active outline-none"
                    placeholder="Username"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label
                    htmlFor="email"
                    className="text-textColor w-full font-semibold text-lg"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="px-3 py-3 rounded-lg bg-inactive font-semibold text-xl border-[3px] border-activeHover hover:border-active outline-none"
                    placeholder="Email Address"
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <label
                    htmlFor="password"
                    className="text-textColor font-semibold text-lg"
                  >
                    Password
                  </label>
                  <div className="relative z-[-1] w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="px-3 w-full py-3 rounded-lg bg-inactive font-semibold text-xl border-[3px] border-activeHover hover:border-active outline-none"
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

              <div className="my-3 text-textColor font-semibold cursor-pointer">
                Password must be at least 7 characters
              </div>

              <div className="my-1 flex items-center gap-4">
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
                  Code (Optional)
                </label>
              </div>

              {code && (
                <div className="flex flex-col gap-2 mt-4">
                  <input
                    id="code"
                    type="text"
                    className="px-3 py-3 rounded-lg bg-inactive font-semibold text-xl border-[3px] border-activeHover hover:border-active outline-none"
                    placeholder="Code"
                  />
                </div>
              )}

              <div className="my-8 h-0.5 bg-inactive w-full"></div>

              <div className="my-1 flex items-center gap-4">
                <div className="flex items-center">
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
                  className="text-textColor font-semibold cursor-pointer bg-transparent"
                >
                  I confirm I am 18 years or older, located in a permitted
                  territory, and have no self-exclusions.*
                </label>
              </div>

              <div className="my-1 flex items-center gap-4 mb-8">
                <div className="flex items-center">
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
                  className="text-textColor mt-2 font-semibold cursor-pointer bg-transparent"
                >
                  I have read and accept the Terms of Service, Privacy Policy,
                  Responsible Gambling Policy, and all associated policies.*
                </label>
              </div>

              <div className="w-full mt-4 py-3.5 bg-button rounded-xl flex items-center justify-center text-lg font-semibold cursor-pointer">
                Play Now
              </div>

              <div className="mt-7 mb-2 flex items-center">
                <div className="w-full h-1 mt-1 bg-inactive"></div>
                <h1 className="middleText px-2 text-white font-semibold text-base text-center whitespace-nowrap">
                  Or continue with
                </h1>
                <div className="w-full h-1 mt-1 bg-inactive"></div>
              </div>
              <div className="flex items-center w-full justify-between gap-3 mt-6 max-sm:flex-col ">
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
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaBoltLightning />
                      Instant
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-24 mb-6 text-sm text-textColor w-full text-center">
                <p>
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-cover bg-center bg-no-repeat"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
