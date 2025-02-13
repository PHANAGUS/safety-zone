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
import HomeCard from "./components/HomeCard";
import AddHomeCard from "./components/AddHomeCard";

import { get_homelist } from "../../api/get_homelist.js";

const main_url = process.env.NEXT_PUBLIC_URL;

interface response_homelist {
  message: string;
  homes: homes[];
}

interface homes {
  home_name: string;
  home_id: number;
}

const Homelist: React.FC = () => {
  const router = useRouter();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    homeName,
    setHomeName,
    homeID,
    setHomeID,
    roomName,
    setRoomName,
    roomID,
    setRoomID,
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [homelist, setHomelist] = useState<homes[]>([]);

  useEffect(() => {
    if (loading) return;
    if (username === "" || userID === 0) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        const response: response_homelist = await get_homelist(
          main_url,
          userID
        );
        // console.log(response);
        // console.log(userID);
        setHomelist(response.homes);
        // console.log(homelist);
      };
      fetchData();
    }
  }, [username, userID, loading]);

  useEffect(() => {
    setCurrentPage("homelist");
    // console.log(currentPage);
  }, [currentPage]);

  return (
    // <div className={styles["area"]}>
    //   <div className={styles["big-topic"]}>
    //     {/* <p>โปรดเลือกบ้านเพื่อดำเนินการต่อ</p> */}
    //     <p>บ้านของคุณ</p>
    //   </div>
    //   <div className={`${styles["homelist-container"]} ${styles["scrollbar"]}`}>
    //     {homelist.map((item, index) => (
    //       <HomeCard
    //         key={index}
    //         home_name={item["home_name"]}
    //         home_id={item["home_id"]}
    //       />
    //     ))}
    //     <AddHomeCard />
    //   </div>
    //   {/* <div className={styles["section-failed-box"]}>
    //       <div className={styles["section-failed-pic"]}></div>
    //       <p className={styles["section-failed-text"]}>
    //         ขออภัย ระบบเกิดข้อขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง
    //       </p>
    //     </div> */}
    // </div>

    <div className={styles["page-grid"]}>
      <div className={styles["greeting-part"]}>
        <p className={styles[""]}>สวัสดี !</p>
        <p className={styles[""]}>
          คุณ {firstname} {lastname}
        </p>
      </div>
      <div className={styles["content-part"]}>
        <div className={styles["topic"]}>
          <div className={styles["topic-left"]}>บ้านของฉัน</div>
          <div className={styles["topic-right"]}>
            <div className={styles["plus-button"]}>+ เพิ่มบ้าน</div>
          </div>
        </div>
        <div className={styles["homelist-container"]}>
          {homelist.map((item, index) => (
            <HomeCard
              key={index}
              home_name={item["home_name"]}
              home_id={item["home_id"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homelist;
