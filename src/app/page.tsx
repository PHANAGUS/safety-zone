"use client";

import React, { useCallback, useEffect, useState } from "react";
// import { Context } from "./context/AirQualityContext";
import Header from "./components/Header";
import AirQualitySection from "./components/AirQualitySection";
import "./css/App.css";
import { fetchAPI, getLatestRecord } from "./data/test_get_data.js";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="space-part">
        <div className="content-area">
          <AirQualitySection />
        </div>
      </div>
    </div>
  );
};

export default App;
