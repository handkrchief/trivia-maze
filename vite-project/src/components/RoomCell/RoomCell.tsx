export default function RoomCell({value}:{value:number}) {
    const entry = value ? value : "W";
  
    const classValueMap: Record<number | string, string> = {
        1:"bg-white",
        5:"bg-green-500",
        9:"bg-red-500",
        4:"bg-yellow-500",
        "W":"bg-black"
    }

    const valueMap: Record<number | string, string> = {
        1:"",
        5:"S",
        9:"E",
        4:"I",
        "W":"",
    }
    return (
        <div className={`border flex items-center justify-center ${classValueMap[entry]} h-[4rem] w-[4rem]`}>
         {value ? valueMap[entry]: ""}
        </div>
    )
}
