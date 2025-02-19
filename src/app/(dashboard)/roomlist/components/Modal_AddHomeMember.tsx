"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_AddHomeMember.module.css";

import { add_user_to_home } from "@/app/api/manage_home";

const main_url = process.env.NEXT_PUBLIC_URL;

interface AddHomeMemberModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddHomeMemberModal: React.FC<AddHomeMemberModalProps> = ({
  show,
  handleClose,
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

  const [typingInvitedID, setTypingInvitedID] = useState<string>("");

  const confirm_clicked = async () => {
    await add_user_to_home(main_url, Number(typingInvitedID), home.home_id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เพิ่มสมาชิก</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>User ID ของผู้ที่ต้องการเพิ่ม</p>
          <input
            type="number"
            value={typingInvitedID}
            onChange={(e) => setTypingInvitedID(e.target.value)}
            className={styles["input-box"]}
          />
          <p>
            {typingInvitedID} {typeof typingInvitedID}
          </p>
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

export default AddHomeMemberModal;
