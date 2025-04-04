"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_EditHome.module.css";

import { rename_home } from "@/app/api/manage_home";

const main_url = process.env.NEXT_PUBLIC_URL;

interface homes {
  home_id: number;
  home_name: string;
  mainUserID: number;
}

interface EditHomeModalProps {
  show: boolean;
  handleClose: () => void;

  refreshHomelist: () => void;
  this_card_home: homes;
}

const EditHomeModal: React.FC<EditHomeModalProps> = ({
  show,
  handleClose,
  this_card_home,
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
    await rename_home(main_url, this_card_home.home_id, typingHomename);
    refreshHomelist();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>เปลี่ยนชื่อบ้าน</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["input-section"]}>
          <p className={styles["input-title"]}>ชื่อใหม่บ้าน</p>
          <input
            type="text"
            placeholder={this_card_home.home_name}
            value={typingHomename}
            onChange={(e) => setTypingHomename(e.target.value)}
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

export default EditHomeModal;
