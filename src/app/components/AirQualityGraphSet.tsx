"use client";

import React, { useEffect, useState } from "react";
import AirQualityGraph from "./AirQualityGraph";

import { setTemperatureColor, setHumidityColor } from "../data/convertData.js";

interface AirQualityGraphSetProps {
  pm25: number[];
  co2: number[];
  pressure: number[];
  temperature: number[];
  humidity: number[];

  timestamp: object[];
  daysEarlier: number;
}

const AirQualityGraphSet: React.FC<AirQualityGraphSetProps> = ({
  pm25,
  co2,
  pressure,
  temperature,
  humidity,

  timestamp,
  daysEarlier,
}) => {
  return (
    <div className="aqgraph-container">
      <AirQualityGraph
        title={"อุณหภูมิ"}
        unit={"°C"}
        timestamp={timestamp}
        value={temperature}
        color={setTemperatureColor(temperature[temperature.length - 1])}
        daysEarlier={daysEarlier}
      />
      <AirQualityGraph
        title={"ความชื้นสัมพัทธ์"}
        unit={"%"}
        timestamp={timestamp}
        value={humidity}
        color={setHumidityColor(humidity[humidity.length - 1])}
        daysEarlier={daysEarlier}
      />
    </div>
  );
};

export default AirQualityGraphSet;
