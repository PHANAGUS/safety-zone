"use client";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import styles from "../layout.module.css";

const Homelist: React.FC = () => {
  return (
    <div className={styles.section}>
      <div className={styles["section-header"]}>
        <div className={styles["section-header-text-area"]}>
          <p className={styles["section-header-title"]}>
            โปรดเลือกบ้านเพื่อดำเนินการต่อ
          </p>
        </div>
      </div>
      <div className={styles["section-container"]}>
        <div className={styles["section-failed-box"]}>
          <div className={styles["section-failed-pic"]}></div>
          <p className={styles["section-failed-text"]}>
            ขออภัย ระบบเกิดข้อขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homelist;
