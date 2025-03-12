"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect } from "react";
import styles from "./RangeSlider.module.css";

type RangeSliderProps = {
  title: string;
  min: number;
  max: number;
  last_min: number;
  last_max: number;
  step?: number;
  defaultValue?: [number, number];
  onChange?: (values: [number, number]) => void;
};

const RangeSlider: React.FC<RangeSliderProps> = ({
  title,
  min,
  max,
  last_min,
  last_max,
  step = 1,
  defaultValue = [min, max],
  onChange,
}) => {
  //   const [values, setValues] = useState<[number, number]>(defaultValue);
  const [values, setValues] = useState<[number, number]>([last_min, last_max]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (newValues: number[]) => {
    const [left, right] = newValues as [number, number];
    if (left <= right) {
      setValues([left, right]);
      onChange?.([left, right]);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newValue = Number(value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      const newValues = [...values] as [number, number];
      newValues[index] = newValue;
      if (newValues[0] <= newValues[1]) {
        setValues(newValues);
        onChange?.(newValues);
      }
    }
  };

  //   const handleInputChange = (index: number, value: string) => {
  //     const newValue = Number(value);

  //     // สร้างสำเนาของ values
  //     const newValues = [...values] as [number, number];
  //     newValues[index] = newValue;

  //     // คำนวณ adjustedValues ให้อยู่ในช่วง min-max และแปลงให้เป็น number[]
  //     const adjustedValues: [number, number] = [
  //       Math.max(min, Math.min(newValues[0], max)),
  //       Math.max(min, Math.min(newValues[1], max)),
  //     ];

  //     // เปรียบเทียบค่าก่อนและหลังการปรับ
  //     if (
  //       newValues[0] !== adjustedValues[0] ||
  //       newValues[1] !== adjustedValues[1]
  //     ) {
  //       setValues(adjustedValues); // ใช้ adjustedValues ที่เป็น number[]
  //       onChange?.(adjustedValues); // ใช้ adjustedValues ที่เป็น number[]
  //     } else {
  //       setValues(newValues); // ใช้ newValues ที่เป็น [number, number]
  //       onChange?.(newValues); // ใช้ newValues ที่เป็น [number, number]
  //     }
  //   };

  const set_to_recommended = (title: string) => {
    let recommended_values: [number, number] = [0, 0];

    if (title === "PM2.5") {
      recommended_values = [10, 20];
    } else if (title === "CO2") {
      recommended_values = [400, 600];
    } else if (title === "DiffPres") {
      recommended_values = [5, 10];
    } else if (title === "Temp") {
      recommended_values = [25, 27];
    } else if (title === "Humid") {
      recommended_values = [55, 60];
    }
    setValues(recommended_values);
    handleChange(recommended_values);
  };

  return (
    <div className={styles["big-container"]}>
      <div className={styles["range-slider-container"]}>
        <Slider.Root
          className={styles["slider-root"]}
          min={min}
          max={max}
          step={step}
          value={values}
          onValueChange={handleChange}
        >
          <Slider.Track className={styles["slider-track"]}>
            <Slider.Range className={styles["slider-range"]} />
          </Slider.Track>

          {values.map((value, i) => (
            <Slider.Thumb key={i} className={styles["slider-thumb"]}>
              <div
                className={styles["slider-popup"]}
                //   onClick={() => setEditingIndex(i)}
              >
                {/* {editingIndex === i ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onBlur={() => setEditingIndex(null)}
                  className={styles["slider-input"]}
                  autoFocus
                />
              ) : (
                value
              )} */}
                {value}
              </div>
            </Slider.Thumb>
          ))}
        </Slider.Root>
      </div>
      <div className={styles["text-container"]}>
        <div className={styles[""]}>ค่าต่ำสุด {values[0]},</div>
        <div className={styles[""]}>ค่าสูงสุด {values[1]}</div>
      </div>
      <div className={styles["value-container"]}>
        <div
          className={styles["recommended-btn"]}
          onClick={() => set_to_recommended(title)}
        >
          ค่าแนะนำ
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
