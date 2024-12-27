"use client";

import React from "react";

interface ProfileDropdownProps {
  isVisible: boolean;
  logout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  isVisible,
  logout,
}) => {
  return (
    <div className={`profile-dropdown ${isVisible ? "visible" : ""}`}>
      <p>Unknown</p>
      <button onClick={logout} className="btn-logout">
        Log Out
      </button>
    </div>
  );
};

export default ProfileDropdown;
