import s from './GameComponent.module.css'
import { useMazeContext } from '../../context/MazeContext';
import PreGameOptionsComponent from '../PreGameOptionsComponent/PreGameOptionsComponent';
import NavigationComponent from '../NavigationComponent/NavigationComponent';
import TvComponent from '../TvComponent/TvComponent';
import DeskComponent from '../DeskComponent/DeskComponent';
import QuestionAnswerComponent from '../QuestionAnswerComponent/QuestionAnswerComponent';

/**
 * The GameComponent is the main component that renders the game.
 * It renders the PreGameOptionsComponent if the game has not started.
 * It renders the TvComponent and DeskComponent if the game has started and the user is not answering questions.
 * It renders the QuestionAnswerComponent if the game has started and the user is answering questions.
 * 
 * @author Zach Sanchez (Zachs00)
 * @author Ethan Moore (handkrchief)
 * @version November 21st, 2024
*/

export default function GameComponent() {
    const {myMaze,isAnsweringQuestions,  started} = useMazeContext();
    

  return (      
    <div className={`background ${s.container}`}>
        {!started && <div className={s.componentContainer}><PreGameOptionsComponent /></div>}

        {started && 
        <>

        {myMaze && !isAnsweringQuestions && <div className={s.componentContainer}><TvComponent /></div>}
        { myMaze && !isAnsweringQuestions && <div className={s.componentContainer}><DeskComponent/></div>}
        {!isAnsweringQuestions && <div className={s.componentContainer}><NavigationComponent /></div>}
        {isAnsweringQuestions && <div className={s.componentContainer}><QuestionAnswerComponent/></div>}
        </>}
    </div>
  )
}
