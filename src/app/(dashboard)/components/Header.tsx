"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

import styles from "./Header.module.css";

const Header: React.FC = ({}) => {
  const router = useRouter();
  const { loading, setLoading, username, setUsername, userID, setUserID } =
    useGlobalState();

  return (
    <div className={styles["header"]}>
      <div className={styles["button-container"]}>
        {/* <button
          className={styles["button"]}
          onClick={() => router.replace("/homelist")}
        >
          Homelist
        </button>
        <button
          className={styles["button"]}
          onClick={() => router.replace("/roomlist")}
        >
          Roomlist
        </button>
        <button
          className={styles["button"]}
          onClick={() => router.replace("/dashboard")}
        >
          Dashboard
        </button> */}
      </div>
      <button
        className={styles["button"]}
        onClick={() => router.replace("/login")}
      >
        Log out
      </button>
      {/* <p>{username}</p>
      <p>{userID}</p> */}
    </div>
  );
};

export default Header;
