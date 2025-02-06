"use client";

import React, { useEffect, useState } from "react";
import "../css/AirQualityGraph.css";
import AirQualityGraph from "./AirQualityGraph";

import {
  setPm25Color,
  setCo2Color,
  setPressureColor,
  setTemperatureColor,
  setHumidityColor,
} from "../../../api/convert_data.js";

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
        title={"PM2.5"}
        unit={"µg/m³"}
        timestamp={timestamp}
        value={pm25}
        color={setPm25Color(pm25[pm25.length - 1])}
        daysEarlier={daysEarlier}
      />
      <AirQualityGraph
        title={"CO2"}
        unit={"ppm"}
        timestamp={timestamp}
        value={co2}
        color={setCo2Color(co2[co2.length - 1])}
        daysEarlier={daysEarlier}
      />
      <AirQualityGraph
        title={"ความกดอากาศ"}
        unit={"Pascal"}
        timestamp={timestamp}
        value={pressure}
        color={setPressureColor(pressure[pressure.length - 1])}
        daysEarlier={daysEarlier}
      />
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
