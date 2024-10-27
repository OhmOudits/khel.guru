import { useEffect, useState } from "react";
import { segments } from "../../constants";

// eslint-disable-next-line
const Game = ({ risk, segment }) => {
  const [riskSegment, setRiskSegment] = useState(
    segments.find((s) => s.risk === risk)
  );
  const [selectedSegmentData, setSelectedSegmentData] = useState(null);
  const [segmentColors, setSegmentColors] = useState([]);
  const [angle, setAngle] = useState(360 / segment);

  useEffect(() => {
    const foundSegment = segments.find((s) => s.risk === risk);
    setRiskSegment(foundSegment);
  }, [risk]);

  useEffect(() => {
    if (riskSegment) {
      const foundSegmentData = riskSegment.segment.find((s) => {
        return s.segments == segment;
      });
      setSelectedSegmentData(foundSegmentData);
    }
  }, [riskSegment, segment]);

  useEffect(() => {
    if (selectedSegmentData) {
      const colors = [];
      selectedSegmentData.sections.forEach((section) => {
        for (let i = 0; i < section.terms; i++) {
          colors.push(section.color);
        }
      });

      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }

      console.log(colors);
      setSegmentColors(colors);
    }
  }, [selectedSegmentData]);

  useEffect(() => {
    setAngle(360 / segment);
  }, [segment]);

  return (
    <div className="relative z-[0] overflow-hidden w-[60%] max-w-[300px] aspect-square rounded-full bg-primary mx-auto"></div>
  );
};

export default Game;
