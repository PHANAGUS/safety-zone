"use client";

import React, { useEffect, useState } from "react";
// import "../css/AirQualityCard.css";
import { color_decide, setPressureColor } from "@/app/api/convert_data";
import styles from "./AirQualityCard.module.css";

interface AirQualityCardProps {
  title: string;
  unit: string;
  cal_value: string | number;
  outside_value: string | number;
  inroom_value: string | number;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({
  title,
  unit,
  cal_value,
  outside_value,
  inroom_value,
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
      final_color = "rgb(42, 219, 19)";
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

  return (
    <div
      className={styles["border"]}
      style={
        {
          "--border-gradient": `linear-gradient(135deg,${set_gradient_border(
            title,
            cal_value
          )})`,
          // ${set_shadow(title, cal_value)})

          // "--shadow": `rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
          // rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,

          "--shadow": `rgba(${set_shadow(
            title,
            cal_value
          )}, 0.5) 0px 0px 0.25em,
          rgba(${set_shadow(title, cal_value)}, 0.15) 0px 0.25em 1em`,
        } as React.CSSProperties
      }
    >
      <div className={styles["aqcard"]}>
        <div className={styles["title-part"]}>
          <div className={styles["title"]}>{title}</div>
          <div className={styles["unit"]}>{unit}</div>
        </div>
        <div className={styles["cal-part"]}>
          <div
            className={styles["cal-value"]}
            style={{ color: set_color(title, cal_value) }}
          >
            {cal_value}
          </div>
          <div
            className={styles["cal-value-bg"]}
            style={{ borderColor: set_color(title, cal_value) }}
          ></div>
        </div>
        <div className={styles["sub-value-part"]}>
          <div className={styles["each-sub-line"]}>
            <div
              className={styles["small-circle"]}
              style={{ backgroundColor: set_color(title, outside_value) }}
            ></div>
            <div className={styles["info-text"]}>นอกห้อง {outside_value}</div>
          </div>
          <div className={styles["each-sub-line"]}>
            <div
              className={styles["small-circle"]}
              style={{ backgroundColor: set_color(title, inroom_value) }}
            ></div>
            <div className={styles["info-text"]}>ในห้อง {inroom_value}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
