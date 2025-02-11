"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import { getLatestRecord } from "@/app/api/get_sensor.js";

import styles from "./DeviceCard.module.css";

const main_url = process.env.NEXT_PUBLIC_URL;

interface DeviceCardProps {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
}

const RoomCard: React.FC<DeviceCardProps> = ({
  deviceID,
  deviceName,
  deviceStatus,
  deviceInRoom,
}) => {
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

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_dashboard = () => {
    setRoomID(deviceInRoom);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (roomID === deviceInRoom && clicked) {
      // console.log("Updated roomID:", roomID);
      // console.log(roomName);
      setClicked(false);
      router.push("/dashboard");
    }
  }, [roomID, clicked]);

  return (
    <div className={styles["device-card"]}>
      <div className={styles["square"]}></div>
      <div className={styles["text-container"]}>
        <p className={styles["devicename"]}>{deviceName}</p>
        <span className={styles["deviceid"]}>
          <p>ID: {deviceID}</p>
          <p>InRoom: {deviceInRoom}</p>
        </span>
      </div>
    </div>
  );
};

export default RoomCard;
