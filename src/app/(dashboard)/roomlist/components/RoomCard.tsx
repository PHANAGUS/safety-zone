"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import "../css/RoomCard.css";

interface RoomCardProps {
  room_name: string;
  room_id: number;
}

const RoomCard: React.FC<RoomCardProps> = ({ room_name, room_id }) => {
  const router = useRouter();
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
  } = useGlobalState();

  const [clicked, setClicked] = useState<boolean>(false);

  const go_to_roomlist = () => {
    setRoomID(room_id);
    setRoomName(room_name);
    setClicked(true);
    // ฟังก์ชันนี้แค่ set เฉยๆ จะไปจั๊มป์หน้าใน useEffect
  };

  useEffect(() => {
    if (roomID === room_id && clicked) {
      // console.log("Updated roomID:", roomID);
      // console.log(roomName);
      setClicked(false);
      router.push("/dashboard");
    }
  }, [roomID, clicked]);

  return (
    <div className="room-card" onClick={go_to_roomlist}>
      <div className="square"></div>
      <p>{room_name}</p>
      <p>ID: {room_id}</p>
    </div>
  );
};

export default RoomCard;
