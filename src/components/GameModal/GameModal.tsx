import { useThemeContext } from "../../context/ThemeContext";
import s from "./GameModal.module.css";
import { useMazeContext } from "../../context/MazeContext";
import Maze from "../../models/Maze";
import MazeGenerator from "../../models/MazeGenerator";
import { QuestionsThemes } from "../../types/QuestionTypes";
export default function GameModal() {
    const {themeColors} = useThemeContext();
    const {gameOverMessage, setGameOverMessage, startOver, initializeQuestionsFromDB, setMyMazeAsNumbers,
       setLoading, setStarted, setMyCurrentRoom, setMyMaze, setQuestionsInRooms, mySize, setIsAnsweringQuestions,
       setIsCorrect, setMyRoomToNavigateTo, setMyPowerUp, setCheatsAllowed } = useMazeContext();

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
          setGameOverMessage("");   
          setIsAnsweringQuestions(false);
          setIsCorrect(null);
          setMyRoomToNavigateTo(null);
          setMyPowerUp("");
          setGameOverMessage("");   
          setCheatsAllowed(false);
          
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
  return (
    <div className={s.modalContainer}>
        <div className={s.modalContent + " " + themeColors.primaryOutline + " " + themeColors.background + " " + themeColors.primaryText}>
            <h1 className={s.title}>{gameOverMessage}</h1>
            <div className={s.buttons}>
                <button className={themeColors.primaryButton} onClick={startOver}>Main Menu</button>
                <button className={themeColors.loadButton} onClick={handleClickButton}>Play Again</button>
            </div>
        </div>
    </div>
  )
}
