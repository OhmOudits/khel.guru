import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import gemImage from "../../../assets/twist/gem.png";
import skullImage from "../../../assets/twist/skull.png";
import nullImage from "../../../assets/twist/null.png";
import rubyImage from "../../../assets/twist/ruby.png";
import mineImage from "../../../assets/twist/mine.png";

// eslint-disable-next-line react/prop-types
const SegmentedCircle = ({
  totalSegments,
  outerRadius,
  thickness,
  color,
  index,
  multipliers,
  CurrentDiamond,
  loading,
}) => {
  const canvasRef = useRef(null);
  const canvasSize = outerRadius * 2 + thickness * 2;

  const drawSegments = (ctx) => {
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
    const segmentAngle = (2 * Math.PI) / totalSegments;

    for (let i = 0; i < totalSegments; i++) {
      const startAngle = i * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      // Calculate points for the arrow-shaped segment
      const outerStartX = centerX + outerRadius * Math.cos(startAngle);
      const outerStartY = centerY + outerRadius * Math.sin(startAngle);

      const outerEndX = centerX + outerRadius * Math.cos(endAngle);
      const outerEndY = centerY + outerRadius * Math.sin(endAngle);

      const innerStartX =
        centerX + (outerRadius + thickness) * Math.cos(startAngle);
      const innerStartY =
        centerY + (outerRadius + thickness) * Math.sin(startAngle);

      const innerEndX =
        centerX + (outerRadius + thickness) * Math.cos(endAngle);
      const innerEndY =
        centerY + (outerRadius + thickness) * Math.sin(endAngle);

      const StartedgeEndX =
        centerX +
        (outerRadius + thickness / 2) * Math.cos(endAngle + Math.PI / 36);
      const StartedgeEndY =
        centerY +
        (outerRadius + thickness / 2) * Math.sin(endAngle + Math.PI / 36);

      const EndedgeEndX =
        centerX +
        (outerRadius + thickness / 2) * Math.cos(startAngle + Math.PI / 36);
      const EndedgeEndY =
        centerY +
        (outerRadius + thickness / 2) * Math.sin(startAngle + Math.PI / 36);

      const purplegradient = ctx.createRadialGradient(
        centerX,
        centerY,
        outerRadius,
        centerX,
        centerY,
        outerRadius + thickness
      );

      purplegradient.addColorStop(0, "#703ac7");
      purplegradient.addColorStop(0.475, "#703ac7");
      purplegradient.addColorStop(0.524, "#8f4bff");
      purplegradient.addColorStop(1, "#8f4bff");

      const orangegradient = ctx.createRadialGradient(
        centerX,
        centerY,
        outerRadius,
        centerX,
        centerY,
        outerRadius + thickness
      );
      orangegradient.addColorStop(0, "#c76621");
      orangegradient.addColorStop(0.475, "#c76621");
      orangegradient.addColorStop(0.524, "#ff8228");
      orangegradient.addColorStop(1, "#ff8228");

      const greengradient = ctx.createRadialGradient(
        centerX,
        centerY,
        outerRadius,
        centerX,
        centerY,
        outerRadius + thickness
      );

      greengradient.addColorStop(0, "#26a962");
      greengradient.addColorStop(0.475, "#26a962");
      greengradient.addColorStop(0.524, "#2cd97d");
      greengradient.addColorStop(1, "#2cd97d");

      const defaultgradient = ctx.createRadialGradient(
        centerX,
        centerY,
        outerRadius,
        centerX,
        centerY,
        outerRadius + thickness
      );
      defaultgradient.addColorStop(0, "#3c4344");
      defaultgradient.addColorStop(0.475, "#3c4344");
      defaultgradient.addColorStop(0.524, "#4d5657");
      defaultgradient.addColorStop(1, "#4d5657");
      // Draw the arrow shape

      // (totalSegments == 4) ?
      //   greengradient : (totalSegments == 6) ?
      //     orangegradient : purplegradient

      ctx.fillStyle =
        index - 1 >= i
          ? color === "purple"
            ? purplegradient
            : color === "orange"
            ? orangegradient
            : greengradient
          : defaultgradient;

      ctx.beginPath();
      ctx.moveTo(outerStartX, outerStartY);

      for (let j = 0; j < 10; j++) {
        const angle = startAngle + ((endAngle - startAngle) * j) / 10;
        const x = centerX + outerRadius * Math.cos(angle);
        const y = centerY + outerRadius * Math.sin(angle);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(outerEndX, outerEndY);
      ctx.lineTo(StartedgeEndX, StartedgeEndY);
      ctx.lineTo(innerEndX, innerEndY);

      for (let j = 0; j < 10; j++) {
        const angle = endAngle + ((startAngle - endAngle) * j) / 10;
        const x = centerX + (outerRadius + thickness) * Math.cos(angle);
        const y = centerY + (outerRadius + thickness) * Math.sin(angle);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(innerStartX, innerStartY);

      ctx.lineTo(EndedgeEndX, EndedgeEndY);

      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();

      const textRadius = outerRadius + thickness / 2;
      const textX =
        centerX + textRadius * Math.cos((startAngle + endAngle) / 2);
      const textY =
        centerY + textRadius * Math.sin((startAngle + endAngle) / 2);

      ctx.save();
      ctx.translate(textX, textY);
      if (
        i === 0 ||
        (totalSegments > 4 && i == 1) ||
        i > 3 ||
        i == totalSegments - 1
      ) {
        ctx.rotate((startAngle + endAngle) / 2 + Math.PI / 2);
      } else {
        ctx.rotate((startAngle + endAngle) / 2 - Math.PI / 2);
      }
      ctx.fillStyle = "black";
      ctx.font = "900 18px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(multipliers[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the circular arrowhead segments
    drawSegments(ctx);
  }, [totalSegments, index, color]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        position: "relative",
        top: 0,
        left: 0,
        borderRadius: "50%",
      }}
    ></canvas>
  );
};
const ResponsiveSegmentedCircles = ({
  CurrentDiamond,
  loading,
  green,
  orange,
  purple,
  betTrigger,
}) => {
  const imageUrls = [gemImage, skullImage, nullImage, rubyImage, mineImage];
  const [spinning, setSpinning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Starting index
  const [spinningDuration, setSpinningDuration] = useState(0);
  const [orangeIn, setorangeIn] = useState(0);
  const [purpleIn, setpurpleIn] = useState(0);
  const [greenIn, setgreenIn] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (orange !== orangeIn) {
        setorangeIn(orange);
      } else if (green !== greenIn) {
        setgreenIn(green);
      } else if (purple !== purpleIn) {
        setpurpleIn(purple);
      }
    }, 3300);
  }, [orange, purple, green]);
  useEffect(() => {
    if (spinning) {
      const timer = setTimeout(() => {
        setSpinning(false);
      }, spinningDuration);
      return () => clearTimeout(timer);
    }
  }, [spinning, spinningDuration]);

  const rotateImages = async () => {
    setSpinning(true);
    const diamonds = ["purple", "skull", "null", "orange", "green"];
    let index = 0;

    const sequenceInterval = setInterval(() => {
      setActiveIndex(index);
      index++;

      if (index >= diamonds.length) {
        index = 0;
      }
    }, 300);

    setTimeout(() => {
      clearInterval(sequenceInterval);
      const finalIndex = diamonds.findIndex((x) => x === CurrentDiamond);
      setActiveIndex(finalIndex);
      setSpinning(false);
    }, 3000);
  };

  useEffect(() => {
    if (betTrigger) {
      rotateImages();
    }
  }, [betTrigger, CurrentDiamond]);

  const stopSpinning = () => {
    // Set a specific index to stop the spinning
    setSpinning(false);
  };

  const rings = [
    ["100x", "4.0x", "2.5x", "1.3x", "21.x", "28.5x", "21.x", "Bonus+"],
    ["205.0x", "21.0x", "1.5x", "1.6x", "21.x", "22.5x+"],
    ["45.0x", "70.5x", "20.5x", "5.0x + "],
  ];

  const outerRadius8 = 200;
  const outerRadius6 = 155;
  const outerRadius4 = 110;
  const thickness = 35;

  return (
    <div className="relative flex items-center justify-center bg-transparent scale-[.7] lg:scale-100 h-[400px] lg:h-[400px]">
      {/* Outer Circle (8 Segments) */}
      <div className="absolute w-[490px] h-[490px] rounded-full main"></div>
      <div className="absolute">
        <SegmentedCircle
          totalSegments={8}
          outerRadius={outerRadius8}
          thickness={thickness}
          color="purple"
          multipliers={rings[0]}
          CurrentDiamond={CurrentDiamond}
          loading={loading}
          index={purpleIn}
        />
      </div>

      <div className="absolute">
        <SegmentedCircle
          totalSegments={6}
          outerRadius={outerRadius6}
          thickness={thickness}
          color="orange"
          multipliers={rings[1]}
          CurrentDiamond={CurrentDiamond}
          loading={loading}
          index={orangeIn}
        />
      </div>

      <div className="absolute">
        <SegmentedCircle
          totalSegments={4}
          outerRadius={outerRadius4}
          thickness={thickness}
          color="green"
          multipliers={rings[2]}
          CurrentDiamond={CurrentDiamond}
          loading={loading}
          index={greenIn}
        />
      </div>

      <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2">
        <div className="w-[45px] h-[150px] main shadow-[0_4px_30px_rgba(0,0,0,0.6)] relative flex flex-col justify-between items-center mb-[100px]">
          <div className="flex justify-center items-center">
            <svg className="w-[50px] h-[50px]">
              <g transform="translate(8.65, 9.76)">
                <image x="0" y="0" width="32" height="32" href={gemImage} />
              </g>
            </svg>
          </div>

          <div className="flex justify-center items-center">
            <svg className="w-[50px] h-[50px]">
              <g transform="translate(8.65, 6)">
                <image x="0" y="0" width="32" height="32" href={rubyImage} />
              </g>
            </svg>
          </div>

          <div className="flex justify-center items-center">
            <svg className="w-[50px] h-[50px]">
              <g transform="translate(8.65, 3)">
                <image x="0" y="0" width="32" height="32" href={mineImage} />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute w-[200px] h-[200px]">
        <div className="w-[200px] h-[200px] relative overflow-hidden">
          <div
            className="absolute w-full h-full transition-transform duration-200 ease-linear"
            style={{
              transform: `translateY(-${activeIndex * 100}%)`,
            }}
          >
            {imageUrls.map((image, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-full"
              >
                <img
                  className="w-[100px] h-[100px] z-10"
                  src={image}
                  alt={`slot-image-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveSegmentedCircles;
