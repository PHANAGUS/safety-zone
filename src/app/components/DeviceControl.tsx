"use client";

import React from "react";

interface DeviceControlProps {
  title: string;
  isActive: boolean;
  toggle: () => void;
}

const DeviceControl: React.FC<DeviceControlProps> = ({
  title,
  isActive,
  toggle,
}) => {
  return (
    <div className="device-control">
      <h4>{title}</h4>
      <label className="switch">
        <input type="checkbox" checked={isActive} onChange={toggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default DeviceControl;
