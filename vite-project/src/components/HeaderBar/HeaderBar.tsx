import { useMazeContext } from '../../context/MazeContext';
import s from './HeaderBar.module.css';

type HeaderBarProps = {
  toggleDarkMode: () => void; // Type for the function that toggles dark mode
  darkMode: boolean;          // Type for the boolean darkMode state
};

export default function HeaderBar({toggleDarkMode, darkMode} : HeaderBarProps) {

  const {started, startOver} = useMazeContext();

  return (
    <div className={`header ${s.container}`}>
        <span className={s.title}>
            Trivia Maze
        </span>

        <div className={s.buttonContainer}>
          <button className={`button ${s.button}`} 
          onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button disabled={!started} className={`button ${started ? s.button: s.disabledButton}`} onClick={startOver}>
            Start Over
          </button>
        </div>
    </div>
  )
}
