"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_CreateDevice.module.css";

import { add_new_device } from "@/app/api/manage_device";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface NewDeviceModalProps {
  show: boolean;
  handleClose: () => void;

  refreshDevicelist: () => void;
  roomlist: rooms[];
}

const NewDeviceModal: React.FC<NewDeviceModalProps> = ({
  show,
  handleClose,
  refreshDevicelist,
  roomlist,
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

  const [typingDeviceName, setTypingDeviceName] = useState<string>("");
  const [isThisDeviceSensor, setIsThisDeviceSensor] = useState<number>(0);
  const [selectedRoomID, setSelectedRoomID] = useState<number>(-1);

  const confirm_clicked = async () => {
    if (
      selectedRoomID === -1 ||
      typingDeviceName === "" ||
      isThisDeviceSensor === null
    ) {
      console.log("เพิ่มอุปกรณ์ไม่สำเร็จ");
      return;
    }
    await add_new_device(
      main_url,
      selectedRoomID,
      typingDeviceName,
      isThisDeviceSensor
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
            <p className={styles["input-title"]}>ชื่ออุปกรณ์</p>
            <input
              type="text"
              value={typingDeviceName}
              onChange={(e) => setTypingDeviceName(e.target.value)}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["input-section"]}>
            <p className={styles["input-title"]}>
              อุปกรณ์นี้เป็นเซ็นเซอร์หรือไม่
            </p>
            <div className={styles["radio-button-container"]}>
              <label className={styles["each-radio-button"]}>
                <input
                  type="radio"
                  name="booleanRadio"
                  value="true"
                  checked={isThisDeviceSensor === 1}
                  onChange={() => setIsThisDeviceSensor(1)}
                  className={styles["radio-button-checkbox"]}
                />
                <div className={styles["radio-button-text"]}>เป็นเซ็นเซอร์</div>
              </label>

              <label className={styles["each-radio-button"]}>
                <input
                  type="radio"
                  name="booleanRadio"
                  value="false"
                  checked={isThisDeviceSensor === 0}
                  onChange={() => setIsThisDeviceSensor(0)}
                  className={styles["radio-button-checkbox"]}
                />
                <div className={styles["radio-button-text"]}>
                  ไม่เป็นเซ็นเซอร์
                </div>
              </label>
            </div>
          </div>
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
