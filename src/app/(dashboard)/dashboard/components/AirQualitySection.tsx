"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";
import styles from "../../layout.module.css";

import AirQualityCardSet from "./AirQualityCardSet";
import AirQualityGraphSet from "./AirQualityGraphSet";
import { getDateRangeRecords } from "../../../api/get_sensor.js";

// interface AirQualitySectionProps {
//   title: string;
//   description: string;
// }

const main_url = process.env.NEXT_PUBLIC_URL;

const AirQualitySection: React.FC = () => {
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    homeName,
    setHomeName,
    homeID,
    setHomeID,
    roomName,
    setRoomName,
    roomID,
    setRoomID,
  } = useGlobalState();

  // ตัวแปรระบุโหมดการแสดงผล Air Quality [โหมด card, โหมด graph]
  const [displayMode, setDisplayMode] = useState<string>("card");
  const [fetchComplete, setFetchComplete] = useState<boolean>(true);

  const [pm25, setPm25] = useState([10]);
  const [co2, setCo2] = useState([400]);
  const [pressure, setPressure] = useState([5]);
  const [temperature, setTemperature] = useState([25]);
  const [humidity, setHumidity] = useState([60]);
  const [timestamp, setTimestamp] = useState([]);
  const [lastIndex, setLastIndex] = useState<number>(0);
  // จำนวนวันสำหรับแสดงผลกราฟย้อนหลัง
  const [daysEarlier, setDaysEarlier] = useState(30);

  useEffect(() => {
    // console.log(room_sensor_url);
    const fetchData = async () => {
      // console.log(displayMode , daysEarlier)
      const new_dataset = await getDateRangeRecords(
        main_url,
        roomID,
        daysEarlier
      );
      // console.log(new_dataset);

      if (new_dataset != null) {
        setFetchComplete(true);

        setTimestamp(new_dataset.map((x: any) => new Date(x.recorded_at)));
        setLastIndex(new_dataset.length - 1);

        setPm25(new_dataset.map((x: any) => x.pm25));
        setCo2(new_dataset.map((x: any) => x.co2));
        setPressure(new_dataset.map((x: any) => x.pressure - 1012));
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
    <div className={styles.section}>
      <div className={styles["section-header"]}>
        <div className={styles["section-header-text-area"]}>
          <p className={styles["section-header-title"]}>ตัวชี้วัดคุณภาพอากาศ</p>
        </div>
        <div className={styles["section-header-button-container"]}>
          <div
            className={
              displayMode === "card"
                ? styles["card-button-selected"]
                : styles["card-button-default"]
            }
            onClick={() => {
              setDisplayMode("card");
            }}
          ></div>
          <div
            className={
              displayMode === "graph"
                ? styles["graph-button-selected"]
                : styles["graph-button-default"]
            }
            onClick={() => {
              setDisplayMode("graph");
            }}
          ></div>
        </div>
      </div>
      {/* <p style={{ color: "black" }}>Mode: {displayMode}</p> */}
      <div className={styles["section-container"]}>
        {fetchComplete ? (
          <>
            {displayMode === "card" ? (
              <AirQualityCardSet
                pm25={pm25[lastIndex]}
                co2={co2[lastIndex]}
                pressure={pressure[lastIndex]}
                temperature={temperature[lastIndex]}
                humidity={humidity[lastIndex]}
              />
            ) : (
              <div>
                <div className="aqduration-dropdown">
                  <div className="aqduration-dropdown-btn"></div>
                </div>
                <AirQualityGraphSet
                  pm25={pm25}
                  co2={co2}
                  pressure={pressure}
                  temperature={temperature}
                  humidity={humidity}
                  timestamp={timestamp}
                  daysEarlier={daysEarlier}
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles["section-failed-box"]}>
            <div className={styles["section-failed-pic"]}></div>
            <p className={styles["section-failed-text"]}>
              ขออภัย ระบบเกิดข้อขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirQualitySection;
