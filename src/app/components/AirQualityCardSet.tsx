"use client";

import React, { useContext } from "react";
// import { Context } from "../context/AirQualityContext";
import AirQualityCard from "./AirQualityCard";

interface AirQualityCardSetProps {
  pm25: number;
  co2: number;
  pressure: number;
  temperature: number;
  humidity: number;
}

// const AirQualityCardSet: React.FC<AirQualityCardSetProps> = ({
const AirQualityCardSet: React.FC<AirQualityCardSetProps> = ({
  pm25,
  co2,
  pressure,
  temperature,
  humidity,
}) => {
  return (
    <div className="aq-container">
      <AirQualityCard title="PM2.5" value={pm25} unit="µg/m³" color="#87D677" />
      <AirQualityCard title="CO2" value={co2} unit="ppm" color="#87D677" />
      <AirQualityCard
        title="ความกดอากาศ"
        value={pressure}
        unit="Pascal"
        color="#87D677"
      />
      <AirQualityCard
        title="อุณหภูมิ"
        value={temperature}
        unit="°C"
        color="#7ED2F0"
      />
      <AirQualityCard
        title="ความชื้นสัมพัทธ์"
        value={humidity}
        unit="%"
        color="#7ED2F0"
      />
    </div>
  );
};

export default AirQualityCardSet;
