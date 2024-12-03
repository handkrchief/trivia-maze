import Maze from "../../models/Maze";
import MazeGenerator from "../../models/MazeGenerator";
import s from"./PreGameOptionsComponent.module.css"
import { useMazeContext } from "../../context/MazeContext";
import { useEffect } from "react";
import { lightThemeColors, darkThemeColors } from "../../ThemeColors";
import { useThemeContext } from "../../context/ThemeContext";
import { QuestionsThemes } from "../../types/QuestionTypes";
import Room from "../../models/Room";

/**
 * The PreGameOptionsComponent component, displays the pre-game options.
 * 
 * @author Zach Sanchez (zachs00)
 * @version November 21st, 2024
 */
export default function PreGameOptionsComponent() {

    const {mySize, setMySize, setMyMazeAsNumbers, setLoading, setStarted, setMyCurrentRoom, setMyMaze, initializeQuestionsFromDB
          , setQuestionsInRooms} = useMazeContext();

    /**
     * The theme and theme colors for the PreGameOptionsComponent.
     */
    const {theme} = useThemeContext();
    /**
     * The theme colors for the PreGameOptionsComponent.
     */
    const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;

    /**
     * The function to handle the button click.
     * Uses the size provided to generate a maze, and then sets the maze,
     * current room, and started state.
     * 
     * @returns Promise<void>
     */
    const handleClickButton = async(): Promise<void> => {
        try {
          const chosenThemeAsTest: QuestionsThemes = "Test"
          initializeQuestionsFromDB(chosenThemeAsTest, mySize);
          const myMazeGenerator:MazeGenerator = new MazeGenerator();
          const myMazeAsNumbers:number[][] = myMazeGenerator.mazeGeneration(mySize);
          let myCurrMaze:Maze = new Maze(myMazeAsNumbers);
          myCurrMaze = setQuestionsInRooms(myCurrMaze)
          setMyMazeAsNumbers(myMazeAsNumbers);
          setStarted(true);
          setMyMaze(myCurrMaze);
          setMyCurrentRoom(myCurrMaze.getStartingRoom());
          

        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);

        }
      }

      const handleLoadButton = () => {
        const chosenThemeAsTest: QuestionsThemes = "Test"
        initializeQuestionsFromDB(chosenThemeAsTest, mySize);
        const myMazeGenerator:MazeGenerator = new MazeGenerator();
        const myMazeAsNumbers:number[][] = myMazeGenerator.mazeGeneration(mySize);
        let myCurrMaze:Maze = new Maze(myMazeAsNumbers);
        myCurrMaze.fromJSon(localStorage.getItem("maze"));
        myCurrMaze = setQuestionsInRooms(myCurrMaze);
        // setMyMazeAsNumbers(myMazeAsNumbers);
        setStarted(true);
        
        
          setMyMaze(myCurrMaze);
        
      //  setMyMaze(getSavedMaze());
       setMyCurrentRoom(myCurrMaze.getStartingRoom());
      }
    
    

    /**
     * The useEffect to check if the size is greater than 7, and if so,
     * it alerts the user and sets the size to 7.
     * 
     * this will run when mySize changes.
     */
      useEffect(() => {
        if(mySize && mySize > 7){
          alert("Size must be less than or equal to 7");
          setMySize(7);
        }
      }, [mySize]);

      // const getSavedMaze = () => {
      //   const maze = localStorage.getItem("maze");
      //   return maze ? JSON.parse(maze) : null;
      // }

  return (
    <div className={`${s.container} ${themeColors.primaryOutline} ${themeColors.formBackground}`}>


      <div className={s.sizeContainer}>
        <span className={`${s.sizeLabel} size-text`}>Size</span>
        <input className={s.sizeInput} type="number" value={mySize} onChange={(e) => setMySize(parseInt(e.target.value))} />
      </div>
 
      <button disabled={!mySize || mySize < 4} className={ !mySize || mySize < 4 ? themeColors.disabledButton : themeColors.primaryButton} onClick={handleClickButton}>Generate Maze</button>
       {localStorage.getItem("maze") && <button onClick={handleLoadButton}>Load</button>}
      </div>
  )
}
