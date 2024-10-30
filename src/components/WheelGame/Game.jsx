import { useEffect, useState } from "react";
import { segments } from "../../constants";

// eslint-disable-next-line
const Game = ({ risk, segment }) => {
  const [riskSegment, setRiskSegment] = useState(null);
  const [selectedSegmentData, setSelectedSegmentData] = useState(null);
  const [segmentColors, setSegmentColors] = useState([]);
  // eslint-disable-next-line
  const [selectColor, setSelectColor] = useState();

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
      selectedSegmentData.sections.forEach((section) => {
        colors.push(...Array(section.terms).fill(section.color));
      });

      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }

      setSegmentColors(colors);
    }
  }, [selectedSegmentData]);

  // eslint-disable-next-line
  const handleColor = () => {
    const randomIndex = Math.floor(Math.random() * segmentColors.length);
    console.log("Selected Color:", segmentColors[randomIndex]);
  };

  const totalSegments = segmentColors.length;
  const angle = 360 / totalSegments;

  return (
    <div className="flex justify-center items-center relative">
      {/* Indicator at the top center */}
      <div
        className="absolute top-[-3.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-red-500 z-50"
        style={{
          clipPath: "polygon(25% 0, 75% 0, 50% 100%, 50% 100%)",
        }}
      >
        <div></div>
      </div>

      <div className="absolute w-80 h-80 max-lg:w-72 max-lg:h-72 rounded-full bg-inactive"></div>

      <div className="relative w-72 h-72 max-lg:w-64 max-lg:h-64 rounded-full overflow-hidden">
        {/* Inner Section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-square rounded-full bg-primary z-[200] border border-activeHover"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full bg-primary z-[100] border border-activeHover"></div>

        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-inactive"></div>

        {/* Segments */}
        {segmentColors.map((color, index) => (
          <div
            key={index}
            className="absolute w-full h-full"
            style={{
              backgroundColor: color,
              clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
              transform: `rotate(${angle * index}deg)`,
              transformOrigin: "50% 50%",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Game;
