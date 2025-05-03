import { toast } from "react-toastify";
import store from "../store/store";

const useLoggedIn = () => {
  const state = store.getState();
  const user = state.auth.user;

  if (!user) {
    if (!toast.isActive("loginError")) {
      toast.error("Login To Play Games", { toastId: "loginError" });
    }

    return false;
  }

  return true;
};

export default useLoggedIn;
