import Room from "../../models/Room";
import { useEffect, useState } from "react";

export default function RoomCell({ room }: { room: Room }) {
  const entry = room.getTypeAsNumber() ? room.getTypeAsNumber() : "W";

  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const handleDarkModeToggle = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Create the observer and link it to handleDarkModeToggle
    const observer = new MutationObserver(handleDarkModeToggle);

    // Observe changes to the 'class' attribute of document.documentElement
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Cleanup the observer on component unmount
    return () => observer.disconnect();
  }, []);

  const lightClassValueMap: Record<number | string, string> = {
    1: "bg-white",
    5: "bg-green-500",
    9: "bg-red-500",
    4: "bg-yellow-500",
    7: "bg-purple-600",
    "W": "bg-black",
  };

  const darkClassValueMap: Record<number | string, string> = {
    1: "bg-gray-500",
    5: "bg-green-600",
    9: "bg-red-600",
    4: "bg-yellow-600",
    7: "bg-purple-700",
    "W": "bg-gray-900",
  };

  const classValueMap = isDarkMode ? darkClassValueMap : lightClassValueMap;

  const valueMap: Record<number | string, string> = {
    1: "",
    5: "S",
    9: "E",
    4: "I",
    7: "P",
    "W": "",
  };

  return (
    <div className={`border flex items-center justify-center ${classValueMap[entry]} h-[4rem] w-[4rem]`}>
      {room.getTypeAsNumber() ? valueMap[room.getTypeAsNumber()] : ""}
    </div>
  );
}
