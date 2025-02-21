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
import AddHomeMemberModal from "./components/Modal_AddHomeMember";
import ConfirmDeleteHomeModal from "./components/Modal_ConfirmDeleteHome";
import CreateRoomModal from "./components/Modal_CreateRoom";
import CreateDeviceModal from "./components/Modal_CreateDevice";

import { IoHome } from "react-icons/io5";
import { IoChevronBack } from "react-icons/io5";
import { TiUserAdd } from "react-icons/ti";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiHome6Line } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";
import { PiFlowerTulip } from "react-icons/pi";

import { get_roomlist } from "@/app/api/manage_room";
import {
  get_room_devices,
  get_unassigned_devices,
} from "@/app/api/manage_device";

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

interface response_unassigned_devicelist {
  message: string;
  devices: unassigned_device[];
}

interface devices {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
  deviceInHomes: number;
  room_name: string;
  home_name: string;
}

interface unassigned_device {
  deviceInHomes: number;
  deviceInRoom: number;
  deviceName: string;
  deviceStatus: string;
  device_id: number;
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

  const [devicelist, setDeviceList] = useState<devices[]>([]);
  const [devicelistKey, setDevicelistKey] = useState<number>(0);

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
  const [showCreateDeviceModal, setShowCreateDeviceModal] =
    useState<boolean>(false);

  const refreshRoomlist = () => {
    setRoomlistKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };
  const refreshDevicelist = () => {
    setDevicelistKey((prevKey) => (prevKey === 0 ? 1 : 0));
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
        setRoomlist(response.rooms);

        let this_home_devices: devices[] = [];

        for (let x of response.rooms) {
          const devices_response: response_devicelist = await get_room_devices(
            main_url,
            x.room_id
          );
          const this_room_devices: devices[] = devices_response.data;
          // console.log(this_room_devices);
          this_room_devices.forEach((x) => {
            this_home_devices.push(x);
          });
        }

        const unassigned_devices_response: response_unassigned_devicelist =
          await get_unassigned_devices(main_url, userID);

        if (
          unassigned_devices_response.message !==
          "No unassigned devices found for this user."
        ) {
          const user_unassigned_devices: unassigned_device[] =
            unassigned_devices_response.devices;

          const to_normal_devices_type: devices[] = [];
          for (let x of user_unassigned_devices) {
            to_normal_devices_type.push({
              deviceID: x.device_id,
              deviceName: x.deviceName,
              deviceStatus: x.deviceStatus,
              deviceInRoom: x.deviceInRoom,
              deviceInHomes: x.deviceInHomes,
              room_name: "",
              home_name: "",
            });
          }
          this_home_devices.push(...to_normal_devices_type);
        }

        // console.log(this_home_devices);

        setDeviceList(this_home_devices);
      };
      fetchData();
    }
  }, [username, userID, loading, roomlistKey, devicelistKey]);

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
          <div className={styles["home-pic"]}>
            <PiFlowerTulip className={styles["picture-icon"]} />
          </div>
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
            className={styles["create-room-button"]}
            onClick={() => setShowCreateRoomModal(true)}
          >
            <RiHome6Line />
            <p className={styles[""]}>เพิ่มห้อง</p>
          </div>
        ) : (
          <div
            className={styles["create-room-button"]}
            onClick={() => setShowCreateDeviceModal(true)}
          >
            <TbLayoutGridAdd />
            <p className={styles[""]}>เพิ่มอุปกรณ์</p>
          </div>
        )}

        {displayMode ? (
          <div className={styles["roomlist-container"]} key={roomlistKey}>
            {roomlist.map((item, index) => (
              <RoomCard
                key={index}
                this_card_room={item}
                refreshRoomlist={refreshRoomlist}
              />
            ))}
          </div>
        ) : (
          <div className={styles["roomlist-container"]} key={devicelistKey}>
            {devicelist.map((item, index) => (
              <DeviceCard
                key={index}
                this_card_device={item}
                roomlist={roomlist}
                refreshDevicelist={refreshDevicelist}
              />
            ))}
          </div>
        )}

        <CreateRoomModal
          show={showCreateRoomModal}
          handleClose={() => setShowCreateRoomModal(false)}
          refreshRoomlist={refreshRoomlist}
        />
        <CreateDeviceModal
          show={showCreateDeviceModal}
          handleClose={() => setShowCreateDeviceModal(false)}
          refreshDevicelist={refreshDevicelist}
          roomlist={roomlist}
        />
      </div>
    </div>
  );
};

export default Roomlist;
