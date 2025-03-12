"use client";

import React, { useEffect, useState } from "react";
// import "../css/AirQualityCard.css";
import { color_decide, setPressureColor } from "@/app/api/convert_data";
import styles from "./AQCard_v2.module.css";

import { PiStarFourBold } from "react-icons/pi";
import { TbMichelinStar } from "react-icons/tb";
import { MdCo2 } from "react-icons/md";
import { FaThermometerHalf } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { linearGradient } from "framer-motion/client";
import { ImSpinner2 } from "react-icons/im";
import { RiCopperCoinLine } from "react-icons/ri";
import { HiLightningBolt } from "react-icons/hi";

import { MdMoreHoriz } from "react-icons/md";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { FaRegFaceGrin } from "react-icons/fa6";
import { FaFaceFrownOpen } from "react-icons/fa6";
import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceDizzy } from "react-icons/fa6";

interface AirQualityCardProps {
  pm25: string | number;
  co2: string | number;
  temperature: string | number;
  humidity: string | number;
  pressure: string | number;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  pm25,
  co2,
  temperature,
  humidity,
  pressure,
}) => {
  const set_gradient_border = (title: string, value: string | number) => {
    const response_color = color_decide(title, value);
    let final_color = " #D9D9D9, #D9D9D9";
    if (response_color === "grey") {
      final_color = " #D9D9D9, #D9D9D9";
    } else if (response_color === "navy") {
      final_color = " rgb(37, 53, 194), rgb(48, 190, 233)";
    } else if (response_color === "indigo blue") {
      final_color = " rgb(56, 149, 255), rgb(55, 192, 255)";
    } else if (response_color === "sky blue") {
      final_color = " rgb(33, 185, 255), rgb(108, 226, 255)";
    } else if (response_color === "green") {
      final_color = " rgb(42, 219, 19), rgb(133, 243, 30)";
    } else if (response_color === "yellow") {
      final_color = " rgb(255, 219, 13), rgb(241, 238, 19)";
    } else if (response_color === "orange") {
      final_color = " rgb(255, 145, 0), rgb(255, 183, 27)";
    } else if (response_color === "red orange") {
      final_color = " rgb(255, 94, 0), rgb(255, 137, 27)";
    } else if (response_color === "red") {
      final_color = " rgb(255, 8, 0), rgb(255, 142, 49)";
    } else if (response_color === "purple") {
      final_color = " rgb(194, 51, 230), rgb(241, 148, 221)";
    } else if (response_color === "brown") {
      final_color = " rgb(139, 87, 66), rgb(204, 140, 80)";
    } else if (response_color === "black") {
      final_color = " rgb(83, 83, 83), rgb(146, 146, 146)";
    }
    return final_color;
  };

  const set_shadow = (title: string, value: string | number) => {
    const response_color = color_decide(title, value);
    // let final_color = "rgba(67, 71, 85, 0.27)";
    // if (response_color === "grey") {
    //   final_color = "rgba(67, 71, 85, 0.27)";
    // } else if (response_color === "navy") {
    //   final_color = "rgba(37, 53, 194, 0.27)";
    // } else if (response_color === "indigo blue") {
    //   final_color = "rgba(56, 149, 255, 0.27)";
    // } else if (response_color === "sky blue") {
    //   final_color = "rgba(108, 226, 255, 0.27)";
    // } else if (response_color === "green") {
    //   final_color = "rgba(133, 243, 30, 0.27)";
    // } else if (response_color === "yellow") {
    //   final_color = "rgba(241, 238, 19, 0.27)";
    // } else if (response_color === "orange") {
    //   final_color = "rgba(255, 145, 0, 0.27)";
    // } else if (response_color === "red orange") {
    //   final_color = "rgba(255, 94, 0, 0.27)";
    // } else if (response_color === "red") {
    //   final_color = "rgba(255, 8, 0, 0.27)";
    // } else if (response_color === "purple") {
    //   final_color = "rgba(241, 148, 221, 0.27)";
    // } else if (response_color === "brown") {
    //   final_color = "rgba(204, 140, 80, 0.27)";
    // } else if (response_color === "black") {
    //   final_color = " rgba(83, 83, 83, 0.27)";
    // }
    let final_color = "67, 71, 85";
    if (response_color === "grey") {
      final_color = "67, 71, 85";
    } else if (response_color === "navy") {
      final_color = "37, 53, 194";
    } else if (response_color === "indigo blue") {
      final_color = "56, 149, 255";
    } else if (response_color === "sky blue") {
      final_color = "108, 226, 255";
    } else if (response_color === "green") {
      final_color = "133, 243, 30";
    } else if (response_color === "yellow") {
      final_color = "241, 238, 19";
    } else if (response_color === "orange") {
      final_color = "255, 145, 0";
    } else if (response_color === "red orange") {
      final_color = "255, 94, 0";
    } else if (response_color === "red") {
      final_color = "255, 8, 0";
    } else if (response_color === "purple") {
      final_color = "241, 148, 221";
    } else if (response_color === "brown") {
      final_color = "204, 140, 80";
    } else if (response_color === "black") {
      final_color = " 83, 83, 83";
    }
    return final_color;
  };

  const set_color = (title: string, value: string | number) => {
    let response_color = "grey";
    let final_color = "#D9D9D9";

    if (title === "ความต่างความกดอากาศ") {
      response_color = setPressureColor(value);
    } else {
      response_color = color_decide(title, value);
    }

    if (response_color === "grey") {
      final_color = "#D9D9D9";
    } else if (response_color === "navy") {
      final_color = "rgb(37, 53, 194)";
    } else if (response_color === "indigo blue") {
      final_color = "rgb(56, 149, 255)";
    } else if (response_color === "sky blue") {
      final_color = "rgb(108, 226, 255)";
    } else if (response_color === "green") {
      final_color = "rgb(82, 219, 19)";
    } else if (response_color === "yellow") {
      final_color = "rgb(248, 193, 12)";
    } else if (response_color === "orange") {
      final_color = "rgb(255, 145, 0)";
    } else if (response_color === "red orange") {
      final_color = "rgb(255, 94, 0)";
    } else if (response_color === "red") {
      final_color = "rgb(221, 17, 10)";
    } else if (response_color === "purple") {
      final_color = "rgb(194, 51, 230)";
    } else if (response_color === "brown") {
      final_color = "rgb(139, 87, 66)";
    } else if (response_color === "black") {
      final_color = "rgb(83, 83, 83)";
    }
    return final_color;
  };

  // const set_each_part_bg = (title: string, value: string | number) => {
  //   let response_color = "grey";
  //   let final_color = "#D9D9D9";

  //   if (title === "ความต่างความกดอากาศ") {
  //     response_color = setPressureColor(value);
  //   } else {
  //     response_color = color_decide(title, value);
  //   }

  //   if (response_color === "grey") {
  //     final_color = "rgba(204, 204, 204, 0.1)";
  //   } else if (response_color === "navy") {
  //     final_color = "rgba(37, 53, 194, 0.1)";
  //   } else if (response_color === "indigo blue") {
  //     final_color = "rgba(56, 149, 255, 0.1)";
  //   } else if (response_color === "sky blue") {
  //     final_color = "rgba(108, 226, 255, 0.1)";
  //   } else if (response_color === "green") {
  //     final_color = "rgba(103, 238, 13, 0.1)";
  //   } else if (response_color === "yellow") {
  //     final_color = "rgba(248, 193, 12, 0.1)";
  //   } else if (response_color === "orange") {
  //     final_color = "rgba(255, 145, 0, 0.1)";
  //   } else if (response_color === "red orange") {
  //     final_color = "rgba(255, 94, 0, 0.1)";
  //   } else if (response_color === "red") {
  //     final_color = "rgba(255, 30, 0, 0.1)";
  //   } else if (response_color === "purple") {
  //     final_color = "rgba(194, 51, 230, 0.1)";
  //   } else if (response_color === "brown") {
  //     final_color = "rgba(139, 87, 66, 0.1)";
  //   } else if (response_color === "black") {
  //     final_color = "rgba(83, 83, 83, 0.1)";
  //   }
  //   // return final_color;
  //   return "rgb(255, 255, 255)";
  // };

  const set_each_part_bg = (title: string, value: string | number) => {
    let response_color = "grey";
    let final_color = "#D9D9D9";

    if (title === "ความต่างความกดอากาศ") {
      response_color = setPressureColor(value);
    } else {
      response_color = color_decide(title, value);
    }

    if (response_color === "grey") {
      final_color = "rgb(255, 255, 255)";
    } else if (response_color === "navy") {
      final_color = "rgb(233, 235, 255)";
    } else if (response_color === "indigo blue") {
      final_color = "rgb(239, 246, 255)";
    } else if (response_color === "sky blue") {
      final_color = "rgb(232, 250, 255)";
    } else if (response_color === "green") {
      final_color = "rgb(249, 255, 243)";
    } else if (response_color === "yellow") {
      final_color = "rgb(255, 252, 243)";
    } else if (response_color === "orange") {
      final_color = "rgb(255, 248, 240)";
    } else if (response_color === "red orange") {
      final_color = "rgb(255, 242, 234)";
    } else if (response_color === "red") {
      final_color = "rgb(255, 237, 234)";
    } else if (response_color === "purple") {
      final_color = "rgb(253, 243, 255)";
    } else if (response_color === "brown") {
      final_color = "rgb(255, 243, 238)";
    } else if (response_color === "black") {
      final_color = "rgb(231, 231, 231)";
    }
    return final_color;
  };

  const set_circle_border_color = (title: string, value: string | number) => {
    let response_color = "grey";
    let final_color = "#D9D9D9";

    if (title === "ความต่างความกดอากาศ") {
      response_color = setPressureColor(value);
    } else {
      response_color = color_decide(title, value);
    }

    if (response_color === "grey") {
      final_color = "#D9D9D9";
    } else if (response_color === "navy") {
      final_color = "rgba(62, 77, 212, 0.2)";
    } else if (response_color === "indigo blue") {
      final_color = "rgba(56, 149, 255, 0.2)";
    } else if (response_color === "sky blue") {
      final_color = "rgba(108, 226, 255, 0.2)";
    } else if (response_color === "green") {
      final_color = "rgba(103, 238, 13, 0.2)";
    } else if (response_color === "yellow") {
      final_color = "rgba(248, 193, 12, 0.2)";
    } else if (response_color === "orange") {
      final_color = "rgba(255, 145, 0, 0.2)";
    } else if (response_color === "red orange") {
      final_color = "rgba(255, 94, 0, 0.2)";
    } else if (response_color === "red") {
      final_color = "rgba(255, 67, 61, 0.2)";
    } else if (response_color === "purple") {
      final_color = "rgba(194, 51, 230, 0.2)";
    } else if (response_color === "brown") {
      final_color = "rgba(139, 87, 66, 0.2)";
    } else if (response_color === "black") {
      final_color = "rgba(83, 83, 83, 0.2)";
    }
    return final_color;
  };

  const set_emoji = (title: string, value: string | number) => {
    let response_color = "grey";
    let final_color = "#D9D9D9";

    if (title === "ความต่างความกดอากาศ") {
      response_color = setPressureColor(value);
    } else {
      response_color = color_decide(title, value);
    }

    if (response_color === "grey") {
      return (
        <MdMoreHoriz
          className={styles["emotion"]}
          style={{
            color: "rgb(163, 163, 163)",
          }}
        />
      );
    } else if (response_color === "navy") {
      return (
        <FaFaceFrownOpen
          className={styles["emotion"]}
          style={{
            color: "rgba(47, 56, 189, 0.75)",
          }}
        />
      );
    } else if (response_color === "indigo blue") {
      return (
        <FaFaceFrownOpen
          className={styles["emotion"]}
          style={{
            color: "rgba(50, 116, 216, 0.75)",
          }}
        />
      );
    } else if (response_color === "sky blue") {
      return (
        <FaFaceFrownOpen
          className={styles["emotion"]}
          style={{
            color: "rgba(36, 200, 241, 0.75)",
          }}
        />
      );
    } else if (response_color === "green") {
      return (
        <FaFaceGrinBeam
          className={styles["emotion"]}
          style={{
            color: "rgba(80, 199, 0, 0.75)",
          }}
        />
      );
    } else if (response_color === "yellow") {
      return (
        <FaFaceFrownOpen
          className={styles["emotion"]}
          style={{
            color: "rgba(228, 156, 0, 0.75)",
          }}
        />
      );
    } else if (response_color === "orange") {
      return (
        <FaFaceFrownOpen
          className={styles["emotion"]}
          style={{
            color: "rgba(238, 116, 16, 0.75)",
          }}
        />
      );
    } else if (response_color === "red orange") {
      return (
        <FaFaceFrown
          className={styles["emotion"]}
          style={{
            color: "rgba(228, 109, 13, 0.75)",
          }}
        />
      );
    } else if (response_color === "red") {
      return (
        <FaFaceFrown
          className={styles["emotion"]}
          style={{
            color: "rgba(235, 73, 73, 0.75)",
          }}
        />
      );
    } else if (response_color === "purple") {
      return (
        <FaFaceDizzy
          className={styles["emotion"]}
          style={{
            color: "rgba(162, 19, 197, 0.75)",
          }}
        />
      );
    } else if (response_color === "brown") {
      return (
        <FaFaceDizzy
          className={styles["emotion"]}
          style={{
            color: "rgba(133, 79, 48, 0.75)",
          }}
        />
      );
    } else if (response_color === "black") {
      return (
        <FaFaceDizzy
          className={styles["emotion"]}
          style={{
            color: "rgba(56, 56, 56, 0.75)",
          }}
        />
      );
    } else {
      return (
        <MdMoreHoriz
          className={styles["emotion"]}
          style={{
            color: "rgb(163, 163, 163)",
          }}
        />
      );
    }
  };

  return (
    <div className={styles["cardset"]}>
      <div className={styles["aqcard"]}>
        <div className={styles["big-part"]}>
          <div
            className={styles["pm25-border"]}
            style={
              {
                "--border-gradient": `linear-gradient(135deg,${set_gradient_border(
                  "PM2.5",
                  pm25
                )})`,
              } as React.CSSProperties
            }
          >
            <div
              className={styles["pm25-part"]}
              style={{
                backgroundColor: set_each_part_bg("PM2.5", pm25),
              }}
            >
              <div
                className={styles["big-circle"]}
                style={{
                  backgroundColor: set_circle_border_color("PM2.5", pm25),
                  borderColor: set_circle_border_color("PM2.5", pm25),
                }}
              >
                {set_emoji("PM2.5", pm25)}
              </div>
              <div className={styles["big-textbox"]}>
                <div className={styles["big-title"]}>PM2.5</div>
                <div className={styles["big-value"]}>{pm25} µg/m³</div>
              </div>
            </div>
          </div>
          <div
            className={styles["co2-border"]}
            style={
              {
                "--border-gradient": `linear-gradient(135deg,${set_gradient_border(
                  "CO2",
                  co2
                )})`,
              } as React.CSSProperties
            }
          >
            <div
              className={styles["co2-part"]}
              style={{
                backgroundColor: set_each_part_bg("CO2", co2),
              }}
            >
              <div
                className={styles["big-circle"]}
                style={{
                  backgroundColor: set_circle_border_color("CO2", co2),
                  borderColor: set_circle_border_color("CO2", co2),
                }}
              >
                {set_emoji("CO2", co2)}
              </div>
              <div className={styles["big-textbox"]}>
                <div className={styles["big-title"]}>CO2</div>
                <div className={styles["big-value"]}>{co2} ppm</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["small-part"]}>
          <div className={styles["temperature-part"]}>
            <FaThermometerHalf
              className={styles["thermo"]}
              style={{ color: set_color("อุณหภูมิ", temperature) }}
            />
            <div className={styles[""]}>{temperature}°C</div>
          </div>
          <div className={styles["humidity-part"]}>
            <IoWaterSharp className={styles["waterdrop"]} />
            <div className={styles[""]}>{humidity}%</div>
          </div>
          <div className={styles["pressure-part"]}>
            <ImSpinner2
              className={styles["swirl"]}
              style={{ color: set_color("ความกดอากาศ", pressure) }}
            />
            <div className={styles["small-title"]}>ความกดอากาศ</div>
            <div className={styles[""]}>{pressure} Pascal</div>
          </div>
        </div>
      </div>
      <div className={styles["eleccard"]}>
        <div className={styles["elec-title"]}>ค่าไฟฟ้าเฉลี่ย</div>
        <div className={styles["elec-circle"]}>
          <HiLightningBolt className={styles["lightning"]} />
        </div>
        <div className={styles["elec-value"]}>XXX บาท</div>
      </div>
    </div>
  );
};

export default AirQualityCard;
