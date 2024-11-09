import { useMazeContext } from '../../context/MazeContext';
import s from './HeaderBar.module.css';
export default function HeaderBar() {

  const {started, startOver} = useMazeContext();


  return (
    <div className={s.container}>
        <span className={s.title}>
            Trivia Maze
        </span>

        <div className={s.buttonContainer}>
          <button disabled={!started} className={started ? s.button: s.disabledButton } onClick={startOver}>
            Start Over
          </button>
        </div>
    </div>
  )
}
