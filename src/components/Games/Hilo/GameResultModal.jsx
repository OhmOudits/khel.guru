import React from "react";
import { motion } from "framer-motion";

export const GameResultModal = ({ isOpen, onClose, profit, isGameOver }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          {isGameOver ? "Game Over!" : "Congratulations!"}
        </h2>
        <div className="mb-6">
          {isGameOver ? (
            <p className="text-red-500 text-xl">Better luck next time!</p>
          ) : (
            <p className="text-green-500 text-xl">You won {profit} BTC!</p>
          )}
        </div>
        <div className="flex gap-4 justify-center">
          <motion.button
            className="px-6 py-3 text-lg bg-button-primary text-black rounded-md font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            {isGameOver ? "Try Again" : "Play Again"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export const ActiveGameModal = ({
  isOpen,
  onClose,
  onContinue,
  onCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50">
      <motion.div
        className="p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">
          Active Game Found
        </h2>
        <p className="text-gray-300 text-lg mb-6">
          You have an active game in progress. Would you like to continue or
          checkout?
        </p>
        <div className="flex gap-4 justify-center">
          <motion.button
            className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
          >
            Continue Game
          </motion.button>
          <motion.button
            className="px-6 py-3 text-lg bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCheckout}
          >
            Checkout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default GameResultModal;
