import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  googleAuth,
  telegramAuth,
  xAuth,
  instantRegister,
} from "../../store/slices/authSlice";
import { auth, googleProvider, twitterProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, credentials } = useSelector(
    (state) => state.auth
  );
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
  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleTabNavigation = (tab) => {
    navigate(`?tab=${tab}`, { replace: true });
  };

  const handleClose = () => {
    navigate(window.location.pathname, { replace: true });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await dispatch(
        googleAuth({
          googleId: user.uid,
          email: user.email,
        })
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Google auth error:", error);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
      const user = result.user;

      await dispatch(
        xAuth({
          xId: user.uid,
        })
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.error("Twitter auth error:", error);
    }
  };

  const handleTelgramClick = () => {
    if (window.Telegram?.Login?.auth) {
      window.Telegram.Login.auth(
        {
          bot_id: "7996647658",
          request_access: "write",
        },
        async (user) => {
          if (!user) return;

          try {
            await dispatch(
              telegramAuth({
                telegramId: user.id.toString(),
                first_name: user.first_name,
                auth_date: user.auth_date,
                hash: user.hash,
              })
            ).unwrap();

            navigate("/");
          } catch (error) {
            console.error("Telegram auth error:", error);
          }
        }
      );
    } else {
      console.error("Telegram widget not loaded yet");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!age || !terms) {
      alert("Please accept all required terms and conditions");
      return;
    }

    if (!usernameDetails || !email || !passwordDetails) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await dispatch(
        register({
          username: usernameDetails,
          email,
          password: passwordDetails,
        })
      ).unwrap();
      // Success is handled by the useEffect above
    } catch (err) {
      console.error("Registration error:", err);
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

  const handleInstantRegister = async () => {
    setInstantLoading(true);
    try {
      const result = await dispatch(instantRegister()).unwrap();
      setInstant(false);
      setDetails(true);
      setUsernameDetails(result.credentials.username);
      setPasswordDetails(result.credentials.password);
    } catch (error) {
      console.error("Instant registration error:", error);
    } finally {
      setInstantLoading(false);
    }
  };

  const copyCredentials = () => {
    const credentials = {
      username: usernameDetails,
      password: passwordDetails,
    };
    navigator.clipboard.writeText(JSON.stringify(credentials, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Telegram Login Widget setup
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "YOUR_BOT_NAME"); // Replace with your bot name
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    document.head.appendChild(script);

    // Telegram auth callback
    window.onTelegramAuth = (user) => {
      dispatch(
        telegramAuth({
          telegramId: user.id.toString(),
          username: user.username || `tg${user.id}`,
        })
      );
    };

    return () => {
      document.head.removeChild(script);
      delete window.onTelegramAuth;
    };
  }, [dispatch]);

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
            className="bg-primary w-[90%] max-w-[500px] rounded-lg px-6 py-8 animate-fadeUp"
          >
            <h1 className="text-textColor text-xl text-center font-semibold mb-6">
              Instant Registration
            </h1>
            <p className="text-textColor text-center mb-6">
              This will create a random username and strong password for you.
              Make sure to save them securely.
            </p>
            <div className="flex justify-center gap-4">
              {instantLoading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-inactive border-t-active rounded-full animate-spin"></div>
                  <p className="text-textColor">Creating your account...</p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleInstantRegister}
                    className="px-6 py-2.5 rounded-lg bg-active hover:bg-activeHover text-white font-semibold transition-colors"
                  >
                    Continue
                  </button>
                  <button
                    onClick={() => setInstant(false)}
                    className="px-6 py-2.5 rounded-lg bg-inactive hover:bg-activeHover text-white font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {details && (
        <div
          style={{ position: "fixed" }}
          className="w-full h-screen absolute top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary rounded-lg flex items-center justify-center flex-col w-[90%] max-w-[500px] px-6 py-8 animate-fadeUp relative"
          >
            <h1 className="text-textColor text-xl font-semibold mb-6">
              Your Account Credentials
            </h1>

            <div className="w-full bg-inactive rounded-lg p-4 mb-6">
              <pre className="text-white text-sm overflow-x-auto">
                {JSON.stringify(
                  {
                    username: usernameDetails,
                    password: passwordDetails,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={copyCredentials}
                className="px-6 py-2.5 rounded-lg bg-active hover:bg-activeHover text-white font-semibold transition-colors"
              >
                {isCopied ? "Copied!" : "Copy JSON"}
              </button>
              <button
                onClick={() => {
                  setDetails(false);
                  setClose(false);
                }}
                className="px-6 py-2.5 rounded-lg bg-inactive hover:bg-activeHover text-white font-semibold transition-colors"
              >
                Close
              </button>
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

                {error && (
                  <div className="error-message mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister}>
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
                        required
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
                        required
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
                          required
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
                      I have read and accept the Terms of Service, Privacy
                      Policy, Responsible Gambling Policy, and all associated
                      policies.*
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 bg-button rounded-xl flex items-center justify-center text-lg font-semibold ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {loading ? <LoadingComponent /> : "Play Now"}
                  </button>
                </form>
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

                  <div className="flex items-center w-full justify-between gap-3 mt-6 lg:flex-col max-sm:flex-col">
                    <button
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FaGoogle />
                        Google
                      </div>
                    </button>

                    {/* Telegram Login Widget Container */}
                    <button
                      onClick={handleTelgramClick}
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FaTelegram />
                        Telegram
                      </div>
                    </button>

                    <button
                      onClick={handleTwitterLogin}
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FaTwitter />
                        Twitter
                      </div>
                    </button>

                    <button
                      onClick={() => setInstant(!instant)}
                      className="flex items-center justify-center w-full bg-inactive hover:bg-activeHover py-2.5 rounded-xl cursor-pointer transition-colors"
                    >
                      {instantLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaBoltLightning />
                          Instant
                        </div>
                      )}
                    </button>
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
