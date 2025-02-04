"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import "../css/HomeCard.css";

interface HomeCardProps {
  homename: string;
  homeid: number;
}

const HomeCard: React.FC<HomeCardProps> = ({ homename, homeid }) => {
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

  const go_to_roomlist = () => {
    console.log(homeid);
    setHomeID(homeid);
    console.log("set home id:" + homeID);
    // router.push("/roomlist");
  };

  return (
    <div className="home-card" onClick={go_to_roomlist}>
      <div className="square"></div>
      <p>{homename}</p>
      <p>ID: {homeid}</p>
    </div>
  );
};

export default HomeCard;
