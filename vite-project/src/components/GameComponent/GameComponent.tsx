import s from './GameComponent.module.css'
import { useMazeContext } from '../../context/MazeContext';
import PreGameOptionsComponent from '../PreGameOptionsComponent/PreGameOptionsComponent';
import MazeComponent from '../MazeComponent/MazeComponent';
import NavigationComponent from '../NavigationComponent/NavigationComponent';
import TvComponent from '../TvComponent/TvComponent';
import DeskComponent from '../DeskComponent/DeskComponent';

export default function GameComponent() {
    const {myMaze,  started} = useMazeContext();
    
  return (      
    <div className={`background ${s.container}`}>
        {!started && <div className={s.preGameOptionsContainer}><PreGameOptionsComponent /></div>}

        {started && myMaze && <TvComponent />}
        {started && myMaze && <DeskComponent/>}
        {started && <NavigationComponent />}
    </div>
  )
}
