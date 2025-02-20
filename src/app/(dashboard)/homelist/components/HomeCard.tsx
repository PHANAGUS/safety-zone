"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import styles from "./HomeCard.module.css";

import ConfirmDeleteHomeModal from "./Modal_ConfirmDeleteHome";
import EditHomeModal from "./Modal_EditHome";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { PiFlowerTulip } from "react-icons/pi";

interface homes {
  home_id: number;
  home_name: string;
  mainUserID: number;
}

interface HomeCardProps {
  this_card_home: homes;
  refreshHomelist: () => void;
}

const HomeCard: React.FC<HomeCardProps> = ({
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
  } = useGlobalState();

  const [clicked, setClicked] = useState<boolean>(false);

  const [showConfirmDeleteHomeModal, setShowConfirmDeleteHomeModal] =
    useState<boolean>(false);
  const [showEditHomeModal, setShowEditHomeModal] = useState<boolean>(false);

  const go_to_roomlist = () => {
    setHome(this_card_home);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (home.home_id === this_card_home.home_id && clicked) {
      setClicked(false);
      router.push("/roomlist");
    }
  }, [home, clicked]);

  return (
    <div className={styles["home-card"]}>
      <div className={styles["picture-part"]}>
        <div className={styles["home-pic"]}>
          <PiFlowerTulip className={styles["picture-icon"]} />
        </div>
      </div>
      <div className={styles["info-part"]}>
        <p className={styles["home-name"]}>{this_card_home.home_name}</p>
        <p className={styles["info-text"]}>ID: {this_card_home.home_id}</p>
      </div>
      <div className={styles["button-part"]}>
        <div
          className={styles["delete-button"]}
          onClick={() => setShowConfirmDeleteHomeModal(true)}
        >
          <RiDeleteBin5Fill className={styles["bin-icon"]} />
        </div>
        <div
          className={styles["edit-button"]}
          onClick={() => setShowEditHomeModal(true)}
        >
          <BiEdit className={styles["edit-icon"]} />
        </div>
        <div className={styles["go-button"]} onClick={go_to_roomlist}>
          <p className={styles["go-button-text"]}>ดูบ้าน</p>
          <MdNavigateNext className={styles["next-icon"]} />
        </div>
      </div>
      <ConfirmDeleteHomeModal
        show={showConfirmDeleteHomeModal}
        handleClose={() => setShowConfirmDeleteHomeModal(false)}
        this_card_home={this_card_home}
        refreshHomelist={refreshHomelist}
      />
      <EditHomeModal
        show={showEditHomeModal}
        handleClose={() => setShowEditHomeModal(false)}
        this_card_home={this_card_home}
        refreshHomelist={refreshHomelist}
      />
    </div>
  );
};

export default HomeCard;
