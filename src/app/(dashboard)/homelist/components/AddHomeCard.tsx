"use client";

import React from "react";
import "../css/AddHomeCard.css";

// interface AddHomeCardProps {
//   homename: string;
// }

const AddHomeCard: React.FC = () => {
  return (
    <div className="add-home-card">
      <div className="plus-img" />
      <p>เพิ่มบ้านหลังใหม่</p>
    </div>
  );
};

export default AddHomeCard;
