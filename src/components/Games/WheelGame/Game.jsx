/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { segments } from "../../../constants";
import {
  disconnectWheelSocket,
  getWheelSocket,
} from "../../../socket/games/wheel";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const Game = ({
  risk,
  segment,
  targetIndex,
  betStarted,
  setBetStarted,
  autoStart,
  nbets,
  setAutoStart,
}) => {
  const [riskSegment, setRiskSegment] = useState(null);
  const [selectedSegmentData, setSelectedSegmentData] = useState(null);
  const [segmentColors, setSegmentColors] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinCount = useRef(0);

  const radius = 100;

  useEffect(() => {
    const wheelSocket = getWheelSocket();

    if (wheelSocket) {
      wheelSocket.on("error", ({ message }) => {
        console.error("Join game error:", message);
        toast.error(`Error joining game: ${message}`);
      });
    }

    return () => {
      const wheelSocket = getWheelSocket();
      if (wheelSocket) {
        wheelSocket.off("error");
      }
      disconnectWheelSocket();
    };
  }, []);

  useEffect(() => {
    const foundSegment = segments.find((s) => s.risk === risk);
    setRiskSegment(foundSegment);
  }, [risk]);

  useEffect(() => {
    if (riskSegment) {
      const foundSegmentData = riskSegment.segment.find(
        (s) => s.segments == segment
      );
      setSelectedSegmentData(foundSegmentData);
    }
  }, [riskSegment, segment]);

  useEffect(() => {
    if (selectedSegmentData) {
      const colors = [];
      selectedSegmentData.list.forEach((item) => {
        colors.push(selectedSegmentData.colors[item]);
      });
      setSegmentColors(colors);
    }
  }, [selectedSegmentData]);

  useEffect(() => {
    if (betStarted) {
      const wheelSocket = getWheelSocket();
      if (wheelSocket) {
        wheelSocket.emit("add_game", {});
        console.log("Emitted add_game event");
      } else {
        console.error("Wheel socket not initialized");
        toast.error("Failed to join game: Socket not connected");
        return;
      }

      spinWheel();
    }
  }, [betStarted, targetIndex]);

  useEffect(() => {
    if (!spinning) {
      setBetStarted(false);
    }
  }, [spinning]);

  const totalSegments = segmentColors.length;

  const calculateArcPath = (index, total, radius) => {
    const angle = (index / total) * 2 * Math.PI;
    const nextAngle = ((index + 1) / total) * 2 * Math.PI;
    const largeArc = nextAngle - angle > Math.PI ? 1 : 0;

    const startX = radius * Math.cos(angle);
    const startY = radius * Math.sin(angle);
    const endX = radius * Math.cos(nextAngle);
    const endY = radius * Math.sin(nextAngle);

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} L 0 0 Z`;
  };

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    let extraspin;
    if (segment % 20 === 0) {
      extraspin = 5;
    } else {
      extraspin = 0;
    }

    const heavySpins = 5 * 360;
    const segmentAngle = 360 / totalSegments;
    const targetAngle = targetIndex * segmentAngle;
    const finalRotation = rotation + heavySpins + targetAngle + 0;

    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 4000);
  };

  useEffect(() => {
    if (autoStart && nbets > 0) {
      const performSpin = () => {
        if (spinCount.current < nbets) {
          setBetStarted(true);
          spinCount.current += 1;
        } else {
          clearInterval(interval);
          setAutoStart(false);
          spinCount.current = 0;
        }
      };

      performSpin();

      const interval = setInterval(() => {
        performSpin();
      }, 4700);

      return () => clearInterval(interval);
    }
  }, [autoStart, nbets, setAutoStart, setBetStarted]);

  return (
    <div className="flex flex-col justify-center items-center absolute">
      {/* Outer Circle */}
      <div
        className="absolute w-[400px] h-[400px] max-lg:w-[320px] max-lg:h-[320px] rounded-full bg-gray-800"
        style={{
          borderRadius: "50%",
          zIndex: 1,
        }}
      ></div>

      {/* Rotating Circle */}
      <div className="relative w-[360px] h-[360px] max-lg:w-[290px] max-lg:h-[290px] z-[2]">
        {/* Segments */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transform: `rotate(${rotation + 2}deg)`,
            transition: "transform 4s ease-out",
          }}
        >
          {segmentColors.map((color, index) => {
            const arcPath = calculateArcPath(index, totalSegments, radius);
            return (
              <svg
                key={index}
                width="100%"
                height="100%"
                viewBox="-100 -100 200 200"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                }}
              >
                <path d={arcPath} fill={color} />
              </svg>
            );
          })}
        </div>

        {/* Inner Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full bg-primary z-[2] border border-activeHover"></div>
      </div>

      {/* Pointer */}
      <div
        className="absolute top-[-3.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 z-[2]"
        style={{
          clipPath: "polygon(25% 0, 75% 0, 50% 100%, 50% 100%)",
        }}
      ></div>
    </div>
  );
};

export default Game;
