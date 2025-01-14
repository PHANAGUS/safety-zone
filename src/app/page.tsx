"use client";

import React, { useCallback, useEffect, useState } from "react";
// import { Context } from "./context/AirQualityContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AirQualitySection from "./components/AirQualitySection";
import ContentHeader from "./components/ContentHeader";
import AirQualityCardSet from "./components/AirQualityCardSet";
// import AirQualityCard from "./components/AirQualityCard";
import DeviceControl from "./components/DeviceControl";
import ProfileDropdown from "./components/ProfileDropdown";
import "./App.css";
import { fetchAPI, getLatestRecord } from "./data/test_get_data.js";

const App: React.FC = () => {
  // const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  // const [isProfileDropdownVisible, setProfileDropdownVisible] =
  //   useState<boolean>(false);

  // const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  // const toggleProfileDropdown = () =>
  //   setProfileDropdownVisible(!isProfileDropdownVisible);
  // const logout = () => alert("Logged out");

  // // const [data, setData] = useState({
  // //   id: 25,
  // //   temperature: 10,
  // //   humidity: 10,
  // //   timestamp: "2024-12-25T16:36:07.000Z",
  // // });
  // const [pm25, setPm25] = useState<number>(10);
  // const [co2, setCo2] = useState<number>(750);
  // const [pressure, setPressure] = useState<number>(5);
  // const [temperature, setTemperature] = useState<number>(25);
  // const [humidity, setHumidity] = useState<number>(60);
  // const [timestamp, setTimestamp] = useState<string>();

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const new_data = await getLatestRecord();
  //     // console.log(new_data);
  //     // console.log(
  //     //   "Timestamp(",
  //     //   typeof new_data.timestamp,
  //     //   ") : ",
  //     //   new_data.timestamp
  //     // );
  //     // console.log(
  //     //   "Temperature(",
  //     //   typeof new_data.temperature,
  //     //   ") : ",
  //     //   new_data.temperature
  //     // );
  //     // console.log(
  //     //   "Humidity(",
  //     //   typeof new_data.humidity,
  //     //   ") : ",
  //     //   new_data.humidity
  //     // );
  //     setPm25(10);
  //     setCo2(750);
  //     setPressure(5);
  //     // setTemperature(25);
  //     setTemperature(new_data.temperature);
  //     setHumidity(new_data.humidity);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // });

  return (
    <div className="app">
      {/* <Header
        toggleSidebar={toggleSidebar}
        toggleProfileDropdown={toggleProfileDropdown}
      />
      <div className="space-part">
        <div className="content-area">
          <ContentHeader
            title="ตัวชี้วัดคุณภาพอากาศ"
            // description=""
            description="คำอธิบายเพิ่มเติม"
          ></ContentHeader>
          <AirQualityCardSet
            pm25={pm25}
            co2={co2}
            pressure={pressure}
            temperature={temperature}
            humidity={humidity}
          ></AirQualityCardSet>
          <div className="content-header">
            <p className="content-header-title">อุปกรณ์</p>
          </div>
        </div>
      </div> */}

      <Header />

      <div className="space-part">
        <div className="content-area">
          <AirQualitySection />
        </div>
      </div>

      {/* <Sidebar isVisible={isSidebarVisible} />
      <main className="main-content">
        <h2>Room1 (House1)</h2>
        <section className="device-controls">
          <DeviceControl
            title="เครื่องกรองอากาศ"
            isActive={true}
            toggle={() => {}}
          />
          <DeviceControl
            title="พัดลมดูดอากาศ"
            isActive={true}
            toggle={() => {}}
          />
          <DeviceControl
            title="เครื่องอัดอากาศ"
            isActive={false}
            toggle={() => {}}
          />
        </section>
      </main>
      <ProfileDropdown isVisible={isProfileDropdownVisible} logout={logout} /> */}
    </div>
  );
};

export default App;
