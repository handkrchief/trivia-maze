import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import Room from '../../models/Room';
import RoomCell from '../RoomCell/RoomCell';


/**
 * The MazeComponent component, displays the maze.
 * 
 * @author Zach Sanchez (Zachs00)
 * @version November 21st, 2024
*/

export default function MazeComponent({ maze }: { maze: Room[][] }) {
    const {themeColors} = useThemeContext();
    const {myMaze} = useMazeContext()
    let rowCount = 0;
    console.log(maze)
    return (
        <div className={` ${themeColors.primaryOutline}`} >
            <div className={` flex flex-col ${themeColors.primaryDivide} divide-y`}>
                {myMaze && myMaze.getMaze() && myMaze.getMaze().map((row, rowIndex) => (
                    <div className={`flex flex-row justify-center divide-x ${themeColors.primaryDivide}`}  key={rowCount++}>
                        {row.map((_, cellIndex) => (
                        <RoomCell key={`${rowIndex}-${cellIndex}`}  room={maze[rowIndex][cellIndex]} />
                    ))}
                </div>
            ))}
        </div>
        </div>
    );
}
