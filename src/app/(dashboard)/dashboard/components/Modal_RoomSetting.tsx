"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_RoomSetting.module.css";

// import { add_new_device } from "@/app/api/manage_device";
import {
  create_room_setting,
  update_room_setting,
  get_room_setting,
} from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface devices {
  room_id: number;
  diffPressure_threshold: number;
  temperature_threshold: number;
  humidity_threshold: number;
  pm25_threshold: number;
  co2_threshold: number;
  auto_control_enabled: number;
}

interface setting_response {
  message: string;
  devices: devices[];
}

interface RoomSettingModalProps {
  show: boolean;
  handleClose: () => void;

  refreshAqContainer: () => void;
}

const RoomSettingModal: React.FC<RoomSettingModalProps> = ({
  show,
  handleClose,
  refreshAqContainer,
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

  const [typingPm25, setTypingPm25] = useState<number>(10);
  const handleChangePm25 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingPm25(newValue);
    }
  };
  const [typingCo2, setTypingCo2] = useState<number>(400);
  const handleChangeCo2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingCo2(newValue);
    }
  };
  const [typingDiffPres, setTypingDiffPres] = useState<number>(5);
  const handleChangeDiffPres = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingDiffPres(newValue);
    }
  };
  const [typingTemp, setTypingTemp] = useState<number>(25);
  const handleChangeTemp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingTemp(newValue);
    }
  };
  const [typingHumid, setTypingHumid] = useState<number>(60);
  const handleChangeHumid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingHumid(newValue);
    }
  };
  const [latestIsAutoControl, setLatestIsAutoControl] = useState<number>(0);

  const confirm_clicked = async () => {
    await update_room_setting(
      main_url,
      room.room_id,
      userID,
      typingDiffPres,
      typingTemp,
      typingHumid,
      typingPm25,
      typingCo2,
      latestIsAutoControl
    );

    refreshAqContainer();
    handleClose();
  };

  useEffect(() => {
    const fetch_latest_threshold = async () => {
      const setting_response: setting_response = await get_room_setting(
        main_url,
        room.room_id
      );

      if (setting_response.message === "Room Setting retrieved successfully.") {
        const latest_threshold = setting_response.devices[0];

        setTypingPm25(latest_threshold.pm25_threshold);
        setTypingCo2(latest_threshold.co2_threshold);
        setTypingDiffPres(latest_threshold.diffPressure_threshold);
        setTypingTemp(latest_threshold.temperature_threshold);
        setTypingHumid(latest_threshold.humidity_threshold);

        setLatestIsAutoControl(latest_threshold.auto_control_enabled);
      } else {
        await create_room_setting(
          main_url,
          room.room_id,
          userID,
          typingDiffPres,
          typingTemp,
          typingHumid,
          typingPm25,
          typingCo2
        );
      }
    };

    fetch_latest_threshold();
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>
          ตั้งค่าระบบอัตโนมัติ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["content-container"]}>
          <div className={styles["input-section"]}>
            <div className={styles["input-title-line"]}>
              <p className={styles["input-title"]}>PM2.5 (µg/m³)</p>
              <div
                className={styles["recommended-button"]}
                onClick={() => setTypingPm25(10)}
              >
                ค่าแนะนำ
              </div>
            </div>
            <input
              type="number"
              value={typingPm25}
              onChange={handleChangePm25}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["input-section"]}>
            <div className={styles["input-title-line"]}>
              <p className={styles["input-title"]}>CO2 (ppm)</p>
              <div
                className={styles["recommended-button"]}
                onClick={() => setTypingCo2(400)}
              >
                ค่าแนะนำ
              </div>
            </div>
            <input
              type="number"
              value={typingCo2}
              onChange={handleChangeCo2}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["input-section"]}>
            <div className={styles["input-title-line"]}>
              <p className={styles["input-title"]}>
                ความต่างความกดอากาศ (Pascal)
              </p>
              <div
                className={styles["recommended-button"]}
                onClick={() => setTypingDiffPres(5)}
              >
                ค่าแนะนำ
              </div>
            </div>
            <input
              type="number"
              value={typingDiffPres}
              onChange={handleChangeDiffPres}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["input-section"]}>
            <div className={styles["input-title-line"]}>
              <p className={styles["input-title"]}>อุณหภูมิ (°C)</p>
              <div
                className={styles["recommended-button"]}
                onClick={() => setTypingTemp(25)}
              >
                ค่าแนะนำ
              </div>
            </div>
            <input
              type="number"
              value={typingTemp}
              onChange={handleChangeTemp}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["input-section"]}>
            <div className={styles["input-title-line"]}>
              <p className={styles["input-title"]}>ความชื้นสัมพัทธ์ (%)</p>
              <div
                className={styles["recommended-button"]}
                onClick={() => setTypingHumid(60)}
              >
                ค่าแนะนำ
              </div>
            </div>
            <input
              type="number"
              value={typingHumid}
              onChange={handleChangeHumid}
              className={styles["input-box"]}
            />
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

export default RoomSettingModal;
