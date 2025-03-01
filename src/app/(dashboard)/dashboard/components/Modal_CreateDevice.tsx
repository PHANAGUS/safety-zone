"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_CreateDevice.module.css";

import {
  add_new_sensor_device,
  add_new_elctrical_device,
} from "@/app/api/manage_device";

const main_url = process.env.NEXT_PUBLIC_URL;

interface NewDeviceModalProps {
  show: boolean;
  handleClose: () => void;

  refreshDevicelist: () => void;
}

const NewDeviceModal: React.FC<NewDeviceModalProps> = ({
  show,
  handleClose,
  refreshDevicelist,
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
  const [isSensorOutside, setIsSensorOutside] = useState<number>(-1);
  const [electricalDeviceType, setElectricalDeviceType] = useState<string>("");

  const confirm_clicked = async () => {
    if (
      typingDeviceName !== "" &&
      isThisDeviceSensor === 0 &&
      electricalDeviceType !== "" &&
      electricalDeviceType !== "Unknown" &&
      room.room_id !== -1
    ) {
      await add_new_elctrical_device(
        main_url,
        room.room_id,
        typingDeviceName,
        electricalDeviceType
      );
      // console.log("เข้าเคสสร้างอุปกรณ์");
      handleClose();
      refreshDevicelist();
    } else if (
      typingDeviceName !== "" &&
      isThisDeviceSensor === 1 &&
      isSensorOutside !== -1 &&
      room.room_id !== -1
    ) {
      await add_new_sensor_device(
        main_url,
        room.room_id,
        typingDeviceName,
        isSensorOutside
      );
      // console.log("เข้าเคสสร้างเซ็นเซอร์");
      handleClose();
      refreshDevicelist();
    } else {
      // console.log("ไม่เข้าเคส");
    }
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
                  name="isSensorRadio"
                  value="false"
                  checked={isThisDeviceSensor === 0}
                  onChange={() => {
                    setIsThisDeviceSensor(0);
                    setIsSensorOutside(-1);
                  }}
                  className={styles["radio-button-checkbox"]}
                />
                <div className={styles["radio-button-text"]}>
                  ไม่เป็นเซ็นเซอร์
                </div>
              </label>

              <label className={styles["each-radio-button"]}>
                <input
                  type="radio"
                  name="isSensorRadio"
                  value="true"
                  checked={isThisDeviceSensor === 1}
                  onChange={() => {
                    setIsThisDeviceSensor(1);
                    setElectricalDeviceType("");
                  }}
                  className={styles["radio-button-checkbox"]}
                />
                <div className={styles["radio-button-text"]}>เป็นเซ็นเซอร์</div>
              </label>
            </div>
          </div>
          {isThisDeviceSensor === 1 ? (
            <div className={styles["input-section"]}>
              <p className={styles["input-title"]}>
                ตำแหน่งที่ติดตั้งเซ็นเซอร์
              </p>
              <div className={styles["radio-button-container"]}>
                <label className={styles["each-radio-button"]}>
                  <input
                    type="radio"
                    name="sensorPlaceRadio"
                    value="true"
                    checked={isSensorOutside === 1}
                    onChange={() => setIsSensorOutside(1)}
                    className={styles["radio-button-checkbox"]}
                  />
                  <div className={styles["radio-button-text"]}>นอกห้อง</div>
                </label>

                <label className={styles["each-radio-button"]}>
                  <input
                    type="radio"
                    name="sensorPlaceRadio"
                    value="false"
                    checked={isSensorOutside === 0}
                    onChange={() => setIsSensorOutside(0)}
                    className={styles["radio-button-checkbox"]}
                  />
                  <div className={styles["radio-button-text"]}>ในห้อง</div>
                </label>
              </div>
            </div>
          ) : (
            <div className={styles["input-section"]}>
              <p className={styles["input-title"]}>ประเภทของอุปกรณ์</p>
              <div className={styles["radio-button-container"]}>
                <label className={styles["each-radio-button"]}>
                  <input
                    type="radio"
                    name="electricalTypeRadio"
                    value="true"
                    checked={electricalDeviceType === "Air Purifier"}
                    onChange={() => setElectricalDeviceType("Air Purifier")}
                    className={styles["radio-button-checkbox"]}
                  />
                  <div className={styles["radio-button-text"]}>
                    เครื่องกรองอากาศ
                  </div>
                </label>

                <label className={styles["each-radio-button"]}>
                  <input
                    type="radio"
                    name="electricalTypeRadio"
                    value="false"
                    checked={electricalDeviceType === "Exhaust fan"}
                    onChange={() => setElectricalDeviceType("Exhaust fan")}
                    className={styles["radio-button-checkbox"]}
                  />
                  <div className={styles["radio-button-text"]}>
                    พัดลมดูดอากาศ
                  </div>
                </label>
              </div>
            </div>
          )}
          {/* <div className={styles[""]}>
            <p>ชื่อ: {typingDeviceName}</p>
            <p>
              เป็นเซ็นเซอร์มั้ย: {isThisDeviceSensor === 0 ? `ไม่` : "ใช่"} (
              {isThisDeviceSensor})
            </p>
            <p>
              ตำแหน่งเซ็นเซอร์:{" "}
              {isSensorOutside === -1
                ? "ไม่ใช่เซ็นเซอร์จ้า"
                : isSensorOutside === 0
                ? "ในห้อง"
                : "นอกห้อง"}{" "}
              ({isSensorOutside})
            </p>
            <p>
              ชนิดเครื่องใช้ไฟฟ้า:{" "}
              {electricalDeviceType === ""
                ? "เป็นเซ็นเซอร์จ้า มันไม่มีไทป์"
                : electricalDeviceType}
            </p>
            <p>วางที่ห้อง: {room.room_id}</p>
          </div> */}
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
