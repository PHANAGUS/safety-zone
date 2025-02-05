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
import HomeCard from "./components/HomeCard";
import AddHomeCard from "./components/AddHomeCard";

import { get_homelist } from "../../api/get_homelist.js";

const main_url = process.env.NEXT_PUBLIC_URL;

interface response_homelist {
  message: string;
  homes: homes[];
}

interface homes{
  home_name: string;
  home_id: number;
}

const Homelist: React.FC = () => {
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

  const [homelist, setHomelist] = useState<homes[]>([]);

  useEffect(() => {
    if (loading) return;
    if (username === "") {
      router.push("/login");
    }
  }, [username, loading]);

  useEffect(() => {
    const fetchData = async () => {
      const response : response_homelist = await get_homelist(main_url, userID);
      console.log(response);
      setHomelist(response.homes);
      console.log(homelist);
    };
    console.log("homelist");
    fetchData();
  }, []);

  return (
    <div className={styles["area"]}>
      <div className={styles["big-topic"]}>
        <p>โปรดเลือกบ้านเพื่อดำเนินการต่อ</p>
      </div>
      <div className={styles["homelist-container"]}>
        {homelist.map((item, index) => (
          <HomeCard
            key={index}
            homename={item["home_name"]}
            homeid={item["home_id"]}
          />
        ))}
        <AddHomeCard />
      </div>
      {/* <div className={styles["section-failed-box"]}>
          <div className={styles["section-failed-pic"]}></div>
          <p className={styles["section-failed-text"]}>
            ขออภัย ระบบเกิดข้อขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง
          </p>
        </div> */}
    </div>
  );
};

export default Homelist;
