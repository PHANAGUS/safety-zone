"use client";

import React from "react";
import Link from "next/link";
import { useGlobalState } from "@/context/GlobalStateContext";

import "../css/Header.css";

const Header: React.FC = ({}) => {
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
      <Link href="/homelist">
        <button>ไปที่หน้า Homelist</button>
      </Link>
      <Link href="/roomlist">
        <button>ไปที่หน้า Roomlist</button>
      </Link>
      <Link href="/dashboard">
        <button>ไปที่หน้า Dashboard</button>
      </Link>
      <p>{username}</p>
      <p>{userID}</p>
      <Link href="/login">
        <button>Log out</button>
      </Link>
    </div>
  );
};

export default Header;
