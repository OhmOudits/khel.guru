import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useModalState = () => {
  const [modals, setModals] = useState({
    login: false,
    register: false,
    wallet: false,
    search: false,
    walletSettings: false,
    vault: false,
    statistics: false,
    signout: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Update modal states based on URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const newModalState = {
      login: params.get("tab") === "login",
      register: params.get("tab") === "register",
      wallet: params.get("tab") === "wallet",
      search: params.get("tab") === "search",
      vault: params.get("tab") === "vault",
      walletSettings: params.get("tab") === "walletSettings",
      statistics: params.get("tab") === "statistics",
      signout: params.get("tab") === "signout",
    };

    setModals(newModalState);
  }, [location]);

  // Handle redirect parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPage = params.get("redirect");

    if (redirectPage) {
      navigate(`/${redirectPage}`);
    }
  }, [location, navigate]);

  const openModal = (modalName) => {
    navigate(`?tab=${modalName}`);
  };

  const closeModal = () => {
    navigate(location.pathname);
  };

  const isAnyModalOpen = () => {
    return Object.values(modals).some(Boolean);
  };

  return {
    modals,
    openModal,
    closeModal,
    isAnyModalOpen: isAnyModalOpen(),
  };
};
