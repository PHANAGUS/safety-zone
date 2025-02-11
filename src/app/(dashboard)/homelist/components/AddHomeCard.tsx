"use client";

import React from "react";
import styles from "./AddHomeCard.module.css";

// interface AddHomeCardProps {
//   homename: string;
// }

const AddHomeCard: React.FC = () => {
  return (
    <div className={styles["add-home-card"]}>
      <div className={styles["plus-img"]} />
      <p>เพิ่มบ้านหลังใหม่</p>
    </div>
  );
};

export default AddHomeCard;
