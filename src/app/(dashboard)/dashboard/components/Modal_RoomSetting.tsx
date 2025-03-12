"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import { Modal, Button } from "react-bootstrap";

import styles from "./Modal_RoomSetting.module.css";

import RangeSlider from "./RangeSlider";
// import { add_new_device } from "@/app/api/manage_device";
import {
  create_room_setting,
  update_room_setting,
  get_room_setting,
} from "@/app/api/manage_room";

const main_url = process.env.NEXT_PUBLIC_URL;

interface devices {
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
  devices: devices[];
}

interface RoomSettingModalProps {
  show: boolean;
  handleClose: () => void;

  refreshAqContainer: () => void;
}

const RoomSettingModal: React.FC<RoomSettingModalProps> = ({
  show,
  handleClose,
  refreshAqContainer,
}) => {
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

  const [isloading, setIsLoading] = useState(true);

  const [typingPm25_l, setTypingPm25_l] = useState<number>(10);
  const handleChangePm25_l = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingPm25_l(newValue);
    }
  };
  const [typingPm25_h, setTypingPm25_h] = useState<number>(25);
  const handleChangePm25_h = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingPm25_h(newValue);
    }
  };

  const [typingCo2_l, setTypingCo2_l] = useState<number>(450);
  const handleChangeCo2_l = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingCo2_l(newValue);
    }
  };
  const [typingCo2_h, setTypingCo2_h] = useState<number>(1000);
  const handleChangeCo2_h = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingCo2_h(newValue);
    }
  };

  const [typingDiffPres_l, setTypingDiffPres_l] = useState<number>(5);
  const handleChangeDiffPres_l = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingDiffPres_l(newValue);
    }
  };
  const [typingDiffPres_h, setTypingDiffPres_h] = useState<number>(10);
  const handleChangeDiffPres_h = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingDiffPres_h(newValue);
    }
  };

  const [typingTemp_l, setTypingTemp_l] = useState<number>(25);
  const handleChangeTemp_l = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingTemp_l(newValue);
    }
  };
  const [typingTemp_h, setTypingTemp_h] = useState<number>(27);
  const handleChangeTemp_h = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingTemp_h(newValue);
    }
  };

  const [typingHumid_l, setTypingHumid_l] = useState<number>(55);
  const handleChangeHumid_l = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingHumid_l(newValue);
    }
  };
  const [typingHumid_h, setTypingHumid_h] = useState<number>(60);
  const handleChangeHumid_h = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setTypingHumid_l(newValue);
    }
  };

  const [latestIsAutoControl, setLatestIsAutoControl] = useState<number>(0);

  const confirm_clicked = async () => {
    await update_room_setting(
      main_url,
      room.room_id,
      userID,
      typingDiffPres_h,
      typingDiffPres_l,
      typingTemp_h,
      typingTemp_l,
      typingHumid_h,
      typingHumid_l,
      typingPm25_h,
      typingPm25_l,
      typingCo2_h,
      typingCo2_l,
      latestIsAutoControl
    );

    refreshAqContainer();
    handleClose();
  };

  useEffect(() => {
    const fetch_latest_threshold = async () => {
      const setting_response: setting_response = await get_room_setting(
        main_url,
        room.room_id
      );

      if (setting_response.message === "Room Setting retrieved successfully.") {
        const latest_threshold = setting_response.devices[0];

        setTypingPm25_l(latest_threshold.pm25_threshold_low);
        setTypingPm25_h(latest_threshold.pm25_threshold_high);

        setTypingCo2_l(latest_threshold.co2_threshold_low);
        setTypingCo2_h(latest_threshold.co2_threshold_high);

        setTypingDiffPres_l(latest_threshold.diffPressure_threshold_low);
        setTypingDiffPres_h(latest_threshold.diffPressure_threshold_high);

        setTypingTemp_l(latest_threshold.temperature_threshold_low);
        setTypingTemp_h(latest_threshold.temperature_threshold_high);

        setTypingHumid_l(latest_threshold.humidity_threshold_low);
        setTypingHumid_h(latest_threshold.humidity_threshold_high);

        setLatestIsAutoControl(latest_threshold.auto_control_enabled);
      } else {
        await create_room_setting(
          main_url,
          room.room_id,
          userID,
          typingDiffPres_h,
          typingDiffPres_l,
          typingTemp_h,
          typingTemp_l,
          typingHumid_h,
          typingHumid_l,
          typingPm25_h,
          typingPm25_l,
          typingCo2_h,
          typingCo2_l
        );
      }
      setIsLoading(false);
    };

    fetch_latest_threshold();
  }, []);

  const handleSliderChange_Pm25 = (values: [number, number]) => {
    setTypingPm25_l(values[0]);
    setTypingPm25_h(values[1]);
    // console.log("Selected range:", values);
  };

  const handleSliderChange_Co2 = (values: [number, number]) => {
    setTypingCo2_l(values[0]);
    setTypingCo2_h(values[1]);
  };

  const handleSliderChange_DiffPres = (values: [number, number]) => {
    setTypingDiffPres_l(values[0]);
    setTypingDiffPres_h(values[1]);
  };

  const handleSliderChange_Temp = (values: [number, number]) => {
    setTypingTemp_l(values[0]);
    setTypingTemp_h(values[1]);
  };

  const handleSliderChange_Humid = (values: [number, number]) => {
    setTypingHumid_l(values[0]);
    setTypingHumid_h(values[1]);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={styles["title"]}>
          ตั้งค่าระบบอัตโนมัติ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isloading ? (
          <div className={styles["content-container"]}>
            <p>Loading...</p>
          </div>
        ) : (
          <div className={styles["content-container"]}>
            <div className={styles["input-section"]}>
              <div className={styles["input-title-line"]}>
                <p className={styles["input-title"]}>PM2.5 (µg/m³)</p>
                {/* <div
                  className={styles["recommended-button"]}
                  onClick={() => {
                    setTypingPm25_l(10), setTypingPm25_h(25);
                  }}
                >
                  ค่าแนะนำ
                </div> */}
              </div>
              <RangeSlider
                title="PM2.5"
                min={0}
                max={35}
                last_min={typingPm25_l}
                last_max={typingPm25_h}
                defaultValue={[typingPm25_l, typingPm25_h]}
                onChange={handleSliderChange_Pm25}
              />
              {/* <div className={styles[""]}>
                <div className={styles[""]}>ค่าต่ำสุด {typingPm25_l}</div>
                <div className={styles[""]}>ค่าสูงสุด {typingPm25_h}</div>
              </div> */}
              {/* <div className={styles[""]}>ค่าต่ำสุด</div>
            <input
              type="number"
              value={typingPm25_l}
              onChange={handleChangePm25_l}
              className={styles["input-box"]}
            />
            <div className={styles[""]}>ค่าสูงสุด</div>
            <input
              type="number"
              value={typingPm25_h}
              onChange={handleChangePm25_h}
              className={styles["input-box"]}
            /> */}
            </div>
            <div className={styles["input-section"]}>
              <div className={styles["input-title-line"]}>
                <p className={styles["input-title"]}>CO2 (ppm)</p>
                {/* <div
                  className={styles["recommended-button"]}
                  onClick={() => {
                    setTypingCo2_l(500), setTypingCo2_h(1000);
                  }}
                >
                  ค่าแนะนำ
                </div> */}
              </div>
              <RangeSlider
                title="CO2"
                min={450}
                max={1200}
                last_min={typingCo2_l}
                last_max={typingCo2_h}
                defaultValue={[typingCo2_l, typingCo2_h]}
                onChange={handleSliderChange_Co2}
              />
              {/* <div className={styles[""]}>ค่าต่ำสุด</div>
            <input
              type="number"
              value={typingCo2_l}
              onChange={handleChangeCo2_l}
              className={styles["input-box"]}
            />
            <div className={styles[""]}>ค่าสูงสุด</div>
            <input
              type="number"
              value={typingCo2_h}
              onChange={handleChangeCo2_h}
              className={styles["input-box"]}
            /> */}
            </div>
            <div className={styles["input-section"]}>
              <div className={styles["input-title-line"]}>
                <p className={styles["input-title"]}>
                  ความต่างความกดอากาศ (Pascal)
                </p>
                {/* <div
                  className={styles["recommended-button"]}
                  onClick={() => {
                    setTypingDiffPres_l(10), setTypingDiffPres_h(25);
                  }}
                >
                  ค่าแนะนำ
                </div> */}
              </div>
              <RangeSlider
                title="DiffPres"
                min={2}
                max={12}
                last_min={typingDiffPres_l}
                last_max={typingDiffPres_h}
                defaultValue={[typingDiffPres_l, typingDiffPres_h]}
                onChange={handleSliderChange_DiffPres}
              />
              {/* <div className={styles[""]}>ค่าต่ำสุด</div>
            <input
              type="number"
              value={typingDiffPres_l}
              onChange={handleChangeDiffPres_l}
              className={styles["input-box"]}
            />
            <div className={styles[""]}>ค่าสูงสุด</div>
            <input
              type="number"
              value={typingDiffPres_h}
              onChange={handleChangeDiffPres_h}
              className={styles["input-box"]}
            /> */}
            </div>
            <div className={styles["input-section"]}>
              <div className={styles["input-title-line"]}>
                <p className={styles["input-title"]}>อุณหภูมิ (°C)</p>
                {/* <div
                  className={styles["recommended-button"]}
                  onClick={() => {
                    setTypingTemp_l(10), setTypingTemp_h(25);
                  }}
                >
                  ค่าแนะนำ
                </div> */}
              </div>
              <RangeSlider
                title="Temp"
                min={18}
                max={28}
                last_min={typingTemp_l}
                last_max={typingTemp_h}
                defaultValue={[typingTemp_l, typingTemp_h]}
                onChange={handleSliderChange_Temp}
              />
              {/* <div className={styles[""]}>ค่าต่ำสุด</div>
            <input
              type="number"
              value={typingTemp_l}
              onChange={handleChangeTemp_l}
              className={styles["input-box"]}
            />
            <div className={styles[""]}>ค่าสูงสุด</div>
            <input
              type="number"
              value={typingTemp_h}
              onChange={handleChangeTemp_h}
              className={styles["input-box"]}
            /> */}
            </div>
            <div className={styles["input-section"]}>
              <div className={styles["input-title-line"]}>
                <p className={styles["input-title"]}>ความชื้นสัมพัทธ์ (%)</p>
                {/* <div
                  className={styles["recommended-button"]}
                  onClick={() => {
                    setTypingHumid_l(10), setTypingHumid_h(25);
                  }}
                >
                  ค่าแนะนำ
                </div> */}
              </div>
              <RangeSlider
                title="Humid"
                min={40}
                max={65}
                last_min={typingHumid_l}
                last_max={typingHumid_h}
                defaultValue={[typingHumid_l, typingHumid_h]}
                onChange={handleSliderChange_Humid}
              />
              {/* <div className={styles[""]}>ค่าต่ำสุด</div>
            <input
              type="number"
              value={typingHumid_l}
              onChange={handleChangeHumid_l}
              className={styles["input-box"]}
            />
            <div className={styles[""]}>ค่าสูงสุด</div>
            <input
              type="number"
              value={typingHumid_h}
              onChange={handleChangeHumid_h}
              className={styles["input-box"]}
            /> */}
            </div>
            {/* <p>{typingDeviceName}</p> */}
            {/* <p>{isThisDeviceSensor}</p> */}
            {/* <p>{selectedRoomID}</p> */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          ยกเลิก
        </Button>
        <Button variant="primary" onClick={confirm_clicked}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomSettingModal;
