"use client";

import React, { useEffect, useState } from "react";

import Chart from "chart.js/auto";
import { CategoryScale, defaults } from "chart.js";
Chart.register(CategoryScale);
import { Line } from "react-chartjs-2";

import { changeTimeFormat } from "../data/convertData.js";

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
    <>
      {timestamp.length > 1 ? (
        <div className="aqgraph">
          <div className="aqgraph-textarea">
            <p className="aqgraph-title">{title}</p>
            <p className="aqgraph-unit">{unit}</p>
          </div>
          <div className="aqgraph-chartarea">
            <Line
              data={{
                // labels: timetick,
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
          </div>
        </div>
      ) : (
        <div className="aqgraph">
          <p>ข้อมูลไม่เพียงพอสำหรับการสร้างกราฟ</p>
        </div>
      )}
    </>
  );
};

export default AirQualityGraph;
