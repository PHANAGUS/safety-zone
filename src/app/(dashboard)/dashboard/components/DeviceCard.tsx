"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import { getLatestRecord } from "@/app/api/get_sensor.js";
import {
  place_unassigned_device,
  update_device_status,
} from "@/app/api/manage_device";

import styles from "./DeviceCard.module.css";

import EditDeviceModal from "./Modal_EditDevice";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { TbLayoutGrid } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { RiShutDownLine } from "react-icons/ri";
import { RiKeyboardFill } from "react-icons/ri";

const main_url = process.env.NEXT_PUBLIC_URL;

interface devices {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
  deviceInHomes: number;
  room_name: string;
  home_name: string;
}

interface DeviceCardProps {
  this_card_device: devices;
  refreshDevicelist: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  this_card_device,
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

  const switch_device = async () => {
    if (this_card_device.deviceStatus === "on") {
      await update_device_status(main_url, this_card_device.deviceID, "off");
    } else {
      await update_device_status(main_url, this_card_device.deviceID, "on");
    }
    refreshDevicelist();
  };

  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div className={styles["device-card"]}>
      <div className={styles["picture-part"]}>
        <div className={styles["device-pic"]}>
          <RiKeyboardFill className={styles["picture-icon"]} />
        </div>
      </div>
      <div className={styles["info-part"]}>
        <div className={styles["device-name"]}>
          {this_card_device.deviceName}
        </div>
        <div className={styles["info-text"]}>
          ID: {this_card_device.deviceID}
        </div>
      </div>
      <div className={styles["button-part"]}>
        <div
          className={styles["delete-button"]}
          onClick={() => setShowConfirmDeleteDeviceModal(true)}
        >
          <RiDeleteBin5Fill className={styles["bin-icon"]} />
        </div>
        <div
          className={styles["edit-button"]}
          onClick={() => setShowEditDeviceModal(true)}
        >
          <BiEdit className={styles["edit-icon"]} />
        </div>

        {this_card_device.deviceStatus === "on" ? (
          <div className={styles["off-button"]} onClick={switch_device}>
            <RiShutDownLine className={styles["next-icon"]} />
            <p className={styles["off-button-text"]}>ปิดการใช้งาน</p>
          </div>
        ) : (
          <div className={styles["on-button"]} onClick={switch_device}>
            <RiShutDownLine className={styles["next-icon"]} />
            <p className={styles["on-button-text"]}>เปิดการใช้งาน</p>
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
      {/* <AssignDeviceModal
        show={showAssignDeviceModal}
        handleClose={() => setShowAssignDeviceModal(false)}
        roomlist={roomlist}
        refreshDevicelist={refreshDevicelist}
      /> */}
    </div>
  );
};

export default DeviceCard;
