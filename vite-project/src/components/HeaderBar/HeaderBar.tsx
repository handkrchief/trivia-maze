import { useEffect } from 'react';
import { useMazeContext } from '../../context/MazeContext';
import { useThemeContext } from '../../context/ThemeContext';
import { lightThemeColors, darkThemeColors } from '../../ThemeColors';
import s from './HeaderBar.module.css';

export default function HeaderBar() {
  const {theme, toggleTheme} = useThemeContext();
  const {started, startOver} = useMazeContext();
  const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;

  useEffect(() => {
    console.log(themeColors);
  }, [themeColors]);

  return (
    <div className={`header ${s.container}`}>
        <span className={s.title}>
            Trivia Maze
        </span>

        <div className={s.buttonContainer}>
          <button className={themeColors.primaryButton} 
          onClick={toggleTheme}>
            {theme === "light" ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button disabled={!started} className={started ? themeColors.secondaryButton : themeColors.disabledButton} onClick={startOver}>
            Start Over
          </button>
        </div>
    </div>
  )
}
