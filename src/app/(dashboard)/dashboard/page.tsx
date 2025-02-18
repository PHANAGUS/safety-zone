"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useParams,
// } from "react-router-dom";
// import styles from "../layout.module.css";
import styles from "./page.module.css";

import AirQualitySection from "./components/AirQualitySection";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";

import { GoGraph } from "react-icons/go";

const main_url = process.env.NEXT_PUBLIC_URL;

const Dashboard: React.FC = () => {
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

  useEffect(() => {
    if (loading) return;
    if (username === "") {
      router.push("/login");
    }
  }, [username, loading]);

  useEffect(() => {
    setCurrentPage("login");
    // console.log(currentPage);
  }, []);

  return (
    // <div className={styles["area"]}>
    //   <div className={styles["big-topic"]}>
    //     <div className={styles["big-topic-left"]}>
    //       <div className={styles["back-button"]} />
    //       <p>{roomName}</p>
    //       <p className={styles["big-topic-bracket"]}>({homeName})</p>
    //     </div>
    //   </div>
    //   <AirQualitySection />
    // </div>
    <div className={styles["page-grid"]}>
      <div className={styles["roominfo-part"]}>
        <div className={styles["info-part"]}>
          <div className={styles["title-line"]}>
            <GoHomeFill className={styles["room-icon"]} />
            <div className={styles["roomname-line"]}>
              <p className={styles["roomname-text"]}>{room.room_name}</p>
              <p className={styles["roomid-text"]}>(ID: {room.room_id})</p>
            </div>
          </div>
          <div className={styles["info-box"]}>
            <p className={styles["room-detail-text"]}>{home.home_name}</p>
          </div>
          <div className={styles["button-container"]}>
            <div
              className={styles["delete-room-button"]}
              // onClick={() => setShowConfirmDeleteHomeModal(true)}
            >
              <RiDeleteBin5Fill className={styles["delete-home-icon"]} />
              <p className={styles[""]}>ลบห้อง</p>
            </div>
          </div>
        </div>
        <div className={styles["picture-part"]}>
          <div className={styles["home-pic"]}></div>
        </div>
      </div>
      <div className={styles["content-part"]}>
        <div className={styles["topic"]}>
          <div className={styles["topic-left"]}>
            <IoChevronBack
              className={styles["back-button"]}
              onClick={() => router.replace("/roomlist")}
            />
            <p className={styles[""]}>ตัวชี้วัดคุณภาพอากาศ</p>
          </div>
          <div className={styles["topic-right"]}></div>
        </div>
        <AirQualitySection />
      </div>
    </div>
  );
};

export default Dashboard;
