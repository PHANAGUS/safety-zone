"use client";

import React from "react";
import "../css/AddRoomCard.css";

// interface AddRoomCardProps {
//   homename: string;
// }

const AddRoomCard: React.FC = () => {
  return (
    <div className="add-room-card">
      <div className="plus-img" />
      <p>เพิ่มห้องใหม่</p>
    </div>
  );
};

export default AddRoomCard;
