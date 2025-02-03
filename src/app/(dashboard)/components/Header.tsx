"use client";

import React from "react";
import Link from "next/link";
import "../css/Header.css";

const Header: React.FC = ({}) => {
  return (
    <div className="header">
      <p>Comfy Breath Room</p>
      <Link href="/homelist">
        <button>ไปที่หน้า Homelist</button>
      </Link>
      <Link href="/dashboard">
        <button>ไปที่หน้า Dashboard</button>
      </Link>
    </div>
  );
};

export default Header;
