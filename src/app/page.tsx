"use client";

import React, { useCallback, useEffect, useState } from "react";
// import { Context } from "./context/AirQualityContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AirQualityCardSet from "./components/AirQualityCardSet";
// import AirQualityCard from "./components/AirQualityCard";
import DeviceControl from "./components/DeviceControl";
import ProfileDropdown from "./components/ProfileDropdown";
import "./App.css";
import { fetchAPI, getLatestRecord } from "./test_get_data.js";

const App: React.FC = () => {
  const [isSidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] =
    useState<boolean>(false);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const toggleProfileDropdown = () =>
    setProfileDropdownVisible(!isProfileDropdownVisible);
  const logout = () => alert("Logged out");

  const [data, setData] = useState({
    id: 25,
    temperature: 10,
    humidity: 10,
    timestamp: "2024-12-25T16:36:07.000Z",
  });
  const [pm25, setPm25] = useState<number>(10);
  const [co2, setCo2] = useState<number>(750);
  const [pressure, setPressure] = useState<number>(5);
  const [temperature, setTemperature] = useState<number>(25);
  const [humidity, setHumidity] = useState<number>(60);

  // async function getLatestRecord() {
  //   const response = await fetchAPI();
  //   const latest_record =
  //     response.formattedData[response.formattedData.length - 1];
  //   //   console.log(latest_record);
  //   return latest_record;
  // }

  // const getData = useCallback(async () => {
  //   const data = await getLatestRecord();
  //   setData(data);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      async () => {
        const data = await getLatestRecord();
        console.log(data);
      };
    }, 2000);

    // getData();
    return () => clearInterval(interval);
  });

  return (
    <div className="app">
      <Header
        toggleSidebar={toggleSidebar}
        toggleProfileDropdown={toggleProfileDropdown}
      />
      <div className="page">
        <div className="page-content">
          <AirQualityCardSet
            pm25={pm25}
            co2={co2}
            pressure={pressure}
            temperature={temperature}
            humidity={humidity}
          ></AirQualityCardSet>
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
