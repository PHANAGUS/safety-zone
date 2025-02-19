"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import { getLatestRecord } from "@/app/api/get_sensor.js";
import { delete_room } from "@/app/api/manage_room";

import styles from "./RoomCard.module.css";

import ConfirmDeleteRoomModal from "./Modal_ConfirmDeleteRoom";
import EditRoomModal from "./Modal_EditRoom";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface RoomCardProps {
  this_card_room: rooms;

  refreshRoomlist: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
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
  } = useGlobalState();

  const [showConfirmDeleteRoomModal, setShowConfirmDeleteRoomModal] =
    useState<boolean>(false);
  const [showEditRoomModal, setShowEditRoomModal] = useState<boolean>(false);

  // const [fetchComplete, setFetchComplete] = useState<boolean>(true);

  // const [pm25, setPm25] = useState();
  // const [co2, setCo2] = useState();

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_dashboard = () => {
    setRoom(this_card_room);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (room.room_id === this_card_room.room_id && clicked) {
      // console.log("Updated roomID:", roomID);
      // console.log(roomName);
      setClicked(false);
      router.push("/dashboard");
    }
  }, [room, clicked]);

  return (
    <div className={styles["room-card"]}>
      <div className={styles["picture-part"]}>
        <div className={styles["room-pic"]}></div>
      </div>
      <div className={styles["info-part"]}>
        <p className={styles["room-name"]}>{this_card_room.room_name}</p>
        <p className={styles["info-text"]}>ID: {this_card_room.room_id}</p>
      </div>
      <div className={styles["button-part"]}>
        <div
          className={styles["delete-button"]}
          onClick={() => setShowConfirmDeleteRoomModal(true)}
        >
          <RiDeleteBin5Fill className={styles["bin-icon"]} />
        </div>
        <div
          className={styles["edit-button"]}
          onClick={() => setShowEditRoomModal(true)}
        >
          <BiEdit className={styles["edit-icon"]} />
        </div>
        <div className={styles["go-button"]} onClick={go_to_dashboard}>
          <p className={styles["go-button-text"]}>ไปยัง Dashboard</p>
          <MdNavigateNext className={styles["next-icon"]} />
        </div>
      </div>
      <ConfirmDeleteRoomModal
        show={showConfirmDeleteRoomModal}
        handleClose={() => setShowConfirmDeleteRoomModal(false)}
        this_card_room={this_card_room}
        refreshRoomlist={refreshRoomlist}
      />
      <EditRoomModal
        show={showEditRoomModal}
        handleClose={() => setShowEditRoomModal(false)}
        this_card_room={this_card_room}
        refreshRoomlist={refreshRoomlist}
      />
    </div>
  );
};

export default RoomCard;
