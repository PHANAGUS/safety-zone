"use client";

import styles from "./ElectricGraph.module.css";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

// ✅ Register components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

interface ElectricGraphProps {
  inroom_timestamp: object[];
  inroom_value: number[];
}

const ElectricGraph: React.FC<ElectricGraphProps> = ({
  inroom_timestamp,
  inroom_value,
}) => {
  const inroom_data = inroom_timestamp.map((time, index) => ({
    x: time,
    y: inroom_value[index],
  }));

  const electric_cost_data = [];

  const startDate = new Date("2025-02-28");
  const endDate = new Date("2025-03-13");
  let cost = 100;
  const dailyIncrement = 5;
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    electric_cost_data.push({
      x: new Date(date),
      y: cost,
    });
    cost += dailyIncrement;
  }

  return (
    <div
      className={
        inroom_value.length > 1 ? styles["aqgraph"] : styles["aqgraph-empty"]
      }
    >
      <div className={styles["aqgraph-textarea"]}>
        <p className={styles["aqgraph-title"]}>เปรียบเทียบค่าไฟฟ้ากับ PM2.5</p>
      </div>
      <div className={styles["aqgraph-chartarea"]}>
        {inroom_value.length > 1 ? (
          <Chart
            type="line"
            data={{
              datasets: [
                {
                  label: "PM2.5",
                  data: inroom_data,
                  backgroundColor: "rgba(22, 189, 255, 1)",
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  borderColor: "rgba(22, 189, 255, 0.5)",
                  borderWidth: 2,
                  yAxisID: "y_pm25",
                },
                {
                  label: "ค่าไฟฟ้า",
                  data: electric_cost_data,
                  backgroundColor: "rgb(255, 176, 72)",
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  borderColor: "rgba(255, 176, 72, 0.5)",
                  borderWidth: 2,
                  yAxisID: "y_electricity",
                },
              ],
            }}
            options={{
              responsive: true,
              elements: { line: { tension: 0.3 } },
              plugins: {
                legend: {
                  display: false,
                  position: "bottom" as const,
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "day",
                    displayFormats: {
                      day: "MMM dd",
                      hour: "HH:mm",
                    },
                  },
                  title: {
                    display: true,
                    text: "เวลา",
                  },
                },
                y_pm25: {
                  type: "linear" as const,
                  position: "left" as const,
                  title: { display: true, text: "PM2.5 (µg/m³)" },
                  grid: { drawOnChartArea: false, color: "rgb(89, 180, 255)" },
                  ticks: { color: "rgb(89, 180, 255)" },
                },
                y_electricity: {
                  type: "linear" as const,
                  position: "right" as const,
                  title: { display: true, text: "ค่าไฟฟ้า (บาท)" },
                  grid: { drawOnChartArea: false, color: "rgb(253, 179, 41)" },
                  ticks: { color: "rgb(253, 179, 41)" },
                },
              },
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ElectricGraph;
