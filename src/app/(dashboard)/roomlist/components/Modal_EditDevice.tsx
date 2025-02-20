"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_EditRoom.module.css";

import { rename_device } from "@/app/api/manage_device";

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

interface EditRoomModalProps {
  show: boolean;
  handleClose: () => void;

  this_card_device: devices;
  refreshDevicelist: () => void;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
  show,
  handleClose,
  this_card_device,
  refreshDevicelist,
}) => {
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [typingDevicename, setTypingDevicename] = useState<string>("");

  const confirm_clicked = async () => {
    await rename_device(main_url, this_card_device.deviceID, typingDevicename);
    refreshDevicelist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>
          เปลี่ยนชื่ออุปกรณ์
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>ชื่อใหม่อุปกรณ์</p>
          <input
            type="text"
            placeholder={this_card_device.deviceName}
            value={typingDevicename}
            onChange={(e) => setTypingDevicename(e.target.value)}
            className={styles["input-box"]}
          />
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

export default EditRoomModal;
