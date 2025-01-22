"use client";

import React, { useCallback, useEffect, useState } from "react";
import "../css/Section.css";
import AirQualityCardSet from "./AirQualityCardSet";
import AirQualityGraphSet from "./AirQualityGraphSet";
import { getDateRangeRecords } from "../data/getData.js";

// interface AirQualitySectionProps {
//   title: string;
//   description: string;
// }

const AirQualitySection: React.FC = () => {
  // ตัวแปรระบุโหมดการแสดงผล Air Quality [โหมด card, โหมด graph]
  const [displayMode, setDisplayMode] = useState<string>("card");
  const [fetchComplete, setFetchComplete] = useState<boolean>(true);

  const [pm25, setPm25] = useState([10]);
  const [co2, setCo2] = useState([750]);
  const [pressure, setPressure] = useState([5]);
  const [temperature, setTemperature] = useState([25]);
  const [humidity, setHumidity] = useState([60]);
  const [timestamp, setTimestamp] = useState([]);
  const [lastIndex, setLastIndex] = useState<number>(0);
  // จำนวนวันสำหรับแสดงผลกราฟย้อนหลัง
  const [daysEarlier, setDaysEarlier] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(displayMode , daysEarlier)
      const new_dataset = await getDateRangeRecords(daysEarlier);
      // console.log(new_dataset);

      if (new_dataset != null) {
        setFetchComplete(true);

        setTimestamp(new_dataset.map((x: any) => new Date(x.timestamp)));
        setLastIndex(new_dataset.length - 1);

        setTemperature(new_dataset.map((x: any) => x.temperature));
        setHumidity(new_dataset.map((x: any) => x.humidity));
      } else {
        setFetchComplete(false);
      }
    };

    fetchData(); // Call the async function once

    // No cleanup needed as this runs only once
  }, [displayMode, daysEarlier]);

  return (
    <div className="section">
      <div className="section-header">
        <div className="section-header-text-area">
          <p className="section-header-title">ตัวชี้วัดคุณภาพอากาศ</p>
        </div>
        <div className="section-header-button-container">
          <div
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
      <div className="section-container">
        {fetchComplete ? (
          <>
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
          </>
        ) : (
          <>
            <div className="section-failed-pic"></div>
            <div className="section-failed-text">
              เกิดข้อผิดพลาดในการอ่านข้อมูล
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AirQualitySection;
