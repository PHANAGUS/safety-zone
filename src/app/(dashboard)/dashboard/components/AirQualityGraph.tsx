"use client";

import React, { useEffect, useState } from "react";
import "../css/AirQualityGraph.css";

import Chart from "chart.js/auto";
import { CategoryScale, defaults } from "chart.js";
Chart.register(CategoryScale);
import { Line } from "react-chartjs-2";

import { changeTimeFormat } from "../../../data/convertData.js";

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
    <div className={value.length > 1 ? "aqgraph" : "aqgraph-empty"}>
      <div className="aqgraph-textarea">
        <p className="aqgraph-title">{title}</p>
        <p className="aqgraph-unit">{unit}</p>
      </div>
      <div className="aqgraph-chartarea">
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
              // scales: {
              //   x: {
              //     ticks: {
              //       maxTicksLimit: 5, // จำกัดให้แสดงแค่ 10 labels ในแกน X
              //     },
              //   },
              // },
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
