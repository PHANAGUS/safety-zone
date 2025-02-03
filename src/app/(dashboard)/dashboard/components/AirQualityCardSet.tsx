"use client";

import React from "react";
import "../css/AirQualityCard.css";
import AirQualityCard from "./AirQualityCard";

import {
  setPm25Color,
  setCo2Color,
  setPressureColor,
  setTemperatureColor,
  setHumidityColor,
} from "../../../api/convertData.js";

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
    <div className="aqcard-container aqcard-container-scrollbar">
      <AirQualityCard
        title="PM2.5"
        value={pm25}
        unit="µg/m³"
        color={setPm25Color(pm25)}
      />
      <AirQualityCard
        title="CO2"
        value={co2}
        unit="ppm"
        color={setCo2Color(co2)}
      />
      <AirQualityCard
        title="ความกดอากาศ"
        value={pressure}
        unit="Pascal"
        color={setPressureColor(pressure)}
      />
      <AirQualityCard
        title="อุณหภูมิ"
        value={temperature}
        unit="°C"
        color={setTemperatureColor(temperature)}
      />
      <AirQualityCard
        title="ความชื้นสัมพัทธ์"
        value={humidity}
        unit="%"
        color={setHumidityColor(humidity)}
      />
    </div>
  );
};

export default AirQualityCardSet;
