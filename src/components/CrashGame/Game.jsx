import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "tailwindcss/tailwind.css";
import { motion, AnimatePresence } from "framer-motion";

const CustomModal = ({ showModal, closeModal, modalColor, modalMessage }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className={`relative p-6 rounded-lg shadow-lg text-center bg-${modalColor}-500`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">{modalMessage}</h2>
            <button
              onClick={closeModal}
              className="bg-white text-black font-bold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Game = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState([{ time: 0, multiplier: 1.0 }]);
  const [time, setTime] = useState(0);
  const [xMax, setXMax] = useState(12);
  const [yMax, setYMax] = useState(2.0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalColor, setModalColor] = useState("");

  const maxMultiplier = 5;
  const [crashPoint, setCrashPoint] = useState(
    Math.random() * (maxMultiplier - 1) + 1
  );

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => prev + 0.1);
        setMultiplier(Math.exp(time / 18));
      }, 100);
    } else if (!isPlaying && multiplier !== 1.0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, time, xMax, yMax]);

  useEffect(() => {
    let interval;
    if (!isCrashed) {
      interval = setInterval(() => {
        if (multiplier < crashPoint) {
          const newMultiplier = multiplier === 0 ? 0.1 : multiplier * 1.15;
          setMultiplier(newMultiplier);

          setData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: [
                  ...prevData.datasets[0].data,
                  { x: newMultiplier, y: Math.pow(newMultiplier, 2) },
                ],
              },
            ],
          }));
        } else {
          setIsCrashed(true);
          setShowModal(true);
          setModalMessage(
            `Oops! Crash point reached at ${crashPoint.toFixed(2)}`
          );
          setModalColor("red");

          setData((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                backgroundColor: "rgba(255, 0, 0, 0.3)",
              },
            ],
          }));

          document.body.style.background =
            "linear-gradient(to bottom, red 20%, black 80%)";
          clearInterval(interval);
        }
      }, 200);
    }

    return () => clearInterval(interval);
  }, [multiplier, isCrashed, crashPoint]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (isPlaying) {
      setData((prevData) => [...prevData, { time, multiplier }]);
    }
  }, [multiplier, time, isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 text-white">
      <div className="w-full h-full p-4">
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="time"
            type="number"
            domain={[0, xMax]}
            label={{
              value: "Time (s)",
              position: "insideBottomRight",
              offset: -10,
            }}
            // axisLine={false} // Hide X-axis line
            // tick={false} // Hide X-axis tick labels
          />
          <YAxis
            domain={[1, yMax]} // Dynamic Y-axis limit
            label={{ value: "Multiplier", angle: -90, position: "insideLeft" }}
            // axisLine={false} // Hide X-axis line
            // tick={false} // Hide X-axis tick labels
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="multiplier"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>

      <CustomModal
        showModal={showModal}
        closeModal={closeModal}
        modalColor={modalColor}
        modalMessage={modalMessage}
      />
    </div>
  );
};

export default Game;
