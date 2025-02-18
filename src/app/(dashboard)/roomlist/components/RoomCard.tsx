"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import { getLatestRecord } from "@/app/api/get_sensor.js";
import { delete_room } from "@/app/api/manage_room";

import styles from "./RoomCard.module.css";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface RoomCardProps {
  this_card_room: rooms;

  refreshRoomlist: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  this_card_room,
  refreshRoomlist,
}) => {
  const router = useRouter();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    // homeName,
    // setHomeName,
    // homeID,
    // setHomeID,
    // roomName,
    // setRoomName,
    // roomID,
    // setRoomID,
    home,
    setHome,
    room,
    setRoom,
  } = useGlobalState();

  const [fetchComplete, setFetchComplete] = useState<boolean>(true);

  const [pm25, setPm25] = useState();
  const [co2, setCo2] = useState();

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_dashboard = () => {
    // setRoomID(room_id);
    // setRoomName(room_name);
    setRoom(this_card_room);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (room.room_id === this_card_room.room_id && clicked) {
      // console.log("Updated roomID:", roomID);
      // console.log(roomName);
      setClicked(false);
      router.push("/dashboard");
    }
  }, [room, clicked]);

  const delete_this_room = async () => {
    await delete_room(main_url, this_card_room.room_id);
    refreshRoomlist();
  };

  useEffect(() => {
    const fetchData = async () => {
      const new_data = await getLatestRecord(main_url, this_card_room.room_id);

      if (new_data != null) {
        setFetchComplete(true);

        setPm25(new_data.pm25);
        setCo2(new_data.co2);
      } else {
        setFetchComplete(false);
      }
    };

    fetchData(); // Call the async function once

    // No cleanup needed as this runs only once
  }, []);

  return (
    <div className={styles["room-card"]}>
      <div className={styles["square"]}></div>
      <div className={styles["text-container"]}>
        <div className={styles["room-detail-container"]}>
          <p className={styles["roomname"]}>{this_card_room.room_name}</p>
          <p className={styles["roomid"]}>(ID: {this_card_room.room_id})</p>
        </div>
        <div className={styles["hr"]} />
        <div className={styles["variable-container"]}>
          <div className={styles["each-variable-container"]}>
            <div className={styles["variable-and-unit-container"]}>
              <p className={styles["variable-name"]}>PM2.5</p>
              <p className={styles["unit"]}>(µg/m³)</p>
            </div>
            <p className={styles["value"]}>{pm25}</p>
            {/* <p className={styles["value"]}>55</p> */}
          </div>
          <div className={styles["each-variable-container"]}>
            <div className={styles["variable-and-unit-container"]}>
              <p className={styles["variable-name"]}>CO2</p>
              <p className={styles["unit"]}>(ppm)</p>
            </div>
            <p className={styles["value"]}>{co2}</p>
            {/* <p className={styles["value"]}>400</p> */}
          </div>
        </div>
        <div className={styles["delete-button"]} onClick={delete_this_room}>
          ลบห้อง
        </div>
        <div
          className={styles["go-dashboard-button"]}
          onClick={go_to_dashboard}
        >
          ไปยัง Dashboard
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
