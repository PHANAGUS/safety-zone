"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_CreateHome.module.css";

import { create_new_home } from "@/app/api/manage_home";

const main_url = process.env.NEXT_PUBLIC_URL;

interface NewHomeModalProps {
  show: boolean;
  handleClose: () => void;

  refreshHomelist: () => void;
}

const NewHomeModal: React.FC<NewHomeModalProps> = ({
  show,
  handleClose,
  refreshHomelist,
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

  const [typingHomename, setTypingHomename] = useState<string>("");

  const confirm_clicked = async () => {
    await create_new_home(main_url, userID, typingHomename);
    refreshHomelist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เพิ่มบ้านหลังใหม่</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>ชื่อบ้าน</p>
          <input
            type="text"
            value={typingHomename}
            onChange={(e) => setTypingHomename(e.target.value)}
            className={styles["input-box"]}
          />
          <p>{typingHomename}</p>
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

export default NewHomeModal;
