import React, { useState } from "react";
import apiService from "../../config/api";
import LoadingSpinner from "../LoadingSpinner";

const SetupWalletModal = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSetup = async (e) => {
    e.preventDefault();
    if (Number(amount) <= 0) {
      setError("Initial deposit must be greater than zero.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await apiService.post("/wallet/deposit", {
        amount: Number(amount),
      });
      setLoading(false);
      setAmount("");
      onSuccess(res.data.balance);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Wallet setup failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-background-secondary rounded-xl p-8 w-full max-w-sm shadow-lg relative transform transition-all duration-300 scale-95 animate-scale-in">
        <button
          className="absolute top-4 right-4 text-2xl text-text-tertiary hover:text-text-primary"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2 text-text-primary text-center">
          Setup Your Wallet
        </h2>
        <p className="text-center text-text-tertiary mb-6">
          Make your first deposit to get started.
        </p>
        <form onSubmit={handleSetup} className="flex flex-col gap-4">
          <input
            type="number"
            min="1"
            className="p-3 rounded-lg bg-background-surface border-2 border-border-primary text-text-primary focus:border-interactive-primary outline-none transition-colors"
            placeholder="Enter initial deposit amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />
          {error && (
            <div className="text-interactive-error text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="bg-interactive-primary hover:bg-interactive-primaryHover text-white font-bold py-3 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50"
            disabled={loading || !amount}
          >
            {loading ? (
              <LoadingSpinner size="sm" showText={false} />
            ) : (
              "Create & Deposit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupWalletModal;
