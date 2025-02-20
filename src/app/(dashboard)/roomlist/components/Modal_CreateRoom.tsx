"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_CreateRoom.module.css";

import { create_new_room } from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface NewRoomModalProps {
  show: boolean;
  handleClose: () => void;

  refreshRoomlist: () => void;
}

const NewRoomModal: React.FC<NewRoomModalProps> = ({
  show,
  handleClose,
  refreshRoomlist,
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

  const [typingRoomname, setTypingRoomname] = useState<string>("");

  const confirm_clicked = async () => {
    await create_new_room(main_url, home.home_id, typingRoomname);
    refreshRoomlist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เพิ่มห้องใหม่</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>ชื่อห้อง</p>
          <input
            type="text"
            value={typingRoomname}
            onChange={(e) => setTypingRoomname(e.target.value)}
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

export default NewRoomModal;
