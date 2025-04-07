import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  googleAuth,
  xAuth,
  telegramAuth,
} from "../../store/slices/authSlice";
import LoadingComponent from "../LoadingComponent";
import { auth, googleProvider, twitterProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [restore, setRestore] = useState(false);
  const [sendingRestore, setSendingRestore] = useState(false);
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const currentPath = location.pathname;
      const params = new URLSearchParams(location.search);

      if (params.has("tab")) {
        params.delete("tab");
        const newSearch = params.toString();
        navigate(`${currentPath}${newSearch ? `?${newSearch}` : ""}`, {
          replace: true,
        });
      }
    }
  }, [isAuthenticated, location, navigate]);

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

      toast.success("User Logged In Successfully");
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

      toast.success("User Logged In Successfully");
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

            toast.success("User Logged In Successfully");
          } catch (error) {
            console.error("Telegram auth error:", error);
          }
        }
      );
    } else {
      console.error("Telegram widget not loaded yet");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("User Logged In Successfully");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      {forgotPassword && (
        <div
          onClick={() => setForgotPassword(false)}
          style={{ position: "fixed" }}
          className="w-full h-screen absolute rounded top-0 left-0 flex items-center justify-center z-[121] bg-[rgba(0,0,0,0.6)] transition-opacity duration-300 ease-in-out opacity-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary rounded w-[90%] max-w-[500px] text-white px-4 py-5 animate-fadeUp relative"
          >
            {!restore && (
              <h1 className="text-textColor text-center text-xl font-semibold mb-3">
                Forgot Password ?
              </h1>
            )}
            <div className="flex flex-col gap-2">
              {!restore && (
                <input
                  id="femail"
                  disabled={restore}
                  className="px-3 w-full py-1.5 mt-1 rounded-md bg-inactive text-lg border-[3px] border-activeHover hover:border-active outline-none"
                  placeholder="Enter your Email Address"
                />
              )}
              {!restore && (
                <button
                  onClick={() => {
                    setSendingRestore(true);
                    setTimeout(() => {
                      setSendingRestore(false);
                      setRestore(true);
                    }, 1000);
                  }}
                  className="mt-2 bg-inactive hover:bg-activeHover py-2 rounded-md"
                >
                  {sendingRestore ? <LoadingComponent /> : "Restore Password"}
                </button>
              )}

              {restore && (
                <h1 className="text-textColor text-xl py-1 mt-1 text-center font-semibold">
                  Recovery url to reset password is sent to email. Change the
                  password using it.
                </h1>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className="bg-[rgba(0,0,0,0.7)] cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[120] overflow-y-auto flex items-center justify-center"
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
          className="my-3 relative overflow-y-auto max-w-[600px] max-h-[84vh] rounded-md bg-primary inset-0 z-[1000] w-[95%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="my-6">
            <div className="w-full flex items-center justify-center px-3 text-white">
              <div className="w-full lg:w-[85%]">
                <h1 className="font-bold text-3xl max-md:text-2xl">
                  Login to your account
                </h1>
                <h2 className="pt-1 font-semibold text-lg max-md:text-base">
                  Don't have an account?{" "}
                  <span
                    onClick={() => handleTabNavigation("register")}
                    className="text-textColor hover:text-white hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </h2>

                {error && (
                  <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="mt-8">
                    <div className="flex flex-col gap-2 mt-4">
                      <label
                        htmlFor="username"
                        className="text-textColor w-full font-semibold text-lg max-md:text-base"
                      >
                        Username or Email
                      </label>
                      <input
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-3 rounded-lg bg-inactive font-semibold text-xl max-md:text-base border-[3px] border-activeHover hover:border-active outline-none"
                        placeholder="Username or Email"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <label
                        htmlFor="password"
                        className="text-textColor font-semibold text-lg max-md:text-base"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="px-3 py-3 rounded-lg w-full bg-inactive font-semibold text-xl max-md:text-base border-[3px] border-activeHover hover:border-active outline-none"
                          placeholder="Password"
                        />
                        <span
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-lg"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" className="h-5 w-5" />
                      <label className="text-textColor font-semibold max-md:text-base">
                        Remember me
                      </label>
                    </div>
                    <h2
                      onClick={() => setForgotPassword(true)}
                      className="text-textColor cursor-pointer hover:underline"
                    >
                      Forgot Password?
                    </h2>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-inactive hover:bg-activeHover text-xl py-2 rounded-lg mt-5"
                  >
                    {loading ? <LoadingComponent /> : "Play Now"}
                  </button>
                </form>

                <h2 className="text-center font-semibold mt-4">
                  or continue with
                </h2>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 bg-inactive hover:bg-activeHover px-4 py-2 rounded-lg"
                  >
                    <FaGoogle />
                    Google
                  </button>

                  <a
                    onClick={handleTelgramClick}
                    className="flex items-center gap-2 bg-inactive hover:bg-activeHover px-4 py-2 rounded-lg cursor-pointer"
                  >
                    <FaTelegram />
                    Telegram
                  </a>

                  <button
                    onClick={handleTwitterLogin}
                    className="flex items-center gap-2 bg-inactive hover:bg-activeHover px-4 py-2 rounded-lg"
                  >
                    <FaTwitter />
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
