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
import DeviceCard from "./components/DeviceCard";
import AddHomeMemberModal from "./components/AddHomeMemberModal";
import ConfirmDeleteHomeModal from "./components/ConfirmDeleteHomeModal";
import CreateRoomModal from "./components/CreateRoomModal";

import { IoHome } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { get_roomlist } from "@/app/api/manage_room.js";
import { get_room_devices } from "@/app/api/get_devicelist.js";

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
    home,
    setHome,
    room,
    setRoom,
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [roomlist, setRoomlist] = useState<rooms[]>([]);
  const [roomlistKey, setRoomlistKey] = useState<number>(0);

  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const toggleDisplayMode = () => {
    if (displayMode) {
      setDisplayMode(false);
    } else {
      setDisplayMode(true);
    }
  };

  const [showAddHomeMemberModal, setShowAddHomeMemberModal] =
    useState<boolean>(false);
  const [showConfirmDeleteHomeModal, setShowConfirmDeleteHomeModal] =
    useState<boolean>(false);
  const [showCreateRoomModal, setShowCreateRoomModal] =
    useState<boolean>(false);

  const [devicelist, setDeviceList] = useState<devices[]>([]);

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
          home.home_id
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
    setDeviceList([]);
    setCurrentPage("roomlist");
    // console.log(currentPage);
  }, []);

  return (
    <div className={styles["page-grid"]}>
      <div className={styles["homeinfo-part"]}>
        <div className={styles["info-part"]}>
          <div className={styles["title-line"]}>
            <IoHome className={styles["home-icon"]} />
            <div className={styles["homename-line"]}>
              <p className={styles["homename-text"]}>{home.home_name}</p>
              <p className={styles["homeid-text"]}>(ID: {home.home_id})</p>
            </div>
          </div>
          <div className={styles["info-box"]}>
            <p className={styles["home-detail-text"]}>
              สร้างโดย UserID: {home.mainUserID}
            </p>
          </div>
          <div className={styles["button-container"]}>
            <div
              className={styles["add-member-button"]}
              onClick={() => setShowAddHomeMemberModal(true)}
            >
              <TiUserAdd className={styles["add-member-icon"]} />
              <p className={styles[""]}>เพิ่มสมาชิก</p>
            </div>
            <div
              className={styles["delete-home-button"]}
              onClick={() => setShowConfirmDeleteHomeModal(true)}
            >
              <RiDeleteBin5Fill className={styles["delete-home-icon"]} />
              <p className={styles[""]}>ลบบ้าน</p>
            </div>
          </div>
        </div>
        <div className={styles["picture-part"]}>
          <div className={styles["home-pic"]}></div>
        </div>

        <AddHomeMemberModal
          show={showAddHomeMemberModal}
          handleClose={() => setShowAddHomeMemberModal(false)}
        />
        <ConfirmDeleteHomeModal
          show={showConfirmDeleteHomeModal}
          handleClose={() => setShowConfirmDeleteHomeModal(false)}
        />
      </div>
      <div className={styles["content-part"]}>
        <div className={styles["display-mode-switch"]}>
          <IoChevronBack
            className={styles["back-button"]}
            onClick={() => router.replace("/homelist")}
          />
          <div
            className={
              displayMode ? styles["mode-button-sl"] : styles["mode-button-nsl"]
            }
            onClick={() => toggleDisplayMode()}
          >
            รายการห้อง
          </div>
          <div
            className={
              displayMode ? styles["mode-button-nsl"] : styles["mode-button-sl"]
            }
            onClick={() => toggleDisplayMode()}
          >
            อุปกรณ์
          </div>
        </div>

        {displayMode ? (
          <div
            className={styles["plus-button"]}
            onClick={() => setShowCreateRoomModal(true)}
          >
            + เพิ่มห้อง
          </div>
        ) : (
          <div className={styles["plus-button"]}>+ เพิ่มอุปกรณ์</div>
        )}

        {displayMode ? (
          <div className={styles["roomlist-container"]}>
            {roomlist.map((item, index) => (
              <RoomCard
                key={index}
                this_card_room={item}
                refreshRoomlist={refreshRoomlist}
              />
            ))}
          </div>
        ) : (
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
        )}

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
