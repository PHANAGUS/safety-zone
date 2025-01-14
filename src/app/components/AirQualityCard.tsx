"use client";

import React from "react";

interface AirQualityCardProps {
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  title,
  value,
  unit,
  color,
}) => {
  return (
    <div className="aqcard">
      <div className="aqcard-bg" style={{ backgroundColor: color }}></div>
      <div className="aqcard-detailbox">
        <div className="aqcard-detailbox-textbox">
          <p className="aqcard-title">{title}</p>
          <p className="aqcard-unit">({unit})</p>
        </div>
        <p className="aqcard-value">{value}</p>
      </div>
    </div>
  );
};

export default AirQualityCard;
