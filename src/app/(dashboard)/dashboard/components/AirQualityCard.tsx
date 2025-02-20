"use client";

import React, { useState } from "react";
// import "../css/AirQualityCard.css";
import styles from "./AirQualityCard.module.css";

interface AirQualityCardProps {
  title: string;
  value: string | number;
  unit: string;
  color: string;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  title,
  value,
  unit,
  color,
}) => {
  return (
    <div className={styles["aqcard"]}>
      <div
        className={styles["aqcard-bg"]}
        style={{ backgroundColor: color }}
      ></div>
      <div className={styles["aqcard-detailbox"]}>
        <div className={styles["aqcard-detailbox-textbox"]}>
          <p className={styles["aqcard-title"]}>{title}</p>
          <p className={styles["aqcard-unit"]}>({unit})</p>
        </div>
        <p className={styles["aqcard-value"]}>{value}</p>
      </div>
    </div>
  );
};

export default AirQualityCard;
