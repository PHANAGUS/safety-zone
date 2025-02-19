"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_ConfirmDeleteRoom.module.css";

import { delete_room } from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface ConfirmDeleteRoomModalProps {
  show: boolean;
  handleClose: () => void;

  this_card_room: rooms;
  refreshRoomlist: () => void;
}

const ConfirmDeleteRoomModal: React.FC<ConfirmDeleteRoomModalProps> = ({
  show,
  handleClose,

  this_card_room,
  refreshRoomlist,
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
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const confirm_delete_this_room = async () => {
    await delete_room(main_url, this_card_room.room_id);
    handleClose();
    refreshRoomlist();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>ยืนยันการลบห้อง</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["content-section"]}>
          <div className={styles["textline"]}>
            <p className={styles["content-text"]}>คุณยืนยันการลบ</p>
            <p className={styles["roomname-text"]}>
              {this_card_room.room_name}
            </p>
            <p className={styles["content-text"]}>หรือไม่?</p>
          </div>
          <p className={styles["content-text"]}>
            หากลบแล้ว ข้อมูลของห้องนี้จะไม่สามารถกู้คืนได้
            คุณต้องการยืนยันการลบหรือไม่?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button variant="danger" onClick={confirm_delete_this_room}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteRoomModal;
