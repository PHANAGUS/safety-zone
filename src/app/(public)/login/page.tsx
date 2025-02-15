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

const Login: React.FC = () => {
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

  const [showPassword, setShowPassword] = useState(false);

  const [typingUsername, setTypingUsername] = useState("");
  const [typingPassword, setTypingPassword] = useState("");

  const [message, setMessage] = useState("");

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
    // console.log(currentPage);
  }, []);

  // useEffect(() => {
  //   setTypingUsername(username); // อัปเดตค่าเมื่อ username เปลี่ยน
  // }, [username]);

  return (
    <div className={styles["window"]}>
      <div className={styles["window-left"]}></div>
      <div className={styles["window-right"]}>
        <div className={styles["login-title"]}>Log in</div>
        <div className={styles["input-grid"]}>
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
                onChange={(e) => {
                  setTypingPassword(e.target.value);
                }}
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
        </div>
        <div className={styles["login-btn"]}>Log in</div>
        <div className={styles["goto-register-line"]}>
          <p className={styles["goto-register-text"]}>Don't have an account?</p>
          <p
            className={styles["goto-register-link"]}
            onClick={() => router.replace("/register")}
          >
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
