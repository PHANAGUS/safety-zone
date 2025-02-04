"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// กำหนด Type สำหรับ Context
interface GlobalStateType {
  loading: boolean;
  setLoading: (value: boolean) => void;

  username: string;
  setUsername: (value: string) => void;
  userID: number;
  setUserID: (value: number) => void;

  homeName: string;
  setHomeName: (value: string) => void;
  homeID: number;
  setHomeID: (value: number) => void;

  roomName: string;
  setRoomName: (value: string) => void;
  roomID: number;
  setRoomID: (value: number) => void;
}

// สร้าง Context
const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<number>(0);

  const [homeName, setHomeName] = useState<string>("");
  const [homeID, setHomeID] = useState<number>(0);

  const [roomName, setRoomName] = useState<string>("");
  const [roomID, setRoomID] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const storedUserID = localStorage.getItem("userID");
      const storedHomeName = localStorage.getItem("homeName");
      const storedHomeID = localStorage.getItem("homeID");
      const storedRoomName = localStorage.getItem("roomName");
      const storedRoomID = localStorage.getItem("roomID");
      if (storedUsername) {
        setUsername(storedUsername); // หากมีค่าจาก localStorage ให้ตั้งค่า
      }
      if (storedUserID) {
        setUserID(Number(storedUserID));
      }
      if (storedHomeName) {
        setHomeName(storedHomeName);
      }
      if (storedHomeID) {
        setHomeID(Number(storedHomeID));
      }
      if (storedRoomName) {
        setRoomName(storedRoomName);
      }
      if (storedRoomID) {
        setRoomID(Number(storedRoomID));
      }
      setLoading(false); // เมื่อโหลดข้อมูลเสร็จให้ตั้ง loading เป็น false
    }
  }, []); // รันแค่ครั้งเดียวหลังจาก component แสดงผล

  // ทุกครั้งที่ username เปลี่ยนแปลงให้เก็บค่าใน localStorage
  useEffect(() => {
    // const storedUsername = localStorage.getItem("username");
    // const storedUserID = localStorage.getItem("userID");
    // const storedHomeName = localStorage.getItem("homeName");
    // const storedHomeID = localStorage.getItem("homeID");
    // const storedRoomName = localStorage.getItem("roomName");
    // const storedRoomID = localStorage.getItem("roomID");
    if (username !== "") {
      localStorage.setItem("username", username);
      localStorage.setItem("userID", String(userID));
    }
    if (homeID !== 0) {
      localStorage.setItem("homeName", homeName);
      localStorage.setItem("homeID", String(homeID));
    }
    if (roomID !== 0) {
      localStorage.setItem("roomName", roomName);
      localStorage.setItem("roomID", String(roomID));
    }
  }, [username, homeID, roomID]);

  return (
    <GlobalStateContext.Provider
      value={{
        loading,
        setLoading,
        username,
        setUsername,
        userID,
        setUserID,
        homeName,
        setHomeName,
        homeID,
        setHomeID,
        roomName,
        setRoomName,
        roomID,
        setRoomID,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom Hook สำหรับใช้ Global State
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState ต้องใช้ภายใน GlobalStateProvider");
  }
  return context;
};
