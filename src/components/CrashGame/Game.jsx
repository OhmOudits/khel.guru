import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../../styles/Crash.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Game = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [data, setData] = useState([{ time: 0, multiplier: 1.0 }]);
  const [time, setTime] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [isCrashed, setIsCrashed] = useState(false);
  const [xMax, setXMax] = useState(16);
  const [yMax, setYMax] = useState(3.0);

  useEffect(() => {
    if (countdown !== 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      startGame();
    }
  }, [countdown]);

  useEffect(() => {
    let interval;
    if (isPlaying && !isCrashed) {
      interval = setInterval(() => {
        setTime((prev) => prev + 0.1);
        setMultiplier(Math.exp(time / 18));

        if (Math.random() < 0.01) {
          setIsCrashed(true);
          setIsPlaying(false);
          setTimeout(() => {
            setCountdown(5);
            resetGame();
          }, 3000);
        }
      }, 100);
    } else if (!isPlaying && multiplier !== 1.0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, time, isCrashed, multiplier]);

  useEffect(() => {
    if (isPlaying) {
      setData((prevData) => [
        ...prevData,
        { time: time.toFixed(1), multiplier },
      ]);
    }
  }, [multiplier, time, isPlaying]);

  useEffect(() => {
    if (time > xMax) {
      setXMax(time + 1);
    }

    if (multiplier > yMax) {
      setYMax(multiplier);
    }
  }, [time, multiplier, yMax, xMax]);

  const startGame = () => {
    setXMax(16);
    setYMax(3.0);
    setIsPlaying(true);
    setIsCrashed(false);
  };

  const resetGame = () => {
    setMultiplier(1.0);
    setData([{ time: 0, multiplier: 1.0 }]);
    setTime(0);
    setIsCrashed(false);
  };

  const chartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label: "Multiplier",
        data: data.map((d) => d.multiplier),
        borderColor: isCrashed ? "gray" : "white",
        backgroundColor: isCrashed ? "gray" : "white",
        pointRadius: data.map((_, index) =>
          index === data.length - 1 ? 5 : 0
        ),
        borderWidth: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: xMax,
        title: {
          display: false,
        },
        ticks: { font: { size: 10 } },
      },
      y: {
        min: 1,
        max: yMax,
        title: {
          display: false,
        },
        ticks: { font: { size: 10 } },
      },
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="flex relative flex-col items-center justify-center w-full h-full bg-gray-900 text-white">
      <div className="w-full h-full max-lg:h-[450px] p-6 ">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div
        className={`absolute text-3xl flex items-center flex-col max-md:text-xl font-semibold ${
          countdown !== 0 ? "blink" : ""
        } ${isCrashed ? "zoom-in" : ""}`}
      >
        {isCrashed ? (
          <>
            <span className="text-red-500">{`${multiplier.toFixed(2)}x`}</span>
            <span>Crashed</span>
          </>
        ) : countdown !== 0 ? (
          <span>{countdown}</span>
        ) : (
          <span>{`${multiplier.toFixed(2)}x`}</span>
        )}
      </div>
    </div>
  );
};

export default Game;
