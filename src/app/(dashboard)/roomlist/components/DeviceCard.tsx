"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import { getLatestRecord } from "@/app/api/get_sensor.js";
import { place_unassigned_device } from "@/app/api/manage_device";

import styles from "./DeviceCard.module.css";

import EditDeviceModal from "./Modal_EditDevice";
import AssignDeviceModal from "./Modal_AssignDevice";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { RiKeyboardFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GiElectric } from "react-icons/gi";
import { MdOutlineDeveloperBoard } from "react-icons/md";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface devices {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
  deviceInHomes: number;
  room_name: string;
  home_name: string;
  isSensorDevice: number;
}

interface DeviceCardProps {
  this_card_device: devices;
  roomlist: rooms[];

  refreshDevicelist: () => void;
}

const RoomCard: React.FC<DeviceCardProps> = ({
  this_card_device,
  roomlist,
  refreshDevicelist,
}) => {
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

  const [showConfirmDeleteDeviceModal, setShowConfirmDeleteDeviceModal] =
    useState<boolean>(false);
  const [showEditDeviceModal, setShowEditDeviceModal] =
    useState<boolean>(false);
  const [showAssignDeviceModal, setShowAssignDeviceModal] =
    useState<boolean>(false);

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_dashboard = () => {
    setRoom({
      room_name: this_card_device.room_name,
      room_id: this_card_device.deviceInRoom,
    });
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };
  useEffect(() => {
    if (room.room_id === this_card_device.deviceInRoom && clicked) {
      setClicked(false);
      router.push("/dashboard");
    }
  }, [room, clicked]);

  return (
    <div className={styles["device-card"]}>
      <div className={styles["x-button"]}>
        <RxCross2 className={styles["x-icon"]} />
      </div>
      <div className={styles["picture-part"]}>
        <div className={styles["device-pic"]}>
          <RiKeyboardFill className={styles["picture-icon"]} />
        </div>
      </div>
      <div className={styles["info-part"]}>
        <div className={styles["seperate-info-device-name"]}>
          <div className={styles["device-name-line"]}>
            <div className={styles["device-name"]}>
              {this_card_device.deviceName}
            </div>
            <div
              className={styles["rename-button"]}
              onClick={() => setShowEditDeviceModal(true)}
            >
              <BiEditAlt className={styles["rename-icon"]} />
            </div>
          </div>
          <div className={styles["info-text"]}>
            ID: {this_card_device.deviceID}
          </div>
        </div>
        {/* <div className={styles["hr"]}></div> */}
        <div className={styles["seperate-info-device-detail"]}>
          {/* <div className={styles["info-text"]}>
            <FaLocationDot style={{ color: "rgb(228, 81, 81)" }} />
            {this_card_device.deviceInRoom === null
              ? "ยังไม่ได้กำหนดห้อง"
              : `${this_card_device.room_name} (${this_card_device.deviceInRoom})`}
          </div> */}
          <div
            className={styles["info-text"]}
            style={{
              color: this_card_device.deviceStatus === "on" ? "#74bf62" : "",
              fontWeight: this_card_device.deviceStatus === "on" ? 400 : 300,
              backgroundColor:
                this_card_device.deviceStatus === "on"
                  ? "rgb(241, 255, 235)"
                  : "",
              width:
                this_card_device.deviceStatus === "on" ? "fit-content" : "",
            }}
          >
            <RiShutDownLine />
            {this_card_device.deviceStatus === "on"
              ? "กำลังทำงานอยู่"
              : "ปิดการใช้งาน"}
          </div>
          {this_card_device.isSensorDevice === 0 ? (
            <div
              className={styles["info-text"]}
              style={{
                width: "fit-content",
                // backgroundColor: "rgb(255, 252, 235)",
                // color: "rgb(175, 160, 118)",
                color: "rgb(196, 170, 98)",
                fontWeight: 400,
              }}
            >
              <GiElectric style={{ color: "rgb(247, 206, 24)" }} />
              กินไฟประมาณ xxx บาท/วัน
            </div>
          ) : (
            <div
              className={styles["info-text"]}
              style={{
                width: "fit-content",
                // backgroundColor: "rgb(255, 243, 255)",
                color: "rgb(201, 123, 197)",
                fontWeight: 400,
              }}
            >
              <MdOutlineDeveloperBoard
                style={{ color: "rgb(201, 123, 197)" }}
              />
              เซ็นเซอร์
            </div>
          )}
        </div>
      </div>
      <div className={styles["button-part"]}>
        {/* <div
          className={styles["delete-button"]}
          onClick={() => setShowConfirmDeleteDeviceModal(true)}
        >
          <RiDeleteBin5Fill className={styles["bin-icon"]} />
        </div> */}
        {/* <div
          className={styles["edit-button"]}
          onClick={() => setShowEditDeviceModal(true)}
        >
          <BiEdit className={styles["edit-icon"]} />
        </div> */}

        {this_card_device.deviceInRoom === null ? (
          <div
            className={styles["go-button"]}
            onClick={() => setShowAssignDeviceModal(true)}
          >
            <p className={styles["go-button-text"]}>กำหนดห้อง</p>
            <TbLayoutGrid className={styles["next-icon"]} />
          </div>
        ) : (
          // <div className={styles["go-button"]} onClick={go_to_dashboard}>
          //   <p className={styles["go-button-text"]}>ไปยัง Dashboard</p>
          //   <MdNavigateNext className={styles["next-icon"]} />
          // </div>

          <div className={styles["go-button"]} onClick={go_to_dashboard}>
            <FaLocationDot style={{ color: "rgb(228, 81, 81)" }} />
            <p className={styles["go-button-text"]}>
              ไปยัง {this_card_device.room_name} (
              {this_card_device.deviceInRoom})
            </p>
            <MdNavigateNext className={styles["next-icon"]} />
          </div>
        )}
      </div>
      {/* <ConfirmDeleteDeviceModal
        show={showConfirmDeleteDeviceModal}
        handleClose={() => setShowConfirmDeleteDeviceModal(false)}
        this_card_room={this_card_room}
        refreshRoomlist={refreshRoomlist}
      /> */}
      <EditDeviceModal
        show={showEditDeviceModal}
        handleClose={() => setShowEditDeviceModal(false)}
        this_card_device={this_card_device}
        refreshDevicelist={refreshDevicelist}
      />
      <AssignDeviceModal
        show={showAssignDeviceModal}
        handleClose={() => setShowAssignDeviceModal(false)}
        this_card_device={this_card_device}
        roomlist={roomlist}
        refreshDevicelist={refreshDevicelist}
      />
    </div>
  );
};

export default RoomCard;
