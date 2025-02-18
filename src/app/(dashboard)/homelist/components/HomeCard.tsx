"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import styles from "./HomeCard.module.css";

interface homes {
  home_id: number;
  home_name: string;
  mainUserID: number;
}

interface HomeCardProps {
  this_card_home: homes;
}

const HomeCard: React.FC<HomeCardProps> = ({ this_card_home }) => {
  const router = useRouter();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    home,
    setHome,
    room,
    setRoom,
  } = useGlobalState();

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_roomlist = () => {
    // setHomeID(home_id);
    // setHomeName(home_name);
    setHome(this_card_home);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (home.home_id === this_card_home.home_id && clicked) {
      // console.log("Updated homeID:", homeID);
      // console.log(homeName);
      setClicked(false);
      router.push("/roomlist");
    }
  }, [home, clicked]);

  return (
    <div className={styles["home-card"]} onClick={go_to_roomlist}>
      <div className={styles["square"]}></div>
      <div className={styles["text-container"]}>
        <p className={styles["homename"]}>{this_card_home.home_name}</p>
        <p className={styles["homeid"]}>ID: {this_card_home.home_id}</p>
      </div>
    </div>
  );
};

export default HomeCard;
