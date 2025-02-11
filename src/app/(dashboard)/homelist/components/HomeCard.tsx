"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import styles from "./HomeCard.module.css";

interface HomeCardProps {
  home_name: string;
  home_id: number;
}

const HomeCard: React.FC<HomeCardProps> = ({ home_name, home_id }) => {
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

  const go_to_roomlist = () => {
    setHomeID(home_id);
    setHomeName(home_name);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (homeID === home_id && clicked) {
      // console.log("Updated homeID:", homeID);
      // console.log(homeName);
      setClicked(false);
      router.push("/roomlist");
    }
  }, [homeID, clicked]);

  return (
    <div className={styles["home-card"]} onClick={go_to_roomlist}>
      <div className={styles["square"]}></div>
      <div className={styles["text-container"]}>
        <p className={styles["homename"]}>{home_name}</p>
        <p className={styles["homeid"]}>ID: {home_id}</p>
      </div>
    </div>
  );
};

export default HomeCard;
