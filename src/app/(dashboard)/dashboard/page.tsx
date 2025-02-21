"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   useParams,
// } from "react-router-dom";
// import styles from "../layout.module.css";
import styles from "./page.module.css";

import AirQualityCard from "./components/AirQualityCard";
import AirQualityGraph from "./components/AirQualityGraph";
import DeviceCard from "./components/DeviceCard";
import RoomSettingModal from "./components/Modal_RoomSetting";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
import { TbLayoutGridAdd } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { FaLeaf } from "react-icons/fa";
import { TbSettings2 } from "react-icons/tb";

import { update_room_setting } from "@/app/api/manage_room";
import { get_room_devices } from "@/app/api/manage_device";
import { getDateRangeRecords } from "@/app/api/get_sensor";
import {
  setPm25Color,
  setCo2Color,
  setPressureColor,
  setTemperatureColor,
  setHumidityColor,
} from "@/app/api/convert_data";

const main_url = process.env.NEXT_PUBLIC_URL;

interface rooms {
  room_name: string;
  room_id: number;
}

interface devices {
  deviceID: number;
  deviceName: string;
  deviceStatus: string;
  deviceInRoom: number;
  deviceInHomes: number;
  room_name: string;
  home_name: string;
}

interface response_devicelist {
  message: string;
  data: devices[];
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    home,
    setHome,
    room,
    setRoom,
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const toggleDisplayMode = () => {
    if (displayMode) {
      setDisplayMode(false);
    } else {
      setDisplayMode(true);
    }
  };
  const [airQualityView, setAirQualityView] = useState<string>("card");
  const [isAutoOn, setIsAutoOn] = useState<string>("off");
  const toggleAuto = () => {
    if (isAutoOn === "on") {
      setIsAutoOn("off");
    } else {
      setIsAutoOn("on");
    }
  };

  const [pm25, setPm25] = useState([10]);
  const [co2, setCo2] = useState([400]);
  const [pressure, setPressure] = useState([5]);
  const [temperature, setTemperature] = useState([25]);
  const [humidity, setHumidity] = useState([60]);
  const [timestamp, setTimestamp] = useState([]);
  const [lastIndex, setLastIndex] = useState<number>(0);
  // จำนวนวันสำหรับแสดงผลกราฟย้อนหลัง
  const [daysEarlier, setDaysEarlier] = useState<number>(30);

  const handleChangeDaysEarlier = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue <= 30) {
      setDaysEarlier(newValue);
    }
  };

  const [aqContainerKey, setAqContainerKey] = useState<number>(0);
  const refreshAqContainer = () => {
    setAqContainerKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

  const [devicelist, setDeviceList] = useState<devices[]>([]);
  const [devicelistKey, setDevicelistKey] = useState<number>(0);
  const refreshDevicelist = () => {
    setDevicelistKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

  const [fetchComplete, setFetchComplete] = useState<boolean>(true);

  const [showRoomSettingModal, setShowRoomSettingModal] =
    useState<boolean>(false);
  const [showCreateDeviceModal, setShowCreateDeviceModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (loading) return;
    if (username === "" || userID === 0) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        const new_dataset = await getDateRangeRecords(
          main_url,
          room.room_id,
          daysEarlier
        );
        // console.log(new_dataset);

        if (new_dataset != null) {
          setFetchComplete(true);

          setTimestamp(new_dataset.map((x: any) => new Date(x.recorded_at)));
          setLastIndex(new_dataset.length - 1);

          setPm25(new_dataset.map((x: any) => x.pm25));
          setCo2(new_dataset.map((x: any) => x.co2));
          // setPressure(new_dataset.map((x: any) => x.pressure - 1012));
          setPressure(new_dataset.map((x: any) => x.pressure));
          setTemperature(new_dataset.map((x: any) => x.temperature));
          setHumidity(new_dataset.map((x: any) => x.humidity));
        } else {
          setFetchComplete(false);
        }

        const devices_response: response_devicelist = await get_room_devices(
          main_url,
          room.room_id
        );
        const this_room_devices: devices[] = devices_response.data;

        setDeviceList(this_room_devices);
      };
      fetchData();
    }
  }, [username, userID, loading, daysEarlier, devicelistKey]);

  useEffect(() => {
    setCurrentPage("login");
    // console.log(currentPage);
  }, []);

  return (
    <div className={styles["page-grid"]}>
      <div className={styles["roominfo-part"]}>
        <div className={styles["info-part"]}>
          <div className={styles["title-line"]}>
            <GoHomeFill className={styles["room-icon"]} />
            <div className={styles["roomname-line"]}>
              <p className={styles["roomname-text"]}>{room.room_name}</p>
              <p className={styles["roomid-text"]}>(ID: {room.room_id})</p>
            </div>
          </div>
          <div className={styles["info-box"]}>
            <p className={styles["room-detail-text"]}>{home.home_name}</p>
          </div>
          <div className={styles["button-container"]}>
            <div
              className={styles["room-setting-button"]}
              onClick={() => {
                setShowRoomSettingModal(true);
              }}
            >
              <TbSettings2
                className={styles["room-setting-icon"]}
                onClick={() => {}}
              />
              <p className={styles[""]}>ตั้งค่าระบบ</p>
            </div>
            {/* <div
              className={styles["delete-room-button"]}
              // onClick={() => setShowConfirmDeleteHomeModal(true)}
            >
              <RiDeleteBin5Fill className={styles["delete-home-icon"]} />
              <p className={styles[""]}>ลบห้อง</p>
            </div> */}
          </div>
        </div>
        <div className={styles["picture-part"]}>
          <div
            className={styles["room-pic"]}
            style={{ filter: isAutoOn === "on" ? "" : "grayscale(100%)" }}
            onClick={toggleAuto}
          >
            <FaLeaf className={styles["picture-icon"]} />
          </div>
          <div className={styles["status-text"]}>Auto: {isAutoOn}</div>
        </div>
      </div>
      <div className={styles["content-part"]}>
        <div className={styles["display-mode-switch"]}>
          <IoChevronBack
            className={styles["back-button"]}
            onClick={() => router.replace("/roomlist")}
          />
          <div
            className={
              displayMode ? styles["mode-button-sl"] : styles["mode-button-nsl"]
            }
            onClick={() => toggleDisplayMode()}
          >
            ตัวชี้วัดคุณภาพอากาศ
          </div>
          <div
            className={
              displayMode ? styles["mode-button-nsl"] : styles["mode-button-sl"]
            }
            onClick={() => toggleDisplayMode()}
          >
            อุปกรณ์
          </div>
        </div>

        {displayMode ? (
          <div className={styles["aq-view-bar"]}>
            <div className={styles["aq-view-bar-left"]}>
              <div className={styles["aq-view-selector"]}>
                <p className={styles[""]}>การแสดงผล:</p>
                <div
                  className={
                    airQualityView === "card"
                      ? styles["card-button-selected"]
                      : styles["card-button-default"]
                  }
                  onClick={() => {
                    setAirQualityView("card");
                  }}
                ></div>
                <div
                  className={
                    airQualityView === "graph"
                      ? styles["graph-button-selected"]
                      : styles["graph-button-default"]
                  }
                  onClick={() => {
                    setAirQualityView("graph");
                  }}
                ></div>
              </div>
            </div>
            <div className={styles["aq-view-bar-right"]}>
              <div className={styles["set-duration-line"]}>
                <p className={styles[""]}>ย้อนหลัง:</p>
                <input
                  type="number"
                  value={daysEarlier}
                  onChange={handleChangeDaysEarlier}
                  min={0}
                  max={30}
                  className={styles["duration-input-box"]}
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
          // <div
          //   className={styles["create-device-button"]}
          //   onClick={() => setShowCreateDeviceModal(true)}
          // >
          //   <TbLayoutGridAdd />
          //   <p className={styles[""]}>เพิ่มอุปกรณ์</p>
          // </div>
        )}

        {displayMode ? (
          airQualityView === "card" ? (
            <div className={styles["aqcard-container"]} key={aqContainerKey}>
              <AirQualityCard
                title="PM2.5"
                value={pm25[lastIndex]}
                unit="µg/m³"
                color={setPm25Color(pm25[lastIndex])}
              />
              <AirQualityCard
                title="CO2"
                value={co2[lastIndex]}
                unit="ppm"
                color={setCo2Color(co2[lastIndex])}
              />
              <AirQualityCard
                title="ความกดอากาศ"
                value={pressure[lastIndex]}
                unit="Pascal"
                color={setPressureColor(pressure[lastIndex])}
              />
              <AirQualityCard
                title="อุณหภูมิ"
                value={temperature[lastIndex]}
                unit="°C"
                color={setTemperatureColor(temperature[lastIndex])}
              />
              <AirQualityCard
                title="ความชื้นสัมพัทธ์"
                value={humidity[lastIndex]}
                unit="%"
                color={setHumidityColor(humidity[lastIndex])}
              />
            </div>
          ) : (
            <div className={styles["aqcard-container"]} key={aqContainerKey}>
              <AirQualityGraph
                title={"PM2.5"}
                unit={"µg/m³"}
                timestamp={timestamp}
                value={pm25}
                color={setPm25Color(pm25[pm25.length - 1])}
                daysEarlier={daysEarlier}
              />
              <AirQualityGraph
                title={"CO2"}
                unit={"ppm"}
                timestamp={timestamp}
                value={co2}
                color={setCo2Color(co2[co2.length - 1])}
                daysEarlier={daysEarlier}
              />
              <AirQualityGraph
                title={"ความกดอากาศ"}
                unit={"Pascal"}
                timestamp={timestamp}
                value={pressure}
                color={setPressureColor(pressure[pressure.length - 1])}
                daysEarlier={daysEarlier}
              />
              <AirQualityGraph
                title={"อุณหภูมิ"}
                unit={"°C"}
                timestamp={timestamp}
                value={temperature}
                color={setTemperatureColor(temperature[temperature.length - 1])}
                daysEarlier={daysEarlier}
              />
              <AirQualityGraph
                title={"ความชื้นสัมพัทธ์"}
                unit={"%"}
                timestamp={timestamp}
                value={humidity}
                color={setHumidityColor(humidity[humidity.length - 1])}
                daysEarlier={daysEarlier}
              />
            </div>
          )
        ) : (
          <div className={styles["devicelist-container"]} key={devicelistKey}>
            {devicelist.map((item, index) => (
              <DeviceCard
                key={index}
                this_card_device={item}
                refreshDevicelist={refreshDevicelist}
              />
            ))}
          </div>
        )}
      </div>
      <RoomSettingModal
        show={showRoomSettingModal}
        handleClose={() => setShowRoomSettingModal(false)}
        refreshAqContainer={refreshAqContainer}
      />
    </div>
  );
};

export default Dashboard;
