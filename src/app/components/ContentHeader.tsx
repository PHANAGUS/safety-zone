"use client";

import React from "react";

interface ContentHeaderProps {
  title: string;
  description: string;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="content-header">
      <div className="content-header-text-area">
        <p className="content-header-title">{title}</p>
        <p className="content-header-description">{description}</p>
      </div>
      <div className="content-header-button-container">
        <div className="card-button-default"></div>
        <div className="graph-button-default"></div>
      </div>
    </div>
  );
};

export default ContentHeader;
