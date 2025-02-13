"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./NewRoomModal.module.css";

import { create_new_room } from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface NewRoomModalProps {
  show: boolean;
  handleClose: () => void;

  setNeedRefresh: (needRefresh: boolean) => void;
}

const NewRoomModal: React.FC<NewRoomModalProps> = ({
  show,
  handleClose,
  setNeedRefresh,
}) => {
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

  const [typingRoomname, setTypingRoomname] = useState<string>("");

  const confirm_clicked = async () => {
    await create_new_room(main_url, homeID, typingRoomname);
    setNeedRefresh(true);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>สร้างห้องใหม่</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p>ชื่อห้อง</p>
          <input
            type="text"
            value={typingRoomname}
            onChange={(e) => setTypingRoomname(e.target.value)}
            className={styles["input-box"]}
          />
          <p>{typingRoomname}</p>
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

export default NewRoomModal;
