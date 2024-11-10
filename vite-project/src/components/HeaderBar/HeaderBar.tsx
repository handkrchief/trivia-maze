import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import s from './HeaderBar.module.css';

export default function HeaderBar() {
  const {theme, toggleTheme} = useThemeContext();
  const {started, startOver} = useMazeContext();

  return (
    <div className={`header ${s.container}`}>
        <span className={s.title}>
            Trivia Maze
        </span>

        <div className={s.buttonContainer}>
          <button className={s.button} 
          onClick={toggleTheme}>
            {theme === "light" ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button disabled={!started} className={started ? s.button: s.disabledButton} onClick={startOver}>
            Start Over
          </button>
        </div>
    </div>
  )
}
