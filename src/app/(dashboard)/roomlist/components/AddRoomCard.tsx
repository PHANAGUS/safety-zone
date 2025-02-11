"use client";

import React from "react";
import styles from "./AddRoomCard.module.css";

// interface AddRoomCardProps {
//   homename: string;
// }

const AddRoomCard: React.FC = () => {
  return (
    <div className={styles["add-room-card"]}>
      <div className={styles["plus-img"]} />
      <p>เพิ่มห้องใหม่</p>
    </div>
  );
};

export default AddRoomCard;
