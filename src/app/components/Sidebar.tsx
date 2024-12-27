"use client";

import React from "react";

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <h2>House1</h2>
      <div className="room">
        <div className="room-info">
          <h3>Room1</h3>
          <p>PM2.5: 10</p>
          <p>CO2: 900</p>
        </div>
      </div>
      <button className="btn-add-room">เพิ่มห้องใหม่</button>
    </div>
  );
};

export default Sidebar;
