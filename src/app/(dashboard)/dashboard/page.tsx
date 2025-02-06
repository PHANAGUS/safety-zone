"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useParams,
// } from "react-router-dom";
import styles from "../layout.module.css";

import AirQualitySection from "./components/AirQualitySection";

const main_url = process.env.NEXT_PUBLIC_URL;

const Dashboard: React.FC = () => {
  const router = useRouter();
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

  useEffect(() => {
    if (loading) return;
    if (username === "") {
      router.push("/login");
    }
  }, [username, loading]);

  return (
    <div className={styles["area"]}>
      <div className={styles["big-topic"]}>
        <div className={styles["big-topic-left"]}>
          <div className={styles["back-button"]} />
          <p>{roomName}</p>
          <p className={styles["big-topic-bracket"]}>({homeName})</p>
        </div>
      </div>
      <AirQualitySection />
    </div>
  );
};

export default Dashboard;
