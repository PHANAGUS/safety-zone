"use client";

import React, { useEffect, useState } from "react";
// import "../css/AirQualityGraph.css";
import styles from "./AirQualityGraph.module.css";

import Chart from "chart.js/auto";
import { CategoryScale, defaults } from "chart.js";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from "react-chartjs-2";

import { changeTimeFormat } from "@/app/api/convert_data";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface AirQualityGraphProps {
  title: string;
  unit: string;

  outside_timestamp: object[];
  outside_value: number[];

  inroom_timestamp: object[];
  inroom_value: number[];
}

const AirQualityGraph: React.FC<AirQualityGraphProps> = ({
  title,
  unit,
  outside_timestamp,
  outside_value,
  inroom_timestamp,
  inroom_value,
}) => {
  const outside_data = outside_timestamp.map((time, index) => ({
    x: time,
    y: outside_value[index],
  }));
  const inroom_data = inroom_timestamp.map((time, index) => ({
    x: time,
    y: inroom_value[index],
  }));

  return (
    <div
      className={
        inroom_value.length > 1 || outside_value.length > 1
          ? styles["aqgraph"]
          : styles["aqgraph-empty"]
      }
    >
      <div className={styles["aqgraph-textarea"]}>
        <p className={styles["aqgraph-title"]}>{title}</p>
        <p className={styles["aqgraph-unit"]}>{unit}</p>
      </div>
      <div className={styles["aqgraph-chartarea"]}>
        {inroom_value.length > 1 ? (
          <Line
            data={{
              datasets: [
                {
                  label: "ในห้อง",
                  data: inroom_data,
                  backgroundColor: "rgba(22, 189, 255, 1)",
                  pointRadius: 0, // ขนาดจุด (ค่าเริ่มต้น 3-5)
                  pointHoverRadius: 5, // ขนาดจุดเมื่อ hover
                  borderColor: "rgba(22, 189, 255, 0.5)",
                  borderWidth: 2,
                },
                // {
                //   label: "นอกห้อง",
                //   data: outside_data,
                //   backgroundColor: "rgb(213, 169, 255)",
                //   pointRadius: 0, // ขนาดจุด (ค่าเริ่มต้น 3-5)
                //   pointHoverRadius: 5, // ขนาดจุดเมื่อ hover
                //   borderColor: "rgba(213, 169, 255, 0.5)",
                //   borderWidth: 2,
                // },
              ],
            }}
            options={{
              responsive: true,
              elements: { line: { tension: 0.3 } },
              plugins: {
                legend: {
                  display: false, // ปิดการแสดง Legend
                  position: "bottom" as const,
                },
              },
              scales: {
                x: {
                  type: "time", // ใช้แกนเวลา
                  time: {
                    unit: "day", // สามารถเปลี่ยนเป็น 'hour' หรือ 'minute' ได้
                    displayFormats: {
                      day: "MMM dd", // แสดงวันที่แบบ "Feb 01"
                      hour: "HH:mm", // แสดงเวลาหากต้องการ
                    },
                  },
                  title: {
                    display: true,
                    text: "เวลา",
                  },
                },
                y: {
                  beginAtZero: false,
                  // title: {
                  //   display: true,
                  //   text: title,
                  // },
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
