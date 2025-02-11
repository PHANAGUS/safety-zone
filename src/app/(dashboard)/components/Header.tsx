"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import "../css/Header.css";

const Header: React.FC = ({}) => {
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

  return (
    <div className="header">
      <p>Comfy Breath Room</p>
      <button onClick={() => router.replace("/homelist")}>
        ไปที่หน้า Homelist
      </button>
      <button onClick={() => router.replace("/roomlist")}>
        ไปที่หน้า Roomlist
      </button>
      <button onClick={() => router.replace("/dashboard")}>
        ไปที่หน้า Dashboard
      </button>
      <button onClick={() => router.replace("/login")}>Log out</button>
      <p>{username}</p>
      <p>{userID}</p>
    </div>
  );
};

export default Header;
