"use client";

import React, { useCallback, useEffect, useState } from "react";
import AirQualityCardSet from "./AirQualityCardSet";
import AirQualityGraphSet from "./AirQualityGraphSet";
import { getDateRangeRecords } from "../data/getData.js";

// interface AirQualitySectionProps {
//   title: string;
//   description: string;
// }

const AirQualitySection: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<string>("card");

  const [pm25, setPm25] = useState([10]);
  const [co2, setCo2] = useState([750]);
  const [pressure, setPressure] = useState([5]);
  const [temperature, setTemperature] = useState([25]);
  const [humidity, setHumidity] = useState([60]);

  const [timestamp, setTimestamp] = useState([]);
  const [daysEarlier, setDaysEarlier] = useState(30);

  const [lastIndex, setLastIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const new_dataset = await getDateRangeRecords(daysEarlier);

      // setTimestamp(
      //   new_dataset.map((x: any) => changeTimeFormat(x.timestamp, daysEarlier))
      // );

      setTimestamp(new_dataset.map((x: any) => new Date(x.timestamp)));

      setLastIndex(timestamp.length - 1);

      // setPm25(new_dataset.map((x: any) => x.pm25));
      // setCo2(new_dataset.map((x: any) => x.co2));
      // setPressure(new_dataset.map((x: any) => x.pressure));

      setTemperature(new_dataset.map((x: any) => x.temperature));
      setHumidity(new_dataset.map((x: any) => x.humidity));

      // console.log(timestamp);
      // console.log(typeof timestamp[0]);
    }, 2000);

    return () => clearInterval(interval);
  }, [displayMode, daysEarlier]);

  return (
    <div className="content-section">
      {/* <ContentHeader title="ตัวชี้วัดคุณภาพอากาศ" description="" /> */}
      <div className="content-header">
        <div className="content-header-text-area">
          <p className="content-header-title">ตัวชี้วัดคุณภาพอากาศ</p>
        </div>
        <div className="content-header-button-container">
          <div
            // className="card-button-default"
            className={
              displayMode === "card"
                ? "card-button-selected"
                : "card-button-default"
            }
            onClick={() => {
              setDisplayMode("card");
            }}
          ></div>
          <div
            // className="graph-button-default"
            className={
              displayMode === "graph"
                ? "graph-button-selected"
                : "graph-button-default"
            }
            onClick={() => {
              setDisplayMode("graph");
            }}
          ></div>
        </div>
      </div>
      {/* <p style={{ color: "black" }}>Mode: {displayMode}</p> */}
      <div className="content-container">
        {displayMode === "card" ? (
          <AirQualityCardSet
            pm25={pm25[0]}
            co2={co2[0]}
            pressure={pressure[0]}
            temperature={temperature[lastIndex]}
            humidity={humidity[lastIndex]}
          />
        ) : (
          <>
            <AirQualityGraphSet
              pm25={pm25}
              co2={co2}
              pressure={pressure}
              temperature={temperature}
              humidity={humidity}
              timestamp={timestamp}
              daysEarlier={daysEarlier}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AirQualitySection;
