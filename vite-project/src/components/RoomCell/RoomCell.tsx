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
    7: "bg-purple-600",
    "W": "bg-black",
  };

  const darkClassValueMap: Record<number | string, string> = {
    1: "bg-gray-200 bg-opacity-20 backdrop-filter backdrop-blur-lg",
    5: "bg-green-600",
    9: "bg-red-600",
    4: "bg-yellow-600",
    7: "bg-purple-800",
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

  return (
    <div className={` flex items-center justify-center ${classValueMap[entry]} h-[6vh] w-[6vh] ${themeColors.primaryOutline} `}>
      {room.getTypeAsNumber() ? valueMap[room.getTypeAsNumber()] : ""}
    </div>
  );
}
