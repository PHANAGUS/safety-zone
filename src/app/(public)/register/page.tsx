"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import styles from "./page.module.css";

import { fetchLoginData } from "../../api/login.js";

const login_url = process.env.NEXT_PUBLIC_URL;

interface User {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
}

interface LoginResponse {
  message: string;
  user: User[];
}

const Register: React.FC = () => {
  const router = useRouter();
  const {
    loading,
    setLoading,
    username,
    setUsername,
    userID,
    setUserID,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    homeName,
    setHomeName,
    homeID,
    setHomeID,
    roomName,
    setRoomName,
    roomID,
    setRoomID,
    currentPage,
    setCurrentPage,
  } = useGlobalState();

  const [typingFirstname, setTypingFirstname] = useState<string>("");
  const [typingLastname, setTypingLastname] = useState<string>("");
  const [typingUsername, setTypingUsername] = useState<string>("");
  const [typingPassword, setTypingPassword] = useState<string>("");
  const [typingConfirmPassword, setTypingConfirmPassword] =
    useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [confirmPasswordDesc, setConfirmPasswordDesc] = useState<string>(
    "โปรดยืนยันรหัสผ่านอีกครั้ง"
  );

  const [message, setMessage] = useState("");

  const checkConfirmPassword = () => {
    if (typingConfirmPassword === typingPassword) {
      setConfirmPasswordDesc("✅รหัสผ่านตรงกัน");
    } else {
      setConfirmPasswordDesc("❌รหัสผ่านไม่ตรงกัน");
    }
  };

  //   useEffect(() => {
  //     if (typingConfirmPassword === typingPassword) {
  //       setConfirmPasswordDesc("✅รหัสผ่านตรงกัน");
  //     } else {
  //       setConfirmPasswordDesc("❌รหัสผ่านไม่ตรงกัน");
  //     }
  //   }, [typingConfirmPassword]);

  const login = async () => {
    // console.log(login_url);
    const response: LoginResponse = await fetchLoginData(
      login_url,
      typingUsername,
      typingPassword
    );
    if (response.message === "Login successful") {
      setMessage(response.message);
      setUsername(response.user[0].username);
      setUserID(response.user[0].user_id);
      setFirstname(response.user[0].first_name);
      setLastname(response.user[0].last_name);

      router.replace("/homelist");
    } else {
      setMessage(response.message);
    }
  };

  useEffect(() => {
    setCurrentPage("login");
  }, []);

  return (
    <div className={styles["window"]}>
      <div className={styles["window-left"]}></div>
      <div className={styles["window-right"]}>
        <div className={styles["register-title"]}>Sign Up</div>
        <div className={styles["input-grid"]}>
          <div className={styles["firstname-section"]}>
            <p className={styles["input-title"]}>Fisrt name</p>
            <input
              type="text"
              value={typingFirstname}
              onChange={(e) => setTypingFirstname(e.target.value)}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["lastname-section"]}>
            <p className={styles["input-title"]}>Last name</p>
            <input
              type="text"
              value={typingLastname}
              onChange={(e) => setTypingLastname(e.target.value)}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["username-section"]}>
            <p className={styles["input-title"]}>Username</p>
            <input
              type="text"
              value={typingUsername}
              onChange={(e) => setTypingUsername(e.target.value)}
              className={styles["input-box"]}
            />
          </div>
          <div className={styles["password-section"]}>
            <p className={styles["input-title"]}>Password</p>
            <div className={styles["password-input-box"]}>
              <input
                type={showPassword ? "text" : "password"}
                value={typingPassword}
                onChange={(e) => setTypingPassword(e.target.value)}
                className={styles["input-box"]}
              />
              <div
                className={
                  styles[showPassword ? "eye-button-show" : "eye-button-hide"]
                }
                onClick={() => setShowPassword(!showPassword)}
              ></div>
            </div>
          </div>
          <div className={styles["confirm-password-section"]}>
            <p className={styles["input-title"]}>Confirm password</p>
            <div className={styles["password-input-box"]}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={typingConfirmPassword}
                onChange={(e) => {
                  setTypingConfirmPassword(e.target.value);
                  checkConfirmPassword();
                }}
                className={styles["input-box"]}
              />
              <div
                className={
                  styles[
                    showConfirmPassword ? "eye-button-show" : "eye-button-hide"
                  ]
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></div>
            </div>
            <p
              className={styles["confirm-password-description"]}
              style={{ color: `#d4d4d4` }}
            >
              {confirmPasswordDesc}
            </p>
          </div>
        </div>
        <div className={styles["signup-btn"]}>Sign Up</div>
      </div>
    </div>
  );
};

export default Register;
