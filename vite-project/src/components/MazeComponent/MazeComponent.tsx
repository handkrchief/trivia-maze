import Room from '../../models/Room';
import RoomCell from '../RoomCell/RoomCell';


/**
 * The MazeComponent component, displays the maze.
 * 
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/

export default function MazeComponent({ maze }: { maze: Room[][] }) {
    let rowCount = 0;
    console.log(maze)
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
