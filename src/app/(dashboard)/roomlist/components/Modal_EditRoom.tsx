"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_EditRoom.module.css";

import { rename_room } from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface EditRoomModalProps {
  show: boolean;
  handleClose: () => void;

  refreshRoomlist: () => void;
  this_card_room: rooms;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
  show,
  handleClose,
  this_card_room,
  refreshRoomlist,
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

  const [typingRoomname, setTypingRoomname] = useState<string>("");

  const confirm_clicked = async () => {
    await rename_room(main_url, this_card_room.room_id, typingRoomname);
    refreshRoomlist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เปลี่ยนชื่อห้อง</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>ชื่อใหม่ห้อง</p>
          <input
            type="text"
            placeholder={this_card_room.room_name}
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

export default EditRoomModal;
