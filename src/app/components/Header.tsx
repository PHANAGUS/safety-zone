"use client";

import React from "react";

interface HeaderProps {
  // toggleSidebar: () => void;
  // toggleProfileDropdown: () => void;
}

const Header: React.FC<HeaderProps> = (
  {
    // toggleSidebar,
    // toggleProfileDropdown,
  }
) => {
  return (
    <div className="header">
      {/* <button onClick={toggleSidebar} className="btn-sidebar">
        เลือกห้อง
      </button> */}
      <p>Smart PM2.5 Safety Zone</p>
      {/*<div className="header-actions">
         <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label> 
        <button onClick={toggleProfileDropdown} className="btn-profile">
          <img src="https://via.placeholder.com/32" alt="Profile" />
        </button>
      </div>*/}
    </div>
  );
};

export default Header;
