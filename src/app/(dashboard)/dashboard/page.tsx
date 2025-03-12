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

import AirQualityCard from "./components/AQCard_v2";
import AirQualityGraph from "./components/AirQualityGraph";
import ElectricGraph from "./components/ElectricGraph";
import DeviceCard from "./components/DeviceCard";
import RoomSettingModal from "./components/Modal_RoomSetting";
import CreateDeviceModal from "./components/Modal_CreateDevice";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { IoChevronBack } from "react-icons/io5";
import { TbLayoutGridAdd } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { FaLeaf } from "react-icons/fa";
import { TbSettings2 } from "react-icons/tb";

import {
  create_room_setting,
  update_room_setting,
  get_room_setting,
} from "@/app/api/manage_room";
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
  isSensorDevice: number;
  isOutside: number;
  deviceType: string;
}

interface settings {
  room_id: number;
  diffPressure_threshold_low: number;
  diffPressure_threshold_high: number;
  temperature_threshold_low: number;
  temperature_threshold_high: number;
  humidity_threshold_low: number;
  humidity_threshold_high: number;
  pm25_threshold_low: number;
  pm25_threshold_high: number;
  co2_threshold_low: number;
  co2_threshold_high: number;
  auto_control_enabled: number;
}

interface setting_response {
  message: string;
  devices: settings[];
}

interface response_devicelist {
  message: string;
  data: devices[];
}

interface place_records {
  recorded_at: object;
  pm25: number;
  co2: number;
  pressure: number;
  temperature: number;
  humidity: number;
  device_id: number;
  isOutside: number;
}

interface cal_diff_records {
  recorded_at: object;
  pm25: number;
  co2: number;
  diffPressure: number;
  temperature: number;
  humidity: number;
  device_id: number;
}

interface response_get_records {
  outside_records: place_records[];
  inroom_records: place_records[];
  diff_records: cal_diff_records[];
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

  // จัดการ Modal ต่าง ๆ ==============================================================================================================================
  const [showRoomSettingModal, setShowRoomSettingModal] =
    useState<boolean>(false);
  const [roomSettingModalKey, setRoomSettingModalKey] = useState<number>(0);
  const refreshRoomSettingModal = () => {
    setRoomSettingModalKey((prevKey) => (prevKey === 0 ? 1 : 0));
  };

  const [showCreateDeviceModal, setShowCreateDeviceModal] =
    useState<boolean>(false);
  const [createDeviceModalKey, setCreateDeviceModalKey] = useState<number>(
    Date.now()
  );

  // จัดการ Threshold ==============================================================================================================================
  const [latestPm25_l, setLatestPm25_l] = useState<number>(10);
  const [latestPm25_h, setLatestPm25_h] = useState<number>(20);

  const [latestCo2_l, setLatestCo2_l] = useState<number>(400);
  const [latestCo2_h, setLatestCo2_h] = useState<number>(600);

  const [latestDiffPres_l, setLatestDiffPres_l] = useState<number>(5);
  const [latestDiffPres_h, setLatestDiffPres_h] = useState<number>(10);

  const [latestTemp_l, setLatestTemp_l] = useState<number>(25);
  const [latestTemp_h, setLatestTemp_h] = useState<number>(27);

  const [latestHumid_l, setLatestHumid_l] = useState<number>(55);
  const [latestHumid_h, setLatestHumid_h] = useState<number>(60);

  const [isAutoOn, setIsAutoOn] = useState<number>(0);
  const toggleAuto = () => {
    if (isAutoOn === 1) {
      setIsAutoOn(0);
      switchAutoControl(0);
    } else {
      setIsAutoOn(1);
      switchAutoControl(1);
    }
  };

  const switchAutoControl = async (x: number) => {
    await update_room_setting(
      main_url,
      room.room_id,
      userID,
      latestDiffPres_h,
      latestDiffPres_l,
      latestTemp_h,
      latestTemp_l,
      latestHumid_h,
      latestHumid_l,
      latestPm25_h,
      latestPm25_l,
      latestCo2_h,
      latestCo2_l,
      x
    );
  };

  useEffect(() => {
    const fetch_latest_setting = async () => {
      const setting_response: setting_response = await get_room_setting(
        main_url,
        room.room_id
      );

      if (setting_response.message !== "Room Setting retrieved successfully.") {
        await create_room_setting(
          main_url,
          room.room_id,
          userID,
          latestDiffPres_h,
          latestDiffPres_l,
          latestTemp_h,
          latestTemp_l,
          latestHumid_h,
          latestHumid_l,
          latestPm25_h,
          latestPm25_l,
          latestCo2_h,
          latestCo2_l
        );
        setIsAutoOn(0);
      } else {
        const latest_threshold = setting_response.devices[0];

        setLatestPm25_l(latest_threshold.pm25_threshold_low);
        setLatestPm25_h(latest_threshold.pm25_threshold_high);

        setLatestCo2_l(latest_threshold.co2_threshold_low);
        setLatestCo2_h(latest_threshold.co2_threshold_high);

        setLatestDiffPres_l(latest_threshold.diffPressure_threshold_low);
        setLatestDiffPres_h(latest_threshold.diffPressure_threshold_high);

        setLatestTemp_l(latest_threshold.temperature_threshold_low);
        setLatestTemp_h(latest_threshold.temperature_threshold_high);

        setLatestHumid_l(latest_threshold.humidity_threshold_low);
        setLatestHumid_h(latest_threshold.humidity_threshold_high);

        setIsAutoOn(latest_threshold.auto_control_enabled);
        // console.log("เซ็ตค่าใหม่");
      }
    };

    fetch_latest_setting();
  }, [showRoomSettingModal]);

  // จัดการ Mode การดู ==============================================================================================================================
  const [displayMode, setDisplayMode] = useState<boolean>(true);
  const toggleDisplayMode = () => {
    if (displayMode) {
      setDisplayMode(false);
    } else {
      setDisplayMode(true);
    }
  };
  const [airQualityView, setAirQualityView] = useState<string>("card");

  const [outside_pm25, setOutsidePm25] = useState<number[]>([10]);
  const [outside_co2, setOutsideCo2] = useState<number[]>([400]);
  const [outside_pressure, setOutsidePressure] = useState<number[]>([1012]);
  const [outside_temperature, setOutsideTemperature] = useState<number[]>([25]);
  const [outside_humidity, setOutsideHumidity] = useState<number[]>([60]);
  const [outside_timestamp, setOutsideTimestamp] = useState<object[]>([]);

  const [inroom_pm25, setInroomPm25] = useState<number[]>([10]);
  const [inroom_co2, setInroomCo2] = useState<number[]>([400]);
  const [inroom_pressure, setInroomPressure] = useState<number[]>([1017]);
  const [inroom_temperature, setInroomTemperature] = useState<number[]>([25]);
  const [inroom_humidity, setInroomHumidity] = useState<number[]>([60]);
  const [inroom_timestamp, setInroomTimestamp] = useState<object[]>([]);

  const [cal_pm25, setCalPm25] = useState<number[]>([10]);
  const [cal_co2, setCalCo2] = useState<number[]>([400]);
  const [cal_diffPressure, setCalDiffPressure] = useState<number[]>([5]);
  const [cal_temperature, setCalTemperature] = useState<number[]>([25]);
  const [cal_humidity, setCalHumidity] = useState<number[]>([60]);
  const [cal_timestamp, setCalTimestamp] = useState<object[]>([]);
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

  useEffect(() => {
    if (loading) return;
    if (username === "" || userID === 0) {
      router.push("/login");
    } else {
      const fetchData = async () => {
        const new_dataset: response_get_records = await getDateRangeRecords(
          main_url,
          room.room_id,
          daysEarlier
        );
        // console.log(new_dataset);

        if (new_dataset != null) {
          setFetchComplete(true);

          setOutsidePm25(new_dataset.outside_records.map((x: any) => x.pm25));
          setOutsideCo2(new_dataset.outside_records.map((x: any) => x.co2));
          setOutsidePressure(
            new_dataset.outside_records.map((x: any) => x.pressure)
          );
          setOutsideTemperature(
            new_dataset.outside_records.map((x: any) => x.temperature)
          );
          setOutsideHumidity(
            new_dataset.outside_records.map((x: any) => x.humidity)
          );
          setOutsideTimestamp(
            new_dataset.outside_records.map((x: any) => x.recorded_at)
          );

          setInroomPm25(new_dataset.inroom_records.map((x: any) => x.pm25));
          setInroomCo2(new_dataset.inroom_records.map((x: any) => x.co2));
          setInroomPressure(
            new_dataset.inroom_records.map((x: any) => x.pressure)
          );
          setInroomTemperature(
            new_dataset.inroom_records.map((x: any) => x.temperature)
          );
          setInroomHumidity(
            new_dataset.inroom_records.map((x: any) => x.humidity)
          );
          setInroomTimestamp(
            new_dataset.inroom_records.map((x: any) => x.recorded_at)
          );

          setCalPm25(new_dataset.diff_records.map((x: any) => x.pm25));
          setCalCo2(new_dataset.diff_records.map((x: any) => x.co2));
          setCalDiffPressure(
            new_dataset.diff_records.map((x: any) => x.diffPressure)
          );
          setCalTemperature(
            new_dataset.diff_records.map((x: any) => x.temperature)
          );
          setCalHumidity(new_dataset.diff_records.map((x: any) => x.humidity));
          setCalTimestamp(
            new_dataset.diff_records.map((x: any) => x.recorded_at)
          );
        } else {
          setFetchComplete(false);
        }

        const devices_response: response_devicelist = await get_room_devices(
          main_url,
          room.room_id
        );
        const this_room_devices: devices[] = devices_response.data;
        this_room_devices.sort((a, b) => {
          if (a.isSensorDevice !== b.isSensorDevice) {
            return a.isSensorDevice - b.isSensorDevice; // เรียง isSensorDevice จากน้อยไปมาก
          }
          return a.deviceType.localeCompare(b.deviceType);
        });

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
                refreshRoomSettingModal();
                setShowRoomSettingModal(true);
              }}
            >
              <TbSettings2 className={styles["room-setting-icon"]} />
              <p className={styles[""]}>ตั้งค่าระบบ</p>
            </div>
            {/* <div className={styles[""]}>{latestPm25Threshold}</div>
            <div className={styles[""]}>{latestCo2Threshold}</div> */}
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
            style={{
              filter: isAutoOn === 1 ? "" : "grayscale(100%)",
            }}
            onClick={toggleAuto}
          >
            <FaLeaf className={styles["picture-icon"]} />
          </div>
          <div className={styles["status-text"]}>
            Auto: {isAutoOn === 1 ? "On" : "Off"}
          </div>
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
          <div
            className={styles["create-device-button"]}
            onClick={() => setShowCreateDeviceModal(true)}
          >
            <TbLayoutGridAdd />
            <p className={styles[""]}>เพิ่มอุปกรณ์</p>
          </div>
        )}

        {displayMode ? (
          airQualityView === "card" ? (
            // <div className={styles["aqcard-container"]} key={aqContainerKey}>
            //   <AirQualityCard
            //     title="PM2.5"
            //     cal_value={cal_pm25[cal_pm25.length - 1]}
            //     outside_value={outside_pm25[outside_pm25.length - 1]}
            //     inroom_value={inroom_pm25[inroom_pm25.length - 1]}
            //     unit="µg/m³"
            //   />
            //   <AirQualityCard
            //     title="CO2"
            //     cal_value={cal_co2[cal_co2.length - 1]}
            //     outside_value={outside_co2[outside_co2.length - 1]}
            //     inroom_value={inroom_co2[inroom_co2.length - 1]}
            //     unit="ppm"
            //   />
            //   <AirQualityCard
            //     title="ความต่างความกดอากาศ"
            //     cal_value={cal_diffPressure[cal_diffPressure.length - 1]}
            //     outside_value={outside_pressure[outside_pressure.length - 1]}
            //     inroom_value={inroom_pressure[inroom_pressure.length - 1]}
            //     unit="Pascal"
            //   />
            //   <AirQualityCard
            //     title="อุณหภูมิ"
            //     cal_value={cal_temperature[cal_temperature.length - 1]}
            //     outside_value={
            //       outside_temperature[outside_temperature.length - 1]
            //     }
            //     inroom_value={inroom_temperature[inroom_temperature.length - 1]}
            //     unit="°C"
            //   />
            //   <AirQualityCard
            //     title="ความชื้นสัมพัทธ์"
            //     cal_value={cal_humidity[cal_humidity.length - 1]}
            //     outside_value={outside_humidity[outside_humidity.length - 1]}
            //     inroom_value={inroom_humidity[inroom_humidity.length - 1]}
            //     unit="%"
            //   />
            // </div>
            <div className={styles["aqcard-container"]} key={aqContainerKey}>
              <AirQualityCard
                pm25={inroom_pm25[inroom_pm25.length - 1]}
                co2={inroom_co2[inroom_co2.length - 1]}
                temperature={inroom_temperature[inroom_temperature.length - 1]}
                humidity={inroom_humidity[inroom_humidity.length - 1]}
                pressure={inroom_pressure[inroom_pressure.length - 1]}
              />
            </div>
          ) : (
            <div className={styles["aqchart-container"]} key={aqContainerKey}>
              <ElectricGraph
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_pm25}
              />
              <AirQualityGraph
                title={"PM2.5"}
                unit={"µg/m³"}
                outside_timestamp={outside_timestamp}
                outside_value={outside_pm25}
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_pm25}
              />
              <AirQualityGraph
                title={"CO2"}
                unit={"ppm"}
                outside_timestamp={outside_timestamp}
                outside_value={outside_co2}
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_co2}
              />
              <AirQualityGraph
                title={"ความกดอากาศ"}
                unit={"Pascal"}
                outside_timestamp={outside_timestamp}
                outside_value={outside_pressure}
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_pressure}
              />
              <AirQualityGraph
                title={"อุณหภูมิ"}
                unit={"°C"}
                outside_timestamp={outside_timestamp}
                outside_value={outside_temperature}
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_temperature}
              />
              <AirQualityGraph
                title={"ความชื้นสัมพัทธ์"}
                unit={"%"}
                outside_timestamp={outside_timestamp}
                outside_value={outside_humidity}
                inroom_timestamp={inroom_timestamp}
                inroom_value={inroom_humidity}
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

      <CreateDeviceModal
        key={createDeviceModalKey}
        show={showCreateDeviceModal}
        handleClose={() => {
          setShowCreateDeviceModal(false);
          setCreateDeviceModalKey(Date.now());
        }}
        refreshDevicelist={refreshDevicelist}
      />
      <RoomSettingModal
        key={roomSettingModalKey}
        show={showRoomSettingModal}
        handleClose={() => {
          setShowRoomSettingModal(false);
          refreshRoomSettingModal();
        }}
        refreshAqContainer={refreshAqContainer}
        // refreshRoomSettingModal={refreshRoomSettingModal}
      />
    </div>
  );
};

export default Dashboard;
