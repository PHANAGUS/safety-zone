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

// import styles from "../layout.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./page.module.css";
import RoomCard from "./components/RoomCard";
import AddRoomCard from "./components/AddRoomCard";
import DeviceCard from "./components/DeviceCard";
import CreateRoomModal from "./components/CreateRoomModal";

import { get_roomlist } from "../../api/manage_room.js";
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
  const [roomlistKey, setRoomlistKey] = useState<number>(0);

  const [showCreateRoomModal, setShowCreateRoomModal] =
    useState<boolean>(false);

  const [devicelist, setDeviceList] = useState<devices[]>([]);

  const [needRefresh, setNeedRefresh] = useState<boolean>(false);

  const refreshRoomlist = () => {
    setRoomlistKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

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
  }, [username, userID, loading, roomlistKey]);

  useEffect(() => {
    if (needRefresh) {
      window.location.reload();
    }
  }, [needRefresh]);

  useEffect(() => {
    setDeviceList([]);
    setCurrentPage("roomlist");
    // console.log(currentPage);
  }, []);

  return (
    <div className={styles["page-grid"]}>
      <div className={styles["homeinfo-part"]}>
        <div className={styles["home-part"]}>{homeName}</div>
        <div className={styles["member-part"]}>Member</div>
      </div>
      <div className={styles["content-part"]}>
        <div className={styles["topic"]}>
          <div className={styles["topic-left"]}>
            <div
              className={styles["back-button"]}
              onClick={() => router.replace("/homelist")}
            />
            <p className={styles[""]}>รายการห้อง</p>
          </div>
          <div className={styles["topic-right"]}>
            <div
              className={styles["plus-button"]}
              onClick={() => setShowCreateRoomModal(true)}
            >
              + เพิ่มห้อง
            </div>
          </div>
        </div>
        <div className={styles["roomlist-container"]}>
          {roomlist.map((item, index) => (
            <RoomCard
              key={index}
              room_name={item["room_name"]}
              room_id={item["room_id"]}
              refreshRoomlist={refreshRoomlist}
            />
          ))}
        </div>
        <div className={styles["hr"]}></div>
        <div className={styles["topic"]}>
          <div className={styles["topic-left"]}>
            <p className={styles[""]}>อุปกรณ์</p>
          </div>
          <div className={styles["topic-right"]}>
            <div className={styles["plus-button"]}>+ เพิ่มอุปกรณ์</div>
          </div>
        </div>
        <div className={styles["roomlist-container"]}>
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

        <CreateRoomModal
          show={showCreateRoomModal}
          handleClose={() => setShowCreateRoomModal(false)}
          refreshRoomlist={refreshRoomlist}
        />
      </div>
    </div>
  );
};

export default Roomlist;
