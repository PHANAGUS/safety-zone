"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_ConfirmDeleteHome.module.css";

import { delete_home } from "@/app/api/manage_home";

const main_url = process.env.NEXT_PUBLIC_URL;

interface homes {
  home_id: number;
  home_name: string;
  mainUserID: number;
}

interface ConfirmDeleteHomeModalProps {
  show: boolean;
  handleClose: () => void;

  this_card_home: homes;
  refreshHomelist: () => void;
}

const ConfirmDeleteHomeModal: React.FC<ConfirmDeleteHomeModalProps> = ({
  show,
  handleClose,

  this_card_home,
  refreshHomelist,
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

  const confirm_delete_this_home = async () => {
    await delete_home(main_url, this_card_home.home_id);
    handleClose();
    refreshHomelist();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>ยืนยันการลบบ้าน</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles["content-section"]}>
          <div className={styles["textline"]}>
            <p className={styles["content-text"]}>คุณยืนยันการลบ</p>
            <p className={styles["homename-text"]}>
              {this_card_home.home_name}
            </p>
            <p className={styles["content-text"]}>หรือไม่?</p>
          </div>
          <p className={styles["content-text"]}>
            หากลบแล้ว ข้อมูลของบ้านหลังนี้และห้องทั้งหมดจะไม่สามารถกู้คืนได้
            คุณต้องการยืนยันการลบหรือไม่?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button variant="danger" onClick={confirm_delete_this_home}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteHomeModal;
