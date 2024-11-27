import { useThemeContext } from "../../context/ThemeContext";
import Room from "../../models/Room";
import { useEffect, useState } from "react";

/**
 * The RoomCell component, displays the room cell.
 * 
 * @author Zach Sanchez (zachs00)
 * @author Ethan Moore (handkrchief)
 * @version November 22nd, 2024
 */

export default function RoomCell({ room }: { room: Room }) {
  const entry = room.getTypeAsNumber() && room.getIsOpen() ? room.getTypeAsNumber() : "W";

  const {theme, themeColors} = useThemeContext();
  const lightClassValueMap: Record<number | string, string> = {
    1: "bg-white",
    5: "bg-green-500",
    9: "bg-red-500",
    4: "bg-yellow-500",
    7: "bg-white",
    "W": "bg-black",
  };

  const darkClassValueMap: Record<number | string, string> = {
    1: "bg-gray-200 bg-opacity-20 backdrop-filter backdrop-blur-lg",
    5: "bg-green-600",
    9: "bg-red-600",
    4: "bg-yellow-600",
    7: "bg-gray-200 bg-opacity-20 backdrop-filter backdrop-blur-lg",
    "W": "bg-black",
  };

  const classValueMap = theme === "dark" ? darkClassValueMap : lightClassValueMap;

  const valueMap: Record<number | string, string> = {
    1: "",
    5: "S",
    9: "E",
    4: "I",
    7: "P",
    "W": "",
  };

  const roomClass = `flex items-center justify-center ${classValueMap[entry]} h-[6vh] w-[6vh]`

  

  return (
    <div className={roomClass}>
      {room.getTypeAsNumber() == 7 ? <SvgIcon /> : room.getTypeAsNumber() ? valueMap[room.getTypeAsNumber()] : ""}
    </div>
  );
}


const SvgIcon = () => (
  <div className="p-3 w-full h-full border border-amber-300 rounded-full bg-amber-300 bg-opacity-20 backdrop-filter backdrop-blur-lg">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Capa_1"
    height="100%"
    width="100%"

    version="1.1"
    viewBox="0 0 489.3 489.3"
  >
    <path d="M181.95 62.7c0 34.6 28.1 62.7 62.7 62.7s62.7-28.1 62.7-62.7S279.25 0 244.65 0s-62.7 28.1-62.7 62.7m62.7-38.2c21.1 0 38.2 17.1 38.2 38.2s-17.1 38.2-38.2 38.2-38.2-17.1-38.2-38.2 17.1-38.2 38.2-38.2M196.25 138.5c-34.3 0-62.2 27.9-62.2 62.2v79.7c0 23 12.9 44 32.8 54.7v104.7c0 27.3 22.2 49.5 49.5 49.5h56.6c27.3 0 49.5-22.2 49.5-49.5V335c19.9-10.7 32.8-31.7 32.8-54.7v-79.7c0-34.3-27.9-62.2-62.2-62.2h-96.8zm134.5 62.1v79.7c0 15.7-9.9 29.9-24.7 35.3-4.8 1.8-8 6.4-8 11.5v112.6c0 13.8-11.2 25-25 25h-56.6c-13.8 0-25-11.2-25-25V327.2c0-5.1-3.2-9.7-8-11.5-14.8-5.4-24.7-19.6-24.7-35.3v-79.8c0-20.8 16.9-37.7 37.7-37.7h96.8c20.6.1 37.5 17 37.5 37.7"></path>
  </svg>
  </div>
);
