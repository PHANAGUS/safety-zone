"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface homes {
  home_id: number;
  home_name: string;
  mainUserID: number;
}

interface rooms {
  room_name: string;
  room_id: number;
}

// กำหนด Type สำหรับ Context
interface GlobalStateType {
  loading: boolean;
  setLoading: (value: boolean) => void;

  firstname: string;
  setFirstname: (value: string) => void;
  lastname: string;
  setLastname: (value: string) => void;

  username: string;
  setUsername: (value: string) => void;
  userID: number;
  setUserID: (value: number) => void;

  // homeName: string;
  // setHomeName: (value: string) => void;
  // homeID: number;
  // setHomeID: (value: number) => void;

  // roomName: string;
  // setRoomName: (value: string) => void;
  // roomID: number;
  // setRoomID: (value: number) => void;

  home: homes;
  setHome: (value: homes) => void;
  room: rooms;
  setRoom: (value: rooms) => void;

  currentPage: string;
  setCurrentPage: (value: string) => void;
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

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userID, setUserID] = useState<number>(0);

  // const [homeName, setHomeName] = useState<string>("");
  // const [homeID, setHomeID] = useState<number>(0);

  // const [roomName, setRoomName] = useState<string>("");
  // const [roomID, setRoomID] = useState<number>(0);

  const [home, setHome] = useState<homes>({
    home_id: 0,
    home_name: "",
    mainUserID: 0,
  });
  const [room, setRoom] = useState<rooms>({ room_id: 0, room_name: "" });

  const [currentPage, setCurrentPage] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFirstname = localStorage.getItem("firstname");
      const storedLastname = localStorage.getItem("lastname");
      const storedUsername = localStorage.getItem("username");
      const storedUserID = localStorage.getItem("userID");

      // const storedHomeName = localStorage.getItem("homeName");
      // const storedHomeID = localStorage.getItem("homeID");

      // const storedRoomName = localStorage.getItem("roomName");
      // const storedRoomID = localStorage.getItem("roomID");

      const storedHome = localStorage.getItem("home");
      const storedRoom = localStorage.getItem("room");

      if (storedFirstname) {
        setFirstname(storedFirstname);
      }
      if (storedLastname) {
        setLastname(storedLastname);
      }
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedUserID) {
        setUserID(Number(storedUserID));
      }

      // if (storedHomeName) {
      //   setHomeName(storedHomeName);
      // }
      // if (storedHomeID) {
      //   setHomeID(Number(storedHomeID));
      // }

      // if (storedRoomName) {
      //   setRoomName(storedRoomName);
      // }
      // if (storedRoomID) {
      //   setRoomID(Number(storedRoomID));
      // }

      if (storedHome) {
        const jsonObject = JSON.parse(storedHome);
        setHome({
          home_id: jsonObject.home_id,
          home_name: jsonObject.home_name,
          mainUserID: jsonObject.mainUserID,
        });
      }

      if (storedRoom) {
        const jsonObject = JSON.parse(storedRoom);
        setRoom({
          room_id: jsonObject.room_id,
          room_name: jsonObject.room_name,
        });
      }

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username !== "") {
      localStorage.setItem("username", username);
      localStorage.setItem("userID", String(userID));
      localStorage.setItem("firstname", firstname);
      localStorage.setItem("lastname", lastname);
    }
    // if (homeID !== 0) {
    //   localStorage.setItem("homeName", homeName);
    //   localStorage.setItem("homeID", String(homeID));
    // }
    // if (roomID !== 0) {
    //   localStorage.setItem("roomName", roomName);
    //   localStorage.setItem("roomID", String(roomID));
    // }
    if (home !== undefined) {
      localStorage.setItem("home", JSON.stringify(home));
    }
    if (room !== undefined) {
      localStorage.setItem("room", JSON.stringify(room));
    }
  }, [firstname, lastname, username, home, room]);

  return (
    <GlobalStateContext.Provider
      value={{
        loading,
        setLoading,
        firstname,
        setFirstname,
        lastname,
        setLastname,
        username,
        setUsername,
        userID,
        setUserID,
        // homeName,
        // setHomeName,
        // homeID,
        // setHomeID,
        // roomName,
        // setRoomName,
        // roomID,
        // setRoomID,
        home,
        setHome,
        room,
        setRoom,
        currentPage,
        setCurrentPage,
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
