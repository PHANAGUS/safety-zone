"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_AssignDevice.module.css";

import { place_unassigned_device } from "@/app/api/manage_device";

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
}

interface NewDeviceModalProps {
  show: boolean;
  handleClose: () => void;

  refreshDevicelist: () => void;
  roomlist: rooms[];
  this_card_device: devices;
}

const NewDeviceModal: React.FC<NewDeviceModalProps> = ({
  show,
  handleClose,
  refreshDevicelist,
  roomlist,
  this_card_device,
}) => {
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

  const [selectedRoomID, setSelectedRoomID] = useState<number>(-1);

  const confirm_clicked = async () => {
    if (selectedRoomID === -1) {
      console.log("จัดการอุปกรณ์ไม่สำเร็จ");
      return;
    }
    await place_unassigned_device(
      main_url,
      this_card_device.deviceID,
      selectedRoomID
    );
    refreshDevicelist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เพิ่มอุปกรณ์ใหม่</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["content-container"]}>
          <div className={styles["input-section"]}>
            <p className={styles["input-title"]}>ติดตั้งที่ห้อง</p>
            <div className={styles["radio-button-container"]}>
              {roomlist.map((item, index) => (
                <label key={index} className={styles["each-radio-button"]}>
                  <input
                    type="radio"
                    name="radioGroup"
                    value={item.room_id}
                    checked={selectedRoomID === item.room_id}
                    onChange={() => setSelectedRoomID(item.room_id)}
                    className={styles["radio-button-checkbox"]}
                  />
                  <div className={styles["radio-button-text"]}>
                    {item.room_name}
                  </div>
                </label>
              ))}
            </div>
          </div>
          {/* <p>{typingDeviceName}</p> */}
          {/* <p>{isThisDeviceSensor}</p> */}
          {/* <p>{selectedRoomID}</p> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={confirm_clicked}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDeviceModal;
