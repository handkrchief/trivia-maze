import Room from '../../models/Room';
import RoomCell from '../RoomCell/RoomCell';


export default function MazeComponent({ maze }: { maze: Room[][] }) {
    let rowCount = 0;
    return (
        <div className={`w-full h-full flex flex-col`}>
            {maze.map((row, rowIndex) => (
                <div className="flex flex-row w-full h-full justify-center" key={rowCount++}>
                    {row.map((_, cellIndex) => (
                        <RoomCell key={`${rowIndex}-${cellIndex}`}  room={maze[rowIndex][cellIndex]} />
                    ))}
                </div>
            ))}
        </div>
    );
}
