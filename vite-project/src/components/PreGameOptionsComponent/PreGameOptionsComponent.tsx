import Maze from "../../models/Maze";
import MazeGenerator from "../../models/MazeGenerator";
import s from"./PreGameOptionsComponent.module.css"
import { useMazeContext } from "../../context/MazeContext";
import { useEffect } from "react";

export default function PreGameOptionsComponent() {

    const {mySize, setMySize, setMyMazeAsNumbers, setLoading, setStarted, setCurrentRoom, setMyMaze} = useMazeContext();

    const handleClickButton = async() => {
        try { 
          const myMazeGenerator:MazeGenerator = new MazeGenerator();
          const myMazeAsNumbers:number[][] = myMazeGenerator.mazeGeneration(mySize);
          const myMaze:Maze = new Maze(myMazeAsNumbers);
          setMyMazeAsNumbers(myMazeAsNumbers);
          setStarted(true);
          setMyMaze(myMaze);
          myMaze.printMaze();
          setCurrentRoom(myMaze.getStartingRoom());
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    
    
    
      useEffect(() => {
        if(mySize && mySize > 7){
          alert("Size must be less than or equal to 7");
          setMySize(7);
        }
      }, [mySize]);

  return (
    <div className={s.container}>


      <div className={s.sizeContainer}>
        <span className={s.sizeLabel}>Size</span>
        <input className={s.sizeInput} type="number" value={mySize} onChange={(e) => setMySize(parseInt(e.target.value))} />
      </div>
 
      <button disabled={!mySize || mySize < 4} className={!mySize || mySize < 4 ? s.disabledButton : s.button} onClick={handleClickButton}>Generate Maze</button>

      </div>
  )
}
