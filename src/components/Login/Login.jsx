import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaDiscord,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaTelegram,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    <div
      className="bg-[rgba(0,0,0,0.7)]  cursor-pointer backdrop-blur-sm w-full h-screen fixed top-0 left-0 z-[120] overflow-y-auto flex items-center justify-center"
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
        {/* <div
          className="flex absolute top-3 right-3 cursor-pointer py-1 px-3 items-stretch gap-3 text-white"
          onClick={handleClose}
          style={{ position: "fixed" }}
        >
          <IoClose size={30} />
        </div> */}

        <div className="my-6">
          <div className="w-full flex items-center justify-center px-3 text-white">
            <div className="w-full lg:w-[85%]">
              <h1 className="font-bold text-3xl max-md:text-2xl">
                Login to your account
              </h1>
              <h2 className="pt-1 font-semibold text-lg max-md:text-base">
                Dont have an account?{" "}
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
                  <div className="relative z-[-1] w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="px-3 w-full py-3 rounded-lg bg-inactive font-semibold text-xl max-md:text-base border-[3px] border-activeHover hover:border-active outline-none"
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
              <div className="my-3 text-textColor font-semibold hover:text-white hover:underline cursor-pointer">
                Forgot Password?
              </div>
              <div className="w-full py-3.5 bg-button rounded-xl flex items-center justify-center text-lg font-semibold cursor-pointer">
                Play Now
              </div>
              <div className="mt-7 mb-2 flex items-center">
                <div className="w-full h-1 mt-1 bg-inactive"></div>
                <h1 className="middleText px-2 text-white font-semibold text-base text-center whitespace-nowrap">
                  Or continue with
                </h1>
                <div className="w-full h-1 mt-1 bg-inactive"></div>
              </div>
              <div className="flex items-center w-full justify-between gap-3 mt-6">
                {/* Google login button */}
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
                {/* Telegram login button */}
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
              </div>
              <div className="mt-12 text-sm text-textColor w-full text-center">
                <p>
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
