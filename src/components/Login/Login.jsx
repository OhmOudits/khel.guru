import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  FaDiscord,
  FaEye,
  FaEyeSlash,
  FaTelegram
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, signInFailure, signInStart } from "../../store/authSlice";
import LoadingComponent from "../LoadingComponent";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [restore, setRestore] = useState(false);
  const [sendingRestore, setSendingRestore] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

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
    "https://discord.com/oauth2/authorize?client_id=1298314418748391454&response_type=code&redirect_uri=https%3A%2F%2Flwframe.netlify.app%3Ftab%3Dlogin&scope=identify+email";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    dispatch(signInStart());
    try {
      const response = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });
      // Store JWT token in local storage
      localStorage.setItem("jwtToken", response.data.token);
      
      // Dispatch fetchUserProfile to load user data after login
      dispatch(fetchUserProfile());
  
      // Redirect or reload page after successful login and profile fetch
      console.log("Login successful", response.data);
      navigate("/")
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "Login failed"));
      console.error("Login error:", error);
    }
  };

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
                        {showPassword ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      className="h-5 w-5"
                    />
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
                  onClick={handleLogin}
                  className="w-full bg-inactive hover:bg-activeHover text-xl py-2 rounded-lg mt-5"
                >
                  {loading ? <LoadingComponent /> : "Play Now"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                <h2 className="text-center font-semibold mt-4">
                  or continue with
                </h2>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                  />
                  <a href={telegramLoginUrl}>
                    <FaTelegram className="text-2xl text-[#3B5998]" />
                  </a>
                  <a href={discordLoginUrl}>
                    <FaDiscord className="text-2xl text-[#3B5998]" />
                  </a>
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
