import s from './GameComponent.module.css'
import { useMazeContext } from '../../context/MazeContext';
import PreGameOptionsComponent from '../PreGameOptionsComponent/PreGameOptionsComponent';
import MazeComponent from '../MazeComponent/MazeComponent';
import NavigationComponent from '../NavigationComponent/NavigationComponent';
import TvComponent from '../TvComponent/TvComponent';
import DeskComponent from '../DeskComponent/DeskComponent';
import QuestionAnswerComponent from '../QuestionAnswerComponent/QuestionAnswerComponent';

export default function GameComponent() {
    const {myMaze,isAnsweringQuestions,  started} = useMazeContext();
    

  return (      
    <div className={`background ${s.container}`}>
        {!started && <div className={s.preGameOptionsContainer}><PreGameOptionsComponent /></div>}

        {started && myMaze && !isAnsweringQuestions && <TvComponent />}
        {started && myMaze && !isAnsweringQuestions && <DeskComponent/>}
        {started && !isAnsweringQuestions && <NavigationComponent />}
        {isAnsweringQuestions && <QuestionAnswerComponent/>}
    </div>
  )
}
