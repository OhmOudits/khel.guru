import React from "react";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Wallet from "../tabs/Wallet";
import Search from "../tabs/Search";
import WalletSettings from "../tabs/WalletSettings";
import Vault from "../tabs/Vault";
import StatisticsPop from "../tabs/Statistics";
import Signout from "../tabs/Signout";

const ModalContainer = ({ modals }) => {
  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />

      {/* Login Modal */}
      {modals.login && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Login />
        </div>
      )}

      {/* Register Modal */}
      {modals.register && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Register />
        </div>
      )}

      {/* Wallet Modal */}
      {modals.wallet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Wallet />
        </div>
      )}

      {/* Search Modal */}
      {modals.search && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Search />
        </div>
      )}

      {/* Wallet Settings Modal */}
      {modals.walletSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <WalletSettings />
        </div>
      )}

      {/* Vault Modal */}
      {modals.vault && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Vault />
        </div>
      )}

      {/* Statistics Modal */}
      {modals.statistics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <StatisticsPop />
        </div>
      )}

      {/* Signout Modal */}
      {modals.signout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Signout />
        </div>
      )}
    </>
  );
};

export default ModalContainer;
