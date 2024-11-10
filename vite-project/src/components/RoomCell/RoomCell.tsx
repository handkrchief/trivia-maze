import Room from "../../models/Room";

export default function RoomCell({room}:{room:Room}) {
    const entry = room.getTypeAsNumber() ? room.getTypeAsNumber() : "W";
  
    const classValueMap: Record<number | string, string> = {
        1:"bg-gray-400",
        5:"bg-green-500",
        9:"bg-red-500",
        4:"bg-yellow-500",
        7:"bg-purple-600",
        "W":"bg-gray-900"
    }

    const valueMap: Record<number | string, string> = {
        1:"",
        5:"S",
        9:"E",
        4:"I",
        7:"P",
        "W":"",
    }
    return (
        <div className={`border flex items-center justify-center ${classValueMap[entry]} h-[4rem] w-[4rem]`}>
         {room.getTypeAsNumber() ? valueMap[room.getTypeAsNumber()]: ""}
        </div>
    )
}
