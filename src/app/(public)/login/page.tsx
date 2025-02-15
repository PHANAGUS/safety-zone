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
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const login = async () => {
    // console.log(login_url);
    const response: LoginResponse = await fetchLoginData(
      login_url,
      typingUsername,
      password
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
    <div className={styles.bg}>
      <div className={styles["window-white"]}>
        <p className={styles["login-title"]}>Log In</p>
        <p>john_doe</p>
        <p>securepassword123</p>
        <div className={styles["input-section"]}>
          <p>Username</p>
          <input
            type="text"
            value={typingUsername}
            onChange={(e) => setTypingUsername(e.target.value)}
            className={styles["input-box"]}
          />
          {/* <p className="mt-2 text-gray-600">คุณพิมพ์ว่า: {username}</p> */}
          <p>Password</p>
          <div className={styles["password-input-container"]}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <div className={styles["btn-and-warning-message"]}>
          <p
            style={{
              color: message === "Login successful" ? "#40bf15" : "#f34949",
            }}
          >
            {message}
          </p>
          <div className={styles["login-button"]} onClick={login}>
            Log in
          </div>
        </div>
        <div className={styles[""]}>
          <p className={styles[""]}>Don’t have an account?</p>
          <div
            className={styles[""]}
            onClick={() => {
              router.replace("/register");
            }}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
