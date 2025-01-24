"use client";

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import AirQualitySection from "./components/AirQualitySection";

const Dashboard: React.FC = () => {
  return <AirQualitySection />;
};

export default Dashboard;
