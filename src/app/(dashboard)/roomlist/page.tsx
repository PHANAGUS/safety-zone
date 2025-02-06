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
import RoomCard from "./components/RoomCard";
import AddRoomCard from "./components/AddRoomCard";

import { get_roomlist } from "../../api/get_roomlist.js";

const main_url = process.env.NEXT_PUBLIC_URL;

interface response_roomlist {
  message: string;
  rooms: rooms[];
}

interface rooms {
  room_name: string;
  room_id: number;
}

const Roomlist: React.FC = () => {
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

  const [roomlist, setRoomlist] = useState<rooms[]>([]);

  useEffect(() => {
    if (loading) return;
    if (username === "" || userID === 0) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        const response: response_roomlist = await get_roomlist(
          main_url,
          homeID
        );
        // console.log(response);
        // console.log(homeID);
        setRoomlist(response.rooms);
        // console.log(roomlist);
      };
      fetchData();
    }
  }, [username, userID, loading]);

  return (
    <div className={styles["area"]}>
      <div className={styles["big-topic"]}>
        <div className={styles["big-topic-left"]}>
          <p>โปรดเลือกห้องเพื่อดำเนินการต่อ</p>
          <p className={styles["big-topic-bracket"]}>({homeName})</p>
        </div>
      </div>
      <div className={styles["homelist-container"]}>
        {roomlist.map((item, index) => (
          <RoomCard
            key={index}
            room_name={item["room_name"]}
            room_id={item["room_id"]}
          />
        ))}
        <AddRoomCard />
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

export default Roomlist;
