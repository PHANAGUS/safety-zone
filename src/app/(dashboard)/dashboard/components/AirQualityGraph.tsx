"use client";

import React, { useEffect, useState } from "react";
// import "../css/AirQualityGraph.css";
import styles from "./AirQualityGraph.module.css";

import Chart from "chart.js/auto";
import { CategoryScale, defaults } from "chart.js";
Chart.register(CategoryScale);
import { Line } from "react-chartjs-2";

import { changeTimeFormat } from "@/app/api/convert_data";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface AirQualityGraphProps {
  title: string;
  unit: string;

  timestamp: object[];
  value: number[];
  color: string;
  daysEarlier: number;
}

const AirQualityGraph: React.FC<AirQualityGraphProps> = ({
  title,
  unit,
  timestamp,
  value,
  color,
  daysEarlier,
}) => {
  const [timetick, setTimetick] = useState<string[]>([]);

  useEffect(() => {
    const new_timetick = timestamp.map((x) => changeTimeFormat(x, daysEarlier));
    setTimetick(new_timetick);
  }, [timestamp]);
  return (
    <div
      className={value.length > 1 ? styles["aqgraph"] : styles["aqgraph-empty"]}
    >
      <div className={styles["aqgraph-textarea"]}>
        <p className={styles["aqgraph-title"]}>{title}</p>
        <p className={styles["aqgraph-unit"]}>{unit}</p>
      </div>
      <div className={styles["aqgraph-chartarea"]}>
        {value.length > 1 ? (
          <Line
            data={{
              labels: timetick,
              datasets: [
                {
                  label: title,
                  data: value,
                  backgroundColor: color,
                  borderColor: color,
                  pointRadius: 1, // ขนาดจุด (ค่าเริ่มต้น 3-5)
                  pointHoverRadius: 5, // ขนาดจุดเมื่อ hover
                },
              ],
            }}
            options={{
              elements: { line: { tension: 0.3 } },
              plugins: {
                legend: {
                  display: false, // ปิดการแสดง Legend
                },
              },
              scales: {
                x: {
                  ticks: {
                    display: false,
                    maxTicksLimit: 5, // จำกัดให้แสดงแค่ 10 labels ในแกน X
                  },
                },
              },
            }}
          />
        ) : (
          <></>
          // <p>ข้อมูลไม่เพียงพอสำหรับการแสดงผลกราฟ</p>
        )}
      </div>
    </div>
  );
};

export default AirQualityGraph;
