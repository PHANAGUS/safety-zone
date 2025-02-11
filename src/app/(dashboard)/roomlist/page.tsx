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
import DeviceCard from "./components/DeviceCard";

import { get_roomlist } from "../../api/get_roomlist.js";
import { get_room_devices } from "../../api/get_devicelist.js";

const main_url = process.env.NEXT_PUBLIC_URL;

interface response_roomlist {
  message: string;
  rooms: rooms[];
}

interface rooms {
  room_name: string;
  room_id: number;
}

interface response_devicelist {
  message: string;
  data: devices[];
}

interface devices {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
  deviceInHomes: number;
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
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [roomlist, setRoomlist] = useState<rooms[]>([]);
  const [devicelist, setDeviceList] = useState<devices[]>([]);

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

        let this_home_devices: devices[] = [];

        for (let x of response.rooms) {
          const devices_response: response_devicelist = await get_room_devices(
            main_url,
            x.room_id
          );
          const this_room_devices: devices[] = devices_response.data;
          // console.log(this_room_devices);
          this_room_devices.forEach((x) => {
            // console.log(x);
            this_home_devices.push(x);
          });
        }
        // this_home_devices.forEach((x) => {
        //   console.log(x);
        // });

        setDeviceList(this_home_devices);
      };
      fetchData();
    }
  }, [username, userID, loading]);

  useEffect(() => {
    setDeviceList([]);
    setCurrentPage("roomlist");
    // console.log(currentPage);
  }, []);

  return (
    <div className={styles["area"]}>
      <div className={styles["big-topic"]}>
        <div className={styles["big-topic-left"]}>
          {/* <p>โปรดเลือกห้องเพื่อดำเนินการต่อ</p> */}
          <p>ห้องของคุณ</p>
          <p className={styles["big-topic-bracket"]}>({homeName})</p>
        </div>
      </div>
      <div className={`${styles["roomlist-container"]} ${styles["scrollbar"]}`}>
        {roomlist.map((item, index) => (
          <RoomCard
            key={index}
            room_name={item["room_name"]}
            room_id={item["room_id"]}
          />
        ))}
        <AddRoomCard />
      </div>
      <div className={styles["big-topic"]}>
        <p>อุปกรณ์ของคุณ</p>
      </div>
      <div className={`${styles["homelist-container"]} ${styles["scrollbar"]}`}>
        {devicelist.map((item, index) => (
          <DeviceCard
            key={index}
            deviceID={item["deviceID"]}
            deviceName={item["deviceName"]}
            deviceStatus={item["deviceStatus"]}
            deviceInRoom={item["deviceInHomes"]}
          />
        ))}
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
