import s from './GameComponent.module.css'
import { useMazeContext } from '../../context/MazeContext';
import PreGameOptionsComponent from '../PreGameOptionsComponent/PreGameOptionsComponent';
import MazeComponent from '../MazeComponent/MazeComponent';

export default function GameComponent() {
    const {myMaze,  started} = useMazeContext();

  return (      
    <div className={s.container}>
        {!started && <div className={s.preGameOptionsContainer}><PreGameOptionsComponent /></div>}
            {started && myMaze.length > 0 && <MazeComponent maze={myMaze} />}
    </div>
  )
}
